import { TasksModel } from "../models/tasks.model";
import {
	$Enums,
	TaskStatus,
	type PrismaClient,
	type Task,
} from "@prisma/client";
import { BaseService } from "../core/service.core";
import type Redis from "ioredis";
import { UserModel } from "../models/users.model";
import { TasksAssignmentModel } from "../models/tasks-assignment.model";
import { EmojiModel } from "../models/emoji.model";
import { TaskTagModel } from "../models/task-tag.model";
import { FilesModel } from "../models/files.model";
import { ActivityLogsModel } from "../models/activity-logs.model";
import { CommentModel } from "../models/comment.model";
import {
	NotFoundException,
	ValidationException,
	ServerErrorException,
	PermissionException,
} from "../core/exception.core";

export class TaskService extends BaseService<Task> {
	private readonly taskModel: TasksModel;
	private readonly userModel: UserModel;
	private readonly taskAssignmentModel: TasksAssignmentModel;
	private readonly emojiModel: EmojiModel;
	private readonly taskTagModel: TaskTagModel;
	private readonly fileModel: FilesModel;
	private readonly activitiesLogsModel: ActivityLogsModel;
	private readonly commentModel: CommentModel;

	constructor(prisma: PrismaClient, redis: Redis) {
		super(redis, 60); //
		this.taskModel = new TasksModel(prisma);
		this.userModel = new UserModel(prisma);
		this.emojiModel = new EmojiModel(prisma);
		this.taskAssignmentModel = new TasksAssignmentModel(prisma);
		this.taskTagModel = new TaskTagModel(prisma);
		this.fileModel = new FilesModel(prisma);
		this.activitiesLogsModel = new ActivityLogsModel(prisma);
		this.commentModel = new CommentModel(prisma);
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

	async getAllTask(): Promise<Task[]> {
		const cacheKey = "tasks:all";
		const cacheTasks = await this.getFromCache(cacheKey);
		if (cacheTasks) return cacheTasks as Task[];

		const tasks = await this.taskModel.findAll();
		await this.setToCache(cacheKey, tasks);
		return tasks;
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
			throw new NotFoundException("Task creator ID not found");
		const isUserExist = await this.userModel.findById(existingTask.createdById);
		if (!isUserExist) throw new NotFoundException("User not found");

		// Prepare the updated task object
		const updatedTask = {
			...existingTask,
			title,
			description,
		};

		// Invalidate caches
		await this.invalidateCache("tasks:all");
		await this.invalidateCache(`tasks:project:${existingTask.projectId}`);
		await this.invalidateCache(`tasks:parent:${existingTask.parentTaskId}`);

		// Update and return the task
		return await this.taskModel.update(taskId, updatedTask);
	}

	async createTask(task: Partial<Task>): Promise<Task> {
		if (!task.createdById)
			throw new ValidationException("No creator ID provided");
		if (!task.projectId)
			throw new ValidationException("No project ID provided");
		const isUserExist = await this.userModel.findById(task.createdById);
		if (!isUserExist) {
			throw new NotFoundException("User not found");
		}

		if (task.title !== null) {
			const newTask = {
				title: task.title,
				description: task.description,
				createdById: task.createdById,
				startDate: task.startDate,
				endDate: task.endDate,
				status: task.status,
				parentTaskId: task.parentTaskId !== "" ? task.parentTaskId : undefined,
				budget: task.budget,
				advance: task.advance,
				expense: task.expense,
				projectId: task.projectId,
			};
			await this.invalidateCache("tasks:all");
			await this.invalidateCache(`tasks:project:${task.projectId}`);
			await this.invalidateCache(`projects:${task.projectId}`);
			await this.invalidateCache(`tasks:parent:${task.parentTaskId}`);
			return await this.taskModel.create(newTask);
		}
		throw new ValidationException("Title cann't be null");
	}

	async getTaskByProjectId(projectIdId: string): Promise<Task[]> {
		const cacheKey = `tasks:project:${projectIdId}`;
		const cacheTask = await this.getFromCache(cacheKey);
		if (cacheTask) return cacheTask as Task[];
		const task = await this.taskModel.findByProjectId(projectIdId);
		if (!task) throw new NotFoundException("Task not found");
		await this.setToCache(cacheKey, task);
		return task;
	}

	async getTaskByParentTaskId(parentTaskId: string): Promise<Task[]> {
		const cacheKey = `tasks:parent:${parentTaskId}`;
		const cacheTask = await this.getFromCache(cacheKey);
		if (cacheTask) return cacheTask as Task[];

		const task = await this.taskModel.findByParentTaskId(parentTaskId);
		if (!task) throw new NotFoundException("Task not found");
		await this.setToCache(cacheKey, task);
		return task;
	}

	async getTaskById(taskId: string): Promise<Task> {
		const cacheKey = `tasks:${taskId}`;
		const cacheTask = await this.getFromCache(cacheKey);
		if (cacheTask) return cacheTask as Task;

		const task = await this.taskModel.findById(taskId);
		if (!task) throw new NotFoundException("Task not found");
		await this.setToCache(cacheKey, task);
		return task;
	}

	async deleteTask(taskId: string): Promise<Task> {
		const cacheKey = `tasks:${taskId}`;
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
			await this.taskModel.delete(taskId);
			await this.invalidateCache(cacheKey);
		} catch (_error) {
			throw new ServerErrorException(`Error deleting task with ID ${taskId}:`);
		}
		const projectId = task.projectId;
		await this.invalidateCache(`tasks:project:${projectId}`);
		return task;
	}

	async getTitleByTaskId(taskId: string): Promise<{ title: string }> {
		const task = await this.taskModel.findById(taskId);
		if (!task) throw new NotFoundException("Task not found");
		return {
			title: task.title,
		};
	}

