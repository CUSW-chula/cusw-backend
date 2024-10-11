import { Elysia } from "elysia";
import { ProjectService } from "../services/projects.service";
import { type Context } from "../shared/interfaces.shared";
import { WebSocket } from "../shared/utils/websocket.utils";

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

			// This is example how to use Socket
			if (project !== null) WebSocket.broadcast(project);
			return project;
		},
	);
