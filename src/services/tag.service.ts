import { PrismaClient, Tag, Task, TaskTag } from "@prisma/client";
import { TagModel } from "../models/tag.model";
import { TaskTagModel } from "../models/task-tag.model";
import { BaseService } from "../core/service.core";
import { TasksModel } from "../models/tasks.model";
import Redis from "ioredis";
import { NotFoundException, PermissionException } from "../core/exception.core";

export class TagService extends BaseService<Tag> {
	private readonly tagModel: TagModel;
	private readonly taskModel: TasksModel;
	private readonly taskTagModel: TaskTagModel;

	constructor(prisma: PrismaClient, redis: Redis) {
		super(redis, 60); // Set cache expiry to 60 seconds
		this.taskModel = new TasksModel(prisma);
		this.tagModel = new TagModel(prisma);
		this.taskTagModel = new TaskTagModel(prisma);
	}

	// Fetch all tags, with caching
	async getAllTag(): Promise<Tag[]> {
		const cacheKey = "tag:all";
		const cacheTag = await this.getFromCache(cacheKey);
		if (cacheTag) return cacheTag as Tag[];

		const tags = await this.tagModel.findAll();
		await this.setToCache(cacheKey, tags);
		return tags;
	}

	// Fetch a tag by its ID, with caching
	async getTagById(tagId: string): Promise<Tag> {
		const cacheKey = `tag:${tagId}`;
		const cacheTag = await this.getFromCache(cacheKey);
		if (cacheTag) return cacheTag as Tag;

		const tags = await this.tagModel.findById(tagId);
		if (!tags) throw new NotFoundException("Tag not found");
		await this.setToCache(cacheKey, tags);
		return tags;
	}

	// Retrieve all tags assigned to a specific task by task ID
	async getAsignTagInTaskByTaskId(taskId: string): Promise<Tag[]> {
		// Check if the task exists
		const isTaskExist = await this.taskModel.findById(taskId);
		if (!isTaskExist) throw new NotFoundException("Task not found");

		// Retrieve all tag assignments for the task
		const taskTag = await this.taskTagModel.findByTaskId(taskId);
		if (!taskTag) throw new NotFoundException("No tag assigned to this task");

		// Fetch each tag concurrently
		const tagsInTask = await Promise.all(
			taskTag.map(async (taskTag) => {
				const tag = await this.tagModel.findById(taskTag.tagId);
				return tag || null;
			}),
		);

		// Filter out any null results (tags not found)
		return tagsInTask.filter((tag) => tag !== null) as Tag[];
	}

	// Retrieve all tasks associated with a specific tag by tag ID
	async getAsignTaskInTagByTagId(tagId: string): Promise<Task[]> {
		// Check if the tag exists
		const isTaskExist = await this.tagModel.findById(tagId);
		if (!isTaskExist) throw new NotFoundException("Tag not found");

		// Retrieve all task assignments for the tag
		const taskTag = await this.taskTagModel.findByTagId(tagId);
		if (!taskTag) throw new NotFoundException("No task assigned to this tag");

		// Fetch each task concurrently
		const tagsInTask = await Promise.all(
			taskTag.map(async (taskTag) => {
				const task = await this.taskModel.findById(taskTag.taskId);
				return task || null;
			}),
		);

		// Filter out any null results (tasks not found)
		return tagsInTask.filter((task) => task !== null) as Task[];
	}

	// Assign a tag to a task
	async assigningTagToTask(
		taskId: string,
		tagId: string,
		userId: string,
	): Promise<TaskTag> {
		// Check if the tag exists
		const isTagExist = await this.tagModel.findById(tagId);
		if (!isTagExist) throw new NotFoundException("Tag not found");

		// Check if the task exists
		const isTaskExist = await this.taskModel.findById(taskId);
		if (!isTaskExist) throw new NotFoundException("Task not found");

		const isUserCreatedTask = isTaskExist.createdById === userId;
		if (!isUserCreatedTask)
			throw new PermissionException("You are not the creator of this task");

		// Check for duplicate tag assignment
		const tagExist = await this.taskTagModel.findByTaskIdAndTagId(
			taskId,
			tagId,
		);
		if (tagExist) throw new PermissionException("Duplicate Tag");

		// Assign the tag to the task
		const assignTagToTask = await this.taskTagModel.create({
			tagId: tagId,
			taskId: taskId,
		});

		if (!assignTagToTask)
			throw new NotFoundException("Failed to assign tag to task");
		return assignTagToTask;
	}

	// Unassign a tag from a task
	async unAssigningTagToTask(taskId: string, tagId: string): Promise<TaskTag> {
		// Check if the tag exists
		const isTagExist = await this.tagModel.findById(tagId);
		if (!isTagExist) throw new NotFoundException("Tag not found");

		// Check if the task exists
		const isTaskExist = await this.taskModel.findById(taskId);
		if (!isTaskExist) throw new NotFoundException("Task not found");

		// Find the tag-task association
		const taskTag = await this.taskTagModel.findByTaskIdAndTagId(taskId, tagId);
		if (!taskTag) throw new NotFoundException("Assignment not found");

		// Unassign the tag from the task
		const unAssigningTagToTask = await this.taskTagModel.delete(taskTag.id);
		return unAssigningTagToTask;
	}
}
