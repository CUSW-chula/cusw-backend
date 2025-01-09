import { type Cookie, Elysia, t } from "elysia";
import { Context } from "../../shared/interfaces.shared";
import { TagService } from "../services/tag.service";
import { $Enums, Tag, Task } from "@prisma/client";
import { WebSocket } from "../../shared/utils/websocket.utils";
import { ActivityService } from "../services/activity-logs.service";

export const TagController = new Elysia({ prefix: "/tags" })
	.get("/", async ({ db, redis }: Context) => {
		const tagService = new TagService(db, redis);
		const tags = await tagService.getAllTag();
		return tags;
	})
	.get(
		"/:id",
		async ({
			params: { id },
			db,
			redis,
		}: Context & { params: { id: string } }) => {
			const tagService = new TagService(db, redis);
			const tags = await tagService.getTagById(id);
			return tags;
		},
	)
	.post(
		"/assign/:taskId",
		async ({
			body,
			db,
			redis,
			cookie: { session },
		}: Context & {
			body: { taskId: string; tagId: string };
			cookie: { session: Cookie<string> };
		}) => {
			//const taskService = new TaskService(db, redis);
			const tagService = new TagService(db, redis);
			const activityService = new ActivityService(db, redis);
			const userId = session.value;
			const assignTag = await tagService.assigningTagToTask(
				body.taskId,
				body.tagId,
				userId,
			);
			const assignTags = await tagService.getTagById(assignTag.tagId);
			WebSocket.broadcast("assigned-tags", assignTags);
			const tagAddActivity = await activityService.postActivity(
				body.taskId,
				$Enums.ActivityAction.ADDED,
				`a tag name "${assignTags.name}"`,
				userId,
			);
			WebSocket.broadcast("activity", tagAddActivity);
			return assignTags;
		},
		{
			body: t.Object({
				taskId: t.String(),
				tagId: t.String(),
			}),
		},
	)
	.post(
		"/assign/:projectId",
		async ({
			body,
			db,
			redis,
			cookie: { session },
		}: Context & {
			body: { projectId: string; tagId: string };
			cookie: { session: Cookie<string> };
		}) => {
			const tagService = new TagService(db, redis);
			const activityService = new ActivityService(db, redis);
			const userId = session.value;
			const assignTag = await tagService.assigningTagToProject(
				body.projectId,
				body.tagId,
				userId,
			);
			const assignTags = await tagService.getTagById(assignTag.tagId);
			WebSocket.broadcast("assigned-tags", assignTags);
			const tagAddActivity = await activityService.postActivity(
				body.projectId,
				$Enums.ActivityAction.ADDED,
				`a tag name "${assignTags.name}"`,
				userId,
			);
			WebSocket.broadcast("activity", tagAddActivity);
			return assignTags;
		},
		{
			body: t.Object({
				projectId: t.String(),
				tagId: t.String(),
			}),
		},
	)
	.delete(
		"/unassigned/:taskId",
		async ({
			body,
			db,
			redis,
			cookie: { session },
		}: Context & {
			body: { taskId: string; tagId: string };
			cookie: { session: Cookie<string> };
		}) => {
			const tagService = new TagService(db, redis);
			const activityService = new ActivityService(db, redis);
			const userId = session.value;
			const unAssignTaskTag = await tagService.unAssigningTagToTask(
				body.taskId,
				body.tagId,
			);
			const unAssignTag = await tagService.getTagById(unAssignTaskTag.tagId);
			WebSocket.broadcast("unassigned-tag", unAssignTag);
			const tagUnassignActivity = await activityService.postActivity(
				body.taskId,
				$Enums.ActivityAction.REMOVED,
				`a tag name "${unAssignTag.name}"`,
				userId,
			);
			WebSocket.broadcast("activity", tagUnassignActivity);
			return unAssignTag;
		},
		{
			body: t.Object({
				taskId: t.String(),
				tagId: t.String(),
			}),
		},
	)
	.delete(
		"/unassigned/:projectId",
		async ({
			body,
			db,
			redis,
			cookie: { session },
		}: Context & {
			body: { projectId: string; tagId: string };
			cookie: { session: Cookie<string> };
		}) => {
			const tagService = new TagService(db, redis);
			const activityService = new ActivityService(db, redis);
			const userId = session.value;
			const unAssignTaskTag = await tagService.unAssigningTagToProject(
				body.projectId,
				body.tagId,
			);
			const unAssignTag = await tagService.getTagById(unAssignTaskTag.tagId);
			WebSocket.broadcast("unassigned-tag", unAssignTag);
			const tagUnassignActivity = await activityService.postActivity(
				body.projectId,
				$Enums.ActivityAction.REMOVED,
				`a tag name "${unAssignTag.name}"`,
				userId,
			);
			WebSocket.broadcast("activity", tagUnassignActivity);
			return unAssignTag;
		},
		{
			body: t.Object({
				projectId: t.String(),
				tagId: t.String(),
			}),
		},
	);
