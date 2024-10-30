import { Elysia } from "elysia";
import { ActivityService } from "../services/activity-logs.service";
import { type Context } from "../shared/interfaces.shared";
import { WebSocket } from "../shared/utils/websocket.utils";

export const ActivityController = new Elysia({ prefix: "/activities" }).get(
	"/:id",
	async ({
		params: { id },
		db,
		redis,
	}: Context & { params: { id: string } }) => {
		const activityService = new ActivityService(db, redis);
		try {
			const activities = await activityService.getActivityById(id);
			WebSocket.broadcast("activity", activities);
			return activities;
		} catch (error) {
			// Handle email validation error
			if (error instanceof Error) {
				return {
					status: 404,
					body: { error: error.message },
				};
			}
			// Handle unexpected errors
			return {
				status: 500,
				body: { error: "Internal Server Error" },
			};
		}
	},
);
