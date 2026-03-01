import { TasksModel } from "../models/tasks.model";
import {
	$Enums,
	BudgetStatus,
	TaskStatus,
	type PrismaClient,
} from "../../../generated";
import { BaseService } from "../../core/service.core";
import type Redis from "ioredis";
import { UserModel } from "../models/users.model";
import { TasksAssignmentModel } from "../models/tasks-assignment.model";
import { EmojiModel } from "../models/emoji.model";
import { TaskTagModel } from "../models/task-tag.model";
import { ProjectModel } from "../models/projects.model";
import { FilesModel } from "../models/files.model";
import { ActivityLogsModel } from "../models/activity-logs.model";
import { CommentModel } from "../models/comment.model";
import {
	NotFoundException,
	ValidationException,
	ServerErrorException,
} from "../../core/exception.core";
import { Project, Emoji, Task } from "../../shared/interfaces.shared";
import { TagModel } from "../models/tag.model";
import { TagService } from "../services/tag.service";
import { sortTasks } from "../../shared/utils/task.utils";

export class TaskService extends BaseService<Task> {
	private readonly taskModel: TasksModel;
	private readonly userModel: UserModel;
	private readonly projectModel: ProjectModel;
	private readonly taskAssignmentModel: TasksAssignmentModel;
	private readonly emojiModel: EmojiModel;
	private readonly tagModel: TagModel;
	private readonly taskTagModel: TaskTagModel;
	private readonly fileModel: FilesModel;
	private readonly activitiesLogsModel: ActivityLogsModel;
	private readonly commentModel: CommentModel;
	private readonly tagService: TagService;

	constructor(prisma: PrismaClient, redis: Redis) {
		super(redis, 60); //
		this.taskModel = new TasksModel(prisma);
		this.userModel = new UserModel(prisma);
		this.projectModel = new ProjectModel(prisma);
		this.emojiModel = new EmojiModel(prisma);
		this.taskAssignmentModel = new TasksAssignmentModel(prisma);
		this.taskTagModel = new TaskTagModel(prisma);
		this.fileModel = new FilesModel(prisma);
		this.activitiesLogsModel = new ActivityLogsModel(prisma);
		this.commentModel = new CommentModel(prisma);
		this.tagModel = new TagModel(prisma);
		this.tagService = new TagService(prisma, redis);
	}

	protected getTaskModel() {
		return this.taskModel;
	}

	protected getTaskAssignmentModel() {
		return this.taskAssignmentModel;
	}

	protected getEmojiModel() {
		return this.emojiModel;
	}

	protected getUserModel() {
		return this.userModel;
	}

	protected getProjectModel() {
		return this.projectModel;
	}

	protected updateProjectModel(
		projectId: string,
		updatedProject: {
			budget: number;
			advance: number;
			expense: number;
			id: string;
			title: string;
			description: string;
			startDate: Date | null;
			endDate: Date | null;
		},
	) {
		this.projectModel.update(projectId, updatedProject);
		// return;
	}

	async getAllTask(): Promise<Task[]> {
		const cacheKey = this.getTaskCacheKey("all");
		const cacheTasks = await this.getFromCache(cacheKey);
		if (cacheTasks) return cacheTasks as Task[];

		// Optimized: Single query with all includes instead of N+1 queries
		const tasks = await this.taskModel.findAllWithIncludes();
		const tasksWithDetail = await this.enrichTasksWithDetails(tasks);

		await this.setToCache(cacheKey, tasksWithDetail);
		return tasksWithDetail;
	}

	async updateTask(
		taskId: string,
		title: string,
		description: string,
	): Promise<Task> {
		// Find and validate the task
		const existingTask = await this.taskModel.findById(taskId);
		if (!existingTask) throw new NotFoundException("Task not found");

		// Check if user exists based on the task's createdById
		if (!existingTask.createdById)
			throw new NotFoundException("Task owner ID not found");
		const isUserExist = await this.userModel.findById(existingTask.createdById);
		if (!isUserExist) throw new NotFoundException("User not found");

		// Prepare the updated task object
		const updatedTask = {
			...existingTask,
			title,
			description,
		};

		// Invalidate caches
		await this.invalidateAllCache("projects", "tasks");

		// Update and return the task
		try {
			await this.taskModel.updateTaskTitleAndDesc(taskId, title, description);
			return await this.getTaskById(taskId);
		} catch (_error) {
			throw new ServerErrorException(`Error updating task with ID ${taskId}:`);
		}
	}

