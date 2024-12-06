import { Elysia } from "elysia";
import { ActivityService } from "../services/activity-logs.service";
import { type Context } from "../shared/interfaces.shared";
import { WebSocket } from "../shared/utils/websocket.utils";
import { Exception } from "../core/exception.core";

export const ActivityController = new Elysia({ prefix: "/activities" }).get(
	"/:id",
	async ({
		params: { id },
		db,
		redis,
	}: Context & { params: { id: string } }) => {
		const activityService = new ActivityService(db, redis);
		const activities = await activityService.getActivityById(id);
		if (!activities) {
			return Response.json("Activity not found", { status: 404 });
		}
		WebSocket.broadcast("activity", activities);
		return activities;
	},
);
