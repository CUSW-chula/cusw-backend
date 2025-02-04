import type { PinProject } from "@prisma/client";
import { BaseModel } from "../../core/model.core";

export class PinProjectModel extends BaseModel<PinProject> {
	findFirst(arg0: { where: { userId: string; projectId: string } }) {
		throw new Error("Method not implemented.");
	}
	async findAll(): Promise<PinProject[]> {
		const pinProject = await this.getModel().pinProject.findMany();
		return pinProject;
	}
	async findById(id: string): Promise<PinProject | null> {
		const pinProject = await this.getModel().pinProject.findUnique({
			where: { id },
		});
		return pinProject;
	}
	async findByUserIdAndProjectId(
			userId: string,
			projectId: string,
		): Promise<PinProject | null> {
			const pinProject = await this.getModel().pinProject.findFirst({
				where: {
					userId: userId,
					projectId: projectId,
				},
			});
			return pinProject;
		}
	async create(data: Partial<PinProject>): Promise<PinProject> {
		const createdpinProject = await this.getModel().pinProject.create({
			data: {
				projectId: data.projectId ?? "",
				userId: data.userId ?? "",
			},
		});
		return createdpinProject;
	}
	async update(
		id: string,
		data: Partial<{ userId: string; projectID: string }>,
	): Promise<PinProject> {
		const updatedPinProject = await this.getModel().pinProject.update({
			where: {
				id: id,
			},
			data: data,
		});
		return updatedPinProject;
	}

	async delete(id: string): Promise<PinProject> {
		const deletedPinProject = await this.getModel().pinProject.delete({
			where: { id },
		});
		return deletedPinProject;
	}
}
