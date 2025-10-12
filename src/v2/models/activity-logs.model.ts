import type {
	$Enums,
	ActivityAction,
	Activity as PrismaActivity,
} from "../../../generated";
import { BaseModel } from "../../core/model.core";

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

	async deleteByTaskId(taskId: string): Promise<number> {
		const deletedActivity = await this.getModel().activity.deleteMany({
			where: { taskId: taskId },
		});
		return deletedActivity.count;
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
				userId: data.userId ?? "",
				taskId: data.taskId ?? "",
				createdAt: data.createdAt ?? new Date(),
				action: data.action ?? ("DEFAULT_ACTION" as ActivityAction), // Add the action property
				detail: data.detail ?? "", // Add the detail property
			},
		});
		return createdActivity;
	}

	async findRecheckActivitiesByTaskIds(
		taskIds: string[],
	): Promise<PrismaActivity[]> {
		return await this.getModel().activity.findMany({
			where: {
				taskId: { in: taskIds },
				action: "ADDED",
				detail: { contains: "this task to inrecheck" },
			},
		});
	}

	async countRecheckActivitiesByTaskId(taskId: string): Promise<number> {
		return await this.getModel().activity.count({
			where: {
				taskId: taskId,
				action: "ADDED",
				detail: { contains: "this task to inrecheck" },
			},
		});
	}

	async findTaskStatusChangeToComplete(
		taskId: string,
	): Promise<PrismaActivity | null> {
		return await this.getModel().activity.findFirst({
			where: {
				taskId: taskId,
				// biome-ignore lint/style/useNamingConvention: Prisma OR operator requires uppercase
				OR: [
					{ detail: { contains: "done" } },
					{ detail: { contains: "Done" } },
					{ detail: { contains: "complete" } },
					{ detail: { contains: "Complete" } },
					{ detail: { contains: "finished" } },
					{ detail: { contains: "Finished" } },
				],
			},
			orderBy: {
				createdAt: "desc",
			},
		});
	}

	async findRecheckActivitiesByUserAndTaskIds(
		userId: string,
		taskIds: string[],
	): Promise<PrismaActivity[]> {
		return await this.getModel().activity.findMany({
			where: {
				userId: userId,
				taskId: { in: taskIds },
				action: "ADDED",
				detail: { contains: "this task to inrecheck" },
			},
		});
	}

	async countRecheckActivitiesByUserAndTaskId(
		userId: string,
		taskId: string,
	): Promise<number> {
		return await this.getModel().activity.count({
			where: {
				userId: userId,
				taskId: taskId,
				action: "ADDED",
				detail: { contains: "this task to inrecheck" },
			},
		});
	}

	// Optimized batch delete method
	async deleteByTaskIds(taskIds: string[]): Promise<number> {
		if (taskIds.length === 0) return 0;

		const deletedActivities = await this.getModel().activity.deleteMany({
			where: {
				taskId: {
					in: taskIds,
				},
			},
		});
		return deletedActivities.count;
	}

	// Find assignment activities for user and task
	async findAssignmentActivitiesByUserAndTaskId(
		userId: string,
		taskId: string,
	): Promise<PrismaActivity[]> {
		// First get user name to search in detail
		const user = await this.getModel().user.findUnique({
			where: { id: userId },
			select: { name: true },
		});

		if (!user) {
			return [];
		}

		return await this.getModel().activity.findMany({
			where: {
				taskId: taskId,
				action: "ASSIGNED",
				detail: { contains: `this task to ${user.name}` },
			},
			orderBy: {
				createdAt: "asc",
			},
		});
	}

		// Count recheck activities for a user within their assignment periods for a specific task
	async countRecheckActivitiesByUserInAssignmentPeriod(
		userId: string,
		taskId: string,
	): Promise<number> {
		// Get user name to search in detail
		const user = await this.getModel().user.findUnique({
			where: { id: userId },
			select: { name: true },
		});

		if (!user) {
			return 0;
		}

		// Try multiple patterns to find when user was assigned to this task
		const assignmentPatterns = [
			`this task to ${user.name}`,
			`task to ${user.name}`,
			user.name,
		];

		let firstAssignment = null;

		for (const pattern of assignmentPatterns) {
			firstAssignment = await this.getModel().activity.findFirst({
				where: {
					taskId: taskId,
					action: "ASSIGNED",
					detail: { contains: pattern },
				},
				orderBy: {
					createdAt: "asc",
				},
			});

			if (firstAssignment) break;
		}

		// If no assignment found, check if user is currently assigned to the task
		if (!firstAssignment) {
			const isCurrentlyAssigned = await this.getModel().taskAssignment.findFirst({
				where: {
					taskId: taskId,
					userId: userId,
				},
			});

			if (!isCurrentlyAssigned) {
				return 0; // User never assigned to this task
			}

			// If assigned but no assignment activity found, count all recheck activities
			return await this.getModel().activity.count({
				where: {
					taskId: taskId,
					action: "ADDED",
					detail: { contains: "this task to inrecheck" },
				},
			});
		}

		// Count recheck activities from the assignment date onwards
		return await this.getModel().activity.count({
			where: {
				taskId: taskId,
				action: "ADDED",
				detail: { contains: "this task to inrecheck" },
				createdAt: {
					gte: firstAssignment.createdAt,
				},
			},
		});
	}

	// Find recheck activities for multiple tasks within assignment periods
	async findRecheckActivitiesByUserInAssignmentPeriods(
		userId: string,
		taskIds: string[],
	): Promise<PrismaActivity[]> {
		// Get user name to search in detail
		const user = await this.getModel().user.findUnique({
			where: { id: userId },
			select: { name: true },
		});

		if (!user) {
			return [];
		}

		const allRecheckActivities: PrismaActivity[] = [];

		for (const taskId of taskIds) {
			// Find when user was first assigned to this task
			const firstAssignment = await this.getModel().activity.findFirst({
				where: {
					taskId: taskId,
					action: "ASSIGNED",
					detail: { contains: `this task to ${user.name}` },
				},
				orderBy: {
					createdAt: "asc",
				},
			});

			if (!firstAssignment) {
				continue;
			}

			// Get recheck activities from the assignment date onwards
			const recheckActivities = await this.getModel().activity.findMany({
				where: {
					userId: userId,
					taskId: taskId,
					action: "ADDED",
					detail: { contains: "this task to inrecheck" },
					createdAt: {
						gte: firstAssignment.createdAt,
					},
				},
			});

			allRecheckActivities.push(...recheckActivities);
		}

		return allRecheckActivities;
	}

	// Debug method to find all activities for a task
	async findAllActivitiesByTaskId(taskId: string): Promise<PrismaActivity[]> {
		return await this.getModel().activity.findMany({
			where: {
				taskId: taskId,
			},
			orderBy: {
				createdAt: "asc",
			},
		});
	}

	// Debug method to find all activities with "recheck" in detail
	async findAllRecheckActivitiesByTaskId(taskId: string): Promise<PrismaActivity[]> {
		return await this.getModel().activity.findMany({
			where: {
				taskId: taskId,
				// biome-ignore lint/style/useNamingConvention: Prisma OR operator requires uppercase
				OR: [
					{ detail: { contains: "recheck" } },
					{ detail: { contains: "Recheck" } },
					{ detail: { contains: "InRecheck" } },
					{ detail: { contains: "inrecheck" } },
				],
			},
			orderBy: {
				createdAt: "asc",
			},
		});
	}

	// Debug method to find assignment activities for a user
	async findAssignmentActivitiesDebug(userId: string, taskId: string): Promise<PrismaActivity[]> {
		const user = await this.getModel().user.findUnique({
			where: { id: userId },
			select: { name: true },
		});

		if (!user) return [];

		return await this.getModel().activity.findMany({
			where: {
				taskId: taskId,
				// biome-ignore lint/style/useNamingConvention: Prisma OR operator requires uppercase
				OR: [
					{
						action: "ASSIGNED",
						detail: { contains: user.name },
					},
					{
						action: "ASSIGNED",
						detail: { contains: `this task to ${user.name}` },
					},
					{
						action: "ASSIGNED",
						detail: { contains: `task to ${user.name}` },
					},
				],
			},
			orderBy: {
				createdAt: "asc",
			},
		});
	}
}
