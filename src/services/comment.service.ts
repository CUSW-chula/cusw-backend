import { CommentModel } from "../models/comment.model";
import type { PrismaClient, Comment } from "@prisma/client";
import { BaseService } from "../core/service.core";
import type Redis from "ioredis";
import { UserModel } from "../models/users.model";
import { TasksModel } from "../models/tasks.model";
import {
	NotFoundException,
	PermissionException,
	ValidationException,
} from "../core/exception.core";

export class CommentService extends BaseService<Comment> {
	private readonly commentModel: CommentModel;
	private readonly userModel: UserModel;
	private readonly taskModel: TasksModel;

	constructor(prisma: PrismaClient, redis: Redis) {
		super(redis, 60); //
		this.commentModel = new CommentModel(prisma);
		this.userModel = new UserModel(prisma);
		this.taskModel = new TasksModel(prisma);
	}

	async addComment(data: Partial<Comment>, authorId: string): Promise<Comment> {
		const isUserExist = await this.userModel.findById(authorId);
		if (!isUserExist) {
			throw new NotFoundException("User not found");
		}
		if (data.content !== null)
			return await this.commentModel.create({
				content: data.content,
				createdAt: data.createdAt,
				taskId: data.taskId,
				authorId: authorId,
			});
		throw new ValidationException("Content cann't be null");
	}

	async getCommentByTaskId(taskId: string): Promise<Comment[]> {
		const isTaskIdExist = await this.taskModel.findById(taskId);
		if (!isTaskIdExist) throw new NotFoundException("Task not found");

		const comment = await this.commentModel.findByTaskId(taskId);
		if (!comment) throw new NotFoundException("Comment not found");
		return comment;
	}

	async deleteComment(id: string, authorId: string): Promise<Comment> {
		const isUserExist = await this.userModel.findById(authorId);
		if (!isUserExist) {
			throw new NotFoundException("User not found");
		}
		const comment = await this.commentModel.findById(id);
		if (!comment) throw new NotFoundException("Comment not found");
		if (authorId !== comment.authorId)
			throw new PermissionException("This is not your comment");
		const deleteComment = await this.commentModel.delete(id);
		return deleteComment;
	}

	async editComment(
		id: string,
		authorId: string,
		newContent: string,
	): Promise<Comment> {
		const isUserExist = await this.userModel.findById(authorId);
		if (!isUserExist) {
			throw new NotFoundException("User not found");
		}
		const comment = await this.commentModel.findById(id);
		if (!comment) throw new NotFoundException("Comment not found");
		const newComment: Comment = {
			id: comment.id,
			content: newContent,
			taskId: comment.taskId,
			authorId: comment.authorId,
			createdAt: comment.createdAt,
			isDelete: comment.isDelete,
			editTime: comment.editTime,
		};
		if (authorId !== comment.authorId)
			throw new NotFoundException("This is not your comment");
		const editComment = await this.commentModel.update(id, newComment);
		return editComment;
	}
}
