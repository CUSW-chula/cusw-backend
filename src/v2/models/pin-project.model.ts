import type { PinProject } from "@prisma/client";
import { BaseModel } from "../../core/model.core";

export class PinProjectModel extends BaseModel<PinProject> {
	async findAll(): Promise<PinProject[]> {
		return await this.getModel().pinProject.findMany();
	}

	async findById(id: string): Promise<PinProject | null> {
		return await this.getModel().pinProject.findUnique({ where: { id } });
	}

	async findByUserIdAndProjectId(
		userId: string,
		projectId: string,
	): Promise<PinProject | null> {
		return await this.getModel().pinProject.findFirst({
			where: { userId, projectId },
		});
	}

	async create(data: Partial<PinProject>): Promise<PinProject> {
		if (!data.userId || !data.projectId) {
			throw new Error("User ID and Project ID are required");
		}
		return await this.getModel().pinProject.create({
			data: {
				userId: data.userId,
				projectId: data.projectId,
			},
		});
	}

	async update(
		id: string,
		data: Partial<{ userId: string; projectID: string }>,
	): Promise<PinProject> {
		return await this.getModel().pinProject.update({
			where: { id },
			data,
		});
	}

	async delete(id: string): Promise<PinProject> {
		return await this.getModel().pinProject.delete({ where: { id } });
	}
}
