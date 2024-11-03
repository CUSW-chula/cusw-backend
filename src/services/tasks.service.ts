import { TasksModel } from "../models/tasks.model";
import {
	BudgetStatus,
	type EmojiTaskUser,
	type PrismaClient,
	type Task,
	type TaskAssignment,
	type User,
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

	async getTexteditByTaskId(
		taskId: string,
	): Promise<{ title: string; description: string }> {
		const task = await this.taskModel.findById(taskId);
		if (!task) throw new Error("Task not found");
		return {
			title: task.title,
			description: task.description,
		};
	}

	async updateTexteditByTaskId(
		taskId: string,
		userId: string,
		title: string,
		description: string,
	): Promise<Task> {
		const isUserExist = await this.userModel.findById(userId);
		if (!isUserExist) throw new Error("User not found");

		const isTaskExist = await this.taskModel.findById(taskId);
		if (!isTaskExist) throw new Error("Task not found");

		const taskAssignments = await this.taskAssignmentModel.findByTaskId(taskId);
		if (!taskAssignments || taskAssignments.length === 0)
			throw new Error("No users assigned to this task");

		const newTextedit = {
			title: title,
			description: description,
		};
		const newText = await this.taskModel.update(taskId, newTextedit);
		return newText;
	}

	async addTexteditOnTask(
		taskId: string,
		userId: string,
		title: string,
		description: string,
	): Promise<Task> {
		const isUserExist = await this.userModel.findById(userId);
		if (!isUserExist) throw new Error("User not found");

		const isTaskExist = await this.taskModel.findById(taskId);
		if (!isTaskExist) throw new Error("Task not found");

		const taskAssignment = await this.taskAssignmentModel.findByTaskIdAndUserId(
			taskId,
			userId,
		);

		if (!taskAssignment) throw new Error("Unexpected error User not found");
		const addTexteditOnTask = await this.taskModel.update(taskId, {
			title: title,
			description: description,
		});

		return addTexteditOnTask;
	}

	async checkTextUserIdAndByTaskId(
		taskId: string,
		userId: string,
	): Promise<Boolean> {
		const isUserExist = await this.userModel.findById(userId);
		if (!isUserExist) {
			throw new Error("User not found");
		}
		const isTaskExist = await this.taskModel.findById(taskId);
		if (!isTaskExist) throw new Error("Task not found");

		const emojis = await this.emojiModel.findByUserIdAndTaskId(userId, taskId);

		if (emojis === null) return false;
		else return true;
	}

	async getAsignUserInTaskByTaskId(taskId: string): Promise<User[]> {
		// Check if task exists
		const isTaskExist = await this.taskModel.findById(taskId);
		if (!isTaskExist) throw new Error("Task not found");

		// Retrieve task assignments
		const taskAssignments = await this.taskAssignmentModel.findByTaskId(taskId);
		if (!taskAssignments || taskAssignments.length === 0)
			throw new Error("Did not assigned");

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

		const emojis = await this.emojiModel.findByUserIdAndTaskId(userId, taskId);
		if (!emojis) throw new Error("emoji not found");

		if (userId !== emojis.userId) throw new Error("This is not your emoji");

		const newEmojis = {
			emoji: newEmoji,
			taskId: emojis.taskId,
			userId: emojis.userId,
		};
		const updatedEmoji = await this.emojiModel.update(emojis.id, newEmojis);
		return updatedEmoji;
	}

	async checkEmojiUserIdAndByTaskId(
		taskId: string,
		userId: string,
	): Promise<Boolean> {
		const isUserExist = await this.userModel.findById(userId);
		if (!isUserExist) {
			throw new Error("User not found");
		}
		const isTaskExist = await this.taskModel.findById(taskId);
		if (!isTaskExist) throw new Error("Task not found");

		const emojis = await this.emojiModel.findByUserIdAndTaskId(userId, taskId);

		if (emojis === null) return false;
		else return true;
	}

	async getMoney(taskId: string): Promise<number[]> {
		const task = await this.taskModel.findById(taskId);
		if (!task) throw new Error("Task not found");
		return [task.budget, task.advance, task.expense];
	}

	async getAllMoney(taskId: string): Promise<number[]> {
		const task = await this.taskModel.findById(taskId);
		if (!task) throw new Error("Task not found");
		let sum = [task.budget, task.advance, task.expense];

		//sum budget from subTasks
		const subTask = async (taskId: string) => {
			const subTasks = await this.taskModel.findSubTask(taskId);
			if (subTasks === null) return null;
			for (const task of subTasks) {
				if (
					task.statusBudgets === BudgetStatus.Added ||
					BudgetStatus.SubTasksAdded
				) {
					sum = sum.map(
						(val, index) =>
							val + [task.budget, task.advance, task.expense][index],
					);
					await subTask(task.id);
				}
			}
		};

		await subTask(taskId);
		return sum;
	}

	async addMoney(
		taskID: string,
		budget: number,
		advance: number,
		expense: number,
	): Promise<Task> {
		const budgetList = [budget, advance, expense];
		const task = await this.taskModel.findById(taskID);
		// Check if all values are either null, undefined, or 0
		const areAllBudgetsEmptyOrZero = (
			budgetList: (number | undefined)[],
		): boolean => {
			return budgetList.every((budget) => budget === 0);
		};
		// Check is it have only one value
		const isOneBudgetValue = (budgetList: number[]): boolean => {
			const definedBudgets = budgetList.filter(
				(budget) => budget !== null && budget !== 0,
			);
			return definedBudgets.length === 1;
		};
		// Check status budget
		const setStatusBudgets = async () => {
			//setSubTasks
			const setSubTasks = async (taskID: string) => {
				const subTasks = await this.taskModel.findSubTask(taskID);
				if (subTasks !== null) {
					subTasks.forEach(({ id }) => {
						this.taskModel.update(id, {
							statusBudgets: BudgetStatus.ParentTaskAdded,
						});
						setSubTasks(id);
					});
				}
			};

			if (task === null) return;

			//set this task
			this.taskModel.update(task.id, { statusBudgets: BudgetStatus.Added });

			//set parent task
			let parentId = task.parentTaskId;
			while (parentId) {
				this.taskModel.update(parentId, {
					statusBudgets: BudgetStatus.SubTasksAdded,
				});
				const parentTask = await this.taskModel.findById(parentId);
				parentId = parentTask?.parentTaskId ?? null;
			}
			//set subtasks
			setSubTasks(taskID);
		};

		//First step check if task isn't exist
		if (!task) throw new Error("Task not found");

		//Second step check if task money isn't empty
		if (!areAllBudgetsEmptyOrZero([task.budget, task.expense, task.advance]))
			throw new Error("Budget are not empty.");

		//Third step check if input money isn't only one value
		if (!isOneBudgetValue(budgetList))
			throw new Error("Only one budget value should be present.");

		//Fourth step check if another task aleady have budget value
		if (task.statusBudgets !== BudgetStatus.Initial)
			throw new Error(
				"The parent task or subtask already has an assigned budget.",
			);

		const addMoney = await this.taskModel.update(taskID, {
			budget: budget,
			advance: advance,
			expense: expense,
		});
		setStatusBudgets();
		return addMoney;
	}

	async updateMoney(
		taskID: string,
		budget: number,
		advance: number,
		expense: number,
	): Promise<Task> {
		const task = await this.taskModel.findById(taskID);
		if (!task) throw new Error("Task not found");

		if (task.statusBudgets !== BudgetStatus.Added)
			throw new Error("Task wasn't assigned");

		const updateMoney = await this.taskModel.update(taskID, {
			budget: budget,
			advance: advance,
			expense: expense,
		});
		return updateMoney;
	}

	async deleteMoney(
		taskID: string,
		budget: number,
		advance: number,
		expense: number,
	): Promise<Task> {
		const task = await this.taskModel.findById(taskID);
		const setStatusBudgets = async () => {
			const setSubtasks = async (taskID: string) => {
				const subTasks = await this.taskModel.findSubTask(taskID);
				if (subTasks !== null) {
					subTasks.forEach(({ id }) => {
						this.taskModel.update(id, {
							statusBudgets: BudgetStatus.Initial,
						});
						setSubtasks(id);
					});
				}
			};

			if (task === null) return;

			//set this task
			this.taskModel.update(task.id, { statusBudgets: BudgetStatus.Initial });

			//set parent task
			let parentId = task.parentTaskId;
			while (parentId) {
				this.taskModel.update(parentId, {
					statusBudgets: BudgetStatus.Initial,
				});
				const parentTask = await this.taskModel.findById(parentId);
				parentId = parentTask?.parentTaskId ?? null;
			}
			//set subtasks
			setSubtasks(taskID);
		};
		if (!task) {
			throw new Error("Task not found");
		}
		if (task.statusBudgets !== BudgetStatus.Added) {
			throw new Error("Task wasn't assigned");
		}
		const updateMoney = await this.taskModel.update(taskID, {
			budget: budget,
			advance: advance,
			expense: expense,
		});
		setStatusBudgets();
		return updateMoney;
	}
}
