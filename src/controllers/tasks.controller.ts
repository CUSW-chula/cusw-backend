import { type Cookie, Elysia, t } from "elysia";
import { type Context } from "../shared/interfaces.shared";
import { TaskService } from "../services/tasks.service";
import { WebSocket } from "../shared/utils/websocket.utils";
import { EmojiTaskUser, Task, $Enums, User } from "@prisma/client";
import { UserService } from "../services/users.service";
import { ActivityService } from "../services/activity-logs.service";

export const TaskController = new Elysia({ prefix: "/tasks" })
	.get("/", async ({ db, redis }: Context) => {
		const taskService = new TaskService(db, redis);
		const tasks = await taskService.getAllTask();
		return tasks;
	})

	.get(
		"/project/:projectid",
		async ({
			params: { id },
			db,
			redis,
		}: Context & { params: { id: string } }) => {
			const taskService = new TaskService(db, redis);
			const task = await taskService.getTaskByProjectId(id);
			return task;
		},
	)
	.get(
		"/child/:parentid",
		async ({
			params: { parentid },
			db,
			redis,
		}: Context & { params: { parentid: string } }) => {
			const taskService = new TaskService(db, redis);
			const task = await taskService.getTaskByParentTaskId(parentid);
			return task;
		},
	)
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
		"/title/:id",
		async ({
			params: { id },
			db,
			redis,
		}: Context & { params: { id: string } }) => {
			const taskService = new TaskService(db, redis);
			const title = await taskService.getTitleByTaskId(id);
			return title;
		},
	)
	.get(
		"/description/:id",
		async ({
			params: { id },
			db,
			redis,
		}: Context & { params: { id: string } }) => {
			const taskService = new TaskService(db, redis);
			const description = await taskService.getDescriptionByTaskId(id);
			return description;
		},
	)
	.patch(
		"/title",
		async ({
			body,
			db,
			redis,
			cookie: { session },
		}: Context & {
			body: {
				taskId: string;
				title: string;
			};
			cookie: { session: Cookie<string> };
		}) => {
			const taskService = new TaskService(db, redis);
			const userId = session.value;
			try {
				const updateTitle = await taskService.updateTitleByTaskId(
					body.taskId,
					userId,
					body.title,
				);
				WebSocket.broadcast("title edited", updateTitle);
				return updateTitle;
			} catch (_error) {
				const error = _error as Error;
				return Response.json(error.message, { status: 500 });
			}
		},
		{
			body: t.Object({
				taskId: t.String(),
				title: t.String(),
			}),
		},
	)

	.patch(
		"/description",
		async ({
			body,
			db,
			redis,
			cookie: { session },
		}: Context & {
			body: {
				taskId: string;
				description: string;
			};
			cookie: { session: Cookie<string> };
		}) => {
			const taskService = new TaskService(db, redis);
			const userId = session.value;
			try {
				const updateDescription = await taskService.updateDescriptionByTaskId(
					body.taskId,
					userId,
					body.description,
				);
				WebSocket.broadcast("description edited", updateDescription);
				return updateDescription;
			} catch (_error) {
				const error = _error as Error;
				return Response.json(error.message, { status: 500 });
			}
		},
		{
			body: t.Object({
				taskId: t.String(),
				description: t.String(),
			}),
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
	//patch data only task title and description
	.patch(
		"/",
		async ({
			body,
			db,
			redis,
		}: Context & {
			body: {
				taskId: string;
				title: string;
				description: string;
			};
		}) => {
			const taskService = new TaskService(db, redis);
			try {
				const updateTaskId = await taskService.updateTask(
					body.taskId,
					body.title,
					body.description,
				);
				WebSocket.broadcast("taskid edited", updateTaskId);
				return updateTaskId;
			} catch (_error) {
				const error = _error as Error;
				return Response.json(error.message, { status: 500 });
			}
		},
		{
			body: t.Object({
				taskId: t.String(),
				title: t.String(),
				description: t.String(),
			}),
		},
	)

	.post(
		"/",
		async ({
			body,
			db,
			redis,
			cookie: { session },
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
				startDate: Date;
				endDate: Date;
			};
			cookie: { session: Cookie<string> };
		}) => {
			const taskService = new TaskService(db, redis);
			const userId = session.value;
			try {
				const task = await taskService.createTask(
					body.title,
					body.description,
					body.projectId,
					body.parentTaskId,
					body.startDate,
					body.endDate,
					userId,
					body.status,
					body.expectedBudget,
					body.realBudget,
					body.usedBudget,
				);
				WebSocket.broadcast("task", task);

				return Response.json(task, { status: 200 });
			} catch (_error) {
				const error = _error as Error;
				return Response.json(error.message, { status: 500 });
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
			const activityService = new ActivityService(db, redis);
			try {
				const assignTask = await taskService.assigningTaskToUser(
					body.taskId,
					body.userId,
				);
				const usersAssign = await userService.getUserById(assignTask.userId);
				if (!usersAssign) {
					throw new Error("User not found");
				}
				WebSocket.broadcast("assigned", usersAssign);
				const assignActivity = await activityService.postActivity(
					body.taskId,
					$Enums.ActivityAction.ASSIGNED,
					"this task to " + usersAssign.name,
					body.userId,
				);
				WebSocket.broadcast("activity", assignActivity);
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
			const activityService = new ActivityService(db, redis);
			try {
				const unAssignTask = await taskService.unAssigningTaskToUser(
					body.taskId,
					body.userId,
				);
				const unAssignUser = await userService.getUserById(unAssignTask.userId);
				if (!unAssignUser) {
					throw new Error("User not found");
				}
				WebSocket.broadcast("unassigned", unAssignUser);
				const unassignActivity = await activityService.postActivity(
					body.taskId,
					$Enums.ActivityAction.UNASSIGNED,
					"this task from " + unAssignUser.name,
					body.userId,
				);
				WebSocket.broadcast("activity", unassignActivity);
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
			cookie: { session },
		}: Context & {
			body: { taskId: string; emoji: string };
			cookie: { session: Cookie<string> };
		}) => {
			const taskService = new TaskService(db, redis);
			const userId = session.value;
			try {
				const newEmoji = await taskService.addEmojiOnTask(
					body.emoji,
					userId,
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
		async ({
			body,
			db,
			redis,
			cookie: { session },
		}: Context & {
			body: EmojiTaskUser;
			cookie: { session: Cookie<string> };
		}) => {
			const taskService = new TaskService(db, redis);
			const userId = session.value;
			try {
				const emoji = await taskService.updateEmojiByTaskId(
					body.emoji,
					userId,
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
				taskId: t.String(),
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
