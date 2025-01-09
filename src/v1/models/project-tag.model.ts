import type { ProjectTag } from "@prisma/client";
import { BaseModel } from "../../core/model.core";

export class ProjectTagModel extends BaseModel<ProjectTag> {
	async findAll(): Promise<ProjectTag[]> {
		const projectTags = await this.getModel().projectTag.findMany();
		return projectTags;
	}
	async findById(id: string): Promise<ProjectTag | null> {
		const projectTags = await this.getModel().projectTag.findUnique({
			where: { id },
		});
		return projectTags;
	}
	async create(data: Partial<ProjectTag>): Promise<ProjectTag> {
		const createdProjectTags = await this.getModel().projectTag.create({
			data: {
				projectId: data.projectId ?? "",
				tagId: data.tagId ?? "",
			},
		});
		return createdProjectTags;
	}
	async update(
		id: string,
		data: Partial<{ name: string; id: string }>,
	): Promise<ProjectTag> {
		const updatedProjectTag = await this.getModel().projectTag.update({
			where: {
				id: id,
			},
			data: data,
		});
		return updatedProjectTag;
	}

	async delete(id: string): Promise<ProjectTag> {
		const deletedProjectTag = await this.getModel().projectTag.delete({
			where: { id },
		});
		return deletedProjectTag;
	}

	async deleteByProjectId(taskId: string): Promise<number> {
		const deletedProjectTag = await this.getModel().projectTag.deleteMany({
			where: { projectId: taskId },
		});
		return deletedProjectTag.count;
	}

	async findByTagId(id: string): Promise<ProjectTag[] | null> {
		const projectTags = await this.getModel().projectTag.findMany({
			where: { tagId: id },
		});
		return projectTags;
	}

	async findByProjectId(id: string): Promise<ProjectTag[] | null> {
		const projectTags = await this.getModel().projectTag.findMany({
			where: { projectId: id },
		});
		return projectTags;
	}

	async findByProjectIdAndTagId(
		projectId: string,
		tagId: string,
	): Promise<ProjectTag | null> {
		const projectTag = await this.getModel().projectTag.findFirst({
			where: {
				projectId: projectId,
				tagId: tagId,
			},
		});
		return projectTag;
	}
}
