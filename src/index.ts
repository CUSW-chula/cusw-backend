import { Elysia } from "elysia";
import { PrismaClient } from "@prisma/client";
import { UserController } from "./controllers/users.controller";
import swagger from "@elysiajs/swagger";
import Redis from "ioredis";
import * as Minio from "minio";
import { ProjectController } from "./controllers/projects.controller";
import { CommentController } from "./controllers/comment.controllers";
import cors from "@elysiajs/cors";
import { TaskController } from "./controllers/tasks.controller";
import { TagController } from "./controllers/tag.controller";
import { ActivityController } from "./controllers/activity-logs.controllers";

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
	.use(
		cors({
			origin: ["http://localhost:3000", "http://cusw-workspace.sa.chula.ac.th"],
			methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
			credentials: true,
		}),
	)
	.decorate("db", prisma)
	.decorate("redis", redis)
	.decorate("minio", minioClient)
	.group("/api", (api) => {
		api.use(ProjectController);
		api.use(UserController);
		api.use(TaskController);
		api.use(CommentController);
		api.use(TagController);
		api.use(ActivityController);
		return api;
	})
	.listen(4000);

console.info(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

console.info(
	"Swagger·documentation·available·at·http://localhost:4000/swagger",
);
