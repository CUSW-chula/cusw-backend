import { UserModel } from "../models/users.model";
import type { PrismaClient, User } from "../../../generated";
import { BaseService } from "../../core/service.core";
import type Redis from "ioredis";
import {
	NotFoundException,
	ServerErrorException,
	ValidationException,
} from "../../core/exception.core";
import { ProjectRoleModel } from "../models/project-role.model";

export class UserService extends BaseService<User> {
	private readonly userModel: UserModel;
	private readonly projectRoleModel: ProjectRoleModel;

	constructor(prisma: PrismaClient, redis: Redis) {
		super(redis, 60); //
		this.userModel = new UserModel(prisma);
		this.projectRoleModel = new ProjectRoleModel(prisma);
	}

	// Email validation method
	private validateEmail(email: string): boolean {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	// Fetch all users with caching
	async getAllUsers(): Promise<User[]> {
		const cacheKey = this.getTaskCacheKey("all");
		const cachedUsers = await this.getFromCache(cacheKey);
		if (cachedUsers) return cachedUsers as User[];

		const users = await this.userModel.findAll();
		if (!users) throw new NotFoundException("No users found");
		await this.setToCache(cacheKey, users);
		return users.filter((user): user is User => user !== null);
	}

	async getAllByProjectId(projectId: string): Promise<User[]> {
		const usersFromDB = await this.projectRoleModel.findByProjectId(projectId);
		if (!usersFromDB)
			throw new NotFoundException("No users found for the given project ID");
		const users = await Promise.all(
			usersFromDB.map(async (user) => {
				const userDetail = await this.getUserById(user.userId);
				return userDetail;
			}),
		);
		if (!users) throw new NotFoundException("No users found");
		return users.filter((user): user is User => user !== null);
	}

	// Fetch user by email
	async getUserByEmail(email: string): Promise<User | null> {
		const user = await this.userModel.findByEmail(email);
		if (!user) throw new NotFoundException("User not found");
		return user;
	}

	async activeUser(userId: string, activated: boolean): Promise<User> {
		const activatedUser = await this.userModel.update(userId, {
			activated: activated,
		});
		if (!activatedUser) throw new NotFoundException("User not found");
		await this.invalidateAllCache("users");
		return activatedUser;
	}

	async changeAdmin(userId: string, isAdmin: boolean): Promise<User> {
		const updatedUser = await this.userModel.update(userId, { admin: isAdmin });
		if (!updatedUser) throw new NotFoundException("User not found");
		await this.invalidateAllCache("users");
		return updatedUser;
	}

	async changeHead(userId: string, isHead: boolean): Promise<User> {
		const updatedUser = await this.userModel.update(userId, { head: isHead });
		if (!updatedUser) throw new NotFoundException("User not found");
		await this.invalidateAllCache("users");
		return updatedUser;
	}

	// Fetch user by ID with caching
	async getUserById(id: string): Promise<User | null> {
		const cacheKey = this.getTaskCacheKey(id);
		const cachedUser = await this.getFromCache(cacheKey);
		if (cachedUser) return cachedUser as User;

		const user = await this.userModel.findById(id);
		if (!user) throw new NotFoundException("User not found");
		await this.setToCache(cacheKey, user);
		return user;
	}

	// Create a new user with email validation and invalidate cache
	async createNewUser(userData: {
		name: string;
		email: string;
		organization: string;
		position: string;
		isOutsource: boolean;
	}): Promise<User> {
		if (!this.validateEmail(userData.email)) {
			throw new ValidationException("Invalid email format");
		}

		const newUser = await this.userModel.create(userData);
		if (!newUser) throw new ServerErrorException("Failed to create user");
		await this.invalidateAllCache("users");
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
		await this.invalidateAllCache("users");
		return updatedUser;
	}

	// Delete user and invalidate cache
	async deleteUserById(id: string): Promise<User> {
		const deletedUser = await this.userModel.delete(id);
		if (!deletedUser) throw new ServerErrorException("Failed to delete user");
		await this.invalidateAllCache("users");
		return deletedUser;
	}
}
