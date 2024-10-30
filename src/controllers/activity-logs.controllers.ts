import { Elysia, t } from "elysia";
import { ActivityService } from "../services/activity-logs.service";
import { type Context } from "../shared/interfaces.shared";
import { type Activity } from "@prisma/client";
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
			if (!activities) {
				return {
					status: 404,
					body: { error: "Activities not found" },
				};
			}
			return activities;
		} catch (_error) {
			// Handle unexpected errors
			return {
				status: 500,
				body: { error: _error },
			};
		}
	},
);
