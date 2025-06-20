import { $Enums, Project, ProjectTag, Task } from "../../../generated";
import type { Prisma, ProjectRole } from "../../../generated";
import { BaseModel } from "../../core/model.core";

export class ProjectModel extends BaseModel<Project> {
	async findAll(): Promise<Project[]> {
		const projects = await this.getModel().project.findMany();
		return projects;
	}

	async findById(id: string): Promise<Project | null> {
		const project = await this.getModel().project.findUnique({ where: { id } });
		return project;
	}

	async findByUserId(userId: string): Promise<Project[]> {
		const projects = await this.getModel().project.findMany({
			where: {
				projectRoles: {
					some: {
						userId: userId,
					},
				},
			},
		});
		return projects;
	}

	async findTag(id: string): Promise<ProjectTag[] | null> {
		const tags = await this.getModel().projectTag.findMany({
			where: {
				projectId: id,
			},
		});
		return tags ?? null; // Ensures null is returned if no tags are found
	}

	async findRole(userId: string, projectId: string): Promise<$Enums.Role> {
		const roles = await this.getModel().projectRole.findFirst({
			where: {
				projectId: projectId,
				userId: userId,
			},
		});
		return roles?.role ?? $Enums.Role.Member; // Ensures a default role is returned if no roles are found
	}

	async create(data: Partial<Project>): Promise<Project> {
		const createdProject = await this.getModel().project.create({
			data: {
				title: data.title ?? "",
				description: data.description ?? "",
				startDate: data.startDate ?? null,
				endDate: data.endDate ?? null,
				budget: data.budget ?? 0,
				advance: data.advance ?? 0,
				expense: data.expense ?? 0,
			},
		});
		return createdProject;
	}

	async update(id: string, data: Partial<Project>): Promise<Project> {
		const updatedUser = await this.getModel().project.update({
			where: {
				id: id,
			},
			data: data,
		});
		return updatedUser;
	}
	async delete(id: string): Promise<Project> {
		const deletedUser = await this.getModel().project.delete({
			where: { id },
		});
		return deletedUser;
	}

	async deleteProjectData(projectId: string, tx: Prisma.TransactionClient) {
		// Delete all dependent relations first
		await tx.taskAssignment.deleteMany({ where: { task: { projectId } } });
		await tx.comment.deleteMany({ where: { task: { projectId } } });
		await tx.activity.deleteMany({ where: { task: { projectId } } });
		await tx.emojiTaskUser.deleteMany({ where: { task: { projectId } } });

		// Delete child entities
		await tx.taskTag.deleteMany({ where: { task: { projectId } } });
		await tx.file.deleteMany({ where: { projectId } });
		await tx.task.deleteMany({ where: { projectId } });

		await tx.projectRole.deleteMany({ where: { projectId } });
		await tx.projectTag.deleteMany({ where: { projectId } });
		await tx.pinProject.deleteMany({ where: { projectId } });

		// Delete the project
		await tx.project.delete({ where: { id: projectId } });
	}

	async findProjectWithTags(): Promise<
		(Project & {
			tags: {
				tag: {
					name: string;
				};
			}[];
		})[]
	> {
		return await this.getModel().project.findMany({
			include: {
				tags: {
					include: {
						tag: true,
					},
				},
			},
		});
	}

	async findProjectWithTagsByProjectId(projectId: string): Promise<
		(Project & {
			tags: {
				tag: {
					name: string;
				};
			}[];
		})[]
	> {
		const project = await this.getModel().project.findUnique({
			where: { id: projectId },
			include: {
				tags: {
					include: {
						tag: true,
					},
				},
			},
		});
		return project ? [project] : [];
	}

	async findProjectWithTagsAndTasks(): Promise<
		(Project & {
			tags: {
				tag: {
					name: string;
				};
			}[];
			tasks: Task[];
		})[]
	> {
		const projects = await this.getModel().project.findMany({
			include: {
				tags: {
					include: {
						tag: true,
					},
				},
				tasks: {
					include: {
						subTasks: {
							include: {
								subTasks: true,
							},
						},
					},
				},
			},
		});

		return projects;
	}
}
