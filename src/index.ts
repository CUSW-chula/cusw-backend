// Import dependencies
import { Elysia, t } from "elysia";
import swagger from "@elysiajs/swagger";
import Redis from "ioredis";
import * as Minio from "minio";
import cors from "@elysiajs/cors";
import jwt from "@elysiajs/jwt";
import { Exception, UnauthorizedException } from "./core/exception.core";

// Import controllers
import controllersV2 from "./v2/controllers";
import { prisma } from "./core/prisma.core";

// Initialize services
const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379", {
	retryStrategy: (times) => {
		const delay = Math.min(times * 100, 3000);
		console.warn(
			`🔁 Redis reconnecting... attempt #${times}, delay=${delay}ms`,
		);

		return delay;
	},
	reconnectOnError: (err) => {
		const targetError = ["READONLY", "ECONNRESET", "ETIMEDOUT", "ECONNREFUSED"];
		const shouldReconnect = targetError.some((error) =>
			err.message.includes(error),
		);
		if (shouldReconnect) {
			console.warn(`🚨 Redis error matched retry condition: ${err.message}`);
		}
		return shouldReconnect;
	},
	keepAlive: 30000,
	connectTimeout: 10000,
});

const minioEndpoint = new URL(
	process.env.MINIO_ENDPOINT || "http://localhost:9000",
);
const minioClient = new Minio.Client({
	endPoint: minioEndpoint.hostname,
	port: parseInt(minioEndpoint.port),
	useSSL: false,
	accessKey: process.env.MINIO_ACCESS_KEY ?? "",
	secretKey: process.env.MINIO_SECRET_KEY ?? "",
});

// Initialize Elysia app
const app = new Elysia()
	.use(swagger({ version: "2.0.0" }))
	.use(
		cors({
			origin: [
				"http://localhost:3000",
				"http://localhost:4173",
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
			exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365,
		}),
	)
	.decorate("db", prisma)
	.decorate("redis", redis)
	.decorate("minio", minioClient);

// Route for signing a token
app.get("sign/:email", async ({ jwt, params }) => {
	const userId = await prisma.user.findFirst({
		where: { email: params.email },
	});
	if (!userId?.id || userId.activated === false) {
		throw new Error("User ID is undefined");
	}
	const auth = await jwt.sign({ id: userId.id });
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
					
					// Check if user is still active
					const dbUser = await prisma.user.findUnique({
						where: { id: user.id as string },
						select: { activated: true },
					});
					
					if (!dbUser || !dbUser.activated) {
						throw new UnauthorizedException("User account is inactive");
					}
					
					set.status = 200;
					session.set({
						value: user.id as string,
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
			.group("/api/v2", (api) => {
				controllersV2.forEach((controller) => api.use(controller));
				return api;
			}),
);

// Start the server
app.listen(4000);

console.info(
	`🦊 Backend v3 is running at ${app.server?.hostname}:${app.server?.port}`,
);
console.info("🦊 API is running at http://localhost:4000/swagger");
