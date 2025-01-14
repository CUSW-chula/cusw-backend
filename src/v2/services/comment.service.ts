import { CommentModel } from "../models/comment.model";
import type { PrismaClient } from "@prisma/client";
import { BaseService } from "../../core/service.core";
import type Redis from "ioredis";
import { UserModel } from "../models/users.model";
import { TasksModel } from "../models/tasks.model";
import {
	NotFoundException,
	PermissionException,
	ValidationException,
} from "../../core/exception.core";
import { Comment } from "../../shared/interfaces.shared";

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
		if (data.content !== null) {
			const comment = await this.commentModel.create({
				content: data.content,
				createdAt: data.createdAt,
				taskId: data.taskId,
				authorId: authorId,
			});
			return {
				id: comment.id,
				content: comment.content,
				createdAt: comment.createdAt,
				taskId: comment.taskId,
				author: isUserExist,
				isDeleted: comment.isDelete,
				editTime: comment.editTime,
			};
		}
		throw new ValidationException("Content cann't be null");
	}

	async getCommentByTaskId(taskId: string): Promise<Comment[]> {
		const isTaskIdExist = await this.taskModel.findById(taskId);
		if (!isTaskIdExist) throw new NotFoundException("Task not found");

		const comment = await this.commentModel.findByTaskId(taskId);
		if (!comment) throw new NotFoundException("Comment not found");
		const commentWithDetail = await Promise.all(
			comment.map(async (item) => {
				const user = await this.userModel.findById(item.authorId);
				return {
					id: item.id,
					content: item.content,
					createdAt: item.createdAt,
					taskId: item.taskId,
					author: user,
					isDeleted: item.isDelete,
					editTime: item.editTime,
				};
			}),
		);
		return commentWithDetail;
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
		return {
			id: deleteComment.id,
			content: deleteComment.content,
			createdAt: deleteComment.createdAt,
			taskId: deleteComment.taskId,
			author: isUserExist,
			isDeleted: deleteComment.isDelete,
			editTime: deleteComment.editTime,
		};
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
		const newComment = {
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
		return {
			id: editComment.id,
			content: editComment.content,
			createdAt: editComment.createdAt,
			taskId: editComment.taskId,
			author: isUserExist,
			isDeleted: editComment.isDelete,
			editTime: editComment.editTime,
		};
	}
}
