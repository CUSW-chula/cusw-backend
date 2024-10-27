import { Elysia, t } from "elysia";
import { Context } from "../shared/interfaces.shared";
import { TagService } from "../services/tag.service";
import { Tag, Task } from "@prisma/client";
import { TaskService } from "../services/tasks.service";
import { WebSocket } from "../shared/utils/websocket.utils";

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
	.post(
		"/assign",
		async ({
			body,
			db,
			redis,
		}: Context & {
			body: { tagid: string; taskId: string; tagId: string };
		}) => {
			//const taskService = new TaskService(db, redis);
			const tagService = new TagService(db, redis);
			try {
				const assignTag = await tagService.assigningTagToTask(
					body.taskId,
					body.tagId,
				);
				const assignTags = await tagService.getTagById(assignTag.tagId);
				WebSocket.broadcast("tags", assignTags);
				return assignTags;
			} catch (error) {
				// Handle email validation error
				if (error instanceof Error) {
					return {
						status: 400,
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
		{
			body: t.Object({
				taskId: t.String(),
				tagId: t.String(),
			}),
		},
	)
	.delete(
		"/unassigned",
		async ({
			body,
			db,
			redis,
		}: Context & { body: { taskId: string; tagId: string } }) => {
			const taskService = new TaskService(db, redis);
			const tagService = new TagService(db, redis);
			try {
				const unAssignTag = await tagService.unAssigningTagToTask(
					body.taskId,
					body.tagId,
				);
				const unAssignTask = await taskService.getTaskById(unAssignTag.taskId);
				WebSocket.broadcast("unassigned", unAssignTask);
				return unAssignTag;
			} catch (error) {
				// Handle email validation error
				if (error instanceof Error) {
					return {
						status: 400,
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
		{
			body: t.Object({
				taskId: t.String(),
				tagId: t.String(),
			}),
		},
	);
