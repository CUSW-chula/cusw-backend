import type { PrismaClient, Project } from "@prisma/client";
import { BaseService } from "../core/service.core";
import { ProjectModel } from "../models/projects.model";
import type Redis from "ioredis";
import { NotFoundError } from "elysia";

export class ProjectService extends BaseService<Project> {
	private readonly projectModel: ProjectModel;

	constructor(prisma: PrismaClient, redis: Redis) {
		super(redis, 60);
		this.projectModel = new ProjectModel(prisma);
	}

	async getAllProjects(): Promise<Project[]> {
		const cacheKey = "projects:all";
		const cacheProject = await this.getFromCache(cacheKey);

		if (cacheProject) return cacheProject as Project[];

		const projects = await this.projectModel.findAll();
		await this.setToCache(cacheKey, projects);
		return projects;
	}

	async getProjectById(id: string): Promise<Project | null> {
		const cacheKey = `projects:${id}`;
		const cacheProject = await this.getFromCache(cacheKey);

		if (cacheProject) return cacheProject as Project;

		const project = await this.projectModel.findById(id);
		if (!project) throw new NotFoundError("Project not found");
		await this.setToCache(cacheKey, project);
		return project;
	}
}
