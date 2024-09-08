/* eslint-disable no-console */
import { Elysia } from "elysia";
import { PrismaClient } from "@prisma/client";
import { user_controller } from "./controller/users.controller";
import swagger from "@elysiajs/swagger";
import Redis from "ioredis";

const prisma = new PrismaClient();
const redis = new Redis();

const app = new Elysia()
  .use(swagger())
  .decorate("db", prisma)
  .decorate("redis", redis)
  .group("/api", (api) => api.use(user_controller))
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

console.log("Swagger·documentation·available·at·http://localhost:3000/swagger");