	async getDescriptionByTaskId(
		taskId: string,
	): Promise<{ description: string }> {
		const task = await this.taskModel.findById(taskId);
		if (!task) throw new NotFoundException("Task not found");
		return {
			description: task.description,
		};
	}

	async updateTitleByTaskId(
		taskId: string,
		userId: string,
		title: string,
	): Promise<Task> {
		const isUserExist = await this.userModel.findById(userId);
		if (!isUserExist) throw new NotFoundException("User not found");

		const isTaskExist = await this.taskModel.findById(taskId);
		if (!isTaskExist) throw new NotFoundException("Task not found");

		if (isTaskExist.createdById !== userId)
			throw new PermissionException("You dont have permission to edit");

		const newTitle = {
			title: title,
		};
		const updateTitles = await this.taskModel.update(taskId, newTitle);
		return updateTitles;
	}

	async updateDescriptionByTaskId(
		taskId: string,
		userId: string,
		description: string,
	): Promise<Task> {
		const isUserExist = await this.userModel.findById(userId);
		if (!isUserExist) throw new NotFoundException("User not found");

		const isTaskExist = await this.taskModel.findById(taskId);
		if (!isTaskExist) throw new NotFoundException("Task not found");

		const taskAssignment = await this.taskAssignmentModel.findByTaskIdAndUserId(
			taskId,
			userId,
		);

		if (!taskAssignment && isTaskExist.createdById !== userId)
			throw new ServerErrorException("Unexpected error User not found");
		const newTitle = {
			description: description,
		};
		const updateDescription = await this.taskModel.update(taskId, newTitle);

		return updateDescription;
	}

	async getStatusByTaskId(taskId: string): Promise<TaskStatus> {
		const cacheKey = `status:${taskId}`;
		const cacheStatus = await this.getFromCache(cacheKey);
		if (cacheStatus) {
			const task = cacheStatus as Task;
			return task.status;
		}

		const isTaskExist = await this.taskModel.findById(taskId);
		if (!isTaskExist) throw new NotFoundException("Task not found");
		await this.setToCache(cacheKey, isTaskExist);
		const taskStatus = isTaskExist.status;
		return taskStatus;
	}

	async changeStatus(taskId: string, newTaskStatus: TaskStatus): Promise<Task> {
		const isTaskExist = await this.taskModel.findById(taskId);
		if (!isTaskExist) throw new NotFoundException("Task not found");

		const newStatus = { status: newTaskStatus };

		const subTasks = await this.taskModel.findSubTask(taskId);

		if (subTasks && subTasks.length > 0) {
			const getStatusValue = (status: String) => {
				let value = 5;
				if (status === "Unassigned") value = 0;
				if (status === "Assigned") value = 1;
				if (status === "UnderReview") value = 2;
				if (status === "InRecheck") value = 3;
				if (status === "Done") value = 4;
				return value;
			};
			let lowestSubTaskStatusValue = getStatusValue(subTasks[0].status);

			for (const subTask of subTasks) {
				const subTasksStatusValue = getStatusValue(subTask.status);
				if (subTasksStatusValue < lowestSubTaskStatusValue)
					lowestSubTaskStatusValue = subTasksStatusValue;
			}
			if (getStatusValue(newTaskStatus) > lowestSubTaskStatusValue)
				throw new PermissionException(
					"Cannot change status: Parent task status cannot exceed sub-task statuses.",
				);
		}

		const changedStatusTask = await this.taskModel.update(taskId, newStatus);

		const parentTask = await this.taskModel.findParentTask(taskId);
		if (parentTask && newTaskStatus === "Done") {
			const friendTask = await this.taskModel.findSubTask(parentTask.id);
			let isAllDone = true;
			if (friendTask) {
				for (const task of friendTask) {
					if (task.status !== "Done") isAllDone = false;
				}
			}
			if (isAllDone) this.taskModel.update(parentTask.id, newStatus);
		}
		await this.invalidateCache(`status:${taskId}`);
		return changedStatusTask;
	}

	async getRecursiveParentTaskList(taskId: string): Promise<Task[]> {
		const taskList: Task[] = [];
		const task = await this.taskModel.findById(taskId);
		if (!task) throw new NotFoundException("Task not found");

		let currentTask = task;
		taskList.push(currentTask);
		while (currentTask.parentTaskId) {
			const parentTask = await this.taskModel.findById(
				currentTask.parentTaskId,
			);
			if (!parentTask) break;
			taskList.push(parentTask);
			currentTask = parentTask;
		}

		return taskList.reverse();
	}

	async getParentTask(taskId: string): Promise<Task | null> {
		const task = await this.taskModel.findById(taskId);
		if (!task) throw new NotFoundException("Task not found");

		if (!task.parentTaskId) return null;

		const parentTask = await this.taskModel.findById(task.parentTaskId);
		if (!parentTask) throw new NotFoundException("Parent task not found");

		return parentTask;
	}

	async getDate(taskId: string): Promise<(Date | null)[]> {
		const task = await this.taskModel.findById(taskId);
		if (!task) throw new NotFoundException("Task not found");
		return [task.startDate, task.endDate];
	}

	async updateDate(
		taskID: string,
		startDate: Date | null,
		endDate: Date | null,
	): Promise<Task> {
		const task = await this.taskModel.findById(taskID);

		//First step check if task isn't exist
		if (!task) throw new NotFoundException("Task not found");

		//Second step update date that assign in.
		const updateDate = await this.taskModel.update(taskID, {
			startDate: startDate,
			endDate: endDate,
		});

		return updateDate;
	}
}
