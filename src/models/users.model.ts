import { User as PrismaUser } from "@prisma/client";
import { BaseModel } from "./model";

export class User extends BaseModel<PrismaUser, string> {
  async findAll(): Promise<PrismaUser[]> {
    return await this.getModel().user.findMany();
  }

  async findById(id: string): Promise<PrismaUser | null> {
    return await this.getModel().user.findUnique({ where: { id } });
  }

  async create(data: Partial<PrismaUser>): Promise<PrismaUser> {
    return await this.getModel().user.create({
      data: {
        name: data.name ?? "",
        email: data.email ?? "",
      },
    });
  }

  async update(id: string, data: Partial<PrismaUser>): Promise<PrismaUser> {
    return await this.getModel().user.update({ where: { id }, data });
  }

  async delete(id: string): Promise<PrismaUser> {
    return await this.getModel().user.delete({ where: { id } });
  }
}
