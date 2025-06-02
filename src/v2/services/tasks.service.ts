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

		const tasks = await this.taskModel.findAll();
		const tasksWithDetail = await Promise.all(
			tasks.map(async (task) => {
				return await this.getTaskById(task.id);
			}),
		);
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
			await this.taskModel.update(taskId, updatedTask);
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
		const isUserExist = await this.userModel.findById(task.createdById);
		if (!isUserExist) {
			throw new NotFoundException("User not found");
		}

		if (task.title !== null) {
			let statusBudget: $Enums.BudgetStatus = BudgetStatus.Initial;
			if (task.parentTaskId) {
				const parentTask = await this.taskModel.findById(task.parentTaskId);
				if (
					parentTask?.statusBudgets === BudgetStatus.Added ||
					parentTask?.statusBudgets === BudgetStatus.ParentTaskAdded
				) {
					statusBudget = BudgetStatus.ParentTaskAdded;
				}
			}
			const newTask = {
				title: task.title,
				description: task.description,
				createdById: task.createdById,
				startDate: task.startDate,
				endDate: task.endDate,
				status: task.status,
				parentTaskId: task.parentTaskId !== "" ? task.parentTaskId : undefined,
				position: task.position,
				budget: task.budget,
				advance: task.advance,
				expense: task.expense,
				statusBudgets: statusBudget,
				projectId: task.projectId,
			};
			await this.invalidateAllCache("projects", "tasks");
			const createdTask = await this.taskModel.create(newTask);

			// Update project money
			const existingProject = await this.projectModel.findById(task.projectId);
			if (!existingProject) {
				throw new ValidationException("Project cann't found");
			}
			const updatedProject = {
				...existingProject,
				budget: existingProject.budget + (task.budget ?? 0),
				advance: existingProject.advance + (task.advance ?? 0),
				expense: existingProject.expense + (task.expense ?? 0),
			};
			// Invalidate caches
			await this.invalidateAllCache("projects", "tasks");

			await this.projectModel.update(task.projectId, updatedProject);

			return await this.getTaskById(createdTask.id);
		}
		throw new ValidationException("Title cann't be null");
	}

	async getTaskByUserId(userId: string): Promise<Task[]> {
		const tasks = await this.taskAssignmentModel.findByUserId(userId);
		if (!tasks) [];

		const tasksWithDetail = await Promise.all(
			tasks.map(async (task) => {
				return await this.getTaskById(task.taskId);
			}),
		);
		// console.info("tasksWithDetail",tasksWithDetail)
		return tasksWithDetail;
	}

	async getTaskByProjectId(projectIdId: string): Promise<Task[]> {
		const tasks = await this.taskModel.findByProjectId(projectIdId);
		if (!tasks) [];
		const tasksWithDetail = await Promise.all(
			tasks.map(async (task) => {
				return await this.getTaskById(task.id);
			}),
		);
		return tasksWithDetail;
	}

	async getTaskByParentTaskId(parentTaskId: string): Promise<Task[]> {
		const tasks = await this.taskModel.findByParentTaskId(parentTaskId);
		if (!tasks) throw new NotFoundException("Task not found");
		const tasksWithDetail = await Promise.all(
			tasks.map(async (task) => {
				return await this.getTaskById(task.id);
			}),
		);
		return tasksWithDetail;
	}

	async getTaskById(taskId: string): Promise<Task> {
		const cacheKey = this.getTagCacheKey(taskId);
		const cacheTask = await this.getFromCache(cacheKey);
		if (cacheTask) cacheTask as Task;

		const task = await this.taskModel.findById(taskId);
		if (!task) throw new NotFoundException("Task not found");

		const owner = await this.userModel.findById(task.createdById ?? "");
		const membersAssignment = await this.taskAssignmentModel.findByTaskId(
			task.id,
		);
		const members = membersAssignment
			? await Promise.all(
					membersAssignment.map(async (member) => {
						return await this.userModel.findById(member.userId);
					}),
				)
			: [];
		const tagsInTask = await this.taskTagModel.findByTaskId(task.id);
		const tags = tagsInTask
			? await Promise.all(
					tagsInTask.map(async (tag) => {
						return await this.tagModel.findById(tag.tagId);
					}),
				)
			: [];
		const _subtasks = await this.taskModel.findSubTask(task.id);
		const subtasks = _subtasks
			? await Promise.all(
					_subtasks.map(async (subtask) => {
						const task = await this.getTaskById(subtask.id);
						return task;
					}),
				)
			: [];
		const _emojis = await this.emojiModel.findAllByTaskId(task.id);
		const emojis: Emoji[] = await Promise.all(
			_emojis.flat().map(async (emoji) => {
				const user = await this.userModel.findById(emoji.userId);
				return {
					emoji: emoji.emoji,
					id: emoji.id,
					taskId: emoji.taskId,
					user: user,
				};
			}),
		);
		const taskWithDetail = {
			...task,
			owner,
			members,
			tags,
			subtasks,
			emojis,
		};
		await this.setToCache(cacheKey, taskWithDetail);
		return taskWithDetail;
	}

	async deleteTask(taskId: string): Promise<Task> {
		const task = await this.taskModel.findById(taskId);
		if (!task) throw new NotFoundException("Task not found");
		try {
			//   Step 1: Find all direct sub-tasks of the current task
			const subTasks = await this.taskModel.findSubTask(taskId);

			// Step 2: Recursively delete each sub-task (bottom-up)
			if (subTasks && subTasks.length > 0) {
				for (const subTask of subTasks) {
					await this.deleteTask(subTask.id);
				}
			}

			//   Step 3: Delete the main task after all sub-tasks are deleted
			await this.taskAssignmentModel.deleteByTaskId(taskId);
			await this.taskTagModel.deleteByTaskId(taskId);
			await this.emojiModel.deleteByTaskId(taskId);
			await this.fileModel.deleteByTaskId(taskId);
			await this.activitiesLogsModel.deleteByTaskId(taskId);
			await this.commentModel.deleteByTaskId(taskId);
			const task = await this.getTaskById(taskId);
			await this.taskModel.delete(taskId);
			await this.invalidateAllCache("projects", "tasks");

			// Step 4: update project money
			const existingProject = await this.projectModel.findById(task.projectId);
			if (!existingProject)
				throw new ValidationException("Project cann't found");
			const updatedProject = {
				...existingProject,
				budget: existingProject.budget - (task.budget ?? 0),
				advance: existingProject.advance - (task.advance ?? 0),
				expense: existingProject.expense - (task.expense ?? 0),
			};
			// Invalidate caches

			await this.invalidateAllCache("projects", "tasks");
			// Update Project Money
			await this.projectModel.update(task.projectId, updatedProject);

			return task;
		} catch (_error) {
			throw new ServerErrorException(`Error deleting task with ID ${taskId}:`);
		}
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
		const taskList: Task[] = [];
		const task = await this.getTaskById(taskId);
		if (!task) throw new NotFoundException("Task not found");

		let currentTask = task;
		taskList.push(currentTask);
		while (currentTask.parentTaskId) {
			const parentTask = await this.getTaskById(currentTask.parentTaskId);
			if (!parentTask) break;
			taskList.push(parentTask);
			currentTask = parentTask;
		}

		return taskList.reverse();
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
		parentPosition?: string, // Add parent position for hierarchical numbering
	): Promise<Task[]> {
		const newTasks: Task[] = [];
		for (let i = 0; i < templateTask.length; i++) {
			const task = templateTask[i];
			const position = parentPosition
				? `${parentPosition}.${i + 1}`
				: `${i + 1}`;
			const newTask = await this.createTaskFromTemplate(
				task,
				userId,
				projectId,
				position, // Pass the calculated position
			);

			await this.invalidateAllCache("tasks");
			newTasks.push(newTask);
			if (task.subtasks) {
				const subtasks = await this.createTaskWithSubTaskRecursive(
					task.subtasks,
					userId,
					projectId,
					position, // Pass current task's position as parent position for subtasks
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
		parentPosition?: string, // Add parent position for hierarchical numbering
	): Promise<Task[]> {
		const newTasks: Task[] = [];
		for (let i = 0; i < templateTask.length; i++) {
			const task = templateTask[i];
			const position = parentPosition
				? `${parentPosition}.${i + 1}`
				: `${i + 1}`;
			const newTask = await this.createTaskFromTemplate(
				task,
				userId,
				projectId,
				position, // Pass the calculated position
			);

			await this.invalidateAllCache("tasks");
			newTasks.push(newTask);
			if (task.subtasks) {
				const subtasks = await this.createTaskForDuplicate(
					task.subtasks,
					userId,
					projectId,
					position, // Pass current task's position as parent position for subtasks
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
				await this.taskModel.update(parentTask.id, {
					parentTaskId: templateTask[0].parentTaskId,
				});
			}
		}
		return newTasks;
	}

	async createTaskFromTemplate(
		templateTask: Task,
		userId: string,
		projectId: string,
		position: string, // Add position parameter
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
			position: position, // Add position to the new task
		};

		const response = await this.createTask(newTask);

		for (const tag of templateTask.tags) {
			if (tag) {
				this.tagService.assigningTagToTask(response.id, tag.id, userId);
			}
		}

		return response;
	}
}
