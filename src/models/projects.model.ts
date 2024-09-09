import type { Project as PrismaProject } from "@prisma/client";
import { BaseModel } from "../core/model.core";

export class Project extends BaseModel<PrismaProject> {
	async findAll(): Promise<PrismaProject[]> {
		const projects = await this.getModel().project.findMany();
		return projects;
	}

	async findById(id: string): Promise<PrismaProject | null> {
		const project = await this.getModel().project.findUnique({ where: { id } });
		return project;
	}

	async create(data: Partial<PrismaProject>): Promise<PrismaProject> {
		const createdProject = await this.getModel().project.create({
			data: {
				title: data.title ?? "",
				description: data.description ?? "",
				startDate: data.startDate ?? new Date(),
				endDate: data.endDate ?? new Date(),
				expectedBudget: data.expectedBudget ?? 0,
				realBudget: data.realBudget ?? 0,
			},
		});
		return createdProject;
	}

	async update(
		id: string,
		data: Partial<PrismaProject>,
	): Promise<PrismaProject> {
		const updatedUser = await this.getModel().project.update({
			where: {
				id: id,
			},
			data: data,
		});
		return updatedUser;
	}
	async delete(id: string): Promise<PrismaProject> {
		const deletedUser = await this.getModel().project.delete({
			where: { id },
		});
		return deletedUser;
	}
}