	async createTask(task: Partial<Task>): Promise<Task> {
		if (!task.createdById)
			throw new ValidationException("No owner ID provided");
		if (!task.projectId)
			throw new ValidationException("No project ID provided");

		// Optimized: Batch validation queries
		const [isUserExist, existingProject, parentTask] = await Promise.all([
			this.userModel.findById(task.createdById),
			this.projectModel.findById(task.projectId),
			task.parentTaskId ? this.taskModel.findById(task.parentTaskId) : null,
		]);

		if (!isUserExist) {
			throw new NotFoundException("User not found");
		}
		if (!existingProject) {
			throw new ValidationException("Project can't be found");
		}

		let statusBudget: $Enums.BudgetStatus = BudgetStatus.Initial;
		if (parentTask) {
			if (
				parentTask.statusBudgets === BudgetStatus.Added ||
				parentTask.statusBudgets === BudgetStatus.ParentTaskAdded
			) {
				statusBudget = BudgetStatus.ParentTaskAdded;
			}
		}

		// Optimized: Get position count without loading all tasks
		const position = await this.taskModel.getTaskCountByProjectId(
			task.projectId,
		);

		const newTask = {
			title: task.title || "Untitled task",
			description: task.description,
			createdById: task.createdById,
			startDate: task.startDate,
			endDate: task.endDate,
			status: task.status,
			parentTaskId: task.parentTaskId !== "" ? task.parentTaskId : undefined,
			position: position,
			budget: task.budget,
			advance: task.advance,
			expense: task.expense,
			statusBudgets: statusBudget,
			projectId: task.projectId,
		};

		// Use transaction for atomic operations
		const result = await this.taskModel.createTaskWithProjectUpdate(newTask, {
			budget: existingProject.budget + (task.budget ?? 0),
			advance: existingProject.advance + (task.advance ?? 0),
			expense: existingProject.expense + (task.expense ?? 0),
		});

		await this.invalidateAllCache("projects", "tasks");
		return await this.getTaskById(result.id);
	}

	async getTaskByUserId(userId: string): Promise<Task[]> {
		const cacheKey = this.getTaskCacheKey(`user-${userId}`);
		const cachedTasks = await this.getFromCache(cacheKey);
		if (cachedTasks) return cachedTasks as Task[];

		// Optimized: Single query with joins instead of N+1
		const tasks = await this.taskModel.findByUserIdWithIncludes(userId);
		const tasksWithDetail = await this.enrichTasksWithDetails(tasks);

		await this.setToCache(cacheKey, tasksWithDetail);
		return tasksWithDetail;
	}

	async getTaskByProjectId(projectId: string): Promise<Task[]> {
		const cacheKey = this.getTaskCacheKey(`project-${projectId}`);
		const cachedTasks = await this.getFromCache(cacheKey);
		if (cachedTasks) return cachedTasks as Task[];

		// Optimized: Single query with all includes
		const tasks = await this.taskModel.findByProjectIdWithIncludes(projectId);
		const tasksWithDetail = await this.enrichTasksWithDetails(tasks);
		const sortedTasks = sortTasks(tasksWithDetail);

		await this.setToCache(cacheKey, sortedTasks);
		return sortedTasks;
	}

	async getTaskByParentTaskId(parentTaskId: string): Promise<Task[]> {
		const cacheKey = this.getTaskCacheKey(`parent-${parentTaskId}`);
		const cachedTasks = await this.getFromCache(cacheKey);
		if (cachedTasks) return cachedTasks as Task[];

		// Optimized: Single query with includes
		const tasks =
			await this.taskModel.findByParentTaskIdWithIncludes(parentTaskId);
		if (!tasks || tasks.length === 0)
			throw new NotFoundException("Task not found");

		const tasksWithDetail = await this.enrichTasksWithDetails(tasks);
		await this.setToCache(cacheKey, tasksWithDetail);
		return tasksWithDetail;
	}

