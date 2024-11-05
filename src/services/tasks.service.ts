import { TasksModel } from "../models/tasks.model";
import {
	BudgetStatus,
	type PrismaClient,
	type Task,
	type TaskAssignment,
	type User,
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
		if (!areAllBudgetsEmptyOrZero([task.budget, task.expense, task.advance])) {
			const updateMoney = await this.taskModel.update(taskID, {
				budget: budget,
				advance: advance,
				expense: expense,
			});
			return updateMoney;
		}

		//Third step check if input money isn't only one value
		if (!isOneBudgetValue(budgetList))
			throw new Error("Only one budget value should be present.");

		//Fourth step check if another task aleady have budget value
		if (
			task.statusBudgets === BudgetStatus.ParentTaskAdded ||
			task.statusBudgets === BudgetStatus.SubTasksAdded
		)
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

	//   async updateMoney(
	//     taskID: string,
	//     budget: number,
	//     advance: number,
	//     expense: number
	//   ): Promise<Task> {
	//     const task = await this.taskModel.findById(taskID);
	//     if (!task) throw new Error("Task not found");

	//     if (task.statusBudgets !== BudgetStatus.Added)
	//       throw new Error("Task wasn't assigned");

	//     const updateMoney = await this.taskModel.update(taskID, {
	//       budget: budget,
	//       advance: advance,
	//       expense: expense,
	//     });
	//     return updateMoney;
	//   }

	async deleteMoney(
		taskID: string,
		budget: number,
		advance: number,
		expense: number,
	): Promise<Task> {
		const task = await this.taskModel.findById(taskID);
		const setStatusBudgets = async () => {
			//set the subTaks to be initial
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
			//check if the subTask has a status of Added or SubTasksAdded
			const isSubTaskAdded = async (taskID: string) => {
				const task = await this.taskModel.findById(taskID);
				const subTasks = await this.taskModel.findSubTask(taskID);
				if (subTasks !== null) {
					for (const task of subTasks) {
						if (
							task.statusBudgets === BudgetStatus.Added ||
							task.statusBudgets === BudgetStatus.SubTasksAdded
						) {
							return true;
						}
					}
				}
				return false;
			};

			if (task === null) return;

			//set this task
			this.taskModel.update(task.id, { statusBudgets: BudgetStatus.Initial });

			//set subtasks
			setSubtasks(taskID);

			//set parent task
			let parentId = task.parentTaskId;
			while (parentId) {
				const subTaskAdded = await isSubTaskAdded(parentId);
				if (!subTaskAdded) {
					this.taskModel.update(parentId, {
						statusBudgets: BudgetStatus.Initial,
					});
				}

				const parentTask = await this.taskModel.findById(parentId);
				parentId = parentTask?.parentTaskId ?? null;
			}
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
