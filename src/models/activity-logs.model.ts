import type {
	$Enums,
	ActivityAction,
	Activity as PrismaActivity,
} from "@prisma/client";
import { BaseModel } from "../core/model.core";

export class ActivityLogsModel extends BaseModel<PrismaActivity> {
	async update(
		id: string,
		data: Partial<{
			id: string;
			action: $Enums.ActivityAction;
			detail: string | null;
			taskId: string | null;
			userId: string;
			createdAt: Date;
		}>,
	): Promise<{
		id: string;
		action: $Enums.ActivityAction;
		detail: string | null;
		taskId: string | null;
		userId: string;
		createdAt: Date;
	}> {
		const updatedActivity = await this.getModel().activity.update({
			where: { id },
			data,
		});
		return updatedActivity;
	}

	async delete(id: string): Promise<{
		id: string;
		action: $Enums.ActivityAction;
		detail: string | null;
		taskId: string | null;
		userId: string;
		createdAt: Date;
	}> {
		const deletedActivity = await this.getModel().activity.delete({
			where: { id },
		});
		return deletedActivity;
	}

	async findAll(): Promise<PrismaActivity[]> {
		const activities = await this.getModel().activity.findMany();
		return activities;
	}

	async findById(id: string): Promise<PrismaActivity | null> {
		const activity = await this.getModel().activity.findUnique({
			where: { id },
		});
		return activity;
	}

	async findByTaskId(taskId: string): Promise<PrismaActivity[] | null> {
		const activities = await this.getModel().activity.findMany({
			where: { taskId: taskId },
		});
		return activities;
	}

	async create(data: Partial<PrismaActivity>): Promise<PrismaActivity> {
		const createdActivity = await this.getModel().activity.create({
			data: {
				id: data.id ?? "",
				userId: data.userId ?? "",
				taskId: data.taskId ?? "",
				createdAt: data.createdAt ?? new Date(),
				action: data.action ?? ("DEFAULT_ACTION" as ActivityAction), // Add the action property
				detail: data.detail ?? "", // Add the detail property
			},
		});
		return createdActivity;
	}
}
