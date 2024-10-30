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
			// Handle unexpected errors
			return {
				status: 500,
				body: { error: _error },
			};
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
				// Handle unexpected errors
				return {
					status: 500,
					body: { error: _error },
				};
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
			} catch (error) {
				// Handle email validation error
				if (
					error instanceof Error &&
					error.message === "Invalid email format"
				) {
					return {
						status: 400,
						body: { error: error.message },
					};
				}
				// Handle unexpected errors
				return {
					status: 500,
					body: { error: "Internal Server Error" },
				};
			}
		},
		{
			body: t.Object({
				name: t.String(),
				email: t.String(),
			}),
		},
	);
