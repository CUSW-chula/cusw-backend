import { ActivityLogsModel } from "../models/activity-logs.model";
import type { PrismaClient, Activity, $Enums } from "@prisma/client";
import { BaseService } from "../core/service.core";
import type Redis from "ioredis";
import { UserModel } from "../models/users.model";
import { TasksModel } from "../models/tasks.model";

export class ActivityService extends BaseService<Activity> {
	private readonly activityModel: ActivityLogsModel;
	private readonly userModel: UserModel;
	private readonly taskModel: TasksModel;

	constructor(prisma: PrismaClient, redis: Redis) {
		super(redis, 60); // 60 seconds
		this.activityModel = new ActivityLogsModel(prisma);
		this.userModel = new UserModel(prisma);
		this.taskModel = new TasksModel(prisma);
	}

	async getActivityById(Id: string): Promise<Activity> {
		const cacheKey = `activity:${Id}`;
		const cacheActivity = await this.getFromCache(cacheKey);
		if (cacheActivity) return cacheActivity as Activity;

		const activity = await this.activityModel.findById(Id);
		if (!activity) throw new Error("Activity not found");
		await this.setToCache(cacheKey, activity);
		return activity;
	}

	async getActivityByTaskId(taskId: string): Promise<Activity[]> {
		const cacheKey = `activity:task:${taskId}`;
		const cacheActivity = await this.getFromCache(cacheKey);
		if (cacheActivity) return cacheActivity as Activity[];

		const activity = await this.activityModel.findByTaskId(taskId);
		if (!activity) throw new Error("Activity not found");
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
		if (!isTaskIdExist) throw new Error("Task not found");
		const isUserExist = await this.userModel.findById(userId);
		if (!isUserExist) throw new Error("User not found");

		const activity = await this.activityModel.create({
			action: action,
			detail: detail,
			taskId: taskId,
			userId: userId,
			createdAt: new Date(),
		});
		await this.setToCache(`activity:${activity.id}`, activity);
		await this.setToCache(`activity:task:${taskId}`, activity);
		return await this.activityModel.create(activity);
	}
}
