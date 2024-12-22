import { UserModel } from "../models/users.model";
import { ProjectModel } from "../models/projects.model";
import { TasksAssignmentModel } from "../models/tasks-assignment.model";
import { TasksModel } from "../models/tasks.model";
import type { PrismaClient, Project, User } from "@prisma/client";
import { BaseService } from "../core/service.core";
import type Redis from "ioredis";
import {
	NotFoundException,
	ServerErrorException,
	ValidationException,
} from "../core/exception.core";

export class UserService extends BaseService<User> {
	private readonly userModel: UserModel;
	private readonly projectModel: ProjectModel;
	private readonly taskAssignmentModel: TasksAssignmentModel;
	private readonly taskModel: TasksModel;

	constructor(prisma: PrismaClient, redis: Redis) {
		super(redis, 60); //
		this.userModel = new UserModel(prisma);
		this.projectModel = new ProjectModel(prisma);
		this.taskAssignmentModel = new TasksAssignmentModel(prisma);
		this.taskModel = new TasksModel(prisma);
	}

	// Email validation method
	private validateEmail(email: string): boolean {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	// Fetch all users with caching
	async getAllUsers(): Promise<User[]> {
		const cacheKey = "users:all";
		const cachedUsers = await this.getFromCache(cacheKey);
		if (cachedUsers) return cachedUsers as User[];

		const users = await this.userModel.findAll();
		if (!users) throw new NotFoundException("No users found");
		await this.setToCache(cacheKey, users);
		return users;
	}

	// Fetch user by email
	async getUserByEmail(email: string): Promise<User | null> {
		const cacheKey = `users:email:${email}`;
		const cachedUser = await this.getFromCache(cacheKey);
		if (cachedUser) return cachedUser as User;
		const user = await this.userModel.findByEmail(email);
		if (!user) throw new NotFoundException("User not found");
		return user;
	}

	// Fetch user by ID with caching
	async getUserById(id: string): Promise<User | null> {
		const cacheKey = `users:${id}`;
		const cachedUser = await this.getFromCache(cacheKey);
		if (cachedUser) return cachedUser as User;

		const user = await this.userModel.findById(id);
		if (!user) throw new NotFoundException("User not found");
		await this.setToCache(cacheKey, user);
		return user;
	}

	//getAllProjectOwnerByProjectId
	async getUserOwnersByProjectId(projectId: string): Promise<User[]> {
		if (!projectId || typeof projectId !== "string") {
			throw new ValidationException("Invalid projectId");
		}

		const cacheKey = `users:project:${projectId}:owners`;
		const cachedUsers = await this.getFromCache(cacheKey);
		if (cachedUsers) return cachedUsers as User[];

		// ตรวจสอบว่าโปรเจกต์มีอยู่จริงหรือไม่
		const existingProject = await this.projectModel.findById(projectId);
		if (!existingProject) throw new NotFoundException("Project not found");

		// ดึงบทบาททั้งหมดในโปรเจกต์
		const roles = await this.projectModel.findrole(projectId);
		if (!roles || roles.length === 0)
			throw new NotFoundException("No roles found for the project");

		// ค้นหา userIds ของเจ้าของโปรเจกต์
		const userIds = roles
			.filter((role) => role.role === "ProjectOwner")
			.map((role) => role.userId);

		if (userIds.length === 0)
			throw new NotFoundException("No Project Owners found");

		// ดึงข้อมูลผู้ใช้ตาม userIds
		const users = await Promise.all(
			userIds.map((id) => this.userModel.findById(id)),
		);

		// กรองข้อมูลผู้ใช้ที่เป็น null หรือ undefined
		const validUsers = users.filter((user): user is User => user !== null);

		// บันทึกในแคช
		await this.setToCache(cacheKey, validUsers);

		return validUsers;
	}

	//getAllMemberofProjectByProjectId
	async getUserMemberByProjectId(projectId: string): Promise<User[]> {
		if (!projectId || typeof projectId !== "string") {
			throw new ValidationException("Invalid projectId");
		}

		const cacheKey = `users:project:${projectId}:owners`;
		const cachedUsers = await this.getFromCache(cacheKey);
		if (cachedUsers) return cachedUsers as User[];

		// ตรวจสอบว่าโปรเจกต์มีอยู่จริงหรือไม่
		const existingProject = await this.projectModel.findById(projectId);
		if (!existingProject) throw new NotFoundException("Project not found");

		// ดึงบทบาททั้งหมดในโปรเจกต์
		const roles = await this.projectModel.findrole(projectId);
		if (!roles || roles.length === 0)
			throw new NotFoundException("No roles found for the project");

		// ค้นหา userIds ของเจ้าของโปรเจกต์
		const userIds = roles
			.filter((role) => role.role === "Member")
			.map((role) => role.userId);

		if (userIds.length === 0)
			throw new NotFoundException("No Project Owners found");

		// ดึงข้อมูลผู้ใช้ตาม userIds
		const users = await Promise.all(
			userIds.map((id) => this.userModel.findById(id)),
		);

		// กรองข้อมูลผู้ใช้ที่เป็น null หรือ undefined
		const validUsers = users.filter((user): user is User => user !== null);

		// บันทึกในแคช
		await this.setToCache(cacheKey, validUsers);

		return validUsers;
	}

	// Create a new user with email validation and invalidate cache
	async createNewUser(userData: {
		name: string;
		email: string;
	}): Promise<User> {
		if (!this.validateEmail(userData.email)) {
			throw new ValidationException("Invalid email format");
		}

		const newUser = await this.userModel.create(userData);
		if (!newUser) throw new ServerErrorException("Failed to create user");
		await this.invalidateCache("users:all");
		await this.invalidateCache(`users:email:${userData.email}`);
		return newUser;
	}

	// Update user with email validation and invalidate cache
	async updateUserDetail(
		id: string,
		userData: Partial<{ name: string; email: string }>,
	): Promise<User> {
		if (userData.email && !this.validateEmail(userData.email)) {
			throw new Error("Invalid email format");
		}

		const updatedUser = await this.userModel.update(id, userData);
		if (!updatedUser) throw new ServerErrorException("Failed to update user");
		await this.invalidateCache(`users:${id}`);
		await this.invalidateCache("users:all");
		return updatedUser;
	}

	// Delete user and invalidate cache
	async deleteUserById(id: string): Promise<User> {
		const deletedUser = await this.userModel.delete(id);
		if (!deletedUser) throw new ServerErrorException("Failed to delete user");
		await this.invalidateCache(`users:${id}`);
		await this.invalidateCache("users:all");
		return deletedUser;
	}
}
