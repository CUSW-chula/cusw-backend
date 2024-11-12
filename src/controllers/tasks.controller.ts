import { Elysia, t } from "elysia";
import { type Context } from "../shared/interfaces.shared";
import { TaskService } from "../services/tasks.service";
import { WebSocket } from "../shared/utils/websocket.utils";
import { TaskStatus, User } from "@prisma/client";
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
	.get(
		"/status/:taskId",
		async ({
			params: { taskId },
			db,
			redis,
		}: Context & { params: { taskId: string } }) => {
			const taskService = new TaskService(db, redis);
			const taskStatus = await taskService.getStatusByTaskId(taskId);
			return Response.json(taskStatus);
		},
	)
	.patch(
		"/changedStatus",
		async ({
			body,
			db,
			redis,
		}: Context & { body: { taskId: string; newTaskStatus: TaskStatus } }) => {
			const taskService = new TaskService(db, redis);
			try {
				const changedStatusTask = await taskService.changeStatus(
					body.taskId,
					body.newTaskStatus,
				);
				WebSocket.broadcast("status-changed", changedStatusTask);
				return Response.json(
					`task status changed to ${changedStatusTask.status}`,
					{ status: 200 },
				);
			} catch (error) {
				return Response.json(error, { status: 500 });
			}
		},
		{
			body: t.Object({
				taskId: t.String(),
				newTaskStatus: t.String(),
			}),
		},
	)
	.get(
		"/money/:taskId",
		async ({
			params: { taskId },
			db,
			redis,
		}: Context & { params: { taskId: string } }) => {
			const taskService = new TaskService(db, redis);
			const money = await taskService.getMoney(taskId);
			return money;
		},
	)
	.get(
		"/money/all/:taskId",
		async ({
			params: { taskId },
			db,
			redis,
		}: Context & { params: { taskId: string } }) => {
			const taskService = new TaskService(db, redis);
			const money = await taskService.getAllMoney(taskId);
			return money;
		},
	)
	.post(
		"/money",
		async ({
			body,
			db,
			redis,
		}: Context & {
			body: {
				taskID: string;
				budget: number;
				advance: number;
				expense: number;
			};
		}) => {
			const taskService = new TaskService(db, redis);
			try {
				await taskService.addMoney(
					body.taskID,
					body.budget,
					body.advance,
					body.expense,
				);
				return Response.json("Success", { status: 200 });
			} catch (error) {
				if (error instanceof Error) {
					return Response.json(error.message, { status: 400 });
				}
				// Handle unexpected errors
				return Response.json("Internal server error", { status: 500 });
			}
		},
		{
			body: t.Object({
				taskID: t.String(),
				budget: t.Number(),
				advance: t.Number(),
				expense: t.Number(),
			}),
		},
	)

	.delete(
		"/money",
		async ({ body, db, redis }: Context & { body: { taskID: string } }) => {
			const taskService = new TaskService(db, redis);
			try {
				await taskService.getTaskById(body.taskID);
				await taskService.deleteMoney(body.taskID, 0, 0, 0);
				return Response.json("Success", { status: 200 });
			} catch (error) {
				if (error instanceof Error) {
					return Response.json(error.message, { status: 400 });
				}
				// Handle unexpected errors
				return Response.json("Internal Server error", { status: 500 });
			}
		},
		{
			body: t.Object({
				taskID: t.String(),
			}),
		},
	);
