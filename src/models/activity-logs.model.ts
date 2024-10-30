import type {
	$Enums,
	ActivityAction,
	Activity as PrismaActivity,
} from "@prisma/client";
import { BaseModel } from "../core/model.core";

export class ActivityLogsModel extends BaseModel<PrismaActivity> {
	update(
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
		throw new Error("Method not implemented.");
	}
	delete(
		id: string,
	): Promise<{
		id: string;
		action: $Enums.ActivityAction;
		detail: string | null;
		taskId: string | null;
		userId: string;
		createdAt: Date;
	}> {
		throw new Error("Method not implemented.");
	}
	async findAll(): Promise<PrismaActivity[]> {
		const activities = await this.getModel().activity.findMany();
		return activities;
	}

	async findById(id: string): Promise<PrismaActivity | null> {
		const activities = await this.getModel().activity.findUnique({
			where: { id },
		});
		return activities;
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
