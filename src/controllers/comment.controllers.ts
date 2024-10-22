import { Elysia, t } from "elysia";
import { CommentService } from "../services/comment.service";
import { type Context } from "../shared/interfaces.shared";
import { PrismaClient, type Comment } from "@prisma/client";
import { WebSocket } from "../shared/utils/websocket.utils";

export const CommentController = new Elysia({ prefix: "/comments" })
	.get(
		"/:id",
		async ({
			params: { id },
			db,
			redis,
		}: Context & { params: { id: string } }) => {
			const commentService = new CommentService(db, redis);
			try {
				const comments = await commentService.getCommentByTaskId(id);
				if (!comments) {
					return {
						status: 404,
						body: { error: "Comments not found" },
					};
				}
				return comments;
			} catch (_error) {
				// Handle unexpected errors
				return {
					status: 500,
					body: { error: "Internal Server Error" },
				};
			}
		},
	)
	// Create a new user with try-catch for error handling
	.post(
		"/",
		async ({ body, db, redis }: Context & { body: Comment }) => {
			const commentService = new CommentService(db, redis);
			try {
				WebSocket.broadcast("comment", body);
				return await commentService.addComment(body);
			} catch (_error) {
				// Handle unexpected errors
				return {
					status: 500,
					body: { error: "Internal Server Error" },
				};
			}
		},
		{
			body: t.Object({
				content: t.String(),
				authorId: t.String(),
				taskId: t.String(),
			}),
		},
	);
