import type { PinProject, PrismaClient } from "../../../generated";
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
import { UserModel } from "../models/users.model";
import { Project, Task, User } from "../../shared/interfaces.shared";
import { ProjectTagModel } from "../models/project-tag.model";
import { TagModel } from "../models/tag.model";
import { TaskService } from "./tasks.service";
import { ProjectRoleModel } from "../models/project-role.model";
import { PinProjectModel } from "../models/pin-project.model";

// Type aliases for Gantt chart data
type GanttProjectData = {
	id: string;
	text: string;
	start: Date | null;
	end: Date | null;
	duration: number;
	tag: string[];
	progress: number;
};

type GanttTaskData = {
	id: string;
	text: string;
	start: Date | null;
	end: Date | null;
	duration: number;
	tags: string[];
	subtask: boolean;
	progress: number;
	type: "summary" | "task";
	parentId: string | null;
};

export class ProjectService extends BaseService<Project> {
	private readonly projectModel: ProjectModel;
	private readonly taskModel: TasksModel;
	private readonly userModel: UserModel;
	private readonly projectTagModel: ProjectTagModel;
	private readonly tagModel: TagModel;
	private readonly projectRoleModel: ProjectRoleModel;
	private readonly taskService: TaskService;
	private readonly pinProject: PinProjectModel;
	private readonly prisma: PrismaClient;

	protected getTaskModel() {
		return this.taskModel;
	}

	constructor(prisma: PrismaClient, redis: Redis) {
		super(redis, 60);
		this.prisma = prisma;
		this.projectModel = new ProjectModel(prisma);
		this.taskModel = new TasksModel(prisma);
		this.userModel = new UserModel(prisma);
		this.projectTagModel = new ProjectTagModel(prisma);
		this.tagModel = new TagModel(prisma);
		this.projectRoleModel = new ProjectRoleModel(prisma);
		this.taskService = new TaskService(prisma, redis);
		this.pinProject = new PinProjectModel(prisma);
	}

	async getAllProjects(userId: string): Promise<Project[]> {
		const cacheKey = this.getProjectCacheKey(userId);
		const cacheProject = await this.getFromCache(cacheKey);

		if (cacheProject) {
			return cacheProject as Project[];
		}

		// Optimized: Single query to get user and determine access level
		const user = await this.userModel.findById(userId);
		if (!user) return [];

		let projectsFromDB;

		// Optimized: Use single query with includes instead of N+1
		if (user.admin || user.head) {
			projectsFromDB = await this.projectModel.findAllWithIncludes();
		} else {
			projectsFromDB = await this.projectModel.findByUserIdWithIncludes(userId);
		}

		// Optimized: Batch enrich projects with tasks
		const projects = await this.enrichProjectsWithDetails(
			projectsFromDB,
			userId,
		);

		await this.setToCache(cacheKey, projects);
		return projects;
	}

