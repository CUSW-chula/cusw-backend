import { Cookie, Elysia, t } from "elysia";
import { CommentService } from "../services/comment.service";
import { type Context } from "../shared/interfaces.shared";
import { type Comment } from "@prisma/client";
import { WebSocket } from "../shared/utils/websocket.utils";
import { Exception } from "../core/exception.core";

export const CommentController = new Elysia({ prefix: "/comments" })
	.get(
		"/:id",
		async ({
			params: { id },
			db,
			redis,
		}: Context & {
			params: { id: string };
		}) => {
			const commentService = new CommentService(db, redis);
			const comments = await commentService.getCommentByTaskId(id);
			return comments;
		},
	)
	// Create a new user with try-catch for error handling
	.post(
		"/",
		async ({
			body,
			db,
			redis,
			cookie: { session },
		}: Context & { body: Comment; cookie: { session: Cookie<string> } }) => {
			const commentService = new CommentService(db, redis);
			const userId = session.value;

			const comment = await commentService.addComment(body, userId);
			WebSocket.broadcast("comment", comment);
			return { status: 200, body: { message: "Success" } };
		},
		{
			body: t.Object({
				content: t.String(),
				taskId: t.String(),
			}),
		},
	)
	.delete(
		"/",
		async ({
			body,
			db,
			redis,
			cookie: { session },
		}: Context & { body: Comment; cookie: { session: Cookie<string> } }) => {
			const commentService = new CommentService(db, redis);
			const userId = session.value;
			const comment = await commentService.deleteComment(body.id, userId);
			WebSocket.broadcast("comment-delete", comment);
			return { status: 200, body: { message: "Success" } };
		},
		{
			body: t.Object({
				id: t.String(),
			}),
		},
	)
	.patch(
		"/",
		async ({
			body,
			db,
			redis,
			cookie: { session },
		}: Context & {
			body: { id: string; content: string };
			cookie: { session: Cookie<string> };
		}) => {
			const commentService = new CommentService(db, redis);
			const userId = session.value;
			const comment = await commentService.editComment(
				body.id,
				userId,
				body.content,
			);
			WebSocket.broadcast("comment-edit", comment);
			return { status: 200, body: { message: "Success" } };
		},
		{
			body: t.Object({
				id: t.String(),
				content: t.String(),
			}),
		},
	);
