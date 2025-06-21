import { type Cookie, Elysia, t } from "elysia";
import { ProjectService } from "../services/projects.service";
import { Project, type Context } from "../../shared/interfaces.shared";
import { WebSocket as WebSocket } from "../../shared/utils/websocket.utils";
import { PermissionException } from "../../core/exception.core";
import { UserService } from "../services/users.service";

export const DashboardController = new Elysia({
	prefix: "/dashboard",
	tags: ["Dashboard", "Version 2"],
})
	.get(
		"/project",
		async ({
			db,
			redis,
			cookie: { session },
		}: Context & { cookie: { session: Cookie<string> } }) => {
			if (!session?.value) throw new PermissionException("Unauthorized");

			const projectService = new ProjectService(db, redis);

			const data = await projectService.getSummaryByTag();

			return data;
		},
		{
			detail: {
				summary: "Get project dashboard summary",
			},
		},
	)
	.get(
		"/project/:projectId",
		async ({
			params: { projectId },
			db,
			redis,
			cookie: { session },
		}: Context & {
			params: { projectId: string };
			cookie: { session: Cookie<string> };
		}) => {
			if (!session?.value) throw new PermissionException("Unauthorized");

			const projectService = new ProjectService(db, redis);

			const data = await projectService.getSummaryByTagWithProjectId(projectId);

			return data;
		},
		{
			detail: {
				summary: "Get user project dashboard summary by project id",
			},
		},
	)
	.get(
		"/workload",
		async ({
			db,
			redis,
			cookie: { session },
		}: Context & { cookie: { session: Cookie<string> } }) => {
			if (!session?.value) throw new PermissionException("Unauthorized");

			const userService = new UserService(db, redis);

			const data = await userService.getWorkloadDashboard();

			return data;
		},
		{
			detail: {
				summary: "Get workload dashboard data for all users",
			},
		},
	);