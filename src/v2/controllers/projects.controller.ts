import { type Cookie, Elysia, t } from "elysia";
import { ProjectService } from "../services/projects.service";
import { Project, type Context } from "../../shared/interfaces.shared";
import { WebSocket } from "../../shared/utils/websocket.utils";
import { UserService } from "../services/users.service";

export const ProjectController = new Elysia({
	prefix: "/projects",
	tags: ["Projects", "Version 2"],
})
	.get(
		"/",
		async ({ db, redis }: Context) => {
			const projectService = new ProjectService(db, redis);
			const projects = await projectService.getAllProjects();
			return projects;
		},
		{
			detail: {
				summary: "Get all projects",
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
			const projectService = new ProjectService(db, redis);
			const project = await projectService.getProjectById(id);
			return project;
		},
		{
			detail: {
				summary: "Get a project by id",
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
				startDate: Date;
				endDate: Date;
			};
			cookie: { session: Cookie<string> };
		}) => {
			const projectService = new ProjectService(db, redis);
			const userId = session.value;
			const project = await projectService.createProject(userId, body);
			WebSocket.broadcast("project", project);
			return project;
		},
		{
			body: t.Object({
				title: t.String(),
				description: t.String(),
				startDate: t.Date(),
				endDate: t.Date(),
			}),
			detail: {
				summary: "Create a project",
			},
		},
	)
	.patch(
		"/:id",
		async ({
			params: { id },
			body,
			db,
			redis,
			cookie: { session },
		}: Context & {
			params: { id: string };
			body: Partial<Project>;
			cookie: { session: Cookie<string> };
		}) => {
			const projectService = new ProjectService(db, redis);
			const userId = session.value;
			const updatedProject = await projectService.updateProject(
				userId,
				id,
				body,
			);
			WebSocket.broadcast("project", updatedProject);
			return updatedProject;
		},
		{
			body: t.Object({
				title: t.Optional(t.String()),
				description: t.Optional(t.String()),
				startDate: t.Optional(t.Date()),
				endDate: t.Optional(t.Date()),
			}),
			detail: {
				summary: "Update a project",
			},
		},
	)
	.post(
		"/tag/:id",
		async ({
			params: { id },
			db,
			redis,
			body,
			cookie: { session },
		}: Context & {
			params: { id: string };
			body: {
				tagId: string;
			};
			cookie: { session: Cookie<string> };
		}) => {
			const projectId = id;
			const userId = session.value;
			const projectService = new ProjectService(db, redis);
			const project = await projectService.assignTagToProject(
				body.tagId,
				projectId,
				userId,
			);
			WebSocket.broadcast("project", project);
			return project;
		},
		{
			body: t.Object({
				tagId: t.String(),
			}),
			detail: {
				summary: "Assign a tag to a project",
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
			const projectService = new ProjectService(db, redis);
			const project = await projectService.deleteProject(id);
			WebSocket.broadcast("project", project);
			return project;
		},
		{
			detail: {
				summary: "Delete a project",
			},
		},
	)

	.post(
		"/assignpin/:id",
		async ({
			params: { id },
			db,
			redis,
			cookie: { session },
		}: Context & {
			params: { id: string };
			cookie: { session: Cookie<string> };
		}) => {
			const projectId = id;
			const userId = session.value;
			const projectService = new ProjectService(db, redis);

			// เรียกใช้งานฟังก์ชัน assign pin
			const pinProject = await projectService.assigningpinToProject(
				userId,
				projectId,
			);

			// ส่งข้อมูลการเปลี่ยนแปลงผ่าน WebSocket
			WebSocket.broadcast("pinProject", pinProject);

			return pinProject;
		},
		{
			detail: {
				summary: "Assign a pin to a project",
			},
		},
	);
