import { type Cookie, Elysia, t } from "elysia";
import { Task, type Context } from "../../shared/interfaces.shared";
import { TaskService } from "../services/tasks.service";
import { WebSocket } from "../../shared/utils/websocket.utils";
import { TaskStatus, EmojiTaskUser, $Enums } from "../../../generated";
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
		"/user/:userid",
		async ({
			params: { userid },
			db,
			redis,
		}: Context & { params: { userid: string } }) => {
			const taskService = new TaskService(db, redis);
			const tasks = await taskService.getTaskByUserId(userid);
			return tasks;
		},
		{
			detail: {
				summary: "Get task by User id with detail (creator and members)",
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
			WebSocket.broadcast(`title:${id}`, updateTaskId);
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
		"/:projectId",
		async ({
			body,
			params: { projectId },
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
				startDate: Date | null;
				endDate: Date | null;
			};
			params: { projectId: string };
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
				projectId: projectId,
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
			WebSocket.broadcast(`activity:${task.id}`, createTaskActivity);
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
				startDate: t.Union([t.Date(), t.Null()]),
				endDate: t.Union([t.Date(), t.Null()]),
			}),
			detail: {
				summary: "Create a new task",
			},
		},
	)
	.post(
		"/duplicateTask/:projectId",
		async ({
			body,
			params: { projectId },
			db,
			redis,
			cookie: { session },
		}: Context & {
			body: Task[];
			params: { projectId: string };
			cookie: { session: Cookie<string> };
		}) => {
			const taskService = new TaskService(db, redis);
			const userId = session.value;
			const task = await taskService.createTaskForDuplicate(
				body,
				userId,
				projectId,
			);
			return Response.json(task, { status: 200 });
		},
	)

	.post(
		"/assign/:taskId",
		async ({
			params: { taskId },
			body,
			db,
			redis,
			cookie: { session },
		}: Context & {
			body: { userId: string };
			params: { taskId: string };
			cookie: { session: Cookie<string> };
		}) => {
			const userTaskClassService = new UserTaskClassService(db, redis);
			const activityService = new ActivityService(db, redis);
			const userId = session.value;
			const assignTask = await userTaskClassService.assigningTaskToUser(
				taskId,
				body.userId,
			);
			const usersAssign = assignTask.user;
			WebSocket.broadcast(`assigned:${taskId}`, usersAssign);
			WebSocket.broadcast(`status-changed:${taskId}`, assignTask.task);
			const assignActivity = await activityService.postActivity(
				taskId,
				$Enums.ActivityAction.ASSIGNED,
				"this task to " + usersAssign?.name,
				userId,
			);
			WebSocket.broadcast(`activity:${taskId}`, assignActivity);
			return assignTask;
		},
		{
			body: t.Object({
				userId: t.String(),
			}),
			detail: {
				summary: "Assign task to user",
			},
		},
	)
	.delete(
		"/unassigned/:taskId",
		async ({
			body,
			params: { taskId },
			db,
			redis,
			cookie: { session },
		}: Context & {
			body: { userId: string };
			params: { taskId: string };
			cookie: { session: Cookie<string> };
		}) => {
			const userTaskClassService = new UserTaskClassService(db, redis);
			const activityService = new ActivityService(db, redis);
			const userId = session.value;
			const unAssignTask = await userTaskClassService.unAssigningTaskToUser(
				taskId,
				body.userId,
			);
			const unAssignUser = unAssignTask.user;
			WebSocket.broadcast(`unassigned:${taskId}`, unAssignUser);
			WebSocket.broadcast(`status-changed:${taskId}`, unAssignTask.task);
			const unassignActivity = await activityService.postActivity(
				taskId,
				$Enums.ActivityAction.UNASSIGNED,
				"this task from " + unAssignUser?.name,
				userId,
			);
			WebSocket.broadcast(`activity:${taskId}`, unassignActivity);
			return unAssignTask;
		},
		{
			body: t.Object({
				userId: t.String(),
			}),
			detail: {
				summary: "Unassign task from user",
			},
		},
	)
	.patch(
		"/status/:taskId",
		async ({
			params: { taskId },
			body,
			db,
			redis,
			cookie: { session },
		}: Context & {
			body: { newTaskStatus: TaskStatus };
			params: { taskId: string };
			cookie: { session: Cookie<string> };
		}) => {
			const taskService = new TaskService(db, redis);
			const activityService = new ActivityService(db, redis);
			const userId = session.value;
			const changedStatusTask = await taskService.changeStatus(
				taskId,
				body.newTaskStatus,
			);
			WebSocket.broadcast(`status-changed:${taskId}`, changedStatusTask);

			const assignActivity = await activityService.postActivity(
				taskId,
				$Enums.ActivityAction.ADDED,
				"this task to " + changedStatusTask.status.toLowerCase(),
				userId,
			);
			WebSocket.broadcast(`activity:${taskId}`, assignActivity);
			return Response.json(
				`task status changed to ${changedStatusTask.status}`,
				{ status: 200 },
			);
		},
		{
			body: t.Object({
				newTaskStatus: t.String(),
			}),
			detail: {
				summary: "Change task status",
			},
		},
	)
	.post(
		"/emoji/:taskId",
		async ({
			body,
			db,
			redis,
			params: { taskId },
			cookie: { session },
		}: Context & {
			body: { emoji: string };
			params: { taskId: string };
			cookie: { session: Cookie<string> };
		}) => {
			const emojiClassService = new EmojiClassService(db, redis);
			const userId = session.value;
			const newEmoji = await emojiClassService.addEmojiOnTask(
				body.emoji,
				userId,
				taskId,
			);
			WebSocket.broadcast("addEmoji", newEmoji);
			return newEmoji;
		},
		{
			body: t.Object({
				emoji: t.String(),
			}),
			detail: {
				tags: ["Emoji", "Version 2"],
				summary: "Add emoji to task",
			},
		},
	)
	.get(
		"/emoji/:taskId",
		async ({
			params: { taskId },
			db,
			cookie: { session },
			redis,
		}: Context & {
			params: { taskId: string };
			cookie: { session: Cookie<string> };
		}) => {
			const userId = session.value;
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
		"/emoji/:taskId",
		async ({
			body,
			params: { taskId },
			db,
			redis,
			cookie: { session },
		}: Context & {
			body: Partial<EmojiTaskUser>;
			params: { taskId: string };
			cookie: { session: Cookie<string> };
		}) => {
			const emojiClassService = new EmojiClassService(db, redis);
			const userId = session.value;
			const emoji = await emojiClassService.updateEmojiByTaskId(
				body.emoji ?? "",
				userId,
				taskId,
			);
			WebSocket.broadcast("updateEmoji", emoji);
			return Response.json("Success" + emoji, { status: 200 });
		},
		{
			body: t.Object({
				emoji: t.String(),
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
		"/money/:taskId",
		async ({
			body,
			params: { taskId },
			db,
			redis,
			cookie: { session },
		}: Context & {
			body: {
				budget: number;
				advance: number;
				expense: number;
			};
			params: { taskId: string };
			cookie: { session: Cookie<string> };
		}) => {
			const moneyClassService = new MoneyClassService(db, redis);
			const activityService = new ActivityService(db, redis);
			const userId = session.value;
			const addMoney = await moneyClassService.addMoney(
				taskId,
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
				taskId,
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
			WebSocket.broadcast(`activity:${taskId}`, addMoneyActivity);
			return Response.json("Success", { status: 200 });
		},
		{
			body: t.Object({
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
		"/money/:taskId",
		async ({
			params: { taskId },
			db,
			redis,
			cookie: { session },
		}: Context & {
			cookie: { session: Cookie<string> };
			params: { taskId: string };
		}) => {
			const moneyClassService = new MoneyClassService(db, redis);
			const activityService = new ActivityService(db, redis);
			const userId = session.value;
			const deleteMoney = await moneyClassService.deleteMoney(taskId, 0, 0, 0);
			WebSocket.broadcast("deleteMoney", deleteMoney);
			const deleteMoneyActivity = await activityService.postActivity(
				taskId,
				$Enums.ActivityAction.DELETED,
				"this task money",
				userId,
			);
			WebSocket.broadcast(`activity:${taskId}`, deleteMoneyActivity);
			return Response.json("Success", { status: 200 });
		},
		{
			detail: {
				tags: ["Money", "Version 2"],
				summary: "Delete money from task",
			},
		},
	)
	.patch(
		"/date/:taskId",
		async ({
			body,
			params: { taskId },
			db,
			redis,
		}: Context & {
			body: {
				startDate: Date | null;
				endDate: Date | null;
			};
			params: { taskId: string };
		}) => {
			const taskService = new TaskService(db, redis);
			const updateDate = await taskService.updateDate(
				taskId,
				body.startDate,
				body.endDate,
			);
			WebSocket.broadcast("date", updateDate);
			return Response.json("Success", { status: 200 });
		},
		{
			body: t.Object({
				startDate: t.Union([t.Date(), t.Null()]),
				endDate: t.Union([t.Date(), t.Null()]),
			}),
			detail: {
				tags: ["Date", "Version 2"],
				summary: "Update task date",
			},
		},
	);
