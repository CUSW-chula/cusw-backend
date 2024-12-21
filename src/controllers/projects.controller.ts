import { type Cookie, Elysia, t } from "elysia";
import { ProjectService } from "../services/projects.service";
import { type Context } from "../shared/interfaces.shared";
import { ActivityService } from "../services/activity-logs.service";
import { WebSocket } from "../shared/utils/websocket.utils";
import { $Enums } from "@prisma/client";

export const ProjectController = new Elysia({ prefix: "/projects" })
	.get("/", async ({ db, redis }: Context) => {
		const projectService = new ProjectService(db, redis);
		const projects = await projectService.getAllProjects();
		return projects;
	})
	.get(
		"/:id",
		async ({
			params: { id },
			db,
			redis,
		}: Context & { params: { id: string } }) => {
			const projectService = new ProjectService(db, redis);
			const project = await projectService.getProjectById(id);
			return project;
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
				startDate: Date;
				endDate: Date;
			};
			cookie: { session: Cookie<string> };
		}) => {
			const projectService = new ProjectService(db, redis);
			const activityService = new ActivityService(db, redis);
			const userId = session.value;
			const project = await projectService.createProject(body);
			WebSocket.broadcast("project", project);
			const createProjectActivity = await activityService.postActivity(
				userId,
				$Enums.ActivityAction.CREATED,
				"this project",
				userId,
			);
			WebSocket.broadcast("activity", createProjectActivity);
			return Response.json(project, { status: 200 });
		},
		{
			body: t.Object({
				title: t.String(),
				description: t.String(),
				startDate: t.Date(),
				endDate: t.Date(),
			}),
		},
	)
	.patch(
		"/:id",
		async ({
			body,
			db,
			redis,
		}: Context & {
			params: { id: string };
			body: {
				projectId: string;
				title: string;
				description: string;
			};
			cookie: { session: Cookie<string> };
		}) => {
			const projectService = new ProjectService(db, redis);
			const updatedProject = await projectService.updateProject(
				body.projectId,
				body.title,
				body.description,
			);
			WebSocket.broadcast("project", updatedProject);
			return updatedProject;
		},
		{
			body: t.Object({
				projectId: t.String(),
				title: t.String(),
				description: t.String(),
			}),
		},
	)
	.delete(
		"/:id",
		async ({
			params: { id },
			db,
			redis,
		}: Context & { params: { id: string } }) => {
			const projectService = new ProjectService(db, redis);
			const project = await projectService.deleteProject(id);
			WebSocket.broadcast("project", project);
			return project;
		},
		{
			body: t.Object({
				projectId: t.String(),
			}),
		},
	);
