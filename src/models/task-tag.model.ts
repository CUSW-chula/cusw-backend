import type { TaskTag } from "@prisma/client";
import { BaseModel } from "../core/model.core";

export class TaskTagModel extends BaseModel<TaskTag> {
	async findAll(): Promise<TaskTag[]> {
		const taskTags = await this.getModel().taskTag.findMany();
		return taskTags;
	}
	async findById(id: string): Promise<TaskTag | null> {
		const taskTags = await this.getModel().taskTag.findUnique({
			where: { id },
		});
		return taskTags;
	}
	async create(data: Partial<TaskTag>): Promise<TaskTag> {
		const createdTaskTags = await this.getModel().taskTag.create({
			data: {
				taskId: data.taskId ?? "",
				tagId: data.tagId ?? "",
			},
		});
		return createdTaskTags;
	}
	async update(
		id: string,
		data: Partial<{ name: string; id: string }>,
	): Promise<TaskTag> {
		const updatedTaskTag = await this.getModel().taskTag.update({
			where: {
				id: id,
			},
			data: data,
		});
		return updatedTaskTag;
	}

	async delete(id: string): Promise<TaskTag> {
		const deletedTaskTag = await this.getModel().taskTag.delete({
			where: { id },
		});
		return deletedTaskTag;
	}

	async findByTagId(id: string): Promise<TaskTag[] | null> {
		const taskTags = await this.getModel().taskTag.findMany({
			where: { tagId: id },
		});
		return taskTags;
	}

	async findByTaskId(id: string): Promise<TaskTag[] | null> {
		const taskTags = await this.getModel().taskTag.findMany({
			where: { taskId: id },
		});
		return taskTags;
	}

	async findByTaskIdAndTagId(
		taskId: string,
		tagId: string,
	): Promise<TaskTag | null> {
		const taskTag = await this.getModel().taskTag.findFirst({
			where: {
				taskId: taskId,
				tagId: tagId,
			},
		});
		return taskTag;
	}
}
