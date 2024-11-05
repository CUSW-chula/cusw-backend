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
			if (!activities) {
				return Response.json("Activity not found", { status: 404 });
			}
			WebSocket.broadcast("activity", activities);
			return activities;
		} catch (_error) {
			const error = _error as Error;
			return Response.json(error.message, { status: 500 });
		}
	},
);
