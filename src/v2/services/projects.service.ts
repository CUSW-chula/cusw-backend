import type { PinProject, PrismaClient } from "@prisma/client";
import { BaseService } from "../../core/service.core";
import { ProjectModel } from "../models/projects.model";
import type Redis from "ioredis";
import {
	NotFoundException,
	PermissionException,
	ServerErrorException,
	ValidationException,
} from "../../core/exception.core";
import { TasksModel } from "../models/tasks.model";
import { ActivityLogsModel } from "../models/activity-logs.model";
import { CommentModel } from "../models/comment.model";
import { EmojiModel } from "../models/emoji.model";
import { FilesModel } from "../models/files.model";
import { TaskTagModel } from "../models/task-tag.model";
import { TasksAssignmentModel } from "../models/tasks-assignment.model";
import { UserModel } from "../models/users.model";
import { BudgetStatus } from "@prisma/client";
import { Project, Task, User } from "../../shared/interfaces.shared";
import { ProjectTagModel } from "../models/project-tag.model";
import { TagModel } from "../models/tag.model";
import { TaskService } from "./tasks.service";
import { ProjectRoleModel } from "../models/project-role.model";
import { PinProjectModel } from "../models/pin-project.model";

export class ProjectService extends BaseService<Project> {
	private readonly projectModel: ProjectModel;
	private readonly taskModel: TasksModel;
	private readonly taskAssignmentModel: TasksAssignmentModel;
	private readonly emojiModel: EmojiModel;
	private readonly taskTagModel: TaskTagModel;
	private readonly fileModel: FilesModel;
	private readonly activitiesLogsModel: ActivityLogsModel;
	private readonly commentModel: CommentModel;
	private readonly userModel: UserModel;
	private readonly projectTagModel: ProjectTagModel;
	private readonly tagModel: TagModel;
	private readonly projectRoleModel: ProjectRoleModel;
	private readonly taskService: TaskService;
	private readonly pinProject: PinProjectModel;

	protected getTaskModel() {
		return this.taskModel;
	}

	constructor(prisma: PrismaClient, redis: Redis) {
		super(redis, 60);
		this.projectModel = new ProjectModel(prisma);
		this.taskModel = new TasksModel(prisma);
		this.taskAssignmentModel = new TasksAssignmentModel(prisma);
		this.emojiModel = new EmojiModel(prisma);
		this.taskTagModel = new TaskTagModel(prisma);
		this.fileModel = new FilesModel(prisma);
		this.activitiesLogsModel = new ActivityLogsModel(prisma);
		this.commentModel = new CommentModel(prisma);
		this.userModel = new UserModel(prisma);
		this.projectTagModel = new ProjectTagModel(prisma);
		this.tagModel = new TagModel(prisma);
		this.projectRoleModel = new ProjectRoleModel(prisma);
		this.taskService = new TaskService(prisma, redis);
		this.pinProject = new PinProjectModel(prisma);
	}

	async getAllProjects(): Promise<Project[]> {
		const cacheKey = "projects:all";
		const cacheProject = await this.getFromCache(cacheKey);

		if (cacheProject) return cacheProject as Project[];

		const projectsFromDB = await this.projectModel.findAll();
		const projects: Project[] = (
			await Promise.all(
				projectsFromDB.map(async (project) => {
					const projectDetail = await this.getProjectById(project.id);
					if (projectDetail !== null) return projectDetail;
				}),
			)
		).filter((project): project is Project => project !== undefined);
		await this.setToCache(cacheKey, projects);
		return projects;
	}

	async getProjectById(id: string): Promise<Project> {
		const cacheKey = `projects:${id}`;
		const cacheProject = await this.getFromCache(cacheKey);

		if (cacheProject) return cacheProject as Project;

		const project = await this.projectModel.findById(id);
		if (!project) throw new NotFoundException("Project not found");
		const projectRole = await this.projectRoleModel.findByProjectId(id);
		const owner: User[] = projectRole
			? await Promise.all(
					projectRole
						.filter((role) => role.role === "ProjectOwner")
						.map(async (role) => {
							const user = await this.userModel.findById(role.userId);
							return user;
						}),
				)
			: [];
		const members: User[] = projectRole
			? await Promise.all(
					projectRole
						.filter((role) => role.role === "Member")
						.map(async (role) => {
							const user = await this.userModel.findById(role.userId);
							return user;
						}),
				)
			: [];
		const tagsFromDB = await this.projectTagModel.findByProjectId(id);
		const tags = tagsFromDB
			? await Promise.all(
					tagsFromDB.map(async (tag) => {
						const tagData = await this.tagModel.findById(tag.tagId);
						return tagData;
					}),
				)
			: [];
		const tasks = await this.taskService.getTaskByProjectId(id);
		const projectWithDetails = {
			...project,
			owner,
			members,
			tasks,
			tags,
		};
		await this.setToCache(cacheKey, projectWithDetails);
		return projectWithDetails;
	}

