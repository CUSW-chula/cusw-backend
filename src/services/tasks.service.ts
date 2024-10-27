import { TasksModel } from "../models/tasks.model";
import type {
	EmojiTaskUser,
	PrismaClient,
	Task,
	TaskAssignment,
	User,
} from "@prisma/client";
import { BaseService } from "../core/service.core";
import type Redis from "ioredis";
import { UserModel } from "../models/users.model";
import { TasksAssignmentModel } from "../models/tasks-assignment.model";
import { EmojiModel } from "../models/emoji.model";

export class TaskService extends BaseService<Task> {
	private readonly taskModel: TasksModel;
	private readonly userModel: UserModel;
	private readonly taskAssignmentModel: TasksAssignmentModel;
	private readonly emojiModel: EmojiModel;

	constructor(prisma: PrismaClient, redis: Redis) {
		super(redis, 60); //
		this.taskModel = new TasksModel(prisma);
		this.userModel = new UserModel(prisma);
		this.emojiModel = new EmojiModel(prisma);
		this.taskAssignmentModel = new TasksAssignmentModel(prisma);
	}

	async getAllTask(): Promise<Task[]> {
		const cacheKey = "tasks:all";
		const cacheTasks = await this.getFromCache(cacheKey);
		if (cacheTasks) return cacheTasks as Task[];

		const tasks = await this.taskModel.findAll();
		if (!tasks) throw new Error("Task not found");
		await this.setToCache(cacheKey, tasks);
		return tasks;
	}

	async getTaskById(taskId: string): Promise<Task> {
		const cacheKey = `tasks:${taskId}`;
		const cacheTask = await this.getFromCache(cacheKey);
		if (cacheTask) return cacheTask as Task;

		const task = await this.taskModel.findById(taskId);
		if (!task) throw new Error("Task not found");
		await this.setToCache(cacheKey, task);
		return task;
	}

	async getAsignUserInTaskByTaskId(taskId: string): Promise<User[]> {
		// Check if task exists
		const isTaskExist = await this.taskModel.findById(taskId);
		if (!isTaskExist) throw new Error("Task not found");

		// Retrieve task assignments
		const taskAssignments = await this.taskAssignmentModel.findByTaskId(taskId);
		if (!taskAssignments || taskAssignments.length === 0)
			throw new Error("No users assigned to this task");

		// Get all users assigned to the task concurrently
		const usersInTask = await Promise.all(
			taskAssignments.map(async (taskAssignment) => {
				const user = await this.userModel.findById(taskAssignment.userId);
				return user || null; // Return null if user not found
			}),
		);

		// Filter out any null results (users not found)
		return usersInTask.filter((user) => user !== null) as User[];
	}

	async assigningTaskToUser(
		taskId: string,
		userId: string,
	): Promise<TaskAssignment> {
		// First step check if user exists
		const isUserExist = await this.userModel.findById(userId);
		if (!isUserExist) throw new Error("User not found");

		// Second step check if task exists
		const isTaskExist = await this.taskModel.findById(taskId);
		if (!isTaskExist) throw new Error("Task not found");

		// Assigning userTaskAssignment
		const assignTaskToUser = await this.taskAssignmentModel.create({
			taskId: taskId,
			userId: userId,
		});
		return assignTaskToUser;
	}

	async unAssigningTaskToUser(
		taskId: string,
		userId: string,
	): Promise<TaskAssignment> {
		// First step check if user exists
		const isUserExist = await this.userModel.findById(userId);
		if (!isUserExist) throw new Error("User not found");

		// Second step check if task exists
		const isTaskExist = await this.taskModel.findById(taskId);
		if (!isTaskExist) throw new Error("Task not found");

		// Assigning userTaskAssignment
		const taskAssignment = await this.taskAssignmentModel.findByTaskIdAndUserId(
			taskId,
			userId,
		);
		if (!taskAssignment)
			throw new Error("Unexpected error tasks assignment not found");
		const unAssigningTaskToUser = await this.taskAssignmentModel.delete(
			taskAssignment.id,
		);
		return unAssigningTaskToUser;
	}
	async addEmojiOnTask(
		emoji: string,
		userId: string,
		taskId: string,
	): Promise<EmojiTaskUser> {
		const isUserExist = await this.userModel.findById(userId);
		if (!isUserExist) throw new Error("User not found");

		const isTaskExist = await this.taskModel.findById(taskId);
		if (!isTaskExist) throw new Error("Task not found");

		const taskAssignment = await this.taskAssignmentModel.findByTaskIdAndUserId(
			taskId,
			userId,
		);

		if (!taskAssignment) throw new Error("Unexpected error User not found");
		const addEmojiOnTask = await this.emojiModel.create({
			emoji: emoji,
			taskId: taskId,
			userId: userId,
		});

		return addEmojiOnTask;
	}
	async getAllEmojiByTaskId(taskId: string): Promise<EmojiTaskUser[]> {
		const isTaskExist = await this.taskModel.findById(taskId);
		if (!isTaskExist) throw new Error("Task not found");

		const emojiOnTasks = await this.emojiModel.findAllByTaskId(taskId);
		if (!emojiOnTasks || emojiOnTasks.length === 0)
			throw new Error("No emoji add to this task");
		return emojiOnTasks;
	}

	async updateEmojiByTaskId(
		id: string,
		newEmoji: string,
		userId: string,
		taskId: string,
	): Promise<EmojiTaskUser> {
		const isUserExist = await this.userModel.findById(userId);
		if (!isUserExist) {
			throw new Error("User not found");
		}
		const isTaskExist = await this.taskModel.findById(taskId);
		if (!isTaskExist) throw new Error("Task not found");

		const emojis = await this.emojiModel.findById(id);
		if (!emojis) throw new Error("emoji not found");

		if (userId !== emojis.userId) throw new Error("This is not your emoji");

		const newEmojis: EmojiTaskUser = {
			id: emojis.id,
			emoji: newEmoji,
			taskId: emojis.taskId,
			userId: emojis.userId,
		};
		const updatedEmoji = await this.emojiModel.update(id, newEmojis);
		return updatedEmoji;
	}
}
