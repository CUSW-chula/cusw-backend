import { Elysia } from "elysia";
import { ProjectService } from "../services/projects.service";
import { type Context } from "../shared/interfaces.shared";
import { TaskService } from "../services/tasks.service";

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
	.get(
		"/project/:projectid",
		async ({
			params: { id },
			db,
			redis,
		}: Context & { params: { id: string } }) => {
			const taskService = new TaskService(db, redis);
			const task = await taskService.getTaskByProjectId(id);
			return task;
		},
	);