	async getTaskById(taskId: string): Promise<Task> {
		const cacheKey = this.getTaskCacheKey(taskId);
		const cacheTask = await this.getFromCache(cacheKey);
		if (cacheTask) return cacheTask as Task;

		// Optimized: Single query with all includes instead of multiple queries
		const task = await this.taskModel.findByIdWithIncludes(taskId);
		if (!task) throw new NotFoundException("Task not found");

		const taskWithDetail = await this.enrichSingleTaskWithDetails(task);
		await this.setToCache(cacheKey, taskWithDetail);
		return taskWithDetail;
	}

	async deleteTask(taskId: string): Promise<Task> {
		const task = await this.taskModel.findById(taskId);
		if (!task) throw new NotFoundException("Task not found");

		try {
			// Optimized: Collect all task IDs to delete in one traversal
			const allTaskIds = await this.collectAllSubTaskIds(taskId);

			// Get task details before deletion for project budget update
			const taskDetails = await this.getTaskById(taskId);

			// Batch delete all related data for all tasks
			await Promise.all([
				this.taskAssignmentModel.deleteByTaskIds(allTaskIds),
				this.taskTagModel.deleteByTaskIds(allTaskIds),
				this.emojiModel.deleteByTaskIds(allTaskIds),
				this.fileModel.deleteByTaskIds(allTaskIds),
				this.activitiesLogsModel.deleteByTaskIds(allTaskIds),
				this.commentModel.deleteByTaskIds(allTaskIds),
			]);

			// Delete tasks in reverse order (children first)
			for (let i = allTaskIds.length - 1; i >= 0; i--) {
				await this.taskModel.delete(allTaskIds[i]);
			}

			await this.invalidateAllCache("projects", "tasks");

			// Update project money
			const existingProject = await this.projectModel.findById(
				taskDetails.projectId,
			);
			if (!existingProject) {
				throw new ValidationException("Project can't be found");
			}

			const updatedProject = {
				...existingProject,
				budget: existingProject.budget - (taskDetails.budget ?? 0),
				advance: existingProject.advance - (taskDetails.advance ?? 0),
				expense: existingProject.expense - (taskDetails.expense ?? 0),
			};

			await this.projectModel.update(taskDetails.projectId, updatedProject);
			return taskDetails;
		} catch (_error) {
			throw new ServerErrorException(`Error deleting task with ID ${taskId}:`);
		}
	}

	// Helper method to collect all subtask IDs recursively
	private async collectAllSubTaskIds(taskId: string): Promise<string[]> {
		const allIds: string[] = [taskId];
		const subTasks = await this.taskModel.findSubTask(taskId);

		if (subTasks && subTasks.length > 0) {
			for (const subTask of subTasks) {
				const subTaskIds = await this.collectAllSubTaskIds(subTask.id);
				allIds.push(...subTaskIds);
			}
		}

		return allIds;
	}

	async changeStatus(taskId: string, newTaskStatus: TaskStatus): Promise<Task> {
		const isTaskExist = await this.taskModel.findById(taskId);
		if (!isTaskExist) throw new NotFoundException("Task not found");

		const updatedTask = await this.taskModel.update(taskId, {
			status: newTaskStatus,
		});

		if (newTaskStatus === TaskStatus.Done) {
			const doneAt = new Date();
			await this.taskModel.update(taskId, { doneAt });
			const parentTask = await this.taskModel.findParentTask(taskId);
			if (parentTask) {
				await this.recursiveDoneParentTask(isTaskExist.id, newTaskStatus);
			}
		}

		await this.invalidateAllCache("tasks", "projects");

		const finalTask = await this.getTaskById(updatedTask.id);
		return finalTask;
	}

	async recursiveDoneParentTask(taskId: string, newTaskStatus: TaskStatus) {
		const doneAt = new Date();
		await this.taskModel.update(taskId, { doneAt });
		const parentTask = await this.taskModel.findParentTask(taskId);
		if (parentTask) {
			const friendTask = await this.taskModel.findSubTask(parentTask.id);
			let isAllDone = true;
			if (friendTask) {
				for (const task of friendTask) {
					if (task.status !== "Done") isAllDone = false;
				}
			}
			if (isAllDone) {
				const newStatus = { status: newTaskStatus };
				await this.taskModel.update(parentTask.id, newStatus);
				this.recursiveDoneParentTask(parentTask.id, newTaskStatus);
			}
		}
	}

