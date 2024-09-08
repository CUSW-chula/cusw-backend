import { User as UserModel } from "../models/users.model";
import type { PrismaClient, User } from "@prisma/client";
import type Redis from "ioredis";

export class UserService {
	private readonly user_model: UserModel;
	private readonly redis: Redis;
	private readonly cache_ttl = 60; // Cache TTL in seconds

	constructor(prisma: PrismaClient, redis: Redis) {
		this.user_model = new UserModel(prisma);
		this.redis = redis;
	}

	// Fetch all users with Redis caching
	async getAllUsers(): Promise<User[]> {
		const cache_key = "users:all";

		// Check if data exists in Redis
		const cached_users = await this.redis.get(cache_key);
		if (cached_users !== null) {
			return JSON.parse(cached_users) as User[]; // Return cached data
		}

		// If not cached, fetch from DB
		const users = await this.user_model.findAll();

		// Cache the result in Redis
		await this.redis.set(
			cache_key,
			JSON.stringify(users),
			"EX",
			this.cache_ttl,
		);

		return users;
	}

	// Fetch a user by ID with Redis caching
	async getUserById(id: string): Promise<User | null> {
		const cache_key = `users:${id}`;

		// Check if data exists in Redis
		const cached_user = await this.redis.get(cache_key);
		if (cached_user !== null) {
			return JSON.parse(cached_user) as User; // Return cached data
		}

		// If not cached, fetch from DB
		const user = await this.user_model.findById(id);

		// Cache the result in Redis
		if (user) {
			await this.redis.set(
				cache_key,
				JSON.stringify(user),
				"EX",
				this.cache_ttl,
			);
		}

		return user;
	}

	// Create a new user (invalidate cache)
	async createUser(user_data: { name: string; email: string }): Promise<User> {
		const new_user = await this.user_model.create(user_data);

		// Invalidate the cache for all users
		await this.redis.del("users:all");

		return new_user;
	}

	// Update an existing user (invalidate cache)
	async updateUser(
		id: string,
		user_data: Partial<{ name: string; email: string }>,
	): Promise<User> {
		const updated_user = await this.user_model.update(id, user_data);

		// Invalidate the cache for this specific user and all users
		await this.redis.del(`users:${id}`);
		await this.redis.del("users:all");

		return updated_user;
	}

	// Delete a user (invalidate cache)
	async deleteUser(id: string): Promise<User> {
		const deleted_user = await this.user_model.delete(id);

		// Invalidate the cache for this specific user and all users
		await this.redis.del(`users:${id}`);
		await this.redis.del("users:all");

		return deleted_user;
	}
}
