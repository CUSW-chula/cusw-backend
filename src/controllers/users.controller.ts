import { Elysia, t } from "elysia";
import { UserService } from "../services/users.service";
import { type Context } from "../shared/interfaces.shared";

export const UserController = new Elysia({ prefix: "/users" })
	// Get all users with try-catch for error handling
	.get("/", async ({ db, redis }: Context) => {
		const userService = new UserService(db, redis);
		try {
			return await userService.getAllUsers();
		} catch (_error) {
			const error = _error as Error;
			return Response.json(error.message, { status: 500 });
		}
	})
	// Get user by ID with try-catch for error handling
	.get(
		"/:id",
		async ({
			params: { id },
			db,
			redis,
		}: Context & { params: { id: string } }) => {
			const userService = new UserService(db, redis);
			try {
				const user = await userService.getUserById(id);
				if (!user) {
					return {
						status: 404,
						body: { error: "User not found" },
					};
				}
				return user;
			} catch (_error) {
				const error = _error as Error;
				return Response.json(error.message, { status: 500 });
			}
		},
	)
	// Create a new user with try-catch for error handling
	.post(
		"/",
		async ({
			body,
			db,
			redis,
		}: Context & { body: { name: string; email: string } }) => {
			const userService = new UserService(db, redis);
			try {
				return await userService.createNewUser(body);
			} catch (_error) {
				const error = _error as Error;
				return Response.json(error.message, { status: 400 });
			}
		},
		{
			body: t.Object({
				name: t.String(),
				email: t.String(),
			}),
		},
	);
