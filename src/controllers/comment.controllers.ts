import { Elysia, t } from "elysia";
import { CommentService } from "../services/comment.service";
import { type Context } from "../shared/interfaces.shared";
import { PrismaClient, type Comment } from "@prisma/client";

export const CommentController = new Elysia({ prefix: "/comments" })
	.ws("/ws", {
		// validate incoming message
		body: t.Object({
			content: t.String(),
			authorId: t.String(),
			taskId: t.String(),
		}),
		async message(ws, { content, authorId, taskId }) {
			// Get schema from `ws.data`
			await fetch("http://localhost:4000/api/comments", {
				method: "POST",
				body: JSON.stringify({
					content: "This is a comment from Bun HTTP",
					authorId: "cm24ll4370008kh59coznldal",
					taskId: "cm24lq0sx0001jkpdbc9lxu8x",
				}),
				headers: { "Content-Type": "application/json" },
			});
		},
	})
	// Get user by ID with try-catch for error handling
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
				return await commentService.addComment(body);
			} catch (error) {
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
