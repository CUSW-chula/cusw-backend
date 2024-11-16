import { TasksModel } from "../models/tasks.model";
import {
	$Enums,
	BudgetStatus,
	TaskStatus,
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
import { TaskTagModel } from "../models/task-tag.model";
import { FilesModel } from "../models/files.model";
import { ActivityLogsModel } from "../models/activity-logs.model";
import { CommentModel } from "../models/comment.model";

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

	async getAllTask(): Promise<Task[]> {
		const cacheKey = "tasks:all";
		const cacheTasks = await this.getFromCache(cacheKey);
		if (cacheTasks) return cacheTasks as Task[];

		const tasks = await this.taskModel.findAll();
		if (!tasks) throw new Error("Task not found");
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
		if (!existingTask) throw new Error("Task not found");

		// Check if user exists based on the task's createdById
		if (!existingTask.createdById) throw new Error("Task creator ID not found");
		const isUserExist = await this.userModel.findById(existingTask.createdById);
		if (!isUserExist) throw new Error("User not found");

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
			await this.invalidateCache(`projects:${projectId}`);
			await this.invalidateCache(`tasks:parent:${parentTaskId}`);
			return await this.taskModel.create(newTask);
		}
		throw new Error("Title cann't be null");
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

	async deleteTask(taskId: string): Promise<Task> {
		const cacheKey = `tasks:${taskId}`;
		const task = await this.taskModel.findById(taskId);
		if (!task) throw new Error("Task not found");
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
			throw new Error(`Error deleting task with ID ${taskId}:`);
		}
		await this.invalidateCache("task:all");
		return task;
	}

	async getTitleByTaskId(taskId: string): Promise<{ title: string }> {
		const task = await this.taskModel.findById(taskId);
		if (!task) throw new Error("Task not found");
		return {
			title: task.title,
		};
	}

	async getDescriptionByTaskId(
		taskId: string,
	): Promise<{ description: string }> {
		const task = await this.taskModel.findById(taskId);
		if (!task) throw new Error("Task not found");
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
		if (!isUserExist) throw new Error("User not found");

		const isTaskExist = await this.taskModel.findById(taskId);
		if (!isTaskExist) throw new Error("Task not found");

		if (isTaskExist.createdById !== userId)
			throw new Error("You dont have permission to edit");

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
		if (!isUserExist) throw new Error("User not found");

		const isTaskExist = await this.taskModel.findById(taskId);
		if (!isTaskExist) throw new Error("Task not found");

		const taskAssignment = await this.taskAssignmentModel.findByTaskIdAndUserId(
			taskId,
			userId,
		);

		if (!taskAssignment && isTaskExist.createdById !== userId)
			throw new Error("Unexpected error User not found");
		const newTitle = {
			description: description,
		};
		const updateDescription = await this.taskModel.update(taskId, newTitle);

		return updateDescription;
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

		const isTaskHasBeenAssigned =
			await this.taskAssignmentModel.findByTaskId(taskId);
		if (
			isTaskHasBeenAssigned?.length === 0 &&
			isTaskExist.status === "Unassigned"
		)
			await this.taskModel.update(taskId, {
				status: "Assigned",
			});

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
		const isTaskHasBeenAssigned =
			await this.taskAssignmentModel.findByTaskId(taskId);
		if (
			isTaskHasBeenAssigned?.length === 0 &&
			isTaskExist.status === "Assigned"
		)
			this.taskModel.update(taskId, {
				status: "Unassigned",
			});
		return unAssigningTaskToUser;
	}
	async getStatusByTaskId(taskId: string): Promise<TaskStatus> {
		const cacheKey = `status:${taskId}`;
		const cacheStatus = await this.getFromCache(cacheKey);
		if (cacheStatus) {
			const task = cacheStatus as Task;
			return task.status;
		}

		const isTaskExist = await this.taskModel.findById(taskId);
		if (!isTaskExist) throw new Error("Task not found");
		await this.setToCache(cacheKey, isTaskExist);
		const taskStatus = isTaskExist.status;
		return taskStatus;
	}

	async changeStatus(taskId: string, newTaskStatus: TaskStatus): Promise<Task> {
		const isTaskExist = await this.taskModel.findById(taskId);
		if (!isTaskExist) throw new Error("Task not found");

		const newStatus = { status: newTaskStatus };
		console.info("New task status:", newTaskStatus);

		const subTasks = await this.taskModel.findSubTask(taskId);

		if (subTasks && subTasks.length > 0) {
			console.info(
				"Sub-task statuses:",
				subTasks.map((task) => task.status),
			);

			let lowestSubTaskStatus = subTasks[0].status;
			for (const subTask of subTasks) {
				if (subTask.status < lowestSubTaskStatus)
					lowestSubTaskStatus = subTask.status;
			}
			console.info("Lowest sub-task status:", lowestSubTaskStatus);

			console.info(
				"compare",
				newTaskStatus,
				"is more than",
				lowestSubTaskStatus,
				newTaskStatus > lowestSubTaskStatus,
			);
			if (newTaskStatus > lowestSubTaskStatus)
				throw new Error(
					"Cannot change status: Parent task status cannot exceed sub-task statuses.",
				);
		}

		const changedStatusTask = await this.taskModel.update(taskId, newStatus);
		await this.invalidateCache(`status:${taskId}`);
		return changedStatusTask;
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

	async getRecursiveParentTaskList(taskId: string): Promise<Task[]> {
		const taskList: Task[] = [];
		const task = await this.taskModel.findById(taskId);
		if (!task) throw new Error("Task not found");

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
		if (!task) throw new Error("Task not found");

		if (!task.parentTaskId) return null;

		const parentTask = await this.taskModel.findById(task.parentTaskId);
		if (!parentTask) throw new Error("Parent task not found");

		return parentTask;
	}
}
