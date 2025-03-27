import { type Cookie, Elysia, t } from "elysia";
import { Context } from "../../shared/interfaces.shared";
import { TagService } from "../services/tag.service";
import { $Enums, Tag, Task } from "@prisma/client";
import { WebSocket } from "../../shared/utils/websocket.utils";
import { ActivityService } from "../services/activity-logs.service";

export const TagController = new Elysia({
	prefix: "/tags",
	tags: ["Version 2"],
})
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
	.get(
		"/getassigntag/:taskId",
		async ({
			params: { taskId },
			db,
			redis,
		}: Context & { params: { taskId: string } }) => {
			const tagService = new TagService(db, redis);
			const tags: Tag[] = await tagService.getAsignTagInTaskByTaskId(taskId);
			return tags;
		},
	)
	.patch(
		"/:id",
		async ({
			params: { id },
			body,
			db,
			redis,
		}: Context & { params: { id: string }; body: Tag }) => {
			const tagService = new TagService(db, redis);
			const tag = await tagService.updateTag({ ...body, id });
			return tag;
		},
		{
			body: t.Object({
				name: t.String(),
				isProject: t.Boolean(),
			}),
		},
	)
	.post(
		"/",
		async ({
			body,
			db,
			redis,
		}: Context & { body: { name: string; isProject: boolean } }) => {
			const tagService = new TagService(db, redis);
			const tag = await tagService.createTag(body.name, body.isProject);
			return tag;
		},
		{ body: t.Object({ name: t.String(), isProject: t.Boolean() }) },
	)
	.get(
		"/getassigntask/:tagId",
		async ({
			params: { tagId },
			db,
			redis,
		}: Context & { params: { tagId: string } }) => {
			const tagService = new TagService(db, redis);
			const tasks: Task[] = await tagService.getAsignTaskInTagByTagId(tagId);
			return tasks;
		},
	)
	.delete(
		"/:id",
		async ({
			params: { id },
			db,
			redis,
		}: Context & { params: { id: string } }) => {
			const tagService = new TagService(db, redis);
			const tag = await tagService.deleteTag(id);
			return tag;
		},
	)
	.post(
		"/assign/:taskId",
		async ({
			body,
			params: { taskId },
			db,
			redis,
			cookie: { session },
		}: Context & {
			body: { tagid: string; tagId: string };
			cookie: { session: Cookie<string> };
			params: { taskId: string };
		}) => {
			//const taskService = new TaskService(db, redis);
			const tagService = new TagService(db, redis);
			const activityService = new ActivityService(db, redis);
			const userId = session.value;
			const assignTag = await tagService.assigningTagToTask(
				taskId,
				body.tagId,
				userId,
			);
			const assignTags = await tagService.getTagById(assignTag.tagId);
			WebSocket.broadcast(`assigned-tags:${taskId}`, assignTags);
			const tagAddActivity = await activityService.postActivity(
				taskId,
				$Enums.ActivityAction.ADDED,
				`a tag name "${assignTags.name}"`,
				userId,
			);
			WebSocket.broadcast(`activity:${taskId}`, tagAddActivity);
			return assignTags;
		},
		{
			body: t.Object({
				tagId: t.String(),
			}),
		},
	)
	.delete(
		"/unassigned/:taskId",
		async ({
			body,
			params: { taskId },
			db,
			redis,
			cookie: { session },
		}: Context & {
			body: { tagId: string };
			cookie: { session: Cookie<string> };
			params: { taskId: string };
		}) => {
			const tagService = new TagService(db, redis);
			const activityService = new ActivityService(db, redis);
			const userId = session.value;
			const unAssignTaskTag = await tagService.unAssigningTagToTask(
				taskId,
				body.tagId,
			);
			const unAssignTag = await tagService.getTagById(unAssignTaskTag.tagId);
			WebSocket.broadcast(`unassigned-tag:${taskId}`, unAssignTag);
			const tagUnassignActivity = await activityService.postActivity(
				taskId,
				$Enums.ActivityAction.REMOVED,
				`a tag name "${unAssignTag.name}"`,
				userId,
			);
			WebSocket.broadcast(`activity:${taskId}`, tagUnassignActivity);
			return unAssignTag;
		},
		{
			body: t.Object({
				tagId: t.String(),
			}),
		},
	);
