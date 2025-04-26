import { TaskService } from "../tasks.service";
import Redis from "ioredis";
import {
	NotFoundException,
	PermissionException,
} from "../../../core/exception.core";
import { Emoji } from "../../../shared/interfaces.shared";
import { PrismaClient } from "../../../../generated";

export class EmojiClassService extends TaskService {
	constructor(prisma: PrismaClient, redis: Redis) {
		super(prisma, redis);
	}

	async addEmojiOnTask(
		emoji: string,
		userId: string,
		taskId: string,
	): Promise<Emoji> {
		const isUserExist = await this.getUserModel().findById(userId);
		if (!isUserExist) throw new NotFoundException("User not found");

		const isTaskExist = await this.getTaskModel().findById(taskId);
		if (!isTaskExist) throw new NotFoundException("Task not found");

		const taskAssignment =
			await this.getTaskAssignmentModel().findByTaskIdAndUserId(taskId, userId);

		if (!taskAssignment)
			throw new NotFoundException("Unexpected error User not found");
		const addEmojiOnTask = await this.getEmojiModel().create({
			emoji: emoji,
			taskId: taskId,
			userId: userId,
		});

		const emojiTaskUser = {
			id: addEmojiOnTask.id,
			emoji: addEmojiOnTask.emoji,
			taskId: addEmojiOnTask.taskId,
			user: isUserExist,
		};

		return emojiTaskUser;
	}

	async checkEmojiUserIdAndByTaskId(
		taskId: string,
		userId: string,
	): Promise<Boolean> {
		const isUserExist = await this.getUserModel().findById(userId);
		if (!isUserExist) {
			throw new Error("User not found");
		}
		const isTaskExist = await this.getTaskModel().findById(taskId);
		if (!isTaskExist) throw new Error("Task not found");

		const emojis = await this.getEmojiModel().findByUserIdAndTaskId(
			userId,
			taskId,
		);

		if (emojis === null) return false;
		else return true;
	}

	async updateEmojiByTaskId(
		newEmoji: string,
		userId: string,
		taskId: string,
	): Promise<Emoji> {
		const isUserExist = await this.getUserModel().findById(userId);
		if (!isUserExist) {
			throw new NotFoundException("User not found");
		}
		const isTaskExist = await this.getTaskModel().findById(taskId);
		if (!isTaskExist) throw new NotFoundException("Task not found");

		const emojis = await this.getEmojiModel().findByUserIdAndTaskId(
			userId,
			taskId,
		);
		if (!emojis) throw new NotFoundException("emoji not found");

		if (userId !== emojis.userId)
			throw new PermissionException("This is not your emoji");

		const newEmojis = {
			emoji: newEmoji,
			taskId: emojis.taskId,
			userId: emojis.userId,
		};
		const updatedEmoji = await this.getEmojiModel().update(
			emojis.id,
			newEmojis,
		);
		const emojiTaskUser = {
			id: updatedEmoji.id,
			emoji: updatedEmoji.emoji,
			taskId: updatedEmoji.taskId,
			user: isUserExist,
		};
		return emojiTaskUser;
	}
}
