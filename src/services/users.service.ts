import { UserModel } from "../models/users.model";
import type { PrismaClient, User } from "@prisma/client";
import { BaseService } from "../core/service.core";
import type Redis from "ioredis";

export class UserService extends BaseService<User> {
	private readonly userModel: UserModel;

	constructor(prisma: PrismaClient, redis: Redis) {
		super(redis, 60); //
		this.userModel = new UserModel(prisma);
	}

	// Fetch all users with caching
	async getAllUsers(): Promise<User[]> {
		const cacheKey = "users:all";
		const cachedUsers = await this.getFromCache(cacheKey);
		if (cachedUsers) return cachedUsers as User[];

		const users = await this.userModel.findAll();
		await this.setToCache(cacheKey, users);
		return users;
	}

	// Fetch user by ID with caching
	async getUserById(id: string): Promise<User | null> {
		const cacheKey = `users:${id}`;
		const cachedUser = await this.getFromCache(cacheKey);
		if (cachedUser) return cachedUser as User;

		const user = await this.userModel.findById(id);
		if (user) await this.setToCache(cacheKey, user);
		return user;
	}

	// Create a new user and invalidate cache
	async createNewUser(userData: {
		name: string;
		email: string;
	}): Promise<User> {
		const newUser = await this.userModel.create(userData);
		await this.invalidateCache("users:all");
		return newUser;
	}

	// Update user and invalidate cache
	async updateUserDetail(
		id: string,
		userData: Partial<{ name: string; email: string }>,
	): Promise<User> {
		const updatedUser = await this.userModel.update(id, userData);
		await this.invalidateCache(`users:${id}`);
		await this.invalidateCache("users:all");
		return updatedUser;
	}

	// Delete user and invalidate cache
	async deleteUserById(id: string): Promise<User> {
		const deletedUser = await this.userModel.delete(id);
		await this.invalidateCache(`users:${id}`);
		await this.invalidateCache("users:all");
		return deletedUser;
	}
}
