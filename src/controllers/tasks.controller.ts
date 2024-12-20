import { type Cookie, Elysia, t } from "elysia";
import { type Context } from "../shared/interfaces.shared";
import { TaskService } from "../services/tasks.service";
import { WebSocket } from "../shared/utils/websocket.utils";
import { TaskStatus, EmojiTaskUser, Task, $Enums, User } from "@prisma/client";
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
			params: { projectid },
			db,
			redis,
		}: Context & { params: { projectid: string } }) => {
			const taskService = new TaskService(db, redis);
			const task = await taskService.getTaskByProjectId(projectid);
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
	.delete(
		"/:id",
		async ({
			params: { id },
			db,
			redis,
		}: Context & { params: { id: string } }) => {
			const taskService = new TaskService(db, redis);
			try {
				const task = await taskService.deleteTask(id);
				return task;
			} catch (error) {
				if (error instanceof Error) {
					return Response.json(error.message, { status: 400 });
				}
				// Handle unexpected errors
				return Response.json("Internal Server error", { status: 500 });
			}
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
			const activityService = new ActivityService(db, redis);
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
				const createTaskActivity = await activityService.postActivity(
					task.id,
					$Enums.ActivityAction.CREATED,
					"this task",
					userId,
				);
				WebSocket.broadcast("activity", createTaskActivity);
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
			cookie: { session },
		}: Context & {
			body: { taskId: string; userId: string };
			cookie: { session: Cookie<string> };
		}) => {
			const taskService = new TaskService(db, redis);
			const userService = new UserService(db, redis);
			const activityService = new ActivityService(db, redis);
			const userId = session.value;
			try {
				const assignTask = await taskService.assigningTaskToUser(
					body.taskId,
					body.userId,
				);
				const usersAssign = await userService.getUserById(assignTask.userId);
				if (!usersAssign) {
					return Response.json({ error: "User not found" }, { status: 400 });
				}
				WebSocket.broadcast("assigned", usersAssign);
				const assignActivity = await activityService.postActivity(
					body.taskId,
					$Enums.ActivityAction.ASSIGNED,
					"this task to " + usersAssign.name,
					userId,
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
			cookie: { session },
		}: Context & {
			body: { taskId: string; userId: string };
			cookie: { session: Cookie<string> };
		}) => {
			const taskService = new TaskService(db, redis);
			const userService = new UserService(db, redis);
			const activityService = new ActivityService(db, redis);
			const userId = session.value;
			try {
				const unAssignTask = await taskService.unAssigningTaskToUser(
					body.taskId,
					body.userId,
				);
				const unAssignUser = await userService.getUserById(unAssignTask.userId);
				if (!unAssignUser) {
					return Response.json({ error: "User not found" }, { status: 400 });
				}
				WebSocket.broadcast("unassigned", unAssignUser);
				const unassignActivity = await activityService.postActivity(
					body.taskId,
					$Enums.ActivityAction.UNASSIGNED,
					"this task from " + unAssignUser.name,
					userId,
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
		"/status",
		async ({
			body,
			db,
			redis,
			cookie: { session },
		}: Context & {
			body: { taskId: string; newTaskStatus: TaskStatus };
			cookie: { session: Cookie<string> };
		}) => {
			const taskService = new TaskService(db, redis);
			const activityService = new ActivityService(db, redis);
			const userId = session.value;
			try {
				const changedStatusTask = await taskService.changeStatus(
					body.taskId,
					body.newTaskStatus,
				);
				WebSocket.broadcast("status-changed", changedStatusTask);
				const assignActivity = await activityService.postActivity(
					body.taskId,
					$Enums.ActivityAction.ADDED,
					"this task to " + changedStatusTask.status.toLowerCase(),
					userId,
				);
				WebSocket.broadcast("activity", assignActivity);
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
		"/parent-recursive/:taskId",
		async ({
			params: { taskId },
			db,
			redis,
		}: Context & { params: { taskId: string } }) => {
			const taskService = new TaskService(db, redis);
			const parentTask = await taskService.getRecursiveParentTaskList(taskId);
			return parentTask;
		},
	)

	.get(
		"/parent/:taskId",
		async ({
			params: { taskId },
			db,
			redis,
		}: Context & { params: { taskId: string } }) => {
			const taskService = new TaskService(db, redis);
			const parentTask = await taskService.getParentTask(taskId);
			return parentTask;
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
				const addMoney = await taskService.addMoney(
					body.taskID,
					body.budget,
					body.advance,
					body.expense,
				);
				WebSocket.broadcast("addMoney", addMoney);
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
				const deleteMoney = await taskService.deleteMoney(body.taskID, 0, 0, 0);
				WebSocket.broadcast("deleteMoney", deleteMoney);
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
	)

	.get(
		"/date/:taskId",
		async ({
			params: { taskId },
			db,
			redis,
		}: Context & { params: { taskId: string } }) => {
			const taskService = new TaskService(db, redis);
			const date = await taskService.getDate(taskId);
			return date;
		},
	)

	.patch(
		"/date",
		async ({
			body,
			db,
			redis,
		}: Context & {
			body: {
				taskID: string;
				startDate: Date | null;
				endDate: Date | null;
			};
		}) => {
			const taskService = new TaskService(db, redis);
			try {
				const updateDate = await taskService.updateDate(
					body.taskID,
					body.startDate,
					body.endDate,
				);
				WebSocket.broadcast("date", updateDate);
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
				startDate: t.Union([t.Date(), t.Null()]),
				endDate: t.Union([t.Date(), t.Null()]),
			}),
		},
	);
