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
import { TasksModel } from "../models/tasks.model";
import { ActivityLogsModel } from "../models/activity-logs.model";
import { ProjectModel } from "../models/projects.model";

export class UserService extends BaseService<User> {
	private readonly userModel: UserModel;
	private readonly projectRoleModel: ProjectRoleModel;
	private readonly taskModel: TasksModel;
	private readonly activityModel: ActivityLogsModel;
	private readonly projectModel: ProjectModel;
	private readonly prisma: PrismaClient;

	constructor(prisma: PrismaClient, redis: Redis) {
		super(redis, 60); //
		this.prisma = prisma;
		this.userModel = new UserModel(prisma);
		this.projectRoleModel = new ProjectRoleModel(prisma);
		this.taskModel = new TasksModel(prisma);
		this.activityModel = new ActivityLogsModel(prisma);
		this.projectModel = new ProjectModel(prisma);
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

	async updateUser(
		userId: string,
		userData: Partial<{
			name: string;
			organization: string;
			position: string;
			isOutsource: boolean;
		}>,
	): Promise<User> {
		const updatedUser = await this.userModel.update(userId, userData);
		if (!updatedUser) throw new NotFoundException("User not found");
		await this.invalidateAllCache("users");
		return updatedUser;
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
	// Get workload dashboard data for all users
	async getWorkloadDashboard() {
		const cacheKey = `workload_dashboard`;
		const cachedData = await this.redis.get(cacheKey);
		if (cachedData) return JSON.parse(cachedData);

		// Get all users
		const users = await this.userModel.findAll();

		const workloadData = await Promise.all(
			users.map(async (user) => {
				// Get all tasks assigned to this user
				const assignedTasks = await this.prisma.taskAssignment.findMany({
					where: { userId: user.id },
					include: {
						task: {
							include: {
								project: {
									include: {
										tags: {
											include: {
												tag: true,
											},
										},
									},
								},
							},
						},
					},
				});

				// Calculate task metrics
				const tasks = assignedTasks.map((ta) => ta.task);
				const taskCount = tasks.length;

				// Count tasks by status
				const assigned = tasks.filter((t) => t.status === "Assigned").length;
				const inRecheck = tasks.filter((t) => t.status === "InRecheck").length;
				const underReview = tasks.filter((t) => t.status === "UnderReview").length;
				const done = tasks.filter((t) => t.status === "Done").length;

				// Calculate percentages
				const perAssigned = taskCount > 0 ? (assigned / taskCount) * 100 : 0;
				const perInRecheck = taskCount > 0 ? (inRecheck / taskCount) * 100 : 0;
				const perUnderReview = taskCount > 0 ? (underReview / taskCount) * 100 : 0;
				const perDone = taskCount > 0 ? (done / taskCount) * 100 : 0;

				// Count how many times tasks were moved to InRecheck status
				const recheckActivities = await this.prisma.activity.findMany({
					where: {
						taskId: { in: tasks.map((t) => t.id) },
						detail: { contains: "InRecheck" },
					},
				});
				const rechecked = recheckActivities.length;

				// Group tasks by project
				const projectsMap = new Map();

				for (const task of tasks) {
					const project = task.project;
					if (!projectsMap.has(project.id)) {
						projectsMap.set(project.id, {
							id: project.id,
							title: project.title,
							startDate: project.startDate,
							endDate: project.endDate,
							tags: project.tags.map((pt) => pt.tag.name),
							tasks: [],
						});
					}

					// Determine acceptance status
					const now = new Date();
					let acceptanceStatus = "In time";
					if (task.endDate && now > task.endDate && task.status !== "Done") {
						acceptanceStatus = "Overdue";
					}

					// Count recheck for this specific task
					const taskRecheckCount = await this.prisma.activity.count({
						where: {
							taskId: task.id,
							detail: { contains: "InRecheck" },
						},
					});

					projectsMap.get(project.id).tasks.push({
						taskId: task.id,
						name: task.title,
						acceptanceStatus,
						taskStatus: task.status,
						rechecked: taskRecheckCount,
					});
				}

				const projects = Array.from(projectsMap.values());

				return {
					userId: user.id,
					name: user.name,
					metrics: {
						taskCount,
						rechecked,
						breakdown: {
							assigned,
							inRecheck,
							underReview,
							done,
							perAssigned: Math.round(perAssigned * 100) / 100,
							perInRecheck: Math.round(perInRecheck * 100) / 100,
							perUnderReview: Math.round(perUnderReview * 100) / 100,
							perDone: Math.round(perDone * 100) / 100,
						},
					},
					projects,
				};
			}),		);

		await this.redis.setex(`workload_dashboard`, 300, JSON.stringify(workloadData)); // Cache for 5 minutes
		return workloadData;
	}

	// Get workload data for a specific user by ID
	async getWorkloadByUserId(userId: string) {
		const cacheKey = `workload_user_${userId}`;
		const cachedData = await this.redis.get(cacheKey);
		if (cachedData) return JSON.parse(cachedData);

		// Get the specific user
		const user = await this.userModel.findById(userId);
		if (!user) throw new NotFoundException("User not found");

		// Get all tasks assigned to this user
		const assignedTasks = await this.prisma.taskAssignment.findMany({
			where: { userId: user.id },
			include: {
				task: {
					include: {
						project: {
							include: {
								tags: {
									include: {
										tag: true,
									},
								},
							},
						},
					},
				},
			},
		});

		// Calculate task metrics
		const tasks = assignedTasks.map((ta) => ta.task);
		const taskCount = tasks.length;

		// Count tasks by status
		const assigned = tasks.filter((t) => t.status === "Assigned").length;
		const inRecheck = tasks.filter((t) => t.status === "InRecheck").length;
		const underReview = tasks.filter((t) => t.status === "UnderReview").length;
		const done = tasks.filter((t) => t.status === "Done").length;

		// Calculate percentages
		const perAssigned = taskCount > 0 ? (assigned / taskCount) * 100 : 0;
		const perInRecheck = taskCount > 0 ? (inRecheck / taskCount) * 100 : 0;
		const perUnderReview = taskCount > 0 ? (underReview / taskCount) * 100 : 0;
		const perDone = taskCount > 0 ? (done / taskCount) * 100 : 0;

		// Count how many times tasks were moved to InRecheck status
		const recheckActivities = await this.prisma.activity.findMany({
			where: {
				taskId: { in: tasks.map((t) => t.id) },
				detail: { contains: "InRecheck" },
			},
		});
		const rechecked = recheckActivities.length;

		// Group tasks by project
		const projectsMap = new Map();

		for (const task of tasks) {
			const project = task.project;
			if (!projectsMap.has(project.id)) {
				projectsMap.set(project.id, {
					id: project.id,
					title: project.title,
					startDate: project.startDate,
					endDate: project.endDate,
					tags: project.tags.map((pt) => pt.tag.name),
					tasks: [],
				});
			}

			// Determine acceptance status
			const now = new Date();
			let acceptanceStatus = "In time";
			if (task.endDate && now > task.endDate && task.status !== "Done") {
				acceptanceStatus = "Overdue";
			}

			// Count recheck for this specific task
			const taskRecheckCount = await this.prisma.activity.count({
				where: {
					taskId: task.id,
					detail: { contains: "InRecheck" },
				},
			});

			projectsMap.get(project.id).tasks.push({
				taskId: task.id,
				name: task.title,
				acceptanceStatus,
				taskStatus: task.status,
				rechecked: taskRecheckCount,
			});
		}

		const projects = Array.from(projectsMap.values());

		const workloadData = {
			userId: user.id,
			name: user.name,
			metrics: {
				taskCount,
				rechecked,
				breakdown: {
					assigned,
					inRecheck,
					underReview,
					done,
					perAssigned: Math.round(perAssigned * 100) / 100,
					perInRecheck: Math.round(perInRecheck * 100) / 100,
					perUnderReview: Math.round(perUnderReview * 100) / 100,
					perDone: Math.round(perDone * 100) / 100,
				},
			},
			projects,
		};

		await this.redis.setex(cacheKey, 300, JSON.stringify(workloadData)); // Cache for 5 minutes
		return workloadData;
	}
}
