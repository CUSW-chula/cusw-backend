import { ProjectRole } from "@prisma/client";
import { BaseModel } from "../../core/model.core";

export class ProjectRoleModel extends BaseModel<ProjectRole> {
	async findAll(): Promise<ProjectRole[]> {
		const projectRoles = await this.getModel().projectRole.findMany();
		return projectRoles;
	}
	async findById(id: string): Promise<ProjectRole | null> {
		const projectRoles = await this.getModel().projectRole.findUnique({
			where: { id },
		});
		return projectRoles;
	}

	async findByProjectId(id: string): Promise<ProjectRole[] | null> {
		const projectRoles = await this.getModel().projectRole.findMany({
			where: { projectId: id },
		});
		return projectRoles;
	}

	async create(data: Partial<ProjectRole>): Promise<ProjectRole> {
		const createdProjectRoles = await this.getModel().projectRole.create({
			data: {
				projectId: data.projectId ?? "",
				role: data.role ?? "Member",
				userId: data.userId ?? "",
			},
		});
		return createdProjectRoles;
	}
	async update(
		id: string,
		data: Partial<{ projectId: string; roleId: string; userId: string }>,
	): Promise<ProjectRole> {
		const updatedProjectRole = await this.getModel().projectRole.update({
			where: {
				id: id,
			},
			data: data,
		});
		return updatedProjectRole;
	}

	async delete(id: string): Promise<ProjectRole> {
		const deletedProjectRole = await this.getModel().projectRole.delete({
			where: { id },
		});
		return deletedProjectRole;
	}

	async deleteByProjectId(projectId: string): Promise<number> {
		const deletedProjectRole = await this.getModel().projectRole.deleteMany({
			where: { projectId: projectId },
		});
		return deletedProjectRole.count;
	}
}
