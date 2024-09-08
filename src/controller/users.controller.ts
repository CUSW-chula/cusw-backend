import { Elysia, t } from "elysia";
import { UserService } from "../services/users.service";
import { PrismaClient } from "@prisma/client";

interface Context {
  db: PrismaClient;
}

export const UserController = new Elysia({ prefix: "/users" })
  .get("/", ({ db }: Context) => {
    const userService = new UserService(db);
    return userService.getAllUsers();
  })
  .get(
    "/:id",
    ({ params: { id }, db }: Context & { params: { id: string } }) => {
      const userService = new UserService(db);
      return userService.getUserById(id);
    },
  )
  .post(
    "/",
    ({ body, db }: Context & { body: { name: string; email: string } }) => {
      const userService = new UserService(db);
      return userService.createUser(body);
    },
    {
      body: t.Object({
        name: t.String(),
        email: t.String(),
      }),
    },
  );
