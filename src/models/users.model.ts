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
		const created_user = await this.getModel().user.create({
			data: {
				name: data.name ?? "",
				email: data.email ?? "",
			},
		});
		return created_user;
	}

	async update(id: string, data: Partial<PrismaUser>): Promise<PrismaUser> {
		const updated_user = await this.getModel().user.update({
			where: { id },
			data,
		});
		return updated_user;
	}

	async delete(id: string): Promise<PrismaUser> {
		const deleted_user = await this.getModel().user.delete({ where: { id } });
		return deleted_user;
	}
}
