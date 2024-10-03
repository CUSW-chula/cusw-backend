import { Elysia } from "elysia";
import { ProjectService } from "../services/projects.service";
import { type Context } from "../shared/interfaces.shared";

export const ProjectController = new Elysia({ prefix: "/projects" })
	.get("/", ({ db, redis }: Context) => {
		const projectService = new ProjectService(db, redis);
		return projectService.getAllProjects();
	})
	.get(
		"/:id",
		({ params: { id }, db, redis }: Context & { params: { id: string } }) => {
			const projectService = new ProjectService(db, redis);
			return projectService.getProjectById(id);
		},
	);
