type ProjectWithTags = {
	id: string;
	title: string;
	startDate: Date | null;
	endDate: Date | null;
	tags?: Array<{ tag: { name: string; isProject: boolean } }>;
};
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
		const cacheKey = this.getUserCacheKey("all");
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
				// Get all project roles for this user
				const userProjectRoles = await this.projectRoleModel.findByUserId(
					user.id,
				);
				// Get all projectIds from project roles
				const projectIds = userProjectRoles.map((pr) => pr.projectId);
				// Fetch all projects for these IDs (with tags)
				const memberProjects =
					projectIds.length > 0
						? ((await this.projectModel.findManyByIdsWithTags(
								projectIds,
							)) as ProjectWithTags[])
						: [];
				// Get all tasks assigned to this user
				const assignedTasks = await this.taskModel.findAssignedTasksByUserId(
					user.id,
				);

				// Calculate task metrics
				const tasks = assignedTasks.map((ta) => ta.task);
				const taskCount = tasks.length;

				// Count tasks by status
				const assigned = tasks.filter((t) => t.status === "Assigned").length;
				const inRecheck = tasks.filter((t) => t.status === "InRecheck").length;
				const underReview = tasks.filter(
					(t) => t.status === "UnderReview",
				).length;
				const done = tasks.filter((t) => t.status === "Done").length;

				// Calculate percentages
				const perAssigned = taskCount > 0 ? (assigned / taskCount) * 100 : 0;
				const perInRecheck = taskCount > 0 ? (inRecheck / taskCount) * 100 : 0;
				const perUnderReview =
					taskCount > 0 ? (underReview / taskCount) * 100 : 0;
				const perDone = taskCount > 0 ? (done / taskCount) * 100 : 0;

				// Count how many times tasks were moved to InRecheck status
				const recheckActivities =
					await this.activityModel.findRecheckActivitiesByTaskIds(
						tasks.map((t) => t.id),
					);
				const rechecked = recheckActivities.length;

				// Group tasks by project
				const projectsMap = new Map();

				// Add all projects where user is a member (even if no tasks assigned)
				for (const project of memberProjects) {
					if (!projectsMap.has(project.id)) {
						let tags: string[] = [];
						if (Array.isArray(project.tags)) {
							tags = project.tags
								.filter(
									(pt: { tag: { name: string; isProject: boolean } }) =>
										pt.tag && pt.tag.isProject === true,
								)
								.map(
									(pt: { tag: { name: string; isProject: boolean } }) =>
										pt.tag.name,
								);
						}
						projectsMap.set(project.id, {
							id: project.id,
							title: project.title,
							startDate: project.startDate,
							endDate: project.endDate,
							tags,
							tasks: [],
						});
					}
				}
				// ...removed ownedProjects block, all projects are now included via projectRole...

				// Add tasks to their projects
				for (const task of tasks) {
					const project = task.project as ProjectWithTags;
					if (!project) continue;
					if (!projectsMap.has(project.id)) {
						let tags: string[] = [];
						if (Array.isArray(project.tags)) {
							tags = project.tags
								.filter((pt) => pt.tag && pt.tag.isProject === true)
								.map((pt) => pt.tag.name);
						}
						projectsMap.set(project.id, {
							id: project.id,
							title: project.title,
							startDate: project.startDate,
							endDate: project.endDate,
							tags,
							tasks: [],
						});
					}

					// Determine acceptance status
					const now = new Date();
					let acceptanceStatus = "On time";
					if (task.endDate && now > task.endDate && task.status !== "Done") {
						acceptanceStatus = "Overdue";
					}

					// Count recheck for this specific task
					const taskRecheckCount =
						await this.activityModel.countRecheckActivitiesByTaskId(task.id);

					projectsMap.get(project.id).tasks.push({
						taskId: task.id,
						name: task.title,
						acceptanceStatus,
						taskStatus: task.status,
						rechecked: taskRecheckCount,
					});
				}

				const projects = Array.from(projectsMap.values());

				// Calculate startDateUser and endDateUser from projects
				let startDateUser = null;
				let endDateUser = null;

				if (projects.length > 0) {
					// Get earliest start date from projects
					const projectStartDates = projects
						.filter((project) => project.startDate !== null)
						.map((project) => new Date(project.startDate!));

					if (projectStartDates.length > 0) {
						startDateUser = new Date(
							Math.min(...projectStartDates.map((d) => d.getTime())),
						);
					}

					// Get latest end date from projects
					const projectEndDates = projects
						.filter((project) => project.endDate !== null)
						.map((project) => new Date(project.endDate!));

					if (projectEndDates.length > 0) {
						endDateUser = new Date(
							Math.max(...projectEndDates.map((d) => d.getTime())),
						);
					}
				}

				return {
					userId: user.id,
					name: user.name,
					startDateUser,
					endDateUser,
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
			}),
		);

		await this.redis.setex(
			`workload_dashboard`,
			30,
			JSON.stringify(workloadData),
		); // Cache for 5 minutes
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

		// Get all projects where user is a member
		const userProjects = await this.projectRoleModel.findByUserId(user.id);

		// Get all tasks assigned to this user
		const assignedTasks = await this.taskModel.findAssignedTasksByUserId(
			user.id,
		);

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
		const recheckActivities =
			await this.activityModel.findRecheckActivitiesByTaskIds(
				tasks.map((t) => t.id),
			);
		const rechecked = recheckActivities.length;

		// Group tasks by project
		const projectsMap = new Map();

		// Add all projects where user is a member (even if no tasks assigned)
		for (const pr of userProjects) {
			if (!projectsMap.has(pr.projectId)) {
				// Get project details with tags included
				const project = (await this.projectModel.findByIdWithTags(
					pr.projectId,
				)) as ProjectWithTags;
				if (project) {
					let tags: string[] = [];
					if (Array.isArray(project.tags)) {
						tags = project.tags
							.filter((pt) => pt.tag && pt.tag.isProject === true)
							.map((pt) => pt.tag.name);
					}
					projectsMap.set(project.id, {
						id: project.id,
						title: project.title,
						startDate: project.startDate,
						endDate: project.endDate,
						tags,
						tasks: [],
					});
				}
			}
		}

		// Add tasks to their projects
		for (const task of tasks) {
			const project = task.project as ProjectWithTags;
			if (!project) continue;
			if (!projectsMap.has(project.id)) {
				let tags: string[] = [];
				if (Array.isArray(project.tags)) {
					tags = project.tags
						.filter((pt) => pt.tag && pt.tag.isProject === true)
						.map((pt) => pt.tag.name);
				}
				projectsMap.set(project.id, {
					id: project.id,
					title: project.title,
					startDate: project.startDate,
					endDate: project.endDate,
					tags,
					tasks: [],
				});
			}

			// Determine acceptance status
			const now = new Date();
			let acceptanceStatus = "On time";
			if (task.endDate && now > task.endDate && task.status !== "Done") {
				acceptanceStatus = "Overdue";
			}

			// Count recheck for this specific task
			const taskRecheckCount =
				await this.activityModel.countRecheckActivitiesByTaskId(task.id);

			projectsMap.get(project.id).tasks.push({
				taskId: task.id,
				name: task.title,
				acceptanceStatus,
				taskStatus: task.status,
				rechecked: taskRecheckCount,
			});
		}

		const projects = Array.from(projectsMap.values());

		// Calculate startDateUser and endDateUser from projects
		let startDateUser = null;
		let endDateUser = null;

		if (projects.length > 0) {
			// Get earliest start date from projects
			const projectStartDates = projects
				.filter((project) => project.startDate !== null)
				.map((project) => new Date(project.startDate!));

			if (projectStartDates.length > 0) {
				startDateUser = new Date(
					Math.min(...projectStartDates.map((d) => d.getTime())),
				);
			}

			// Get latest end date from projects
			const projectEndDates = projects
				.filter((project) => project.endDate !== null)
				.map((project) => new Date(project.endDate!));

			if (projectEndDates.length > 0) {
				endDateUser = new Date(
					Math.max(...projectEndDates.map((d) => d.getTime())),
				);
			}
		}

		const workloadData = {
			userId: user.id,
			name: user.name,
			startDateUser,
			endDateUser,
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

		await this.redis.setex(cacheKey, 30, JSON.stringify(workloadData)); // Cache for 5 minutes
		return workloadData;
	}
	async getProjectsWithRoleAndTasks(userId: string) {
		const projectRoles = await this.projectRoleModel.findByUserId(userId);
		if (!projectRoles || projectRoles.length === 0) return [];

		const projectIds = projectRoles.map((pr) => pr.projectId);
		const projects = await this.projectModel.findManyByIdsWithTags(projectIds);
		const assignedTasks = await this.taskModel.findAssignedTasksByUserId(userId);
		const tasksByProject: Record<string, any> = {};
		for (const ta of assignedTasks) {
			const projectId = ta.task.project?.id;
			if (!projectId) continue;
			if (!tasksByProject[projectId]) tasksByProject[projectId] = [];
			tasksByProject[projectId].push({
				taskId: ta.task.id,
				name: ta.task.title,
				status: ta.task.status,
				startDate: ta.task.startDate,
				endDate: ta.task.endDate,
			});
		}
		return projectRoles.map((pr) => {
			const project = Array.isArray(projects)
				? projects.find((p) => p.id === pr.projectId)
				: null;
			return {
				id: pr.projectId,
				title: project?.title ?? '',
				role: pr.role,
				tasks: tasksByProject[pr.projectId] || [],
				tags: project?.tags || [],
				startDate: project?.startDate,
				endDate: project?.endDate,
			};
		});
	}
}
