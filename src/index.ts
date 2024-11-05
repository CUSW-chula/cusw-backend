import { Elysia, t } from "elysia";
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
import { FileController } from "./controllers/files.controller";
import jwt from "@elysiajs/jwt";

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
	.use(
		jwt({
			name: "jwt",
			secret: process.env.JWT_SECRET ?? "default token",
		}),
	)
	.decorate("db", prisma)
	.decorate("redis", redis)
	.decorate("minio", minioClient)
	.get("/sign/:id", async ({ jwt, cookie: { auth }, params }) => {
		auth.set({
			value: await jwt.sign(params),
			httpOnly: true,
			path: "/",
		});

		return `Sign in as ${auth.value}`;
	})
	.guard(
		{
			headers: t.Object({
				authorization: t.TemplateLiteral("Bearer ${string}"),
			}),
		},
		(app) =>
			app
				.onBeforeHandle(
					async ({
						headers: { authorization },
						jwt,
						set,
						cookie: { session },
					}) => {
						const token = authorization.split(" ")[1];
						const user = await jwt.verify(token);
						if (!user) {
							set.status = 401;
							return { message: "Unauthorization" };
						}
						set.status = 200;
						session.set({
							value: user.id,
							httpOnly: true,
							path: "/api",
						});
					},
				)
				.group("/api", (api) => {
					api.use(ProjectController);
					api.use(UserController);
					api.use(TaskController);
					api.use(CommentController);
					api.use(TagController);
					api.use(FileController);
					return api;
				}),
	)
	.listen(4000);

console.info(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

console.info(
	"Swagger·documentation·available·at·http://localhost:4000/swagger",
);
