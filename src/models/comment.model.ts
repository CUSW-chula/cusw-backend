import type { Comment as PrismaComment } from "@prisma/client";
import { BaseModel } from "../core/model.core";

export class CommentModel extends BaseModel<PrismaComment> {
	async findAll(): Promise<PrismaComment[]> {
		const comments = await this.getModel().comment.findMany();
		return comments;
	}

	async findById(id: string): Promise<PrismaComment | null> {
		const comments = await this.getModel().comment.findUnique({
			where: { id },
		});
		return comments;
	}

	async findByTaskId(taskId: string): Promise<PrismaComment[] | null> {
		const comment = await this.getModel().comment.findMany({
			where: { taskId: taskId },
		});
		return comment;
	}

	async create(data: Partial<PrismaComment>): Promise<PrismaComment> {
		const createdComment = await this.getModel().comment.create({
			data: {
				content: data.content ?? "",
				authorId: data.authorId ?? "",
				taskId: data.taskId ?? "",
				createdAt: data.createdAt ?? new Date(),
			},
		});
		return createdComment;
	}

	async update(
		id: string,
		data: Partial<PrismaComment>,
	): Promise<PrismaComment> {
		const updatedComment = await this.getModel().comment.update({
			where: { id },
			data: {
				content: data.content ?? "",
				editTime: data.editTime ?? new Date(),
			},
		});
		return updatedComment;
	}

	async delete(id: string): Promise<PrismaComment> {
		const deletedComment = await this.getModel().comment.update({
			where: { id },
			data: {
				content: "",
				isDelete: true,
				editTime: new Date(),
			},
		});
		return deletedComment;
	}
}
