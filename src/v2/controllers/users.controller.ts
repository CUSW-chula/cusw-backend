import { Elysia, t } from "elysia";
import { UserService } from "../services/users.service";
import { type Context } from "../../shared/interfaces.shared";

export const UserController = new Elysia({
	prefix: "/users",
	tags: ["Version 2"],
})
	// Get all users
	.get("/", async ({ db, redis }: Context) => {
		const userService = new UserService(db, redis);
		return await userService.getAllUsers();
	})
	// Get user by ID
	.get(
		"/:id",
		async ({
			params: { id },
			db,
			redis,
		}: Context & { params: { id: string } }) => {
			const userService = new UserService(db, redis);
			return await userService.getUserById(id);
		},
	)
	.get(
		"/email/:id",
		async ({
			params: { id },
			db,
			redis,
		}: Context & { params: { id: string } }) => {
			const userService = new UserService(db, redis);
			return await userService.getUserByEmail(id);
		},
	)
	.get(
		"/project/:projectId",
		async ({
			params: { projectId },
			db,
			redis,
		}: Context & { params: { projectId: string } }) => {
			const userService = new UserService(db, redis);
			return await userService.getAllByProjectId(projectId);
		},
	)
	// Create a new user
	.post(
		"/",
		async ({
			body,
			db,
			redis,
		}: Context & {
			body: {
				name: string;
				email: string;
				organization: string;
				position: string;
				isOutsource: boolean;
			};
		}) => {
			const userService = new UserService(db, redis);
			return await userService.createNewUser({
				email: body.email,
				name: body.name,
				organization: body.organization,
				position: body.position,
				isOutsource: body.isOutsource,
			});
		},
		{
			body: t.Object({
				name: t.String(),
				email: t.String(),
				organization: t.String(),
				position: t.String(),
				isOutsource: t.Boolean(),
			}),
		},
	)
	.patch(
		"/role/:userid",
		async ({
			params: { userid },
			body,
			db,
			redis,
		}: Context & {
			body: { isAdmin: boolean };
			params: { userid: string };
		}) => {
			const userService = new UserService(db, redis);
			return await userService.changeAdmin(userid, body.isAdmin);
		},
		{
			body: t.Object({
				isAdmin: t.Boolean(),
			}),
		},
	)
	.patch(
		"/head/:userid",
		async ({
			params: { userid },
			body,
			db,
			redis,
		}: Context & {
			body: { isHead: boolean };
			params: { userid: string };
		}) => {
			const userService = new UserService(db, redis);
			return await userService.changeHead(userid, body.isHead);
		},
		{
			body: t.Object({
				isHead: t.Boolean(),
			}),
		},
	)
	.patch(
		"/activate/:userid",
		async ({
			params: { userid },
			body,
			db,
			redis,
		}: Context & {
			body: { isActive: boolean };
			params: { userid: string };
		}) => {
			const userService = new UserService(db, redis);
			return await userService.activeUser(userid, body.isActive);
		},
		{
			body: t.Object({
				isActive: t.Boolean(),
			}),
		},
	);
