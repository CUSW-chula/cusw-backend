import { Elysia, t } from "elysia";
import { UserService } from "../services/users.service";
import { type Context } from "../../shared/interfaces.shared";

export const UserController = new Elysia({
	prefix: "/users",
	tags: ["Version 2"],
})
	// Get all users
	.get("/", async ({ db, redis }: Context) => {
		const userService = new UserService(db, redis);
		return await userService.getAllUsers();
	})
	// Get user by ID
	.get(
		"/:id",
		async ({
			params: { id },
			db,
			redis,
		}: Context & { params: { id: string } }) => {
			const userService = new UserService(db, redis);
			return await userService.getUserById(id);
		},
	)
	.get(
		"/email/:id",
		async ({
			params: { id },
			db,
			redis,
		}: Context & { params: { id: string } }) => {
			const userService = new UserService(db, redis);
			return await userService.getUserByEmail(id);
		},
	)
	.get(
		"/project/:projectId",
		async ({
			params: { projectId },
			db,
			redis,
		}: Context & { params: { projectId: string } }) => {
			const userService = new UserService(db, redis);
			return await userService.getAllByProjectId(projectId);
		},
	)
	// Create a new user
	.post(
		"/",
		async ({
			body,
			db,
			redis,
		}: Context & { body: { name: string; email: string } }) => {
			const userService = new UserService(db, redis);
			return await userService.createNewUser(body);
		},
		{
			body: t.Object({
				name: t.String(),
				email: t.String(),
			}),
		},
	);
