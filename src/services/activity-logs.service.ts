import { ActivityLogsModel } from "../models/activity-logs.model";
import type { PrismaClient, Activity } from "@prisma/client";
import { BaseService } from "../core/service.core";
import type Redis from "ioredis";
import { UserModel } from "../models/users.model";
import { TasksModel } from "../models/tasks.model";

export class ActivityService extends BaseService<Activity> {
	private readonly ActivityModel: ActivityLogsModel;
	private readonly userModel: UserModel;
	private readonly taskModel: TasksModel;

	constructor(prisma: PrismaClient, redis: Redis) {
		super(redis, 60); //
		this.ActivityModel = new ActivityLogsModel(prisma);
		this.userModel = new UserModel(prisma);
		this.taskModel = new TasksModel(prisma);
	}

	async getActivityById(Id: string): Promise<Activity[]> {
		const isTaskIdExist = await this.taskModel.findById(Id);
		if (!isTaskIdExist) throw new Error("Log not found");

		const activity = await this.ActivityModel.findByTaskId(Id);
		if (!activity) throw new Error("Log not found");
		return activity;
	}
}
