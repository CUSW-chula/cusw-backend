import { Elysia, t } from "elysia";
import { UserService } from "../services/users.service";
import type { PrismaClient } from "@prisma/client";
import type Redis from "ioredis";

interface Context {
	db: PrismaClient;
	redis: Redis;
}

export const UserController = new Elysia({ prefix: "/users" })
	.get("/", ({ db, redis }: Context) => {
		const user_service = new UserService(db, redis);
		return user_service.getAllUsers();
	})
	.get(
		"/:id",
		({ params: { id }, db, redis }: Context & { params: { id: string } }) => {
			const user_service = new UserService(db, redis);
			return user_service.getUserById(id);
		},
	)
	.post(
		"/",
		({
			body,
			db,
			redis,
		}: Context & { body: { name: string; email: string } }) => {
			const user_service = new UserService(db, redis);
			return user_service.createUser(body);
		},
		{
			body: t.Object({
				name: t.String(),
				email: t.String(),
			}),
		},
	);
