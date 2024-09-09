import type { User as PrismaUser } from "@prisma/client";
import { BaseModel } from "./model";

export class User extends BaseModel<PrismaUser, string> {
	async findAll(): Promise<PrismaUser[]> {
		const users = await this.getModel().user.findMany();
		return users;
	}

	async findById(id: string): Promise<PrismaUser | null> {
		const user = await this.getModel().user.findUnique({ where: { id } });
		return user;
	}

	async create(data: Partial<PrismaUser>): Promise<PrismaUser> {
		const createdUser = await this.getModel().user.create({
			data: {
				name: data.name ?? "",
				email: data.email ?? "",
			},
		});
		return createdUser;
	}

	async update(id: string, data: Partial<PrismaUser>): Promise<PrismaUser> {
		const updatedUser = await this.getModel().user.update({
			where: { id },
			data,
		});
		return updatedUser;
	}

	async delete(id: string): Promise<PrismaUser> {
		const deletedUser = await this.getModel().user.delete({ where: { id } });
		return deletedUser;
	}
}
