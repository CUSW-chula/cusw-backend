import { Elysia } from "elysia";
import { PrismaClient } from "@prisma/client";
import { UserController } from "./controller/users.controller";
import swagger from "@elysiajs/swagger";

const prisma = new PrismaClient();

const app = new Elysia()
  .use(swagger())
  .decorate("db", prisma)
  .group("/api", (app) => app.use(UserController))
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

console.log(`Swagger documentation available at http://localhost:3000/swagger`);
