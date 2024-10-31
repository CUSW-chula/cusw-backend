import { Elysia, t } from "elysia";
import { type Context } from "../shared/interfaces.shared";
import { TaskService } from "../services/tasks.service";
import { WebSocket } from "../shared/utils/websocket.utils";
import { $Enums, User } from "@prisma/client";
import { UserService } from "../services/users.service";
import { ActivityService } from "../services/activity-logs.service";

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
			const activityService = new ActivityService(db, redis);
			try {
				const assignTask = await taskService.assigningTaskToUser(
					body.taskId,
					body.userId,
				);
				const getUserName = await userService.getUserById(body.userId);
				const usersAssign = await userService.getUserById(assignTask.userId);
				if (!getUserName) {
					throw new Error("User not found");
				}
				WebSocket.broadcast("assigned", usersAssign);
				const assignActivity = await activityService.postActivity(
					body.taskId,
					$Enums.ActivityAction.ASSIGNED,
					"to " + getUserName.name,
					body.userId,
				);
				WebSocket.broadcast("activity", assignActivity);
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
			const activityService = new ActivityService(db, redis);
			try {
				const unAssignTask = await taskService.unAssigningTaskToUser(
					body.taskId,
					body.userId,
				);
				const unAssignUser = await userService.getUserById(unAssignTask.userId);
				const getUserName = await userService.getUserById(body.userId);
				if (!getUserName) {
					throw new Error("User not found");
				}
				WebSocket.broadcast("unassigned", unAssignUser);
				const unassignActivity = await activityService.postActivity(
					body.taskId,
					$Enums.ActivityAction.UNASSIGNED,
					"to " + getUserName.name,
					body.userId,
				);
				WebSocket.broadcast("activity", unassignActivity);
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
