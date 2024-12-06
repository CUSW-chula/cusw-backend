import { ActivityLogsModel } from "../models/activity-logs.model";
import type { PrismaClient, Activity, $Enums } from "@prisma/client";
import { BaseService } from "../core/service.core";
import type Redis from "ioredis";
import { UserModel } from "../models/users.model";
import { TasksModel } from "../models/tasks.model";
import { NotFoundException } from "../core/exception.core";

export class ActivityService extends BaseService<Activity> {
	private readonly activityModel: ActivityLogsModel;
	private readonly userModel: UserModel;
	private readonly taskModel: TasksModel;

	constructor(prisma: PrismaClient, redis: Redis) {
		super(redis, 10); // 10 seconds
		this.activityModel = new ActivityLogsModel(prisma);
		this.userModel = new UserModel(prisma);
		this.taskModel = new TasksModel(prisma);
	}

	async getActivityById(id: string): Promise<Activity[]> {
		const cacheKey = `activity:${id}`;
		const cacheActivity = await this.getFromCache(cacheKey);
		if (cacheActivity) return cacheActivity as Activity[];

		const activity = await this.activityModel.findByTaskId(id);
		if (!activity) throw new NotFoundException("Activity not found");
		await this.setToCache(cacheKey, activity);
		return activity;
	}

	async postActivity(
		taskId: string,
		action: $Enums.ActivityAction,
		detail: string,
		userId: string,
	): Promise<Activity> {
		const isTaskIdExist = await this.taskModel.findById(taskId);
		if (!isTaskIdExist) throw new NotFoundException("Task not found");

		const isUserExist = await this.userModel.findById(userId);
		if (!isUserExist) throw new NotFoundException("User not found");

		const activity = await this.activityModel.create({
			action,
			detail,
			taskId,
			userId,
			createdAt: new Date(),
		});
		await this.invalidateCache(`activity:${activity.id}`);
		return activity;
	}
}
