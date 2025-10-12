import { Cookie, Elysia, t } from "elysia";
import { CommentService } from "../services/comment.service";
import { Comment, type Context } from "../../shared/interfaces.shared";
import { WebSocket } from "../../shared/utils/websocket.utils";

export const CommentController = new Elysia({
	prefix: "/comments",
	tags: ["Comments", "Version 2"],
})
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
		{
			detail: {
				summary: "Get all comments by task id",
			},
		},
	)
	// Create a new user with try-catch for error handling
	.post(
		"/:taskId",
		async ({
			body,
			params: { taskId },
			db,
			redis,
			cookie: { session },
		}: Context & {
			body: Partial<Comment>;
			cookie: { session: Cookie<string> };
			params: { taskId: string };
		}) => {
			const commentService = new CommentService(db, redis);
			const userId = session.value;

			const comment = await commentService.addComment(
				{
					taskId: taskId,
					...body,
				},
				userId,
			);
			WebSocket.broadcast(`comment:${taskId}`, comment);
			return comment;
		},
		{
			body: t.Object({
				content: t.String(),
			}),
			detail: {
				summary: "Add a new comment",
			},
		},
	)
	.delete(
		"/:id",
		async ({
			params: { id },
			db,
			redis,
			cookie: { session },
		}: Context & {
			params: { id: string };
			cookie: { session: Cookie<string> };
		}) => {
			const commentService = new CommentService(db, redis);
			const userId = session.value;
			const comment = await commentService.deleteComment(id, userId);
			WebSocket.broadcast(`comment-delete`, comment);
			return comment;
		},
		{
			detail: {
				summary: "Delete a comment",
			},
		},
	)
	.patch(
		"/:id",
		async ({
			params: { id },
			body,
			db,
			redis,
			cookie: { session },
		}: Context & {
			body: { id: string; content: string };
			params: { id: string };
			cookie: { session: Cookie<string> };
		}) => {
			const commentService = new CommentService(db, redis);
			const userId = session.value;
			const comment = await commentService.editComment(
				id,
				userId,
				body.content,
			);
			WebSocket.broadcast(`comment-edit`, comment);
			return comment;
		},
		{
			body: t.Object({
				content: t.String(),
			}),
			detail: {
				summary: "Edit a comment",
			},
		},
	);
