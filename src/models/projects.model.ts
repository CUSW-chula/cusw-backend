import type { Project } from "@prisma/client";
import { BaseModel } from "../core/model.core";

export class ProjectModel extends BaseModel<Project> {
	async findAll(): Promise<Project[]> {
		const projects = await this.getModel().project.findMany();
		return projects;
	}

	async findById(id: string): Promise<Project | null> {
		const project = await this.getModel().project.findUnique({ where: { id } });
		return project;
	}

	async create(data: Partial<Project>): Promise<Project> {
		const createdProject = await this.getModel().project.create({
			data: {
				title: data.title ?? "",
				description: data.description ?? "",
				startDate: data.startDate ?? new Date(),
				endDate: data.endDate ?? new Date(),
				expectedBudget: data.expectedBudget ?? 0,
				realBudget: data.realBudget ?? 0,
				usedBudget: data.usedBudget ?? 0,
			},
		});
		return createdProject;
	}

	async update(id: string, data: Partial<Project>): Promise<Project> {
		const updatedUser = await this.getModel().project.update({
			where: {
				id: id,
			},
			data: data,
		});
		return updatedUser;
	}
	async delete(id: string): Promise<Project> {
		const deletedUser = await this.getModel().project.delete({
			where: { id },
		});
		return deletedUser;
	}
}
