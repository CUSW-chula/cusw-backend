import { BudgetStatus, PrismaClient } from "@prisma/client";
import { TaskService } from "../tasks.service";
import Redis from "ioredis";
import {
	NotFoundException,
	ValidationException,
} from "../../../core/exception.core";
import { Task } from "../../../shared/interfaces.shared";

export class MoneyClassService extends TaskService {
	constructor(prisma: PrismaClient, redis: Redis) {
		super(prisma, redis);
	}

	async clearCache(taskID: string, projectID: string) {
		await this.invalidateCache(`tasks:${taskID}`);
		await this.invalidateCache(`tasks:project:${projectID}`);
		await this.invalidateCache(`projects:${projectID}`);
		await this.invalidateCache("projects:all");
	}

	async getMoney(taskId: string): Promise<number[]> {
		const task = await this.getTaskModel().findById(taskId);
		if (!task) throw new NotFoundException("Task not found");
		return [task.budget, task.advance, task.expense];
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
		if (!task) throw new NotFoundException("Task not found");
		//Second step check if input money isn't only one value
		else if (!isOneBudgetValue(budgetList))
			throw new ValidationException("Only one budget value should be present.");
		//Third step check if another task aleady have budget value
		else if (
			task.statusBudgets === BudgetStatus.ParentTaskAdded ||
			task.statusBudgets === BudgetStatus.SubTasksAdded
		)
			throw new ValidationException(
				"The parent task or subtask already has an assigned budget.",
			);
		//Fourth step check if task money isn't empty
		else if (
			!areAllBudgetsEmptyOrZero([task.budget, task.expense, task.advance])
		) {
			//update money
			const updateMoney = await this.getTaskModel().update(taskID, {
				budget: budget,
				advance: advance,
				expense: expense,
			});
			const existingProject = await this.getProjectModel().findById(
				task.projectId,
			);
			if (!existingProject) {
				throw new ValidationException("Project cann't found");
			}
			const updatedProject = {
				...existingProject,
				budget: existingProject.budget - (task.budget ?? 0) + budget,
				advance: existingProject.advance - (task.advance ?? 0) + advance,
				expense: existingProject.expense - (task.expense ?? 0) + expense,
			};
			this.updateProjectModel(task.projectId, updatedProject);

			this.clearCache(task.id, task.projectId);

			await this.getTaskById(taskID);
			return await this.getTaskById(updateMoney.id);
		}

		const addMoney = await this.getTaskModel().update(taskID, {
			budget: budget,
			advance: advance,
			expense: expense,
		});

		const existingProject = await this.getProjectModel().findById(
			task.projectId,
		);
		if (!existingProject) {
			throw new ValidationException("Project cann't found");
		}
		const updatedProject = {
			...existingProject,
			budget: existingProject.budget + budget,
			advance: existingProject.advance + advance,
			expense: existingProject.expense + expense,
		};
		// Invalidate caches
		this.clearCache(task.id, task.projectId);

		// Update Project Money
		this.updateProjectModel(task.projectId, updatedProject);

		setStatusBudgets();
		return await this.getTaskById(addMoney.id);
	}

	async deleteMoney(
		taskID: string,
		budget: number,
		advance: number,
		expense: number,
	): Promise<Task> {
		// Find and validate the task
		const task = await this.getTaskModel().findById(taskID);
		if (!task) throw new NotFoundException("Task not found");
		if (task.statusBudgets !== BudgetStatus.Added)
			throw new ValidationException("Task wasn't assigned");

		// Reset subtasks' budget statuses recursively
		const resetSubtaskStatuses = async (taskID: string) => {
			const subTasks = await this.getTaskModel().findSubTask(taskID);
			if (subTasks) {
				await Promise.all(
					subTasks.map(async ({ id }) => {
						await this.getTaskModel().update(id, {
							statusBudgets: BudgetStatus.Initial,
						});
						await resetSubtaskStatuses(id);
					}),
				);
			}
		};

		// Check if the subTask has a status of Added or SubTasksAdded
		const hasAddedSubtasks = async (taskID: string): Promise<boolean> => {
			const subTasks = await this.getTaskModel().findSubTask(taskID);
			if (!subTasks) return false;
			return subTasks.some(
				(subTask) =>
					subTask.statusBudgets === BudgetStatus.Added ||
					subTask.statusBudgets === BudgetStatus.SubTasksAdded,
			);
		};

		// Update budget status for the task and its hierarchy
		const updateBudgetStatuses = async (): Promise<void> => {
			// Reset current task's status
			await this.getTaskModel().update(task.id, {
				statusBudgets: BudgetStatus.Initial,
			});

			// Reset subtasks' statuses
			await resetSubtaskStatuses(taskID);

			// Update parent tasks' statuses
			let parentTaskId = task.parentTaskId;
			while (parentTaskId) {
				const parentTaskHasAddedSubtasks = await hasAddedSubtasks(parentTaskId);
				if (!parentTaskHasAddedSubtasks) {
					await this.getTaskModel().update(parentTaskId, {
						statusBudgets: BudgetStatus.Initial,
					});
				}

				const parentTask = await this.getTaskModel().findById(parentTaskId);
				parentTaskId = parentTask?.parentTaskId ?? null;
			}
		};

		// Prepare the updated task object
		const updatedTask = {
			...task,
			budget,
			advance,
			expense,
		};
		await this.getTaskModel().update(taskID, updatedTask);

		const existingProject = await this.getProjectModel().findById(
			task.projectId,
		);
		if (!existingProject) throw new ValidationException("Project cann't found");
		const updatedProject = {
			...existingProject,
			budget: existingProject.budget - task.budget,
			advance: existingProject.advance - task.advance,
			expense: existingProject.expense - task.expense,
		};

		// Invalidate caches
		await this.clearCache(task.id, task.projectId);

		// Update Project Money
		this.updateProjectModel(task.projectId, updatedProject);

		// Update budget statuses for task hierarchy
		await updateBudgetStatuses();

		return await this.getTaskById(taskID);
	}
}