	async getRecursiveParentTaskList(taskId: string): Promise<Task[]> {
		const cacheKey = this.getTaskCacheKey(`parents-${taskId}`);
		const cachedList = await this.getFromCache(cacheKey);
		if (cachedList) return cachedList as Task[];

		// Optimized: Collect all parent IDs first, then batch fetch
		const parentIds: string[] = [];
		let currentTaskId = taskId;

		// First, collect all parent task IDs in a single traversal
		while (currentTaskId) {
			parentIds.push(currentTaskId);
			const task = await this.taskModel.findById(currentTaskId);
			if (!task || !task.parentTaskId) break;
			currentTaskId = task.parentTaskId;
		}

		// Batch fetch all tasks with includes
		const tasks = await Promise.all(
			parentIds.map((id) => this.taskModel.findByIdWithIncludes(id)),
		);

		const validTasks = tasks.filter(Boolean) as any[];
		const enrichedTasks = await this.enrichTasksWithDetails(validTasks);

		const result = enrichedTasks.reverse();
		await this.setToCache(cacheKey, result);
		return result;
	}

	async getParentTask(taskId: string): Promise<Task | string> {
		const task = await this.taskModel.findById(taskId);
		if (!task) throw new NotFoundException("Task not found");

		if (!task.parentTaskId) return task.projectId;

		const parentTask = await this.getTaskById(task.parentTaskId);
		if (!parentTask) throw new NotFoundException("Parent task not found");

		return parentTask;
	}

	async updateDate(
		taskId: string,
		startDate: Date | null,
		endDate: Date | null,
	): Promise<Task> {
		const isTaskExist = await this.taskModel.findById(taskId);
		if (!isTaskExist) throw new NotFoundException("Task not found");

		const updatedTask = await this.taskModel.update(taskId, {
			startDate: startDate,
			endDate: endDate,
		});
		await this.invalidateAllCache("tasks", "projects");
		return this.getTaskById(updatedTask.id);
	}

	async createTaskWithSubTaskRecursive(
		templateTask: Task[],
		userId: string,
		projectId: string,
	): Promise<Task[]> {
		const newTasks: Task[] = [];
		for (let i = 0; i < templateTask.length; i++) {
			const task = templateTask[i];
			const position = i;
			const newTask = await this.createTaskFromTemplate(
				task,
				userId,
				projectId,
				position,
			);

			await this.invalidateAllCache("tasks");
			newTasks.push(newTask);
			if (task.subtasks) {
				const subtasks = await this.createTaskWithSubTaskRecursive(
					task.subtasks,
					userId,
					projectId,
				);
				await this.invalidateAllCache("tasks");
				for (const subtask of subtasks) {
					await this.taskModel.update(subtask.id, {
						parentTaskId: newTask.id,
					});
				}
			}
		}
		return newTasks;
	}

	async createTaskForDuplicate(
		templateTask: Task[],
		userId: string,
		projectId: string,
	): Promise<Task[]> {
		const newTasks: Task[] = [];
		for (let i = 0; i < templateTask.length; i++) {
			const task = templateTask[i];
			const position = i;
			const newTask = await this.createTaskFromTemplate(
				task,
				userId,
				projectId,
				position,
			);

			await this.invalidateAllCache("tasks");
			newTasks.push(newTask);
			if (task.subtasks) {
				const subtasks = await this.createTaskForDuplicate(
					task.subtasks,
					userId,
					projectId,
				);
				await this.invalidateAllCache("tasks");
				for (const subtask of subtasks) {
					await this.taskModel.update(subtask.id, {
						parentTaskId: newTask.id,
					});
				}
			}
			//in case duplicate task
			if (templateTask.length === 1 && templateTask[0].parentTaskId) {
				const parentTask = newTasks[0];
				const position = (await this.getTaskById(templateTask[0].parentTaskId))
					.subtasks.length;
				await this.taskModel.update(parentTask.id, {
					parentTaskId: templateTask[0].parentTaskId,
					position: position,
				});
			}
		}
		return newTasks;
	}

