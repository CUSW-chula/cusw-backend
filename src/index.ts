// Import dependencies
import { Elysia, t } from "elysia";
import { PrismaClient } from "@prisma/client";
import swagger from "@elysiajs/swagger";
import Redis from "ioredis";
import * as Minio from "minio";
import cors from "@elysiajs/cors";
import jwt from "@elysiajs/jwt";
import { Exception, UnauthorizedException } from "./core/exception.core";

// Import controllers
import controllersV1 from "./v1/controllers";
import controllersV2 from "./v2/controllers";

// Initialize services
const prisma = new PrismaClient();
const redis = new Redis({ host: "localhost", port: 6379 });
const minioClient = new Minio.Client({
	endPoint: "localhost",
	port: 9000,
	useSSL: false,
	accessKey: process.env.MINIO_ACCESS_KEY ?? "",
	secretKey: process.env.MINIO_SECRET_KEY ?? "",
});

// Initialize Elysia app
const app = new Elysia()
	.use(swagger({ version: "1.0.0" }))
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
	.decorate("minio", minioClient);

// Route for signing a token
app.get("/sign/:id", async ({ jwt, params }) => {
	const auth = await jwt.sign(params);
	return `${auth}`;
});

// Middleware for handling authorization and grouping routes by version
app.guard(
	{
		headers: t.Object({
			authorization: t.TemplateLiteral("Bearer ${string}"),
		}),
	},
	(app) =>
		app
			.error({ Exception })
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
						throw new UnauthorizedException("Unauthorized");
					}
					set.status = 200;
					session.set({
						value: user.id,
						httpOnly: true,
						path: "/api",
					});
				},
			)
			.onError(({ set, error }) => {
				if (error instanceof Exception) {
					set.status = error.statusCode;
					return Response.json(error.message, { status: error.statusCode });
				}
			})
			.group("/api/v1", (api) => {
				controllersV1.forEach((controller) => api.use(controller));
				return api;
			})
			.group("/api/v2", (api) => {
				controllersV2.forEach((controller) => api.use(controller));
				return api;
			}),
);

// Start the server
app.listen(4000);

console.info(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
console.info("🦊 API is running at http://localhost:4000/swagger");
