import { Elysia, t } from "elysia";
import { type Context } from "../shared/interfaces.shared";
import { TaskService } from "../services/tasks.service";
import { WebSocket } from "../shared/utils/websocket.utils";
import { EmojiTaskUser, User } from "@prisma/client";
import { UserService } from "../services/users.service";

export const TaskController = new Elysia({ prefix: "/tasks" })
	.get("/", async ({ db, redis }: Context) => {
		const taskService = new TaskService(db, redis);
		const tasks = await taskService.getAllTask();
		return tasks;
	})
	.get(
		"/:id",
		async ({
			params: { id },
			db,
			redis,
		}: Context & { params: { id: string } }) => {
			const taskService = new TaskService(db, redis);
			const task = await taskService.getTaskById(id);
			return task;
		},
	)
	.get(
		"/textedit/:id",
		async ({
			params: { id },
			db,
			redis,
		}: Context & { params: { id: string } }) => {
			const taskService = new TaskService(db, redis);
			const textedit = await taskService.getTexteditByTaskId(id);
			return textedit;
		},
	)
	.get(
		"/getassign/:taskId",
		async ({
			params: { taskId },
			db,
			redis,
		}: Context & { params: { taskId: string } }) => {
			const taskService = new TaskService(db, redis);
			const users: User[] =
				await taskService.getAsignUserInTaskByTaskId(taskId);
			return users;
		},
	)
	.post(
		"/assign",
		async ({
			body,
			db,
			redis,
		}: Context & { body: { taskId: string; userId: string } }) => {
			const taskService = new TaskService(db, redis);
			const userService = new UserService(db, redis);
			try {
				const assignTask = await taskService.assigningTaskToUser(
					body.taskId,
					body.userId,
				);
				const usersAssign = await userService.getUserById(assignTask.userId);
				WebSocket.broadcast("assigned", usersAssign);
				return assignTask;
			} catch (_error) {
				const error = _error as Error;
				return Response.json(error.message, { status: 500 });
			}
		},
		{
			body: t.Object({
				taskId: t.String(),
				userId: t.String(),
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
			const userService = new UserService(db, redis);
			try {
				const unAssignTask = await taskService.unAssigningTaskToUser(
					body.taskId,
					body.userId,
				);
				const unAssignUser = await userService.getUserById(unAssignTask.userId);
				WebSocket.broadcast("unassigned", unAssignUser);
				return unAssignTask;
			} catch (_error) {
				const error = _error as Error;
				return Response.json(error.message, { status: 500 });
			}
		},
		{
			body: t.Object({
				taskId: t.String(),
				userId: t.String(),
			}),
		},
	)
	.post(
		"/emoji",
		async ({
			body,
			db,
			redis,
		}: Context & {
			body: { taskId: string; userId: string; emoji: string };
		}) => {
			const taskService = new TaskService(db, redis);
			try {
				const newEmoji = await taskService.addEmojiOnTask(
					body.emoji,
					body.userId,
					body.taskId,
				);
				WebSocket.broadcast("addEmoji", newEmoji);
				return newEmoji;
			} catch (_error) {
				const error = _error as Error;
				return Response.json(error.message, { status: 500 });
			}
		},
		{
			body: t.Object({
				taskId: t.String(),
				userId: t.String(),
				emoji: t.String(),
			}),
		},
	)
	.get(
		"/emoji/:taskId",
		async ({
			params: { taskId },
			db,
			redis,
		}: Context & { params: { taskId: string } }) => {
			const taskService = new TaskService(db, redis);
			const emoji: EmojiTaskUser[] =
				await taskService.getAllEmojiByTaskId(taskId);
			return emoji;
		},
	)

	.get(
		"/emoji/:taskId/:userId",
		async ({
			params: { taskId, userId },
			db,
			redis,
		}: Context & { params: { taskId: string; userId: string } }) => {
			const taskService = new TaskService(db, redis);
			const check: Boolean = await taskService.checkEmojiUserIdAndByTaskId(
				taskId,
				userId,
			);
			return Response.json(check);
		},
	)

	.patch(
		"/emoji",
		async ({ body, db, redis }: Context & { body: EmojiTaskUser }) => {
			const taskService = new TaskService(db, redis);
			try {
				const emoji = await taskService.updateEmojiByTaskId(
					body.emoji,
					body.userId,
					body.taskId,
				);
				WebSocket.broadcast("updateEmoji", emoji);
				return { status: 200, body: { message: "Success", emoji } };
			} catch (_error) {
				const error = _error as Error;
				return Response.json(error.message, { status: 500 });
			}
		},
		{
			body: t.Object({
				emoji: t.String(),
				userId: t.String(),
				taskId: t.String(),
			}),
		},
	);
