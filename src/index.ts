import { Elysia } from "elysia";
import { PrismaClient } from "@prisma/client";
import { UserController } from "./controllers/users.controller";
import swagger from "@elysiajs/swagger";
import Redis from "ioredis";
import { ProjectController } from "./controllers/projects.controller";

const prisma = new PrismaClient();
const redis = new Redis();

const app = new Elysia()
	.use(swagger())
	.decorate("db", prisma)
	.decorate("redis", redis)
	.group("/api", (api) => {
		api.use(ProjectController);
		api.use(UserController);
		return api;
	})
	.listen(3000);

console.info(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

console.info(
	"Swagger·documentation·available·at·http://localhost:3000/swagger",
);
