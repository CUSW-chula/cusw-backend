// import { Project as PrismaProject } from "@prisma/client";
// import { BaseModel } from "./model";

// export class Project extends BaseModel<PrismaProject, string> {
//   async findAll(): Promise<PrismaProject[]> {
//     return await this.getModel().project.findMany();
//   }

//   async findById(id: string): Promise<PrismaProject | null> {
//     return await this.getModel().project.findUnique({ where: { id: id } });
//   }
// }
