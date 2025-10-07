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
				detail: { contains: "inrecheck" },
			},
		});
	}

	async countRecheckActivitiesByTaskId(taskId: string): Promise<number> {
		return await this.getModel().activity.count({
			where: {
				taskId: taskId,
				detail: { contains: "inrecheck" },
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
				detail: { contains: "inrecheck" },
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
				detail: { contains: "inrecheck" },
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
		return await this.getModel().activity.findMany({
			where: {
				taskId: taskId,
				// biome-ignore lint/style/useNamingConvention: Prisma OR operator requires uppercase
				OR: [
					{
						action: "ASSIGNED",
						detail: { contains: userId },
					},
					{
						action: "UNASSIGNED", 
						detail: { contains: userId },
					},
				],
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
		// Get all assignment and unassignment activities for this user and task
		const assignmentActivities = await this.findAssignmentActivitiesByUserAndTaskId(userId, taskId);
		
		if (assignmentActivities.length === 0) {
			return 0;
		}

		// Build time ranges when user was assigned to this task
		const assignmentPeriods: { start: Date; end: Date | null }[] = [];
		let currentAssignmentStart: Date | null = null;

		for (const activity of assignmentActivities) {
			if (activity.action === "ASSIGNED" && activity.detail?.includes(userId)) {
				currentAssignmentStart = activity.createdAt;
			} else if (activity.action === "UNASSIGNED" && activity.detail?.includes(userId) && currentAssignmentStart) {
				assignmentPeriods.push({
					start: currentAssignmentStart,
					end: activity.createdAt,
				});
				currentAssignmentStart = null;
			}
		}

		// If still assigned (no unassignment found), add current period
		if (currentAssignmentStart) {
			assignmentPeriods.push({
				start: currentAssignmentStart,
				end: null, // Still assigned
			});
		}

		if (assignmentPeriods.length === 0) {
			return 0;
		}

		// Count recheck activities that occurred during assignment periods
		let recheckCount = 0;

		for (const period of assignmentPeriods) {
			const whereCondition = {
				userId: userId,
				taskId: taskId,
				detail: { contains: "inrecheck" },
				createdAt: period.end ? {
					gte: period.start,
					lte: period.end,
				} : {
					gte: period.start,
				},
			};

			const periodRecheckCount = await this.getModel().activity.count({
				where: whereCondition,
			});

			recheckCount += periodRecheckCount;
		}

		return recheckCount;
	}

	// Find recheck activities for multiple tasks within assignment periods
	async findRecheckActivitiesByUserInAssignmentPeriods(
		userId: string,
		taskIds: string[],
	): Promise<PrismaActivity[]> {
		const allRecheckActivities: PrismaActivity[] = [];

		for (const taskId of taskIds) {
			// Get assignment periods for this task
			const assignmentActivities = await this.findAssignmentActivitiesByUserAndTaskId(userId, taskId);
			
			if (assignmentActivities.length === 0) {
				continue;
			}

			// Build time ranges when user was assigned to this task
			const assignmentPeriods: { start: Date; end: Date | null }[] = [];
			let currentAssignmentStart: Date | null = null;

			for (const activity of assignmentActivities) {
				if (activity.action === "ASSIGNED" && activity.detail?.includes(userId)) {
					currentAssignmentStart = activity.createdAt;
				} else if (activity.action === "UNASSIGNED" && activity.detail?.includes(userId) && currentAssignmentStart) {
					assignmentPeriods.push({
						start: currentAssignmentStart,
						end: activity.createdAt,
					});
					currentAssignmentStart = null;
				}
			}

			// If still assigned (no unassignment found), add current period
			if (currentAssignmentStart) {
				assignmentPeriods.push({
					start: currentAssignmentStart,
					end: null, // Still assigned
				});
			}

			// Get recheck activities within assignment periods
			for (const period of assignmentPeriods) {
				const whereCondition = {
					userId: userId,
					taskId: taskId,
					detail: { contains: "inrecheck" },
					createdAt: period.end ? {
						gte: period.start,
						lte: period.end,
					} : {
						gte: period.start,
					},
				};

				const periodRecheckActivities = await this.getModel().activity.findMany({
					where: whereCondition,
				});

				allRecheckActivities.push(...periodRecheckActivities);
			}
		}

		return allRecheckActivities;
	}
}
