import { ActivityLogsModel } from "../models/activity-logs.model";
import type { PrismaClient, $Enums } from "@prisma/client";
import { BaseService } from "../../core/service.core";
import type Redis from "ioredis";
import { UserModel } from "../models/users.model";
import { TasksModel } from "../models/tasks.model";
import { NotFoundException } from "../../core/exception.core";
import { Activity } from "../../shared/interfaces.shared";
import { TaskService } from "./tasks.service";
import { UserService } from "./users.service";

export class ActivityService extends BaseService<Activity> {
	private readonly activityModel: ActivityLogsModel;
	private readonly userModel: UserModel;
	private readonly taskModel: TasksModel;
	private readonly taskService: TaskService;
	private readonly userService: UserService;

	constructor(prisma: PrismaClient, redis: Redis) {
		super(redis, 10); // 10 seconds
		this.activityModel = new ActivityLogsModel(prisma);
		this.userModel = new UserModel(prisma);
		this.taskModel = new TasksModel(prisma);
		this.taskService = new TaskService(prisma, redis);
		this.userService = new UserService(prisma, redis);
	}

	async getActivityById(id: string): Promise<Activity[]> {
		const activity = await this.activityModel.findByTaskId(id);
		if (!activity) throw new NotFoundException("Activity not found");
		const activityWithDetails: Activity[] = await Promise.all(
			activity.map(async (act) => {
				const user = await this.userService.getUserById(act.userId ?? "");
				const task = await this.taskService.getTaskById(act.taskId ?? "");
				return {
					...act,
					user,
					task,
				};
			}),
		);
		return activityWithDetails;
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
		const activityWithDetails: Activity = {
			...activity,
			user: isUserExist,
			task: await this.taskService.getTaskById(taskId),
		};
		await this.invalidateCache(`activity:${activity.id}`);
		return activityWithDetails;
	}
}
