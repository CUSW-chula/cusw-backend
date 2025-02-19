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
		async ({
			db,
			redis,
			cookie: { session },
		}: Context & { cookie: { session: Cookie<string> } }) => {
			const userId = session.value;
			const projectService = new ProjectService(db, redis);
			const projects = await projectService.getAllProjects(userId);
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
			cookie: { session },
		}: Context & {
			params: { id: string };
			cookie: { session: Cookie<string> };
		}) => {
			const userId = session.value;
			const projectService = new ProjectService(db, redis);
			const project = await projectService.getProjectById(userId, id);
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
			WebSocket.broadcast(`assigned-tags-project:${projectId}`, project);
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
			const project = await projectService.removeTagFromProject(
				body.tagId,
				projectId,
				userId,
			);
			WebSocket.broadcast("unassigned-tags-project", project);
			return project;
		},
		{
			body: t.Object({
				tagId: t.String(),
			}),
			detail: {
				summary: "Unassign a tag from a project",
			},
		},
	)

	.delete(
		"/:id",
		async ({
			params: { id },
			db,
			redis,
			cookie: { session },
		}: Context & {
			cookie: { session: Cookie<string> };
			params: { id: string };
		}) => {
			const userId = session.value;
			const projectService = new ProjectService(db, redis);
			const project = await projectService.deleteProject(userId, id);
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
		"/pin/:projectId",
		async ({
			params: { projectId },
			db,
			redis,
			cookie: { session },
		}: Context & {
			params: { projectId: string };
			cookie: { session: Cookie<string> };
		}) => {
			const projectService = new ProjectService(db, redis);
			const pinProject = await projectService.assigningPinToProject(
				session.value,
				projectId,
			);
			WebSocket.broadcast("pinProject", pinProject);
			return pinProject;
		},
		{
			detail: { summary: "Assign a pin to a project" },
		},
	)

	// ✅ Unpin project
	.delete(
		"/pin/:projectId",
		async ({
			params: { projectId },
			db,
			redis,
			cookie: { session },
		}: Context & {
			params: { projectId: string };
			cookie: { session: Cookie<string> };
		}) => {
			if (!session?.value) throw new Error("Unauthorized");

			const projectService = new ProjectService(db, redis);
			const unpinProject = await projectService.unAssigningPinToProject(
				session.value,
				projectId,
			);
			WebSocket.broadcast("unpinProject", unpinProject);
			return unpinProject;
		},
		{
			detail: { summary: "Remove a pin from a project" },
		},
	)

	.patch(
		"/owner",
		async ({
			query: { userId, projectId },
			db,
			redis,
		}: Context & { query: { userId: string; projectId: string } }) => {
			const projectService = new ProjectService(db, redis);
			const project = await projectService.updateProjectOwner(
				userId,
				projectId,
			);
			const owner = project.owner;
			WebSocket.broadcast(`owner:${projectId}`, owner);
			return project;
		},
		{
			detail: {
				summary: "Change project owner",
			},
		},
	);
// .get(
// 	"/pin/:userId",
// 	async ({
// 		params: { userId },
// 		db,
// 		redis,
// 	}: Context & { params: { userId: string } }) => {
// 		const projectService = new ProjectService(db, redis);
// 		const pinnedProjects =
// 			await projectService.getAllPinInProjectByUserId(userId);
// 		return pinnedProjects;
// 	},
// 	{
// 		detail: {
// 			summary: "Get all pinned projects by user id",
// 		},
// 	},
// );
