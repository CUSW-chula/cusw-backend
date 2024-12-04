import { BudgetStatus, PrismaClient, Task } from "@prisma/client";
import { TaskService } from "../tasks.service";
import Redis from "ioredis";

export class MoneyClassService extends TaskService {
	constructor(prisma: PrismaClient, redis: Redis) {
		super(prisma, redis);
	}

	async getMoney(taskId: string): Promise<number[]> {
		const task = await this.getTaskModel().findById(taskId);
		if (!task) throw new Error("Task not found");
		return [task.budget, task.advance, task.expense];
	}

	async getAllMoney(taskId: string): Promise<number[]> {
		const task = await this.getTaskModel().findById(taskId);
		if (!task) throw new Error("Task not found");
		let sum = [task.budget, task.advance, task.expense];

		//sum budget from subTasks
		const subTask = async (taskId: string) => {
			const subTasks = await this.getTaskModel().findSubTask(taskId);
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
		const task = await this.getTaskModel().findById(taskID);
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
				const subTasks = await this.getTaskModel().findSubTask(taskID);
				if (subTasks !== null) {
					subTasks.forEach(({ id }) => {
						this.getTaskModel().update(id, {
							statusBudgets: BudgetStatus.ParentTaskAdded,
						});
						setSubTasks(id);
					});
				}
			};

			if (task === null) return;

			//set this task
			this.getTaskModel().update(task.id, {
				statusBudgets: BudgetStatus.Added,
			});

			//set parent task
			let parentId = task.parentTaskId;
			while (parentId) {
				this.getTaskModel().update(parentId, {
					statusBudgets: BudgetStatus.SubTasksAdded,
				});
				const parentTask = await this.getTaskModel().findById(parentId);
				parentId = parentTask?.parentTaskId ?? null;
			}
			//set subtasks
			setSubTasks(taskID);
		};

		//First step check if task isn't exist
		if (!task) throw new Error("Task not found");

		//Second step check if task money isn't empty
		if (!areAllBudgetsEmptyOrZero([task.budget, task.expense, task.advance])) {
			const updateMoney = await this.getTaskModel().update(taskID, {
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

		const addMoney = await this.getTaskModel().update(taskID, {
			budget: budget,
			advance: advance,
			expense: expense,
		});
		setStatusBudgets();
		return addMoney;
	}

	async deleteMoney(
		taskID: string,
		budget: number,
		advance: number,
		expense: number,
	): Promise<Task> {
		const task = await this.getTaskModel().findById(taskID);
		const setStatusBudgets = async () => {
			//set the subTaks to be initial
			const setSubtasks = async (taskID: string) => {
				const subTasks = await this.getTaskModel().findSubTask(taskID);
				if (subTasks !== null) {
					subTasks.forEach(({ id }) => {
						this.getTaskModel().update(id, {
							statusBudgets: BudgetStatus.Initial,
						});
						setSubtasks(id);
					});
				}
			};
			//check if the subTask has a status of Added or SubTasksAdded
			const isSubTaskAdded = async (taskID: string) => {
				const subTasks = await this.getTaskModel().findSubTask(taskID);
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
			this.getTaskModel().update(task.id, {
				statusBudgets: BudgetStatus.Initial,
			});

			//set subtasks
			setSubtasks(taskID);

			//set parent task
			let parentId = task.parentTaskId;
			while (parentId) {
				const subTaskAdded = await isSubTaskAdded(parentId);
				if (!subTaskAdded) {
					this.getTaskModel().update(parentId, {
						statusBudgets: BudgetStatus.Initial,
					});
				}

				const parentTask = await this.getTaskModel().findById(parentId);
				parentId = parentTask?.parentTaskId ?? null;
			}
		};

		if (!task) {
			throw new Error("Task not found");
		}
		if (task.statusBudgets !== BudgetStatus.Added) {
			throw new Error("Task wasn't assigned");
		}
		const updateMoney = await this.getTaskModel().update(taskID, {
			budget: budget,
			advance: advance,
			expense: expense,
		});
		setStatusBudgets();
		return updateMoney;
	}
}
