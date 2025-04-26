import { ProjectRole } from "../../../generated";
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
	async update(id: string, data: Partial<ProjectRole>): Promise<ProjectRole> {
		const updatedProjectRole = await this.getModel().projectRole.update({
			where: {
				id: id,
			},
			data: data,
		});
		return updatedProjectRole;
	}

	async updateByProjectIDAndUserId(
		projectId: string,
		userId: string,
		data: Partial<ProjectRole>,
	): Promise<number> {
		const updatedProjectRole = await this.getModel().projectRole.updateMany({
			where: {
				projectId: projectId,
				userId: userId,
			},
			data: data,
		});
		return updatedProjectRole.count;
	}

	async delete(id: string): Promise<ProjectRole> {
		const deletedProjectRole = await this.getModel().projectRole.delete({
			where: { id },
		});
		return deletedProjectRole;
	}

	async deleteByProjectIDandUserId(
		userId: string,
		projectId: string,
	): Promise<ProjectRole> {
		const projectRole = await this.getModel().projectRole.findFirst({
			where: { userId: userId, projectId: projectId },
		});
		const deletedProjectRole = await this.getModel().projectRole.delete({
			where: { id: projectRole?.id },
		});
		return deletedProjectRole;
	}

	async deleteByProjectId(projectId: string): Promise<number> {
		const deletedProjectRole = await this.getModel().projectRole.deleteMany({
			where: { projectId: projectId },
		});
		return deletedProjectRole.count;
	}

	async findByProjectIdAndUserId(
		projectId: string,
		userId: string,
	): Promise<ProjectRole | null> {
		const projectRole = await this.getModel().projectRole.findFirst({
			where: { projectId: projectId, userId: userId },
		});
		return projectRole;
	}

	async findUserMember(projectId: string): Promise<ProjectRole[]> {
		const projectRoles = await this.getModel().projectRole.findMany({
			where: { projectId: projectId, role: "Member" },
		});
		return projectRoles;
	}
}
