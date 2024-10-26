import { Elysia, t } from "elysia";
import { Context } from "../shared/interfaces.shared";
import { TagService } from "../services/tag.service";
import { Tag, Task } from "@prisma/client";
import { TaskService } from "../services/tasks.service";

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
		"/getassign/:taskId",
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
		"/getassign/:tagId",
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
		}: Context & { body: { id: string; taskId: string; tagId: string } }) => {
			//const taskService = new TaskService(db, redis);
			const tagService = new TagService(db, redis);
			try {
				const assignTag = await tagService.assigningTagToTask(
					body.id,
					body.taskId,
					body.tagId,
				);
				const assignTags = await tagService.getTagById(assignTag.tagId);
				WebSocket.broadcast("tags", assignTags);
				return assignTags;
			} catch (error) {
				return {
					status: 500,
					body: { error: error },
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
		}: Context & { body: { taskId: string; userId: string } }) => {
			const taskService = new TaskService(db, redis);
			const tagService = new TagService(db, redis);
			try {
				const unAssignTag = await tagService.unAssigningTagToTask(
					body.taskId,
					body.userId,
				);
				const unAssignTask = await taskService.getTaskById(unAssignTag.taskId);
				WebSocket.broadcast("unassigned", unAssignTask);
				return unAssignTag;
			} catch (error) {
				return {
					status: 500,
					body: { error: error },
				};
			}
		},
		{
			body: t.Object({
				taskId: t.String(),
				userId: t.String(),
			}),
		},
	);
