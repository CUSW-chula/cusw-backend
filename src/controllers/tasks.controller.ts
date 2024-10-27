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
	.patch(
		"/emoji",
		async ({ body, db, redis }: Context & { body: EmojiTaskUser }) => {
			const taskService = new TaskService(db, redis);
			try {
				const emoji = await taskService.updateEmojiByTaskId(
					body.id,
					body.emoji,
					body.userId,
					body.taskId,
				);
				WebSocket.broadcast("updateEmoji", emoji);
				return { status: 200, body: { message: "Success", emoji } };
			} catch (_error) {
				return {
					status: 500,
					body: { error: _error },
				};
			}
		},
		{
			body: t.Object({
				id: t.String(),
				emoji: t.String(),
				userId: t.String(),
				taskId: t.String(),
			}),
		},
	);
