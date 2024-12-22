import { Elysia, t } from "elysia";
import { UserService } from "../services/users.service";
import { type Context } from "../shared/interfaces.shared";
import { NotFoundException } from "../core/exception.core";

export const UserController = new Elysia({ prefix: "/users" })
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

	//getAllProjectOwnerByProjectId
	.get(
		"/projectowner/:id",
		async ({ 
			params: { id },
			db,
			redis
		 }: 
			Context & { params: { id: string } }) => {
			const userService = new UserService(db, redis);
			try {
				const user = await userService.getUserOwnersByProjectId(id);
				return {
					status: 200,
					data: user,
				};
			} catch (error) {
				return {
					status: error instanceof NotFoundException ? 404+"error" : 500,
				};
			}
		}
	)

	//getAllMemberofProjectByProjectId
	.get(
		"/projectmember/:id",
		async ({ 
			params: { id },
			db,
			redis
		 }: 
			Context & { params: { id: string } }) => {
			const userService = new UserService(db, redis);
			try {
				const user = await userService.getUserMemberByProjectId(id);
				return {
					status: 200,
					data: user,
				};
			} catch (error) {
				return {
					status: error instanceof NotFoundException ? 404+"error" : 500,
				};
			}
		}
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
