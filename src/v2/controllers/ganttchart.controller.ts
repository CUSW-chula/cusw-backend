import { type Cookie, Elysia, t } from "elysia";
import { ProjectService } from "../services/projects.service";
import { type Context } from "../../shared/interfaces.shared";
import { PermissionException } from "../../core/exception.core";

export const GanttChartController = new Elysia({
	prefix: "/ganttchart",
	tags: ["Gantt Chart", "Version 2"],
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
			const projects = await projectService.getganttdata();
			return projects;
		},
		{
			detail: {
				summary: "Get all projects for Gantt Chart",
			},
		},
	)
	.get(
		"/:projectid",
		async ({
			params: { projectid },
			db,
			redis,
			cookie: { session },
		}: Context & {
			params: { projectid: string };
			cookie: { session: Cookie<string> };
		}) => {
			if (!session?.value) throw new PermissionException("Unauthorized");

			const projectService = new ProjectService(db, redis);
			const project =
				await projectService.getGanttChartDataByProjectId(projectid);
			return project;
		},
		{
			detail: {
				summary: "Get each projects for Gantt Chart by project id",
			},
		},
	);
