import type { PrismaClient, Project } from "@prisma/client";
import { BaseService } from "../core/service.core";
import { ProjectModel } from "../models/projects.model";
import type Redis from "ioredis";
import { NotFoundError } from "elysia";
import { TasksModel } from "../models/tasks.model";
import { BudgetStatus } from "@prisma/client";

export class ProjectService extends BaseService<Project> {
	private readonly projectModel: ProjectModel;
	private readonly taskModel: TasksModel;

	protected getTaskModel() {
		return this.taskModel;
	}

	constructor(prisma: PrismaClient, redis: Redis) {
		super(redis, 60);
		this.projectModel = new ProjectModel(prisma);
		this.taskModel = new TasksModel(prisma);
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

	async getProjectMoney(id: string): Promise<number[]> {
		const project = await this.projectModel.findById(id);
		if (!project) throw new NotFoundError("Project not found");
		let sum = [0, 0, 0];

		const addToSum = (task: {
			budget: number;
			advance: number;
			expense: number;
		}) => {
			sum = sum.map(
				(val, index) => val + [task.budget, task.advance, task.expense][index],
			);
		};

		//sum budget from subTasks
		const calculateSubTaskSum = async (taskId: string) => {
			const subTasks = await this.getTaskModel().findSubTask(taskId);
			if (!subTasks || subTasks.length === 0) return;
			for (const task of subTasks) {
				if (
					task.statusBudgets === BudgetStatus.Added ||
					BudgetStatus.SubTasksAdded
				) {
					addToSum(task);
					await calculateSubTaskSum(task.id);
				}
			}
		};
		const allTasks = await this.taskModel.findByProjectId(id);
		for (const task of allTasks) {
			addToSum(task);
			await calculateSubTaskSum(task.id);
		}

		return sum;
	}
}
