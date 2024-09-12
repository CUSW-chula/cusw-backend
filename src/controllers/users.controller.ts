import { Elysia, t } from "elysia";
import { UserService } from "../services/users.service";
import { Context } from "../shared/interfaces.shared";

export const UserController = new Elysia({ prefix: "/users" })
	.get("/", ({ db, redis }: Context) => {
		const userService = new UserService(db, redis);
		return userService.getAllUsers();
	})
	.get(
		"/:id",
		({ params: { id }, db, redis }: Context & { params: { id: string } }) => {
			const userService = new UserService(db, redis);
			return userService.getUserById(id);
		},
	)
	.post(
		"/",
		({
			body,
			db,
			redis,
		}: Context & { body: { name: string; email: string } }) => {
			const userService = new UserService(db, redis);
			return userService.createNewUser(body);
		},
		{
			body: t.Object({
				name: t.String(),
				email: t.String(),
			}),
		},
	);
