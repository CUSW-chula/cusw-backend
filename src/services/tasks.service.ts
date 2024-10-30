import { TasksModel } from "../models/tasks.model";
import type { PrismaClient, Task, TaskAssignment, User } from "@prisma/client";
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
      })
    );

    // Filter out any null results (users not found)
    return usersInTask.filter((user) => user !== null) as User[];
  }

  async assigningTaskToUser(
    taskId: string,
    userId: string
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
    userId: string
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
      userId
    );
    if (!taskAssignment)
      throw new Error("Unexpected error tasks assignment not found");
    const unAssigningTaskToUser = await this.taskAssignmentModel.delete(
      taskAssignment.id
    );
    return unAssigningTaskToUser;
  }

  async getMoney(taskId: string): Promise<number[]> {
    const task = await this.taskModel.findById(taskId);
    if (!task) throw new Error("Task not found");
    return [task.expectedBudget, task.realBudget, task.usedBudget];
  }

  async addMoney(
    taskID: string,
    expectedBudget: number,
    realBudget: number,
    usedBudget: number
  ): Promise<Task> {
    const budgets = [expectedBudget, realBudget, usedBudget];
    // Check if all values are either null, undefined, or 0
    const areAllBudgetsEmptyOrZero = (
      budgets: (number | undefined)[]
    ): boolean => {
      return budgets.every((budget) => budget === 0);
    };
    // Check is it have only one value
    const isOneBudgetValue = (budgets: number[]): boolean => {
      const definedBudgets = budgets.filter(
        (budget) => budget !== null && budget !== 0
      );
      return definedBudgets.length === 1;
    };

    //First step check if task isn't exist
    const task = await this.taskModel.findById(taskID);
    if (!task) {
      throw new Error("Task not found");
    }

    //Second step check if task money isn't empty
    if (!areAllBudgetsEmptyOrZero([task.expectedBudget,task.usedBudget,task.realBudget]))
      throw new Error("Budget are not empty.");

    //Third step check if input money isn't only one value
    if (!isOneBudgetValue(budgets))
      throw new Error("Only one budget value should be present.");

    //Fourth step check if parent task already have budget
    const parentTask = await this.taskModel.findById(task.parentTaskId ?? "");
    if (parentTask) {
      if (
        !areAllBudgetsEmptyOrZero([
          parentTask.expectedBudget,
          parentTask.realBudget,
          parentTask.usedBudget,
        ])
      )
        throw new Error("Parent task has already been assigned a budget.");
    }

    //Fifth step check if subtask already have budget
    const subTasks = await this.taskModel.findSubTask(task.id ?? "");
    if (subTasks) {
      subTasks.forEach(({ expectedBudget, realBudget, usedBudget }) => {
        if (
          !areAllBudgetsEmptyOrZero([expectedBudget, realBudget, usedBudget])
        ) {
          throw new Error("Subtask task has already been assigned a budget.");
        }
      });
    }

    const addMoney = await this.taskModel.update(taskID, {
      expectedBudget: expectedBudget,
      realBudget: realBudget,
      usedBudget: usedBudget,
    });
    return addMoney;
  }

  async updateMoney(
    taskID: string,
    expectedBudget: number,
    realBudget: number,
    usedBudget: number
  ): Promise<Task> {
    const task = await this.taskModel.findById(taskID);
    if (!task) {
      throw new Error("Task not found");
    }
    const updateMoney = await this.taskModel.update(taskID, {
      expectedBudget: expectedBudget,
      realBudget: realBudget,
      usedBudget: usedBudget,
    });
    return updateMoney;
  }
}
