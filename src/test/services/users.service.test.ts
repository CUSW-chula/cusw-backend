/* eslint-disable max-lines-per-function */
import { describe, expect, it, jest } from "bun:test";
import { UserService } from "../../services/users.service";
import { PrismaClient } from "@prisma/client";
import Redis from "ioredis";

// Mock PrismaClient and Redis
const mockPrisma = {
  user: {
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

// Create a UserService instance with mocked dependencies
const userService = new UserService(
  mockPrisma as unknown as PrismaClient,
  mockRedis as unknown as Redis
);

describe("UserService", () => {
  describe("getAllUsers", () => {
    it("should fetch all users from Redis cache if available", async () => {
      // Mock Redis cache to return cached data
      mockRedis.get.mockResolvedValueOnce(
        JSON.stringify([{ id: '1', name: "User 1", email: "bunnybunbun37204" }])
      );

      const users = await userService.getAllUsers();
      expect(users).toEqual([{
          id: '1', name: "User 1",
          email: "bunnybunbun37204"
      }]);
      expect(mockPrisma.user.findMany).not.toHaveBeenCalled();
    });

    it("should fetch all users from database if not cached", async () => {
      // Mock Redis cache to return null
      mockRedis.get.mockResolvedValueOnce(null);
      // Mock Prisma to return sample data
      mockPrisma.user.findMany.mockResolvedValueOnce([
        { id: '1', name: "User 1", email: "bunnybunbun37204" },
      ]);

      const users = await userService.getAllUsers();
      expect(users).toEqual([{
          id: '1', name: "User 1",
          email: "bunnybunbun37204"
      }]);
      expect(mockPrisma.user.findMany).toHaveBeenCalled();
      expect(mockRedis.set).toHaveBeenCalledWith(
        "users:all",
        JSON.stringify([{ id: '1', name: "User 1", email: "bunnybunbun37204" }]),
        "EX",
        60
      );
    });
  });

  describe("getUserById", () => {
    it("should fetch user by ID from Redis cache if available", async () => {
      // Mock Redis cache to return cached data
      mockRedis.get.mockResolvedValueOnce(
        JSON.stringify({ id: "1", name: "User 1" , email: "bunnybunbun37204"})
      );

      const user = await userService.getUserById("1");
      expect(user).toEqual({ id: "1", name: "User 1" , email : "bunnybunbun37204"});
      expect(mockPrisma.user.findUnique).not.toHaveBeenCalled();
    });

    it("should fetch user by ID from database if not cached", async () => {
      // Mock Redis cache to return null
      mockRedis.get.mockResolvedValueOnce(null);
      // Mock Prisma to return sample data
      mockPrisma.user.findUnique.mockResolvedValueOnce({
        id: "1",
        name: "User 1",
        email: "bunnybunbun37204"
      });

      const user = await userService.getUserById("1");
      expect(user).toEqual({ id: "1", name: "User 1" , email : "bunnybunbun37204"});
    });
  });

  describe("createUser", () => {
    it("should create a new user and invalidate cache", async () => {
      // Mock Prisma to return sample data
      mockPrisma.user.create.mockResolvedValueOnce({
        id: '1',
        name: "New User",
        email: "newuser@example.com",
      });

      const newUser = await userService.createUser({
        name: "New User",
        email: "newuser@example.com",
      });
      expect(newUser).toEqual({
        id: '1',
        name: "New User",
        email: "newuser@example.com",
      });
      expect(mockPrisma.user.create).toHaveBeenCalled();
      expect(mockRedis.del).toHaveBeenCalledWith("users:all");
    });
  });

  describe("updateUser", () => {
    it("should update an existing user and invalidate cache", async () => {
      // Mock Prisma to return sample data
      mockPrisma.user.update.mockResolvedValueOnce({
        id: '1',
        name: "Updated User",
        email: "updateduser@example.com",
      });

      const updatedUser = await userService.updateUser("1", {
        name: "Updated User",
      });
      expect(updatedUser).toEqual({
        id: '1',
        name: "Updated User",
        email: "updateduser@example.com",
      });
      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { id: "1" },
        data: { name: "Updated User" },
      });
      expect(mockRedis.del).toHaveBeenCalledTimes(3); // Invalidate both specific user and all users cache
    });
  });

  describe("deleteUser", () => {
    it("should delete a user and invalidate cache", async () => {
      // Mock Prisma to return sample data
      mockPrisma.user.delete.mockResolvedValueOnce({
        id: '1',
        name: "Deleted User",
        email: "deleteduser@example.com",
      });

      const deletedUser = await userService.deleteUser("1");
      expect(deletedUser).toEqual({
        id: '1',
        name: "Deleted User",
        email: "deleteduser@example.com",
      });
      expect(mockPrisma.user.delete).toHaveBeenCalledWith({
        where: { id: "1" },
      });
      expect(mockRedis.del).toHaveBeenCalledTimes(5); // Invalidate both specific user and all users cache
    });
  });
});
