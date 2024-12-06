import { describe, expect, it, jest } from "bun:test";
import { TaskService } from "../../services/tasks.service";
import { $Enums, PrismaClient } from "@prisma/client";
import type Redis from "ioredis";

// Mock PrismaClient and Redis
const mockPrisma = {
	task: {
		findMany: jest.fn(),
		findUnique: jest.fn(),
		create: jest.fn(),
		update: jest.fn(),
		delete: jest.fn(),
	},
};
const mockRedis = {
	get: jest.fn(),
	set: jest.fn(),
	del: jest.fn(),
};

// Create a TaskService instance with mocked dependencies
const taskService = new TaskService(
	mockPrisma as unknown as PrismaClient,
	mockRedis as unknown as Redis,
);

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

	// Test for getTaskById
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
	});
});
