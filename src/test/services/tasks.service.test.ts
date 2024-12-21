import { describe, expect, it, jest, beforeEach, mock } from "bun:test";
import { TaskService } from "../../services/tasks.service";
import { type PrismaClient } from "@prisma/client";
import type Redis from "ioredis";

// Mock PrismaClient and Redis
const mockPrisma = {
	task: {
		findUnique: jest.fn(),
		create: jest.fn(),
		findMany: jest.fn(),
		update: jest.fn(),
	},
	user: {
		findUnique: jest.fn(),
	},
	project: {
		findUnique: jest.fn(),
	},
};
const mockRedis = {
	get: jest.fn(),
	set: jest.fn(),
	del: jest.fn(),
};

// Create a TaskService instance with mocked dependencies
let taskService: TaskService;

beforeEach(() => {
	taskService = new TaskService(
		mockPrisma as unknown as PrismaClient,
		mockRedis as unknown as Redis,
	);
});

describe("TaskService", () => {
	// Test for getAllTasks
	describe("getAllTasks", () => {
		it("should fetch all tasks from Redis cache if available", async () => {
			// Mock Redis cache to return cached data
			mockRedis.get.mockResolvedValueOnce(
				JSON.stringify([
					{
						id: "1",
						title: "Task 1",
						description: "Task description",
						status: "Assigned",
						projectId: "",
						parentTaskId: null,
						statusBudgets: "Initial",
						budget: 0,
						advance: 0,
						expense: 0,
						startDate: null,
						endDate: null,
						createdById: null,
					},
				]),
			);

			const tasks = await taskService.getAllTask();
			expect(tasks).toEqual([
				{
					id: "1",
					title: "Task 1",
					description: "Task description",
					status: "Assigned",
					projectId: "",
					parentTaskId: null,
					statusBudgets: "Initial",
					budget: 0,
					advance: 0,
					expense: 0,
					startDate: null,
					endDate: null,
					createdById: null,
				},
			]);
			expect(mockPrisma.task.findMany).not.toHaveBeenCalled();
		});

		it("should fetch all tasks from database if not cached", async () => {
			// Mock Redis cache to return null
			mockRedis.get.mockResolvedValueOnce(null);
			// Mock Prisma to return sample data
			mockPrisma.task.findMany.mockResolvedValueOnce([
				{
					id: "1",
					title: "Task 1",
					description: "Task description",
					status: "Assigned",
					projectId: "",
					parentTaskId: null,
					statusBudgets: "Initial",
					budget: 0,
					advance: 0,
					expense: 0,
					startDate: null,
					endDate: null,
					createdById: null,
				},
			]);

			const tasks = await taskService.getAllTask();
			expect(tasks).toEqual([
				{
					id: "1",
					title: "Task 1",
					description: "Task description",
					status: "Assigned",
					projectId: "",
					parentTaskId: null,
					statusBudgets: "Initial",
					budget: 0,
					advance: 0,
					expense: 0,
					startDate: null,
					endDate: null,
					createdById: null,
				},
			]);
			expect(mockPrisma.task.findMany).toHaveBeenCalled();
			expect(mockRedis.set).toHaveBeenCalledWith(
				"tasks:all",
				JSON.stringify([
					{
						id: "1",
						title: "Task 1",
						description: "Task description",
						status: "Assigned",
						projectId: "",
						parentTaskId: null,
						statusBudgets: "Initial",
						budget: 0,
						advance: 0,
						expense: 0,
						startDate: null,
						endDate: null,
						createdById: null,
					},
				]),
				"EX",
				60,
			);
		});
	});

	describe("getTaskById", () => {
		it("should fetch task by ID from Redis cache if available", async () => {
			// Mock Redis cache to return cached data
			mockRedis.get.mockResolvedValueOnce(
				JSON.stringify({
					id: "1",
					title: "Task 1",
					description: "Task description",
					status: "Assigned",
					projectId: "",
					parentTaskId: null,
					statusBudgets: "Initial",
					budget: 0,
					advance: 0,
					expense: 0,
					startDate: null,
					endDate: null,
					createdById: null,
				}),
			);

			const task = await taskService.getTaskById("1");
			expect(task).toEqual({
				id: "1",
				title: "Task 1",
				description: "Task description",
				status: "Assigned",
				projectId: "",
				parentTaskId: null,
				statusBudgets: "Initial",
				budget: 0,
				advance: 0,
				expense: 0,
				startDate: null,
				endDate: null,
				createdById: null,
			});
			expect(mockPrisma.task.findUnique).not.toHaveBeenCalled();
		});

		it("should fetch task by ID from database if not cached", async () => {
			// Mock Redis cache to return null
			mockRedis.get.mockResolvedValueOnce(null);
			// Mock Prisma to return sample data
			mockPrisma.task.findUnique.mockResolvedValueOnce({
				id: "1",
				title: "Task 1",
				description: "Task description",
				status: "Assigned",
				projectId: "",
				parentTaskId: null,
				statusBudgets: "Initial",
				budget: 0,
				advance: 0,
				expense: 0,
				startDate: null,
				endDate: null,
				createdById: null,
			});

			const task = await taskService.getTaskById("1");
			expect(task).toEqual({
				id: "1",
				title: "Task 1",
				description: "Task description",
				status: "Assigned",
				projectId: "",
				parentTaskId: null,
				statusBudgets: "Initial",
				budget: 0,
				advance: 0,
				expense: 0,
				startDate: null,
				endDate: null,
				createdById: null,
			});
		});

		it("should fetch task by project id from Redis cache if available", async () => {
			mockPrisma.project.findUnique.mockResolvedValueOnce({ id: "1" });
			mockRedis.get.mockResolvedValueOnce(
				JSON.stringify([
					{
						id: "1",
						title: "Task 1",
						description: "Task description",
						status: "Assigned",
						projectId: "1",
						parentTaskId: null,
						statusBudgets: "Initial",
						budget: 0,
						advance: 0,
						expense: 0,
						startDate: null,
						endDate: null,
						createdById: null,
					},
				]),
			);
			const tasks = await taskService.getTaskByProjectId("1");
			expect(tasks).toEqual([
				{
					id: "1",
					title: "Task 1",
					description: "Task description",
					status: "Assigned",
					projectId: "1",
					parentTaskId: null,
					statusBudgets: "Initial",
					budget: 0,
					advance: 0,
					expense: 0,
					startDate: null,
					endDate: null,
					createdById: null,
				},
			]);
		});

		it("should fetch task by project id from database if not cached", async () => {
			mockPrisma.project.findUnique.mockResolvedValueOnce({ id: "1" });
			mockPrisma.task.findUnique.mockResolvedValueOnce({
				id: "1",
				title: "Task 1",
				description: "Task description",
				status: "Assigned",
				projectId: "1",
				parentTaskId: null,
				statusBudgets: "Initial",
				budget: 0,
				advance: 0,
				expense: 0,
				startDate: null,
				endDate: null,
				createdById: null,
			});
			mockRedis.get.mockResolvedValueOnce(null);
			mockPrisma.task.findMany.mockResolvedValueOnce([
				{
					id: "1",
					title: "Task 1",
					description: "Task description",
					status: "Assigned",
					projectId: "1",
					parentTaskId: null,
					statusBudgets: "Initial",
					budget: 0,
					advance: 0,
					expense: 0,
					startDate: null,
					endDate: null,
					createdById: null,
				},
			]);
			const tasks = await taskService.getTaskByProjectId("1");
			expect(tasks).toEqual([
				{
					id: "1",
					title: "Task 1",
					description: "Task description",
					status: "Assigned",
					projectId: "1",
					parentTaskId: null,
					statusBudgets: "Initial",
					budget: 0,
					advance: 0,
					expense: 0,
					startDate: null,
					endDate: null,
					createdById: null,
				},
			]);
		});

		it("should fetch task by parent id from Redis cache if available", async () => {
			mockRedis.get.mockResolvedValueOnce(
				JSON.stringify([
					{
						id: "1",
						title: "Task 1",
						description: "Task description",
						status: "Assigned",
						projectId: "1",
						parentTaskId: null,
						statusBudgets: "Initial",
						budget: 0,
						advance: 0,
						expense: 0,
						startDate: null,
						endDate: null,
						createdById: null,
					},
				]),
			);
			const tasks = await taskService.getTaskByParentTaskId("1");
			expect(tasks).toEqual([
				{
					id: "1",
					title: "Task 1",
					description: "Task description",
					status: "Assigned",
					projectId: "1",
					parentTaskId: null,
					statusBudgets: "Initial",
					budget: 0,
					advance: 0,
					expense: 0,
					startDate: null,
					endDate: null,
					createdById: null,
				},
			]);
		});

		it("should fetch task by parent id from database if not cached", async () => {
			mockPrisma.task.findUnique.mockResolvedValueOnce({
				id: "1",
				title: "Task 1",
				description: "Task description",
				status: "Assigned",
				projectId: "1",
				parentTaskId: null,
				statusBudgets: "Initial",
				budget: 0,
				advance: 0,
				expense: 0,
				startDate: null,
				endDate: null,
				createdById: null,
			});
			mockRedis.get.mockResolvedValueOnce(null);
			mockPrisma.task.findMany.mockResolvedValueOnce([
				{
					id: "1",
					title: "Task 1",
					description: "Task description",
					status: "Assigned",
					projectId: "1",
					parentTaskId: null,
					statusBudgets: "Initial",
					budget: 0,
					advance: 0,
					expense: 0,
					startDate: null,
					endDate: null,
					createdById: null,
				},
			]);
			const tasks = await taskService.getTaskByParentTaskId("1");
			expect(tasks).toEqual([
				{
					id: "1",
					title: "Task 1",
					description: "Task description",
					status: "Assigned",
					projectId: "1",
					parentTaskId: null,
					statusBudgets: "Initial",
					budget: 0,
					advance: 0,
					expense: 0,
					startDate: null,
					endDate: null,
					createdById: null,
				},
			]);
			expect(mockPrisma.task.findMany).toHaveBeenCalled();
		});

		it("should get recursive parent task list", async () => {
			mockPrisma.task.findUnique.mockResolvedValueOnce({
				id: "1",
				title: "Task 1",
				description: "Task description",
				status: "Assigned",
				projectId: "1",
				parentTaskId: "2",
				statusBudgets: "Initial",
				budget: 0,
				advance: 0,
				expense: 0,
				startDate: null,
				endDate: null,
				createdById: null,
			});
			mockPrisma.task.findUnique.mockResolvedValueOnce({
				id: "2",
				title: "Task 2",
				description: "Task description",
				status: "Assigned",
				projectId: "1",
				parentTaskId: "3",
				statusBudgets: "Initial",
				budget: 0,
				advance: 0,
				expense: 0,
				startDate: null,
				endDate: null,
				createdById: null,
			});
			mockPrisma.task.findUnique.mockResolvedValueOnce({
				id: "3",
				title: "Task 3",
				description: "Task description",
				status: "Assigned",
				projectId: "1",
				parentTaskId: null,
				statusBudgets: "Initial",
				budget: 0,
				advance: 0,
				expense: 0,
				startDate: null,
				endDate: null,
				createdById: null,
			});
			const tasks = await taskService.getRecursiveParentTaskList("1");
			expect(tasks).toEqual([
				{
					id: "3",
					title: "Task 3",
					description: "Task description",
					status: "Assigned",
					projectId: "1",
					parentTaskId: null,
					statusBudgets: "Initial",
					budget: 0,
					advance: 0,
					expense: 0,
					startDate: null,
					endDate: null,
					createdById: null,
				},
				{
					id: "2",
					title: "Task 2",
					description: "Task description",
					status: "Assigned",
					projectId: "1",
					parentTaskId: "3",
					statusBudgets: "Initial",
					budget: 0,
					advance: 0,
					expense: 0,
					startDate: null,
					endDate: null,
					createdById: null,
				},
				{
					id: "1",
					title: "Task 1",
					description: "Task description",
					status: "Assigned",
					projectId: "1",
					parentTaskId: "2",
					statusBudgets: "Initial",
					budget: 0,
					advance: 0,
					expense: 0,
					startDate: null,
					endDate: null,
					createdById: null,
				},
			]);
		});

		it("should get parent task by task id", async () => {
			mockPrisma.task.findUnique.mockResolvedValueOnce({
				id: "1",
				title: "Task 1",
				description: "Task description",
				status: "Assigned",
				projectId: "1",
				parentTaskId: "2",
				statusBudgets: "Initial",
				budget: 0,
				advance: 0,
				expense: 0,
				startDate: null,
				endDate: null,
				createdById: null,
			});
			mockPrisma.task.findUnique.mockResolvedValueOnce({
				id: "2",
				title: "Task 2",
				description: "Task description",
				status: "Assigned",
				projectId: "1",
				parentTaskId: "3",
				statusBudgets: "Initial",
				budget: 0,
				advance: 0,
				expense: 0,
				startDate: null,
				endDate: null,
				createdById: null,
			});
			mockPrisma.task.findUnique.mockResolvedValueOnce({
				id: "3",
				title: "Task 3",
				description: "Task description",
				status: "Assigned",
				projectId: "1",
				parentTaskId: null,
				statusBudgets: "Initial",
				budget: 0,
				advance: 0,
				expense: 0,
				startDate: null,
				endDate: null,
				createdById: null,
			});
			const task = await taskService.getParentTask("1");
			expect(task).toEqual({
				id: "2",
				title: "Task 2",
				description: "Task description",
				status: "Assigned",
				projectId: "1",
				parentTaskId: "3",
				statusBudgets: "Initial",
				budget: 0,
				advance: 0,
				expense: 0,
				startDate: null,
				endDate: null,
				createdById: null,
			});
		});
	});

	describe("StatusManagement", () => {
		it("should update task status", async () => {
			mockPrisma.task.findUnique.mockResolvedValueOnce({
				id: "1",
				title: "Task 1",
				description: "Task description",
				status: "Assigned",
				projectId: "1",
				parentTaskId: null,
				statusBudgets: "Initial",
				budget: 0,
				advance: 0,
				expense: 0,
				startDate: null,
				endDate: null,
				createdById: "1",
			});
			mockPrisma.user.findUnique.mockResolvedValueOnce({ id: "1" });
			mockPrisma.task.update.mockResolvedValueOnce({
				id: "1",
				title: "Task 1",
				description: "Task description",
				status: "Done",
				projectId: "1",
				parentTaskId: null,
				statusBudgets: "Initial",
				budget: 0,
				advance: 0,
				expense: 0,
				startDate: null,
				endDate: null,
				createdById: "1",
			});
			const updatedTask = await taskService.changeStatus("1", "Done");
			expect(updatedTask).toEqual({
				id: "1",
				title: "Task 1",
				description: "Task description",
				status: "Done",
				projectId: "1",
				parentTaskId: null,
				statusBudgets: "Initial",
				budget: 0,
				advance: 0,
				expense: 0,
				startDate: null,
				endDate: null,
				createdById: "1",
			});
		});
	});

	describe("DateManagement", () => {
		it("should update task dates", async () => {
			mockPrisma.task.findUnique.mockResolvedValueOnce({
				id: "1",
				title: "Task 1",
				description: "Task description",
				status: "Assigned",
				projectId: "1",
				parentTaskId: null,
				statusBudgets: "Initial",
				budget: 0,
				advance: 0,
				expense: 0,
				startDate: null,
				endDate: null,
				createdById: "1",
			});
			mockPrisma.user.findUnique.mockResolvedValueOnce({ id: "1" });
			mockPrisma.task.update.mockResolvedValueOnce({
				id: "1",
				title: "Task 1",
				description: "Task description",
				status: "Assigned",
				projectId: "1",
				parentTaskId: null,
				statusBudgets: "Initial",
				budget: 0,
				advance: 0,
				expense: 0,
				startDate: new Date(),
				endDate: new Date(),
				createdById: "1",
			});
			const updatedTask = await taskService.updateDate(
				"1",
				new Date(),
				new Date(),
			);
			expect(updatedTask).toEqual({
				id: "1",
				title: "Task 1",
				description: "Task description",
				status: "Assigned",
				projectId: "1",
				parentTaskId: null,
				statusBudgets: "Initial",
				budget: 0,
				advance: 0,
				expense: 0,
				startDate: new Date(),
				endDate: new Date(),
				createdById: "1",
			});
		});
	});

	// Test for createTask
	describe("createTask", () => {
		it("should create a new task and invalidate cache", async () => {
			// Mock Prisma to return sample data
			mockPrisma.user.findUnique.mockResolvedValue({
				id: "1",
			});
			mockPrisma.project.findUnique.mockResolvedValue({ id: "1" });
			mockPrisma.task.create.mockResolvedValueOnce({
				id: "1",
				title: "Task 1",
				description: "Task description",
				status: "Assigned",
				projectId: "1",
				parentTaskId: null,
				statusBudgets: "Initial",
				budget: 0,
				advance: 0,
				expense: 0,
				startDate: null,
				endDate: null,
				createdById: "1",
			});

			const newTask = await taskService.createTask({
				title: "Task 1",
				description: "Task description",
				status: "Assigned",
				projectId: "1",
				parentTaskId: null,
				statusBudgets: "Initial",
				budget: 0,
				advance: 0,
				expense: 0,
				startDate: null,
				endDate: null,
				createdById: "1",
			});
			expect(newTask).toEqual({
				id: "1",
				title: "Task 1",
				description: "Task description",
				status: "Assigned",
				projectId: "1",
				parentTaskId: null,
				statusBudgets: "Initial",
				budget: 0,
				advance: 0,
				expense: 0,
				startDate: null,
				endDate: null,
				createdById: "1",
			});
			expect(mockPrisma.task.create).toHaveBeenCalled();
			expect(mockRedis.del).toHaveBeenCalledWith("tasks:all");
		});
	});

	// Test for updateTask
	describe("updateTask", () => {
		it("should update an existing task and invalidate cache", async () => {
			mockPrisma.task.findUnique.mockResolvedValue({
				id: "1",
				title: "Task 1",
				description: "Task description",
				status: "Assigned",
				projectId: "1",
				parentTaskId: null,
				statusBudgets: "Initial",
				budget: 0,
				advance: 0,
				expense: 0,
				startDate: null,
				endDate: null,
				createdById: "1",
			});
			mockPrisma.user.findUnique.mockResolvedValueOnce({ id: "1" });
			mockPrisma.task.update.mockResolvedValueOnce({
				id: "1",
				title: "Updated Task",
				description: "Updated description",
				status: "Assigned",
				projectId: "1",
				parentTaskId: null,
				statusBudgets: "Initial",
				budget: 0,
				advance: 0,
				expense: 0,
				startDate: null,
				endDate: null,
				createdById: "1",
			});
			const updatedTask = await taskService.updateTask(
				"1",
				"Updated Task",
				"Updated description",
			);
			expect(updatedTask).toEqual({
				id: "1",
				title: "Updated Task",
				description: "Updated description",
				status: "Assigned",
				projectId: "1",
				parentTaskId: null,
				statusBudgets: "Initial",
				budget: 0,
				advance: 0,
				expense: 0,
				startDate: null,
				endDate: null,
				createdById: "1",
			});
			expect(mockPrisma.task.update).toHaveBeenCalled();
			expect(mockRedis.del).toHaveBeenCalledWith("tasks:all");
		});
	});
});
