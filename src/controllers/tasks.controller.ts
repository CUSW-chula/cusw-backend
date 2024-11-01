import { Elysia, t } from "elysia";
import { type Context } from "../shared/interfaces.shared";
import { TaskService } from "../services/tasks.service";
import { WebSocket } from "../shared/utils/websocket.utils";
import { $Enums, User } from "@prisma/client";
import { UserService } from "../services/users.service";
import { TaskStatus, type Task } from "@prisma/client";

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
		"/",
		async ({
			body,
			db,
			redis,
		}: Context & {
			body: {
				title: string;
				description: string;
				expectedBudget: number;
				realBudget: number;
				usedBudget: number;
				status: $Enums.TaskStatus;
				parentTaskId: string;
				projectId: string;
				createdById: string;
				startDate: Date;
				endDate: Date;
			};
		}) => {
			const taskService = new TaskService(db, redis);
			try {
				const task = await taskService.createTask(
					body.title,
					body.description,
					body.projectId,
					body.parentTaskId,
					body.startDate,
					body.endDate,
					body.createdById,
					body.status,
					body.expectedBudget,
					body.realBudget,
					body.usedBudget,
				);
				WebSocket.broadcast("task", task);

				return { status: 200, body: { message: "Success" } };
			} catch (error) {
				return {
					status: 500,
					body: { error: (error as Error).message || "Internal Server Error" },
				};
			}
		},
		{
			body: t.Object({
				title: t.String(),
				description: t.String(),
				expectedBudget: t.Number(),
				realBudget: t.Number(),
				usedBudget: t.Number(),
				status: t.String(),
				parentTaskId: t.String(),
				projectId: t.String(),
				createdById: t.String(),
				startDate: t.Date(),
				endDate: t.Date(),
			}),
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
	);
