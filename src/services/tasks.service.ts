import { TasksModel } from "../models/tasks.model";
import type { PrismaClient, Task } from "@prisma/client";
import { BaseService } from "../core/service.core";
import type Redis from "ioredis";

export class TaskService extends BaseService<Task> {
	private readonly taskModel: TasksModel;

	constructor(prisma: PrismaClient, redis: Redis) {
		super(redis, 60); //
		this.taskModel = new TasksModel(prisma);
	}

	async findTaskById(taskId: string): Promise<Task> {
		const task = await this.taskModel.findById(taskId);
		if (!task) throw new Error("Task not found");
		return task;
	}
}
