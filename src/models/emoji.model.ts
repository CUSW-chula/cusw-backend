import type { EmojiTaskUser } from "@prisma/client";
import { BaseModel } from "../core/model.core";

export class EmojiModel extends BaseModel<EmojiTaskUser> {
	async findAll(): Promise<EmojiTaskUser[]> {
		const emoji = await this.getModel().emojiTaskUser.findMany();
		return emoji;
	}

	async findAllByTaskId(taskId: string): Promise<EmojiTaskUser[]> {
		const emoji = await this.getModel().emojiTaskUser.findMany({
			where: { taskId },
		});
		return emoji;
	}

	async findById(id: string): Promise<EmojiTaskUser | null> {
		const emoji = await this.getModel().emojiTaskUser.findUnique({
			where: { id },
		});
		return emoji;
	}

	async create(data: Partial<EmojiTaskUser>): Promise<EmojiTaskUser> {
		const createdEmoji = await this.getModel().emojiTaskUser.create({
			data: {
				emoji: data.emoji ?? "",
				userId: data.userId ?? "",
				taskId: data.taskId ?? "",
			},
		});
		return createdEmoji;
	}

	async update(
		id: string,
		data: Partial<EmojiTaskUser>,
	): Promise<EmojiTaskUser> {
		const updatedEmoji = await this.getModel().emojiTaskUser.update({
			where: { id },
			data,
		});
		return updatedEmoji;
	}

	async delete(id: string): Promise<EmojiTaskUser> {
		const deletedEmoji = await this.getModel().emojiTaskUser.delete({
			where: { id },
		});
		return deletedEmoji;
	}
}
