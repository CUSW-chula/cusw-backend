import { TasksModel } from "../models/tasks.model";
import type {
	$Enums,
	PrismaClient,
	Task,
	TaskAssignment,
	User,
} from "@prisma/client";
import { BaseService } from "../core/service.core";
import type Redis from "ioredis";
import { UserModel } from "../models/users.model";
import { TasksAssignmentModel } from "../models/tasks-assignment.model";

export class TaskService extends BaseService<Task> {
	private readonly taskModel: TasksModel;
	private readonly userModel: UserModel;
	private readonly taskAssignmentModel: TasksAssignmentModel;

	constructor(prisma: PrismaClient, redis: Redis) {
		super(redis, 60); //
		this.taskModel = new TasksModel(prisma);
		this.userModel = new UserModel(prisma);
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

	async getTaskByProjectId(projectIdId: string): Promise<Task[]> {
		const cacheKey = `tasks:project:${projectIdId}`;
		const cacheTask = await this.getFromCache(cacheKey);
		if (cacheTask) return cacheTask as Task[];

		const task = await this.taskModel.findByProjectId(projectIdId);
		if (!task) throw new Error("Task not found");
		await this.setToCache(cacheKey, task);
		return task;
	}

	async getTaskByParentTaskId(parentTaskId: string): Promise<Task[]> {
		const cacheKey = `tasks:parent:${parentTaskId}`;
		const cacheTask = await this.getFromCache(cacheKey);
		if (cacheTask) return cacheTask as Task[];

		const task = await this.taskModel.findByParentTaskId(parentTaskId);
		if (!task) throw new Error("Task not found");
		await this.setToCache(cacheKey, task);
		return task;
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

	async createTask(
		title: string,
		description: string,
		projectId: string,
		parentTaskId: string | null,
		startDate: Date,
		endDate: Date,
		createdById: string,
		status: $Enums.TaskStatus,
		expectedBudget: number,
		realBudget: number,
		usedBudget: number,
	): Promise<Task> {
		const isUserExist = await this.userModel.findById(createdById);
		if (!isUserExist) {
			throw new Error("User not found");
		}

		if (title !== null) {
			const newTask = {
				title: title,
				description: description,
				createdById: createdById,
				startDate: startDate,
				endDate: endDate,
				status: status,
				parentTaskId: parentTaskId !== "" ? parentTaskId : undefined,
				expectedBudget: expectedBudget,
				usedBudget: usedBudget,
				realBudget: realBudget,
				projectId: projectId,
			};
			await this.invalidateCache("tasks:all");
			await this.invalidateCache(`tasks:project:${projectId}`);
			await this.invalidateCache(`tasks:parent:${parentTaskId}`);
			return await this.taskModel.create(newTask);
		}
		throw new Error("Title cann't be null");
	}
}
