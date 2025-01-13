import type { Project, ProjectTag } from "@prisma/client";
import type { ProjectRole } from "@prisma/client";
import { BaseModel } from "../../core/model.core";

export class ProjectModel extends BaseModel<Project> {
	async findAll(): Promise<Project[]> {
		const projects = await this.getModel().project.findMany();
		return projects;
	}

	async findById(id: string): Promise<Project | null> {
		const project = await this.getModel().project.findUnique({ where: { id } });
		return project;
	}

	async findTag(id: string): Promise<ProjectTag[] | null> {
		const tags = await this.getModel().projectTag.findMany({
			where: {
				projectId: id,
			},
		});
		return tags ?? null; // Ensures null is returned if no tags are found
	}

	async findRole(id: string): Promise<ProjectRole[] | null> {
		const roles = await this.getModel().projectRole.findMany({
			where: {
				projectId: id,
			},
		});
		return roles ?? null; // Ensures null is returned if no roles are found
	}

	async create(data: Partial<Project>): Promise<Project> {
		const createdProject = await this.getModel().project.create({
			data: {
				title: data.title ?? "",
				description: data.description ?? "",
				startDate: data.startDate ?? new Date(),
				endDate: data.endDate ?? new Date(),
				budget: data.budget ?? 0,
				advance: data.advance ?? 0,
				expense: data.expense ?? 0,
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
