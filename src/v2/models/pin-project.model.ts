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
	): Promise<Boolean> {
		const pin = await this.getModel().pinProject.findFirst({
			where: { userId, projectId },
		});
		return !!pin;
	}

	async findByUserIdAndProjectIdObject(
		userId: string,
		projectId: string,
	): Promise<PinProject | null> {
		const pin = await this.getModel().pinProject.findFirst({
			where: { userId, projectId },
		});
		return pin;
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
	async deleteByUserIdAndProjectId(
		userId: string,
		projectId: string,
	): Promise<PinProject> {
		const pin = await this.getModel().pinProject.findFirst({ where: { userId, projectId } });
		if (!pin) {
			throw new Error("Pin not found");
		}
		return await this.getModel().pinProject.delete({ where: { id: pin.id } });
	}

	async findByProjectId(id: string): Promise<PinProject[] | null> {
		const pinned = await this.getModel().pinProject.findMany({
			where: { projectId: id },
		});
		return pinned;
	}
}
