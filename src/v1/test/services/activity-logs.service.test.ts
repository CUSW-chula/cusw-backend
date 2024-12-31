import { describe, expect, it, jest, beforeEach } from "bun:test";
import { ActivityService } from "../../services/activity-logs.service";
import { $Enums, type PrismaClient } from "@prisma/client";
import type Redis from "ioredis";

// Mock PrismaClient and Redis
const mockPrisma = {
	activity: {
		findUnique: jest.fn(),
		create: jest.fn(),
		findMany: jest.fn(),
	},
	user: {
		findUnique: jest.fn(),
	},
	task: {
		findUnique: jest.fn(),
	},
};
const mockRedis = {
	get: jest.fn(),
	set: jest.fn(),
	del: jest.fn(),
};

// Create an ActivityService instance with mocked dependencies
let activityService: ActivityService;

beforeEach(() => {
	activityService = new ActivityService(
		mockPrisma as unknown as PrismaClient,
		mockRedis as unknown as Redis,
	);
});

describe("ActivityService", () => {
	describe("getActivityById", () => {
		it("should fetch activity by ID from database if not cached", async () => {
			// Mock Redis cache to return null
			mockRedis.get.mockResolvedValueOnce(null);
			// Mock Prisma to return sample data
			mockPrisma.activity.findMany.mockResolvedValueOnce([
				{
					id: "1",
					action: "CREATED",
					detail: "Activity 1",
					taskId: "1",
					userId: "1",
					createdAt: new Date(),
				},
			]);

			const activity = await activityService.getActivityById("1");
			expect(activity).toEqual([
				{
					id: "1",
					action: "CREATED",
					detail: "Activity 1",
					taskId: "1",
					userId: "1",
					createdAt: expect.any(Date),
				},
			]);
			expect(mockPrisma.activity.findMany).toHaveBeenCalled();
		});
		it("should fetch activity by ID from cache if available", async () => {
			// Mock Redis cache to return cached data
			mockRedis.get.mockResolvedValueOnce(
				JSON.stringify([
					{
						id: "1",
						action: "CREATED",
						detail: "Activity 1",
						taskId: "1",
						userId: "1",
						createdAt: new Date(),
					},
				]),
			);

			const activity = await activityService.getActivityById("1");
			expect(activity).toEqual([
				{
					id: "1",
					action: "CREATED",
					detail: "Activity 1",
					taskId: "1",
					userId: "1",
					createdAt: expect.any(String),
				},
			]);
			expect(mockRedis.get).toHaveReturned();
		});
	});

	describe("postActivity", () => {
		it("should create a new activity and invalidate cache", async () => {
			// Mock Prisma to return sample data
			mockPrisma.task.findUnique.mockResolvedValueOnce({ id: "1" });
			mockPrisma.user.findUnique.mockResolvedValueOnce({ id: "1" });
			mockPrisma.activity.create.mockResolvedValueOnce({
				id: "1",
				action: "CREATED",
				detail: "New Activity",
				taskId: "1",
				userId: "1",
				createdAt: new Date(),
			});

			const newActivity = await activityService.postActivity(
				"1",
				$Enums.ActivityAction.CREATED,
				"New Activity",
				"1",
			);
			expect(newActivity).toEqual({
				id: "1",
				action: $Enums.ActivityAction.CREATED,
				detail: "New Activity",
				taskId: "1",
				userId: "1",
				createdAt: expect.any(Date),
			});
			expect(mockPrisma.activity.create).toHaveBeenCalled();
			expect(mockRedis.del).toHaveBeenCalledWith("activity:1");
		});
	});
});
