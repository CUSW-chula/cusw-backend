import { type Cookie, Elysia, t } from "elysia";
import { Task, type Context } from "../../shared/interfaces.shared";
import { TaskService } from "../services/tasks.service";
import { WebSocket } from "../../shared/utils/websocket.utils";
import { TaskStatus, EmojiTaskUser, $Enums } from "@prisma/client";
import { ActivityService } from "../services/activity-logs.service";
import { EmojiClassService } from "../services/tasks/emoji.tasks.service";
import { MoneyClassService } from "../services/tasks/money.tasks.service";
import { UserTaskClassService } from "../services/tasks/user.tasks.service";

export const TaskController = new Elysia({
	prefix: "/tasks",
	tags: ["Tasks", "Version 2"],
})
	.get(
		"/",
		async ({ db, redis }: Context) => {
			const taskService = new TaskService(db, redis);
			const tasks = await taskService.getAllTask();
			return tasks;
		},
		{
			detail: {
				summary: "Get all tasks",
			},
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
		{
			detail: {
				summary: "Get task by task id with detail (creator and members)",
			},
		},
	)
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
		{
			detail: {
				summary: "Get all tasks by project id",
			},
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
		{
			detail: {
				summary: "Get all child tasks by parent task id",
			},
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
			const task = await taskService.deleteTask(id);
			return task;
		},
		{
			detail: {
				summary: "Delete task by task id",
			},
		},
	)
	//patch data only task title and description
	.patch(
		"/:id",
		async ({
			params: { id },
			body,
			db,
			redis,
		}: Context & {
			params: { id: string };
			body: {
				title: string;
				description: string;
			};
		}) => {
			const taskService = new TaskService(db, redis);
			const updateTaskId = await taskService.updateTask(
				id,
				body.title,
				body.description,
			);
			WebSocket.broadcast("taskid edited", updateTaskId);
			return updateTaskId;
		},
		{
			body: t.Object({
				title: t.Optional(t.String()),
				description: t.Optional(t.String()),
			}),
			detail: {
				summary: "Update task title and description",
			},
		},
	)
	.post(
		"/template/:id",
		async ({
			params: { id },
			body,
			db,
			redis,
			cookie: { session },
		}: Context & {
			body: Task[];
			params: { id: string };
			cookie: { session: Cookie<string> };
		}) => {
			const taskService = new TaskService(db, redis);
			const userId = session.value;
			const task = await taskService.createTaskWithSubTaskRecursive(
				body,
				userId,
				id,
			);
			return Response.json(task, { status: 200 });
		},
		{
			detail: {
				summary: "Create a new task from template",
			},
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
				budget: number;
				advance: number;
				expense: number;
				status: $Enums.TaskStatus;
				parentTaskId: string;
				projectId: string;
				startDate: Date | null;
				endDate: Date | null;
			};
			cookie: { session: Cookie<string> };
		}) => {
			const taskService = new TaskService(db, redis);
			const activityService = new ActivityService(db, redis);
			const userId = session.value;
			const task = await taskService.createTask({
				title: body.title,
				description: body.description,
				budget: body.budget,
				advance: body.advance,
				expense: body.expense,
				status: body.status,
				parentTaskId: body.parentTaskId,
				projectId: body.projectId,
				startDate: body.startDate,
				endDate: body.endDate,
				createdById: userId,
			});
			WebSocket.broadcast("task", task);
			const createTaskActivity = await activityService.postActivity(
				task.id,
				$Enums.ActivityAction.CREATED,
				"this task",
				userId,
			);
			WebSocket.broadcast("activity", createTaskActivity);
			return Response.json(task, { status: 200 });
		},
		{
			body: t.Object({
				title: t.String(),
				description: t.String(),
				budget: t.Number(),
				advance: t.Number(),
				expense: t.Number(),
				status: t.String(),
				parentTaskId: t.String(),
				projectId: t.String(),
				startDate: t.Union([t.Date(), t.Null()]),
				endDate: t.Union([t.Date(), t.Null()]),
			}),
			detail: {
				summary: "Create a new task",
			},
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
			const userTaskClassService = new UserTaskClassService(db, redis);
			const activityService = new ActivityService(db, redis);
			const userId = session.value;
			const assignTask = await userTaskClassService.assigningTaskToUser(
				body.taskId,
				body.userId,
			);
			const usersAssign = assignTask.user;
			WebSocket.broadcast("assigned", usersAssign);
			WebSocket.broadcast("status-changed", assignTask.task);
			const assignActivity = await activityService.postActivity(
				body.taskId,
				$Enums.ActivityAction.ASSIGNED,
				"this task to " + usersAssign?.name,
				userId,
			);
			WebSocket.broadcast("activity", assignActivity);
			return assignTask;
		},
		{
			body: t.Object({
				taskId: t.String(),
				userId: t.String(),
			}),
			detail: {
				summary: "Assign task to user",
			},
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
			const userTaskClassService = new UserTaskClassService(db, redis);
			const activityService = new ActivityService(db, redis);
			const userId = session.value;
			const unAssignTask = await userTaskClassService.unAssigningTaskToUser(
				body.taskId,
				body.userId,
			);
			const unAssignUser = unAssignTask.user;
			WebSocket.broadcast("unassigned", unAssignUser);
			WebSocket.broadcast("status-changed", unAssignTask.task);
			const unassignActivity = await activityService.postActivity(
				body.taskId,
				$Enums.ActivityAction.UNASSIGNED,
				"this task from " + unAssignUser?.name,
				userId,
			);
			WebSocket.broadcast("activity", unassignActivity);
			return unAssignTask;
		},
		{
			body: t.Object({
				taskId: t.String(),
				userId: t.String(),
			}),
			detail: {
				summary: "Unassign task from user",
			},
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
		},
		{
			body: t.Object({
				taskId: t.String(),
				newTaskStatus: t.String(),
			}),
			detail: {
				summary: "Change task status",
			},
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
			const emojiClassService = new EmojiClassService(db, redis);
			const userId = session.value;
			const newEmoji = await emojiClassService.addEmojiOnTask(
				body.emoji,
				userId,
				body.taskId,
			);
			WebSocket.broadcast("addEmoji", newEmoji);
			return newEmoji;
		},
		{
			body: t.Object({
				taskId: t.String(),
				emoji: t.String(),
			}),
			detail: {
				tags: ["Emoji", "Version 2"],
				summary: "Add emoji to task",
			},
		},
	)
	.get(
		"/emoji/:taskId/:userId",
		async ({
			params: { taskId, userId },
			db,
			redis,
		}: Context & { params: { taskId: string; userId: string } }) => {
			const emojiClassService = new EmojiClassService(db, redis);
			const check: Boolean =
				await emojiClassService.checkEmojiUserIdAndByTaskId(taskId, userId);
			return Response.json(check);
		},
		{
			detail: {
				tags: ["Emoji", "Version 2"],
				summary: "Check is user already add emoji to task",
			},
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
			const emojiClassService = new EmojiClassService(db, redis);
			const userId = session.value;
			const emoji = await emojiClassService.updateEmojiByTaskId(
				body.emoji,
				userId,
				body.taskId,
			);
			WebSocket.broadcast("updateEmoji", emoji);
			return Response.json("Success" + emoji, { status: 200 });
		},
		{
			body: t.Object({
				emoji: t.String(),
				taskId: t.String(),
			}),
			detail: {
				tags: ["Emoji", "Version 2"],
				summary: "Update emoji on task",
			},
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
		{
			detail: {
				summary: "Get all parent task recursively",
			},
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
		{
			detail: {
				summary: "Get parent task by task id",
			},
		},
	)
	.post(
		"/money",
		async ({
			body,
			db,
			redis,
			cookie: { session },
		}: Context & {
			body: {
				taskID: string;
				budget: number;
				advance: number;
				expense: number;
			};
			cookie: { session: Cookie<string> };
		}) => {
			const moneyClassService = new MoneyClassService(db, redis);
			const activityService = new ActivityService(db, redis);
			const userId = session.value;
			const addMoney = await moneyClassService.addMoney(
				body.taskID,
				body.budget,
				body.advance,
				body.expense,
			);
			WebSocket.broadcast("addMoney", addMoney);
			const moneyDetails = [];
			if (body.budget) moneyDetails.push(`budget ${body.budget}`);
			if (body.advance) moneyDetails.push(`advance ${body.advance}`);
			if (body.expense) moneyDetails.push(`expense ${body.expense}`);
			const formatMoney = (amount: number) => amount.toLocaleString("en-US");
			const addMoneyActivity = await activityService.postActivity(
				body.taskID,
				$Enums.ActivityAction.ADDED,
				"this task with " +
					moneyDetails
						.map((detail) =>
							detail.replace(/\d+/, (match) => formatMoney(Number(match))),
						)
						.join(", ") +
					" Baht",
				userId,
			);
			WebSocket.broadcast("activity", addMoneyActivity);
			return Response.json("Success", { status: 200 });
		},
		{
			body: t.Object({
				taskID: t.String(),
				budget: t.Number(),
				advance: t.Number(),
				expense: t.Number(),
			}),
			detail: {
				tags: ["Money", "Version 2"],
				summary: "Add money to task",
			},
		},
	)

	.delete(
		"/money",
		async ({ body, db, redis }: Context & { body: { taskID: string } }) => {
			const moneyClassService = new MoneyClassService(db, redis);
			const activityService = new ActivityService(db, redis);
			const deleteMoney = await moneyClassService.deleteMoney(
				body.taskID,
				0,
				0,
				0,
			);
			WebSocket.broadcast("deleteMoney", deleteMoney);
			const deleteMoneyActivity = await activityService.postActivity(
				body.taskID,
				$Enums.ActivityAction.DELETED,
				"this task money",
				"",
			);
			WebSocket.broadcast("activity", deleteMoneyActivity);
			return Response.json("Success", { status: 200 });
		},
		{
			body: t.Object({
				taskID: t.String(),
			}),
			detail: {
				tags: ["Money", "Version 2"],
				summary: "Delete money from task",
			},
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
			const updateDate = await taskService.updateDate(
				body.taskID,
				body.startDate,
				body.endDate,
			);
			WebSocket.broadcast("date", updateDate);
			return Response.json("Success", { status: 200 });
		},
		{
			body: t.Object({
				taskID: t.String(),
				startDate: t.Union([t.Date(), t.Null()]),
				endDate: t.Union([t.Date(), t.Null()]),
			}),
			detail: {
				tags: ["Date", "Version 2"],
				summary: "Update task date",
			},
		},
	);