	async createProject(
		userId: string,
		data: Partial<Project>,
	): Promise<Project> {
		if (data.title !== null) {
			const newProject = {
				title: data.title,
				description: data.description,
				startDate: data.startDate,
				endDate: data.endDate,
				budget: data.budget,
				advance: data.advance,
				expense: data.expense,
			};

			const project = await this.projectModel.create(newProject);
			if (!project) throw new ServerErrorException("Failed to create project");

			await this.projectRoleModel.create({
				projectId: project.id,
				userId,
			});

			const projectWithDetails = await this.getProjectById(project.id);
			if (!projectWithDetails)
				throw new ServerErrorException(
					"Failed to retrieve the created project",
				);
			return projectWithDetails;
		}
		throw new ValidationException("Title cann't be null");
	}

	async updateProject(
		userId: string,
		projectId: string,
		data: Partial<Project>,
	): Promise<Project> {
		// Find the project by ID
		const existingProject = await this.projectModel.findById(projectId);
		if (!existingProject) throw new NotFoundException("Project not found");

		const isUserExist = await this.userModel.findById(userId);
		if (!isUserExist) throw new NotFoundException("User not found");

		const role = await this.projectModel.findRole(userId, projectId);
		if (role !== "ProjectOwner")
			throw new PermissionException("You are not the owner of this project");

		// Prepare the updated project object
		const updatedProject = {
			...existingProject,
			...data,
		};

		// Invalidate caches
		await this.invalidateCache("projects:all");
		await this.invalidateCache(`projects:${projectId}`);

		// Update and return the project
		await this.projectModel.update(projectId, updatedProject);
		const project = await this.getProjectById(projectId);
		await this.setToCache(`projects:${projectId}`, project);
		return project;
	}

	async assignTagToProject(
		tagId: string,
		projectId: string,
		userId: string,
	): Promise<Project> {
		if (!tagId) throw new ValidationException("Tag ID is required");
		if (!projectId) throw new ValidationException("Project ID is required");
		const user = await this.userModel.findById(userId);
		if (!user) throw new NotFoundException("User not found");
		await this.projectTagModel.create({
			tagId,
			projectId,
		});
		await this.invalidateCache(`projects:${projectId}`);
		return this.getProjectById(projectId);
	}

	async deleteProject(projectId: string): Promise<Project> {
		// Check if the project exists
		const project = await this.projectModel.findById(projectId);
		if (!project) {
			throw new NotFoundException(`Project with ID ${projectId} not found`);
		}

		try {
			// Find all tasks associated with the project
			const tasks = await this.taskModel.findByProjectId(projectId);

			// Delete all related entities for each task
			if (tasks && tasks.length > 0) {
				for (const task of tasks) {
					const taskId = task.id;

					// Delete all task-related data
					await this.taskAssignmentModel.deleteByTaskId(taskId);
					await this.taskTagModel.deleteByTaskId(taskId);
					await this.emojiModel.deleteByTaskId(taskId);
					await this.fileModel.deleteByTaskId(taskId);
					await this.activitiesLogsModel.deleteByTaskId(taskId);
					await this.commentModel.deleteByTaskId(taskId);

					// Delete the task itself
					await this.taskModel.delete(taskId);

					// Invalidate cache for the task
					await this.invalidateCache(`tasks:${taskId}`);
				}
			}

			// Invalidate cache related to the project
			await this.invalidateCache(`projects:${projectId}`);
			await this.invalidateCache("projects:all");

			// Delete the project itself
			const project = await this.getProjectById(projectId);
			await this.projectRoleModel.deleteByProjectId(projectId);
			await this.projectTagModel.deleteByProjectId(projectId);
			await this.projectModel.delete(projectId);
			return project;
		} catch (_error) {
			const error = _error as Error;
			throw new ServerErrorException(`Error deleting project ${error.message}`);
		}
	}

	async assigningpinToProject(
		userId: string,
		projectId: string,
	): Promise<PinProject> {
		// ตรวจสอบว่าผู้ใช้มีอยู่จริง
		const isUserExist = await this.userModel.findById(userId);
		if (!isUserExist) throw new NotFoundException("User not found");

		// ตรวจสอบว่าโปรเจกต์มีอยู่จริง
		const isProjectExist = await this.projectModel.findById(projectId);
		if (!isProjectExist) throw new NotFoundException("Project not found");

		// ตรวจสอบว่าผู้ใช้ได้ Pin โปรเจกต์นี้ไปแล้วหรือยัง
		const existingPin = await this.pinProject.findFirst({
			where: { userId, projectId },
		});

		// ถ้ายังไม่มี ให้สร้าง Pin ใหม่
		const assignPinToProject = await this.pinProject.create({
			userId,
			projectId,
		});

		if (!assignPinToProject) throw new Error("Failed to assign pin to project");

		return assignPinToProject;
	}
}