	async createTaskFromTemplate(
		templateTask: Task,
		userId: string,
		projectId: string,
		position: number,
	): Promise<Task> {
		const newTask: Partial<Task> = {
			title: templateTask.title,
			description: templateTask.description,
			createdById: userId,
			startDate: null,
			endDate: null,
			status: "Unassigned",
			parentTaskId: null,
			budget: 0,
			advance: 0,
			expense: 0,
			subtasks: templateTask.subtasks,
			projectId: projectId,
			position: position,
		};

		const response = await this.createTask(newTask);

		for (const tag of templateTask.tags) {
			if (tag) {
				this.tagService.assigningTagToTask(response.id, tag.id, userId);
			}
		}

		return response;
	}

	async updatePosition(taskId: string, newPosition: number): Promise<Task[]> {
		const result = await this.taskModel.updatePosition(taskId, newPosition);

		await this.invalidateAllCache("tasks", "projects");
		const updatedTasks = await Promise.all(
			result.map((task: any) => this.getTaskById(task.id)),
		);
		return updatedTasks;
	}

	// Optimized helper methods for batch processing
	private async enrichTasksWithDetails(tasks: any[]): Promise<Task[]> {
		if (!tasks || tasks.length === 0) return [];

		// Batch collect all IDs for efficient querying
		const taskIds = tasks.map((task) => task.id);
		const userIds = new Set<string>();
		const tagIds = new Set<string>();

		// Collect all related IDs
		tasks.forEach((task) => {
			if (task.createdById) userIds.add(task.createdById);
			if (task.assignedUsers) {
				task.assignedUsers.forEach((assignment: any) =>
					userIds.add(assignment.userId),
				);
			}
			if (task.tags) {
				task.tags.forEach((taskTag: any) => tagIds.add(taskTag.tagId));
			}
			if (task.emojiTaskUsers) {
				task.emojiTaskUsers.forEach((emoji: any) => userIds.add(emoji.userId));
			}
		});

		// Batch fetch all related data
		const [users, tags] = await Promise.all([
			userIds.size > 0 ? this.userModel.findByIds(Array.from(userIds)) : [],
			tagIds.size > 0 ? this.tagModel.findByIds(Array.from(tagIds)) : [],
		]);

		// Create lookup maps for O(1) access
		const userMap = new Map(users.map((user) => [user.id, user]));
		const tagMap = new Map(tags.map((tag) => [tag.id, tag]));

		// Enrich tasks with related data
		return tasks.map((task) =>
			this.mapTaskWithRelations(task, userMap, tagMap),
		);
	}

	private async enrichSingleTaskWithDetails(task: any): Promise<Task> {
		const enrichedTasks = await this.enrichTasksWithDetails([task]);
		return enrichedTasks[0];
	}

	private mapTaskWithRelations(
		task: any,
		userMap: Map<string, any>,
		tagMap: Map<string, any>,
	): Task {
		// Map owner
		const owner = task.createdById ? userMap.get(task.createdById) : null;

		// Map members
		const members =
			task.assignedUsers
				?.map((assignment: any) => userMap.get(assignment.userId))
				.filter(Boolean) || [];

		// Map tags
		const tags =
			task.tags
				?.map((taskTag: any) => tagMap.get(taskTag.tagId))
				.filter(Boolean) || [];

		// Map emojis with users
		const emojis =
			task.emojiTaskUsers?.map((emoji: any) => ({
				emoji: emoji.emoji,
				id: emoji.id,
				taskId: emoji.taskId,
				user: userMap.get(emoji.userId),
			})) || [];

		// Handle subtasks recursively if they exist
		const subtasks = task.subTasks
			? sortTasks(
					task.subTasks.map((subtask: any) =>
						this.mapTaskWithRelations(subtask, userMap, tagMap),
					),
				)
			: [];

		return {
			...task,
			owner,
			members,
			tags,
			subtasks,
			emojis,
		};
	}
}