	async getProjectById(userId: string, projectId: string): Promise<Project> {
		const cacheKey = this.getProjectCacheKey(`${projectId}:${userId}`);
		const cacheProject = await this.getFromCache(cacheKey);

		if (cacheProject) return cacheProject as Project;

		// Optimized: Single query with all includes
		const project = await this.projectModel.findByIdWithIncludes(projectId);
		if (!project) throw new NotFoundException("Project not found");

		// Optimized: Enrich single project with details
		const enrichedProjects = await this.enrichProjectsWithDetails(
			[project],
			userId,
		);
		const projectWithDetails = enrichedProjects[0];

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
				role: "ProjectOwner",
				userId,
			});

			const projectWithDetails = await this.getProjectById(userId, project.id);
			if (!projectWithDetails)
				throw new ServerErrorException(
					"Failed to retrieve the created project",
				);

			await this.invalidateAllCache("projects");
			return projectWithDetails;
		}
		throw new ValidationException("Title cann't be null");
	}

	async updateProjectOwner(
		userId: string,
		projectId: string,
	): Promise<Project> {
		const isUserExist = await this.userModel.findById(userId);
		if (!isUserExist) throw new NotFoundException("User not found");

		const isProjectExist = await this.projectModel.findById(projectId);
		if (!isProjectExist) throw new NotFoundException("Project not found");

		const projectRole = await this.projectRoleModel.findByProjectId(projectId);
		if (!projectRole) throw new NotFoundException("Project role not found");
		const isOwner = projectRole.find(
			(role) => role.userId === userId && role.role === "ProjectOwner",
		);

		const isMember = projectRole.find(
			(role) => role.userId === userId && role.role === "Member",
		);
		if (isOwner) {
			await this.projectRoleModel.updateByProjectIDAndUserId(
				projectId,
				userId,
				{
					role: "Member",
				},
			);
		} else if (isMember) {
			await this.projectRoleModel.updateByProjectIDAndUserId(
				projectId,
				userId,
				{
					role: "ProjectOwner",
				},
			);
		} else {
			await this.projectRoleModel.create({
				userId: userId,
				projectId: projectId,
				role: "ProjectOwner",
			});
		}
		await this.invalidateAllCache("projects");
		return this.getProjectById(userId, projectId);
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

		// Prepare the updated project object
		const updatedProject = {
			...existingProject,
			...data,
		};

		// Invalidate caches
		await this.invalidateAllCache("projects");

		// Update and return the project
		await this.projectModel.update(projectId, updatedProject);
		const project = await this.getProjectById(userId, projectId);
		return project;
	}

	async assignTagToProject(
		tagId: string,
		projectId: string,
		userId: string,
	): Promise<Project> {
		if (!tagId) throw new ValidationException("Tag ID is required");
		if (!projectId) throw new ValidationException("Project ID is required");

		// Optimized: Batch validation queries
		const [projecttags, user, existingAssignment] = await Promise.all([
			this.projectTagModel.findByTagId(tagId),
			this.userModel.findById(userId),
			this.projectTagModel.findByProjectIdAndTagId(projectId, tagId),
		]);

		if (!user) throw new NotFoundException("User not found");
		if (existingAssignment) {
			throw new ValidationException("Tag already assigned to project");
		}

		await this.projectTagModel.create({
			tagId,
			projectId,
		});
		await this.invalidateAllCache("projects");
		return this.getProjectById(userId, projectId);
	}

	async removeTagFromProject(
		tagId: string,
		projectId: string,
		userId: string,
	): Promise<Project> {
		if (!tagId) throw new ValidationException("Tag ID is required");
		if (!projectId) throw new ValidationException("Project ID is required");
		const projecttags = await this.projectTagModel.findByProjectIdAndTagId(
			projectId,
			tagId,
		);
		if (!projecttags) throw new NotFoundException("Tag not found");
		const user = await this.userModel.findById(userId);
		if (!user) throw new NotFoundException("User not found");
		await this.projectTagModel.delete(projecttags.id);
		await this.invalidateAllCache("projects");
		return this.getProjectById(userId, projectId);
	}

	async deleteProject(userId: string, projectId: string): Promise<void> {
		await this.prisma.$transaction(async (tx) => {
			// Validate project exists
			const project = await tx.project.findUnique({ where: { id: projectId } });
			if (!project) throw new NotFoundException(`Project not found`);

			// Call Model to delete
			await this.projectModel.deleteProjectData(projectId, tx);
		});
	}

	async assigningPinToProject(
		userId: string,
		projectId: string,
	): Promise<Project> {
		// Optimized: Batch validation queries
		const [isUserExist, isProjectExist, pinProject] = await Promise.all([
			this.userModel.findById(userId),
			this.projectModel.findById(projectId),
			this.pinProject.findByUserIdAndProjectId(userId, projectId),
		]);

		if (!isUserExist) throw new NotFoundException("User not found");
		if (!isProjectExist) throw new NotFoundException("Project not found");

		// ถ้ามีแล้วให้คืนค่าเลย
		if (pinProject) return this.getProjectById(userId, projectId);

		// สร้าง Pin ใหม่
		await this.pinProject.create({
			userId,
			projectId,
		});

		await this.invalidateAllCache("projects");
		return this.getProjectById(userId, projectId);
	}

	async unAssigningPinToProject(
		userId: string,
		projectId: string,
	): Promise<Project> {
		// Optimized: Batch validation queries
		const [isUserExist, isProjectExist, pinProjectO] = await Promise.all([
			this.userModel.findById(userId),
			this.projectModel.findById(projectId),
			this.pinProject.findByUserIdAndProjectIdObject(userId, projectId),
		]);

		if (!isUserExist) throw new NotFoundException("User not found");
		if (!isProjectExist) throw new NotFoundException("Project not found");
		if (!pinProjectO) throw new NotFoundException("PinProject not found");

		// ลบ Pin
		await this.pinProject.delete(pinProjectO.id);
		await this.invalidateAllCache("projects");
		return this.getProjectById(userId, projectId);
	}

	async getAllPinInProjectByUserId(userId: string): Promise<string[]> {
		// Check if the user exists
		const isUserExist = await this.userModel.findById(userId);
		if (!isUserExist) throw new NotFoundException("User not found");

		// Fetch all pinned projects
		const allPinProject = await this.pinProject.findAll();

		// Filter projects by userId and extract projectId
		const allProjectId: string[] = allPinProject
			.filter((pin: PinProject) => pin.userId === userId)
			.map((pin: PinProject) => pin.projectId);

		return allProjectId;
	}

	async assignMemberToProject(
		userId: string,
		projectId: string,
	): Promise<Project> {
		// Optimized: Batch validation queries
		const [isUserExist, isProjectExist, projectRole] = await Promise.all([
			this.userModel.findById(userId),
			this.projectModel.findById(projectId),
			this.projectRoleModel.findByProjectId(projectId),
		]);

		if (!isUserExist) throw new NotFoundException("User not found");
		if (!isProjectExist) throw new NotFoundException("Project not found");
		if (!projectRole) throw new NotFoundException("Project role not found");

		const isMember = projectRole.find(
			(role) => role.userId === userId && role.role === "Member",
		);
		if (isMember) throw new ValidationException("User already a member");

		const isProjectOwner = projectRole.find(
			(role) => role.userId === userId && role.role === "ProjectOwner",
		);
		if (isProjectOwner)
			throw new ValidationException("Owner can't be a member");

		await this.projectRoleModel.create({
			projectId,
			role: "Member",
			userId,
		});
		await this.invalidateAllCache("projects");
		return this.getProjectById(userId, projectId);
	}

	async removeMemberFromProject(
		userId: string,
		projectId: string,
	): Promise<Project> {
		const isUserExist = await this.userModel.findById(userId);
		if (!isUserExist) throw new NotFoundException("User not found");

		const isProjectExist = await this.projectModel.findById(projectId);
		if (!isProjectExist) throw new NotFoundException("Project not found");

		const projectRole = await this.projectRoleModel.findByProjectId(projectId);
		if (!projectRole) throw new NotFoundException("Project role not found");
		const isMember = projectRole.find(
			(role) => role.userId === userId && role.role === "Member",
		);
		if (!isMember) throw new ValidationException("User not a member");

		await this.projectRoleModel.deleteByProjectIDandUserId(userId, projectId);
		await this.invalidateAllCache("projects", "tasks");
		return this.getProjectById(userId, projectId);
	}
	async getSummaryByTag(): Promise<{
		projects: {
			projectTag: string;
			budget: number;
			expense: number;
			startDate: Date | null;
			endDate: Date | null;
		}[];
		sumBudget: number;
		sumExpense: number;
	}> {
		const projects = await this.projectModel.findProjectWithTags();

		const tagMap = new Map<
			string,
			{
				budget: number;
				expense: number;
				startDate: Date | null;
				endDate: Date | null;
			}
		>();

		for (const project of projects) {
			for (const projectTag of project.tags) {
				const tagName = projectTag.tag.name;

				if (!tagMap.has(tagName)) {
					tagMap.set(tagName, {
						budget: 0,
						expense: 0,
						startDate: project.startDate,
						endDate: project.endDate,
					});
				}

				const current = tagMap.get(tagName)!;
				current.budget += project.budget;
				current.expense += project.expense;
			}
		}

		const result = Array.from(tagMap.entries()).map(([tag, amounts]) => ({
			projectTag: tag,
			budget: amounts.budget,
			expense: amounts.expense,
			startDate: amounts.startDate,
			endDate: amounts.endDate,
		}));

		const sumBudget = result.reduce((acc, p) => acc + p.budget, 0);
		const sumExpense = result.reduce((acc, p) => acc + p.expense, 0);

		return {
			projects: result,
			sumBudget,
			sumExpense,
		};
	}

	async getSummaryByTagWithProjectId(projectId: string): Promise<{
		projects: {
			projectTag: string;
			budget: number;
			expense: number;
			startDate: Date | null;
			endDate: Date | null;
		}[];
		sumBudget: number;
		sumExpense: number;
	}> {
		const projects =
			await this.projectModel.findProjectWithTagsByProjectId(projectId);

		const projectTagList: {
			projectTag: string;
			budget: number;
			expense: number;
			startDate: Date | null;
			endDate: Date | null;
		}[] = [];

		for (const project of projects) {
			for (const projectTag of project.tags) {
				const tagName = projectTag.tag.name;

				projectTagList.push({
					projectTag: tagName,
					budget: project.budget,
					expense: project.expense,
					startDate: project.startDate,
					endDate: project.endDate,
				});
			}
		}

		const sumBudget = projectTagList.reduce((acc, p) => acc + p.budget, 0);
		const sumExpense = projectTagList.reduce((acc, p) => acc + p.expense, 0);

		return {
			projects: projectTagList,
			sumBudget,
			sumExpense,
		};
	}

	private async calculateTaskProgress(task: Task): Promise<number> {
		// Use memoization to avoid recalculating progress for the same task
		const progressCache = new Map<string, number>();
		return await this.calculateTaskProgressRecursive(task, progressCache);
	}

	private async calculateTaskProgressRecursive(
		task: Task,
		cache: Map<string, number>,
	): Promise<number> {
		// Check cache first
		if (cache.has(task.id)) {
			return cache.get(task.id)!;
		}

		let progress: number;

		if (!task.subtasks || task.subtasks.length === 0) {
			progress = task.status === "Done" ? 100 : 0;
		} else {
			const subTaskProgresses = await Promise.all(
				task.subtasks.map((subTask) =>
					this.calculateTaskProgressRecursive(subTask, cache),
				),
			);

			progress =
				subTaskProgresses.reduce((acc, val) => acc + val, 0) /
				subTaskProgresses.length;
		}

		// Cache the result
		cache.set(task.id, progress);
		return progress;
	}

	async getganttdata(): Promise<GanttProjectData[]> {
		const cacheKey = this.getProjectCacheKey("gantt-all");
		const cachedData =
			await this.getFromCacheGeneric<GanttProjectData[]>(cacheKey);
		if (cachedData) return cachedData;

		const projects = await this.projectModel.findProjectWithTagsAndTasks();

		// Optimized: Batch collect all task IDs and fetch them at once
		const allTaskIds = projects.flatMap((project) =>
			project.tasks
				.filter((task) => task.parentTaskId === null)
				.map((task) => task.id),
		);

		// Batch fetch all tasks with details
		const taskDetailsMap = new Map();
		if (allTaskIds.length > 0) {
			const taskDetails = await Promise.all(
				allTaskIds.map((id) => this.taskService.getTaskById(id)),
			);
			allTaskIds.forEach((id, index) => {
				taskDetailsMap.set(id, taskDetails[index]);
			});
		}

		// Process projects with pre-loaded task data
		const results = await Promise.all(
			projects.map(async (project) => {
				const summaryTasks = project.tasks.filter(
					(task) => task.parentTaskId === null,
				);

				const fullSummaryTasks = summaryTasks
					.map((task) => taskDetailsMap.get(task.id))
					.filter(Boolean);

				const progressValues = await Promise.all(
					fullSummaryTasks.map((task) => this.calculateTaskProgress(task)),
				);

				const progress =
					progressValues.length > 0
						? progressValues.reduce((a, b) => a + b, 0) / progressValues.length
						: 0;

				return {
					id: project.id,
					text: project.title,
					start: project.startDate,
					end: project.endDate,
					duration:
						project.startDate && project.endDate
							? Math.ceil(
									(new Date(project.endDate).getTime() -
										new Date(project.startDate).getTime()) /
										(1000 * 60 * 60 * 24),
								)
							: 0,
					tag: project.tags?.map((t) => t.tag.name) || [],
					progress: parseFloat(progress.toFixed(2)),
				};
			}),
		);

		await this.setToCacheGeneric(cacheKey, results);
		return results;
	}

	async getGanttChartDataByProjectId(
		projectId: string,
	): Promise<GanttTaskData[]> {
		const cacheKey = this.getProjectCacheKey(`gantt-${projectId}`);
		const cachedData =
			await this.getFromCacheGeneric<GanttTaskData[]>(cacheKey);
		if (cachedData) return cachedData;

		const tasks =
			await this.taskModel.findTaskWithTagsAndSubTasksByProjectId(projectId);

		// Optimized: Batch fetch all task details at once
		const taskIds = tasks.map((task) => task.id);
		const taskDetailsMap = new Map();

		if (taskIds.length > 0) {
			const taskDetails = await Promise.all(
				taskIds.map((id) => this.taskService.getTaskById(id)),
			);
			taskIds.forEach((id, index) => {
				taskDetailsMap.set(id, taskDetails[index]);
			});
		}

		// Process tasks with pre-loaded data
		const result = await Promise.all(
			tasks.map(async (task) => {
				const duration =
					task.startDate && task.endDate
						? Math.ceil(
								(new Date(task.endDate).getTime() -
									new Date(task.startDate).getTime()) /
									(1000 * 60 * 60 * 24),
							)
						: 0;

				const fullTask = taskDetailsMap.get(task.id);
				const progress = fullTask
					? await this.calculateTaskProgress(fullTask)
					: 0;

				return {
					id: task.id,
					text: task.title,
					start: task.startDate,
					end: task.endDate,
					duration,
					tags: task.tags.map((t) => t.tag.name),
					subtask: task.subTasks.length > 0,
					progress: parseFloat(progress.toFixed(2)),
					type: task.parentTaskId ? ("task" as const) : ("summary" as const),
					parentId: task.parentTaskId ?? null,
				};
			}),
		);

		await this.setToCacheGeneric(cacheKey, result);
		return result;
	}

	// Optimized helper methods for batch processing
	private async enrichProjectsWithDetails(
		projects: any[],
		userId: string,
	): Promise<Project[]> {
		if (!projects || projects.length === 0) return [];

		// Batch get tasks for all projects
		const projectIds = projects.map((p) => p.id);
		const allProjectTasks = await Promise.all(
			projectIds.map((id) => this.taskService.getTaskByProjectId(id)),
		);

		// Create tasks lookup map
		const tasksMap = new Map(
			projectIds.map((id, index) => [id, allProjectTasks[index]]),
		);

		// Enrich projects with pre-loaded data
		return projects.map((project) =>
			this.mapProjectWithRelations(project, tasksMap, userId),
		);
	}

	private mapProjectWithRelations(
		project: any,
		tasksMap: Map<string, any[]>,
		userId: string,
	): Project {
		// Map owners and members from included data
		const owner =
			project.projectRoles
				?.filter((role: any) => role.role === "ProjectOwner")
				.map((role: any) => role.user) || [];

		const members =
			project.projectRoles
				?.filter((role: any) => role.role === "Member")
				.map((role: any) => role.user) || [];

		// Map tags from included data
		const tags = project.tags?.map((projectTag: any) => projectTag.tag) || [];

		// Get tasks from lookup map
		const tasks = tasksMap.get(project.id) || [];

		// Check if pinned
		const isPinned =
			project.pinnedProject?.some((pin: any) => pin.userId === userId) || null;

		return {
			...project,
			owner,
			members,
			tasks,
			tags,
			isPinned,
		};
	}

	// Optimized batch operations for common queries
	private async batchValidateUsers(
		userIds: string[],
	): Promise<Map<string, any>> {
		if (userIds.length === 0) return new Map();

		const users = await this.userModel.findByIds(userIds);
		return new Map(users.map((user) => [user.id, user]));
	}

	private async batchValidateProjects(
		projectIds: string[],
	): Promise<Map<string, any>> {
		if (projectIds.length === 0) return new Map();

		const projects = await this.projectModel.findByIdsWithIncludes(projectIds);
		return new Map(projects.map((project) => [project.id, project]));
	}
}
