import { PrismaClient, Tag, Task, TaskTag } from "@prisma/client";
import { TagModel } from "../models/tag.model";
import { TaskTagModel } from "../models/task-tag.model";
import { BaseService } from "../core/service.core";
import { TasksModel } from "../models/tasks.model";
import Redis from "ioredis";

export class TagService extends BaseService<Tag> {
	private readonly tagModel: TagModel;
	private readonly taskModel: TasksModel;
	private readonly taskTagModel: TaskTagModel;

	constructor(prisma: PrismaClient, redis: Redis) {
		super(redis, 60); //
		this.taskModel = new TasksModel(prisma);
		this.tagModel = new TagModel(prisma);
		this.taskTagModel = new TaskTagModel(prisma);
	}

	async getAllTag(): Promise<Tag[]> {
		const cacheKey = "tag:all";
		const cacheTag = await this.getFromCache(cacheKey);
		if (cacheTag) return cacheTag as Tag[];

		const tags = await this.tagModel.findAll();
		if (!tags) throw new Error("Tag not found");
		await this.setToCache(cacheKey, tags);
		return tags;
	}

	async getTagById(tagId: string): Promise<Tag> {
		const cacheKey = `tag:${tagId}`;
		const cacheTag = await this.getFromCache(cacheKey);
		if (cacheTag) return cacheTag as Tag;

		const tags = await this.tagModel.findById(tagId);
		if (!tags) throw new Error("Tag not found");
		await this.setToCache(cacheKey, tags);
		return tags;
	}

	async getAsignTagInTaskByTaskId(taskId: string): Promise<Tag[]> {
		// Check if task exists
		const isTaskExist = await this.taskModel.findById(taskId);
		if (!isTaskExist) throw new Error("Tag not found");

		// Retrieve task assignments
		const taskTag = await this.taskTagModel.findByTaskId(taskId);
		if (!taskTag) throw new Error("No tag assigned to this task");

		// Get all users assigned to the task concurrently
		const tagsInTask = await Promise.all(
			taskTag.map(async (taskTag) => {
				const tag = await this.tagModel.findById(taskTag.taskId);
				return tag || null; // Return null if user not found
			}),
		);

		// Filter out any null results (users not found)
		return tagsInTask.filter((tag) => tag !== null) as Tag[];
	}

	async getAsignTaskInTagByTagId(tagId: string): Promise<Task[]> {
		// Check if task exists
		const isTaskExist = await this.tagModel.findById(tagId);
		if (!isTaskExist) throw new Error("Tag not found");

		// Retrieve task assignments
		const taskTag = await this.taskTagModel.findByTagId(tagId);
		if (!taskTag) throw new Error("No tag assigned to this task");

		// Get all users assigned to the task concurrently
		const tagsInTask = await Promise.all(
			taskTag.map(async (taskTag) => {
				const task = await this.taskModel.findById(taskTag.taskId);
				return task || null; // Return null if user not found
			}),
		);

		// Filter out any null results (users not found)
		return tagsInTask.filter((task) => task !== null) as Task[];
	}

	async assigningTagToTask(
		id: string,
		taskId: string,
		tagId: string,
	): Promise<TaskTag> {
		// First step check if user exists
		const isTagExist = await this.tagModel.findById(tagId);
		if (!isTagExist) throw new Error("Tag not found");

		// Second step check if task exists
		const isTaskExist = await this.taskModel.findById(taskId);
		if (!isTaskExist) throw new Error("Task not found");

		// Assigning userTaskAssignment
		const assignTagToTask = await this.taskTagModel.create({
			id: id,
			taskId: taskId,
			tagId: tagId,
		});
		return assignTagToTask;
	}

	async unAssigningTagToTask(taskId: string, tagId: string): Promise<TaskTag> {
		// First step check if user exists
		const isTagExist = await this.tagModel.findById(tagId);
		if (!isTagExist) throw new Error("Tag not found");

		// Second step check if task exists
		const isTaskExist = await this.taskModel.findById(taskId);
		if (!isTaskExist) throw new Error("Task not found");

		// Assigning userTaskAssignment
		const taskTag = await this.taskTagModel.findByTaskIdAndTagId(tagId, taskId);
		if (!taskTag)
			throw new Error("Unexpected error tasks assignment not found");
		const unAssigningTagToTask = await this.taskTagModel.delete(taskTag.id);
		return unAssigningTagToTask;
	}
}
