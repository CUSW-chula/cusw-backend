import type { File } from "@prisma/client";
import { BaseModel } from "../core/model.core";

export class FilesModel extends BaseModel<File> {
	async findAll(): Promise<File[]> {
		const files = await this.getModel().file.findMany();
		return files;
	}

	async findById(id: string): Promise<File | null> {
		const file = await this.getModel().file.findUnique({
			where: { id },
		});
		return file;
	}

	async findByTaskId(taskId: string): Promise<File[] | null> {
		const file = await this.getModel().file.findMany({
			where: { taskId: taskId },
		});
		return file;
	}

	async deleteByTaskId(taskId: string): Promise<number> {
		const file = await this.getModel().file.deleteMany({
			where: { taskId: taskId },
		});
		return file.count;
	}

	async create(data: Partial<File>): Promise<File> {
		const createFile = await this.getModel().file.create({
			data: {
				filePath: data.filePath ?? "",
				fileSize: data.fileSize ?? 0,
				fileName: data.fileName ?? "",
				createdAt: data.createdAt ?? new Date(),
				taskId: data.taskId ?? "",
				projectId: data.projectId,
				uploadedBy: data.uploadedBy ?? "",
			},
		});
		return createFile;
	}

	async update(id: string, data: Partial<File>): Promise<File> {
		const updatedFile = await this.getModel().file.update({
			where: { id },
			data: data,
		});
		return updatedFile;
	}

	async delete(id: string): Promise<File> {
		const deletedComment = await this.getModel().file.delete({
			where: { id },
		});
		return deletedComment;
	}
}
