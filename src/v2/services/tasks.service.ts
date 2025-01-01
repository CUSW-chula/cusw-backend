import { TasksModel } from "../models/tasks.model";
import { $Enums, TaskStatus, type PrismaClient } from "@prisma/client";
import { BaseService } from "../../core/service.core";
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
} from "../../core/exception.core";
import { Task } from "../../shared/interfaces.shared";
import { TagModel } from "../models/tag.model";

export class TaskService extends BaseService<Task> {
	private readonly taskModel: TasksModel;
	private readonly userModel: UserModel;
	private readonly taskAssignmentModel: TasksAssignmentModel;
	private readonly emojiModel: EmojiModel;
	private readonly tagModel: TagModel;
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
		this.tagModel = new TagModel(prisma);
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
		const tasksWithDetail = await Promise.all(
			tasks.map(async (task) => {
				const creator = await this.userModel.findById(task.createdById ?? "");
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
				return { ...task, creator, members, tags, subtasks };
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
		try {
			await this.taskModel.update(taskId, updatedTask);
			return await this.getTaskById(taskId);
		} catch (_error) {
			throw new ServerErrorException(`Error updating task with ID ${taskId}:`);
		}
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
			const createdTask = await this.taskModel.create(newTask);
			return await this.getTaskById(createdTask.id);
		}
		throw new ValidationException("Title cann't be null");
	}

	async getTaskByProjectId(projectIdId: string): Promise<Task[]> {
		const cacheKey = `tasks:project:${projectIdId}`;
		const cacheTask = await this.getFromCache(cacheKey);
		if (cacheTask) return cacheTask as Task[];
		const tasks = await this.taskModel.findByProjectId(projectIdId);
		if (!tasks) throw new NotFoundException("Task not found");
		const tasksWithDetail = await Promise.all(
			tasks.map(async (task) => {
				const creator = await this.userModel.findById(task.createdById ?? "");
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
				return { ...task, creator, members, tags, subtasks };
			}),
		);
		await this.setToCache(cacheKey, tasksWithDetail);
		return tasksWithDetail;
	}

	async getTaskByParentTaskId(parentTaskId: string): Promise<Task[]> {
		const cacheKey = `tasks:parent:${parentTaskId}`;
		const cacheTask = await this.getFromCache(cacheKey);
		if (cacheTask) return cacheTask as Task[];

		const tasks = await this.taskModel.findByParentTaskId(parentTaskId);
		if (!tasks) throw new NotFoundException("Task not found");
		const tasksWithDetail = await Promise.all(
			tasks.map(async (task) => {
				const creator = await this.userModel.findById(task.createdById ?? "");
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

				return { ...task, creator, members, tags, subtasks };
			}),
		);
		await this.setToCache(cacheKey, tasksWithDetail);
		return tasksWithDetail;
	}

	async getTaskById(taskId: string): Promise<Task> {
		const cacheKey = `tasks:${taskId}`;
		const cacheTask = await this.getFromCache(cacheKey);
		if (cacheTask) return cacheTask as Task;

		const task = await this.taskModel.findById(taskId);
		if (!task) throw new NotFoundException("Task not found");

		const creator = await this.userModel.findById(task.createdById ?? "");
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
		const taskWithDetail = { ...task, creator, members, tags, subtasks };
		await this.setToCache(cacheKey, taskWithDetail);
		return taskWithDetail;
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
			const task = await this.getTaskById(taskId);
			await this.taskModel.delete(taskId);
			await this.invalidateCache(cacheKey);
			const projectId = task.projectId;
			await this.invalidateCache(`tasks:project:${projectId}`);
			return task;
		} catch (_error) {
			throw new ServerErrorException(`Error deleting task with ID ${taskId}:`);
		}
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

		const updatedTask = await this.taskModel.update(taskId, newStatus);

		const parentTask = await this.taskModel.findParentTask(taskId);
		if (parentTask && newTaskStatus === "Done") {
			const friendTask = await this.taskModel.findSubTask(parentTask.id);
			let isAllDone = true;
			if (friendTask) {
				for (const task of friendTask) {
					if (task.status !== "Done") isAllDone = false;
				}
			}
			if (isAllDone) await this.taskModel.update(parentTask.id, newStatus);
		}
		await this.invalidateCache(`status:${taskId}`);
		return this.getTaskById(updatedTask.id);
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

	async getParentTask(taskId: string): Promise<Task | null> {
		const task = await this.taskModel.findById(taskId);
		if (!task) throw new NotFoundException("Task not found");

		if (!task.parentTaskId) return null;

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
		await this.invalidateCache(`tasks:${taskId}`);
		return this.getTaskById(updatedTask.id);
	}
}
