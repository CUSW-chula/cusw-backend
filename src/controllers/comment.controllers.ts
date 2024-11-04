import { Elysia, t } from "elysia";
import { CommentService } from "../services/comment.service";
import { type Context } from "../shared/interfaces.shared";
import { type Comment } from "@prisma/client";
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
					return Response.json("Comment not found", { status: 404 });
				}
				return comments;
			} catch (_error) {
				// Handle unexpected errors
				const error = _error as Error;
				return Response.json(error.message, { status: 500 });
			}
		},
	)
	// Create a new user with try-catch for error handling
	.post(
		"/",
		async ({ body, db, redis }: Context & { body: Comment }) => {
			const commentService = new CommentService(db, redis);
			try {
				const comment = await commentService.addComment(body);
				WebSocket.broadcast("comment", comment);
				return { status: 200, body: { message: "Success" } };
			} catch (_error) {
				// Handle unexpected errors
				const error = _error as Error;
				return Response.json(error.message, { status: 500 });
			}
		},
		{
			body: t.Object({
				content: t.String(),
				authorId: t.String(),
				taskId: t.String(),
			}),
		},
	)
	.delete(
		"/",
		async ({ body, db, redis }: Context & { body: Comment }) => {
			const commentService = new CommentService(db, redis);
			try {
				const comment = await commentService.deleteComment(
					body.id,
					body.authorId,
				);
				WebSocket.broadcast("comment-delete", comment);
				return { status: 200, body: { message: "Success" } };
			} catch (_error) {
				// Handle unexpected errors
				const error = _error as Error;
				return Response.json(error.message, { status: 500 });
			}
		},
		{
			body: t.Object({
				id: t.String(),
				authorId: t.String(),
			}),
		},
	)
	.patch(
		"/",
		async ({ body, db, redis }: Context & { body: Comment }) => {
			const commentService = new CommentService(db, redis);
			try {
				const comment = await commentService.editComment(
					body.id,
					body.authorId,
					body.content,
				);
				WebSocket.broadcast("comment-edit", comment);
				return { status: 200, body: { message: "Success" } };
			} catch (_error) {
				// Handle unexpected errors
				const error = _error as Error;
				return Response.json(error.message, { status: 500 });
			}
		},
		{
			body: t.Object({
				id: t.String(),
				authorId: t.String(),
				content: t.String(),
			}),
		},
	);
