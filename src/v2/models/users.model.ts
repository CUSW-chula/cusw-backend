import type { User } from "../../../generated";
import { BaseModel } from "../../core/model.core";

export class UserModel extends BaseModel<User> {
	async findAll(): Promise<User[]> {
		const users = await this.getModel().user.findMany();
		return users;
	}

	async findById(id: string): Promise<User | null> {
		const user = await this.getModel().user.findUnique({ where: { id } });
		return user;
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = await this.getModel().user.findUnique({ where: { email } });
		return user;
	}

	async create(data: Partial<User>): Promise<User> {
		const createdUser = await this.getModel().user.create({
			data: {
				name: data.name ?? "",
				email: data.email ?? "",
				organization: data.organization ?? "",
				position: data.position ?? "",
				isOutsource: data.isOutsource ?? false,
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

	// Optimized batch method to reduce N+1 queries
	async findByIds(ids: string[]): Promise<User[]> {
		if (ids.length === 0) return [];

		const users = await this.getModel().user.findMany({
			where: {
				id: {
					in: ids,
				},
			},
		});
		return users;
	}
}
