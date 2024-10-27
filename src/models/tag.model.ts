import type { Tag } from "@prisma/client";
import { BaseModel } from "../core/model.core";

export class TagModel extends BaseModel<Tag> {
	async findAll(): Promise<Tag[]> {
		const tags = await this.getModel().tag.findMany();
		return tags;
	}
	async findById(id: string): Promise<Tag | null> {
		const tags = await this.getModel().tag.findUnique({ where: { id } });
		return tags;
	}
	async create(data: Tag): Promise<Tag> {
		const createdTags = await this.getModel().tag.create({
			data: {
				name: data.name,
				id: data.name,
			},
		});
		return createdTags;
	}
	async update(id: string, data: Partial<Tag>): Promise<Tag> {
		const updatedTags = await this.getModel().tag.update({
			where: {
				id: id,
			},
			data: data,
		});
		return updatedTags;
	}

	async delete(id: string): Promise<Tag> {
		const deletedTags = await this.getModel().tag.delete({
			where: { id },
		});
		return deletedTags;
	}
}
