import { Elysia, t } from "elysia";
import { PrismaClient } from "@prisma/client";
import swagger from "@elysiajs/swagger";
import Redis from "ioredis";
import * as Minio from "minio";
import cors from "@elysiajs/cors";
import jwt from "@elysiajs/jwt";

import { UserController } from "./v1/controllers/users.controller";
import { ProjectController } from "./v1/controllers/projects.controller";
import { CommentController } from "./v1/controllers/comment.controller";
import { TaskController } from "./v1/controllers/tasks.controller";
import { TagController } from "./v1/controllers/tag.controller";
import { FileController } from "./v1/controllers/files.controller";
import { ActivityController } from "./v1/controllers/activity-logs.controller";

import { ProjectController as ProjectController2 } from "./v2/controllers/projects.controller";
import { UserController as UserController2 } from "./v2/controllers/users.controller";
import { CommentController as CommentController2 } from "./v2/controllers/comment.controller";
import { TaskController as TaskController2 } from "./v2/controllers/tasks.controller";
import { TagController as TagController2 } from "./v2/controllers/tag.controller";
import { FileController as FileController2 } from "./v2/controllers/files.controller";
import { ActivityController as ActivityController2 } from "./v2/controllers/activity-logs.controller";

// Initialize clients
const prisma = new PrismaClient();
const redis = new Redis({
	host: "localhost",
	port: 6379,
});
const minioClient = new Minio.Client({
	endPoint: "localhost",
	port: 9000,
	useSSL: false,
	accessKey: process.env.MINIO_ACCESS_KEY ?? "",
	secretKey: process.env.MINIO_SECRET_KEY ?? "",
});

// Version configuration
const versions = {
	v1: {
		controllers: [
			ProjectController,
			UserController,
			TaskController,
			CommentController,
			TagController,
			FileController,
			ActivityController,
		],
	},
	v2: {
		controllers: [
			ProjectController2,
			UserController2,
			TaskController2,
			CommentController2,
			TagController2,
			FileController2,
			ActivityController2,
		],
	},
};

// App initialization
const app = new Elysia()
	.use(
		swagger({
			path: "/swagger",
		}),
	)
	.use(
		cors({
			origin: [
				"http://localhost:3000",
				"https://cusw-workspace.sa.chula.ac.th",
			],
			methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
			credentials: true,
		}),
	)
	.use(
		jwt({
			name: "jwt",
			secret: process.env.JWT_SECRET ?? "default token",
		}),
	)
	.decorate("db", prisma)
	.decorate("redis", redis)
	.decorate("minio", minioClient)
	.get("/sign/:id", async ({ jwt, params }) => {
		const auth = await jwt.sign(params);
		return `${auth}`;
	});

// Add versioned routes dynamically
Object.entries(versions).forEach(([version, { controllers }]) => {
	app.group(`/${version}/api`, (api) => {
		controllers.forEach((controller) => {
			api.use(controller);
		});
		return api;
	});
});

// Start the server
app.listen(4000);

console.info(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

console.info("🦊 API is running at http://localhost:4000/swagger");
