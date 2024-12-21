import { PrismaClient, TaskAssignment, User } from "@prisma/client";
import { TaskService } from "../tasks.service";
import Redis from "ioredis";
import {
	NotFoundException,
	ValidationException,
} from "../../core/exception.core";

export class UserTaskClassService extends TaskService {
	constructor(prisma: PrismaClient, redis: Redis) {
		super(prisma, redis);
	}

	async getAsignUserInTaskByTaskId(taskId: string): Promise<User[]> {
		// Check if task exists
		const isTaskExist = await this.getTaskModel().findById(taskId);
		if (!isTaskExist) throw new NotFoundException("Task not found");

		// Retrieve task assignments
		const taskAssignments =
			await this.getTaskAssignmentModel().findByTaskId(taskId);
		if (!taskAssignments || taskAssignments.length === 0)
			throw new NotFoundException("Did not assigned");

		// Get all users assigned to the task concurrently
		const usersInTask = await Promise.all(
			taskAssignments.map(async (taskAssignment) => {
				const user = await this.getUserModel().findById(taskAssignment.userId);
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
		const cacheKey = `status:${taskId}`;
		// First step check if user exists
		const isUserExist = await this.getUserModel().findById(userId);
		if (!isUserExist) throw new NotFoundException("User not found");

		// Second step check if task exists
		const isTaskExist = await this.getTaskModel().findById(taskId);
		if (!isTaskExist) throw new NotFoundException("Task not found");

		// Check assigner is not the assignee
		const isAssignerIsAssignee = isTaskExist.createdById === userId;
		if (isAssignerIsAssignee)
			throw new ValidationException("Assigner can't assign task to himself");

		const isTaskHasBeenAssigned =
			await this.getTaskAssignmentModel().findByTaskId(taskId);
		if (
			isTaskHasBeenAssigned?.length === 0 &&
			isTaskExist.status === "Unassigned"
		)
			await this.getTaskModel().update(taskId, {
				status: "Assigned",
			});

		// Assigning userTaskAssignment
		const assignTaskToUser = await this.getTaskAssignmentModel().create({
			taskId: taskId,
			userId: userId,
		});
		await this.invalidateCache(cacheKey);
		return assignTaskToUser;
	}

	async unAssigningTaskToUser(
		taskId: string,
		userId: string,
	): Promise<TaskAssignment> {
		// First step check if user exists
		const isUserExist = await this.getUserModel().findById(userId);
		if (!isUserExist) throw new NotFoundException("User not found");

		// Second step check if task exists
		const isTaskExist = await this.getTaskModel().findById(taskId);
		if (!isTaskExist) throw new NotFoundException("Task not found");

		// Assigning userTaskAssignment
		const taskAssignment =
			await this.getTaskAssignmentModel().findByTaskIdAndUserId(taskId, userId);
		if (!taskAssignment)
			throw new NotFoundException(
				"Unexpected error tasks assignment not found",
			);
		const unAssigningTaskToUser = await this.getTaskAssignmentModel().delete(
			taskAssignment.id,
		);
		const isTaskHasBeenAssigned =
			await this.getTaskAssignmentModel().findByTaskId(taskId);
		if (
			isTaskHasBeenAssigned?.length === 0 &&
			isTaskExist.status === "Assigned"
		)
			await this.getTaskModel().update(taskId, {
				status: "Unassigned",
			});
		return unAssigningTaskToUser;
	}
}
