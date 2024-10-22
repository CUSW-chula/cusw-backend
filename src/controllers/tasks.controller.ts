import { Elysia, t } from "elysia";
import { type Context } from "../shared/interfaces.shared";
import { TaskService } from "../services/tasks.service";
import { WebSocket } from "../shared/utils/websocket.utils";

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
	.post(
		"/",
		async ({
			body,
			db,
			redis,
		}: Context & { body: { taskId: string; userId: string } }) => {
			const taskService = new TaskService(db, redis);
			try {
				const assignTask = await taskService.assigningTaskToUser(
					body.taskId,
					body.userId,
				);
				WebSocket.broadcast("assigned", assignTask);
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
		"/",
		async ({
			body,
			db,
			redis,
		}: Context & { body: { taskId: string; userId: string } }) => {
			const taskService = new TaskService(db, redis);
			try {
				const unAssignTask = await taskService.unAssigningTaskToUser(
					body.taskId,
					body.userId,
				);
				WebSocket.broadcast("unassigned", unAssignTask);
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
