import type { User } from "@prisma/client";
import { BaseModel } from "../core/model.core";

export class UserModel extends BaseModel<User> {
	async findAll(): Promise<User[]> {
		const users = await this.getModel().user.findMany();
		return users;
	}

	async findById(id: string): Promise<User | null> {
		const user = await this.getModel().user.findUnique({ where: { id } });
		return user;
	}

	async create(data: Partial<User>): Promise<User> {
		const createdUser = await this.getModel().user.create({
			data: {
				name: data.name ?? "",
				email: data.email ?? "",
			},
		});
		return createdUser;
	}

	async update(id: string, data: Partial<User>): Promise<User> {
		const updatedUser = await this.getModel().user.update({
			where: { id },
			data,
		});
		return updatedUser;
	}

	async delete(id: string): Promise<User> {
		const deletedUser = await this.getModel().user.delete({ where: { id } });
		return deletedUser;
	}
}
