import type { Template } from "../../../generated";
import { BaseModel } from "../../core/model.core";

export class TemplateModel extends BaseModel<Template> {
	async findAll(): Promise<Template[]> {
		const files = await this.getModel().template.findMany();
		return files;
	}

	async findById(id: string): Promise<Template | null> {
		const file = await this.getModel().template.findUnique({
			where: { id },
		});
		return file;
	}

	async create(data: Partial<Template>): Promise<Template> {
		const createFile = await this.getModel().template.create({
			data: {
				filePath: data.filePath ?? "",
				fileSize: data.fileSize ?? 0,
				fileName: data.fileName ?? "",
				createdAt: data.createdAt ?? new Date(),
				uploadedBy: data.uploadedBy ?? "",
			},
		});
		return createFile;
	}

	async update(id: string, data: Partial<Template>): Promise<Template> {
		const updatedFile = await this.getModel().template.update({
			where: { id },
			data: data,
		});
		return updatedFile;
	}

	async delete(id: string): Promise<Template> {
		const deletedComment = await this.getModel().template.delete({
			where: { id },
		});
		return deletedComment;
	}
}
