import { Elysia } from "elysia";
import { PrismaClient } from "@prisma/client";
import { UserController } from "./controllers/users.controller";
import swagger from "@elysiajs/swagger";
import Redis from "ioredis";
import * as Minio from "minio";
import { ProjectController } from "./controllers/projects.controller";
import { TaskController } from "./controllers/tasks.controller";

const prisma = new PrismaClient();
const redis = new Redis();
const minioClient = new Minio.Client({
	endPoint: "localhost",
	port: 9000,
	useSSL: false,
	accessKey: process.env.MINIO_ACCESS_KEY ?? "",
	secretKey: process.env.MINIO_SECRET_KEY ?? "",
});

const app = new Elysia()
	.use(swagger())
	.decorate("db", prisma)
	.decorate("redis", redis)
	.decorate("minio", minioClient)
	.group("/api", (api) => {
		api.use(ProjectController);
		api.use(UserController);
		api.use(TaskController);
		return api;
	})
	.listen(4000);

console.info(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

console.info(
	"Swagger·documentation·available·at·http://localhost:4000/swagger",
);
