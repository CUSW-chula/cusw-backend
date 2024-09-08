import { User as UserModel } from "../models/users.model";
import type { PrismaClient, User } from "@prisma/client";
import type Redis from "ioredis";

export class UserService {
	private readonly userModel: UserModel;
	private readonly redis: Redis;
	private cacheTTL = 60; // Cache TTL in seconds

	constructor(prisma: PrismaClient, redis: Redis) {
		this.userModel = new UserModel(prisma);
		this.redis = redis;
	}

	// Fetch all users with Redis caching
	async getAllUsers(): Promise<User[]> {
		const cacheKey = "users:all";

		// Check if data exists in Redis
		const cachedUsers = await this.redis.get(cacheKey);
		if (cachedUsers !== null) {
			return JSON.parse(cachedUsers) as User[]; // Return cached data
		}

		// If not cached, fetch from DB
		const users = await this.userModel.findAll();

		// Cache the result in Redis
		await this.redis.set(cacheKey, JSON.stringify(users), "EX", this.cacheTTL);

		return users;
	}

	// Fetch a user by ID with Redis caching
	async getUserById(id: string): Promise<User | null> {
		const cacheKey = `users:${id}`;

		// Check if data exists in Redis
		const cachedUser = await this.redis.get(cacheKey);
		if (cachedUser !== null) {
			return JSON.parse(cachedUser) as User; // Return cached data
		}

		// If not cached, fetch from DB
		const user = await this.userModel.findById(id);

		// Cache the result in Redis
		if (user) {
			await this.redis.set(cacheKey, JSON.stringify(user), "EX", this.cacheTTL);
		}

		return user;
	}

	// Create a new user (invalidate cache)
	async createUser(userData: { name: string; email: string }): Promise<User> {
		const newUser = await this.userModel.create(userData);

		// Invalidate the cache for all users
		await this.redis.del("users:all");

		return newUser;
	}

	// Update an existing user (invalidate cache)
	async updateUser(
		id: string,
		userData: Partial<{ name: string; email: string }>,
	): Promise<User> {
		const updatedUser = await this.userModel.update(id, userData);

		// Invalidate the cache for this specific user and all users
		await this.redis.del(`users:${id}`);
		await this.redis.del("users:all");

		return updatedUser;
	}

	// Delete a user (invalidate cache)
	async deleteUser(id: string): Promise<User> {
		const deletedUser = await this.userModel.delete(id);

		// Invalidate the cache for this specific user and all users
		await this.redis.del(`users:${id}`);
		await this.redis.del("users:all");

		return deletedUser;
	}
}
