import type { PrismaClient, Project } from "@prisma/client";
import { BaseService } from "../core/service.core";
import { ProjectModel } from "../models/projects.model";
import type Redis from "ioredis";
import { NotFoundError } from "elysia";
import {
	NotFoundException,
	ServerErrorException,
	ValidationException,
} from "../core/exception.core";
import { TasksModel } from "../models/tasks.model";
import { ActivityLogsModel } from "../models/activity-logs.model";
import { CommentModel } from "../models/comment.model";
import { EmojiModel } from "../models/emoji.model";
import { FilesModel } from "../models/files.model";
import { TaskTagModel } from "../models/task-tag.model";
import { TasksAssignmentModel } from "../models/tasks-assignment.model";
import { UserModel } from "../models/users.model";
import { BudgetStatus } from "@prisma/client";

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
	}

	async getAllProjects(): Promise<Project[]> {
		const cacheKey = "projects:all";
		const cacheProject = await this.getFromCache(cacheKey);

		if (cacheProject) return cacheProject as Project[];

		const projects = await this.projectModel.findAll();
		await this.setToCache(cacheKey, projects);
		return projects;
	}

	async getProjectById(id: string): Promise<Project | null> {
		const cacheKey = `projects:${id}`;
		const cacheProject = await this.getFromCache(cacheKey);

		if (cacheProject) return cacheProject as Project;

		const project = await this.projectModel.findById(id);
		if (!project) throw new NotFoundError("Project not found");
		await this.setToCache(cacheKey, project);
		return project;
	}

	async createProject(data: Partial<Project>): Promise<Project> {
		if (data.title !== null) {
			const newTask = {
				title: data.title,
				description: data.description,
				startDate: data.startDate,
				endDate: data.endDate,
				expectedBudget: data.expectedBudget,
				realBudget: data.realBudget,
				usedBudget: data.usedBudget,
			};
			return await this.projectModel.create(newTask);
		}
		throw new ValidationException("Title cann't be null");
	}

	async updateProject(
		projectId: string,
		title: string,
		description: string,
	): Promise<Project> {
		// Find the project by ID
		const existingProject = await this.projectModel.findById(projectId);
		if (!existingProject) throw new NotFoundException("Project not found");

		// Get all roles associated with the project
		const roles = await this.projectModel.findrole(projectId);

		const OwnerId = roles?.find((role) => role.role === "ProjectOwner")?.userId;
		if (!OwnerId) throw new NotFoundException("Project Owner not found");

		const isUserExist = await this.userModel.findById(OwnerId);
		if (!isUserExist) throw new NotFoundException("User not found");

		// Prepare the updated project object
		const updatedProject = {
			...existingProject,
			title,
			description,
		};

		// Invalidate caches
		await this.invalidateCache("projects:all");
		await this.invalidateCache(`projects:project:${projectId}`);

		// Update and return the project
		return await this.projectModel.update(projectId, updatedProject);
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
			await this.projectModel.delete(projectId);
		} catch (error) {
			throw new ServerErrorException(`Error deleting project`);
		}

		return project;
	}
	
	async getProjectMoney(id: string): Promise<number[]> {
		const project = await this.projectModel.findById(id);
		if (!project) throw new NotFoundError("Project not found");
		let sum = [0, 0, 0];

		const addToSum = (task: {
			budget: number;
			advance: number;
			expense: number;
		}) => {
			sum = sum.map(
				(val, index) => val + [task.budget, task.advance, task.expense][index],
			);
		};

		//sum budget from subTasks
		const calculateSubTaskSum = async (taskId: string) => {
			const subTasks = await this.getTaskModel().findSubTask(taskId);
			if (!subTasks || subTasks.length === 0) return;
			for (const task of subTasks) {
				if (
					task.statusBudgets === BudgetStatus.Added ||
					BudgetStatus.SubTasksAdded
				) {
					addToSum(task);
					await calculateSubTaskSum(task.id);
				}
			}
		};
		const allTasks = await this.taskModel.findByProjectId(id);
		for (const task of allTasks) {
			addToSum(task);
			await calculateSubTaskSum(task.id);
		}

		return sum;
	}
}
