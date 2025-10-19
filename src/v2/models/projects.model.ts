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

	async findByIdWithTags(id: string): Promise<
		| (Project & {
				tags: {
					tag: {
						name: string;
						isProject: boolean;
					};
				}[];
		  })
		| null
	> {
		const project = await this.getModel().project.findUnique({
			where: { id },
			include: {
				tags: {
					include: {
						tag: true,
					},
				},
			},
		});
		return project;
	}

	async findManyByIdsWithTags(ids: string[]): Promise<
		(Project & {
			tags: {
				tag: {
					name: string;
					isProject: boolean;
				};
			}[];
		})[]
	> {
		return await this.getModel().project.findMany({
			where: { id: { in: ids } },
			include: {
				tags: {
					include: {
						tag: true,
					},
				},
			},
		});
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

		// Delete tasks carefully due to SubTasks relation (self-referential)
		// First, delete all subtasks (tasks with parentTaskId)
		await tx.task.deleteMany({
			where: {
				projectId,
				parentTaskId: { not: null },
			},
		});

		// Then delete parent tasks (tasks without parentTaskId)
		await tx.task.deleteMany({
			where: {
				projectId,
				parentTaskId: null,
			},
		});

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

	// Optimized methods with includes to reduce N+1 queries
	async findAllWithIncludes(): Promise<
		(Project & {
			projectRoles: (ProjectRole & {
				user: { id: string; name: string; email: string };
			})[];
			tags: { tag: { id: string; name: string; isProject: boolean } }[];
			pinnedProject: { userId: string }[];
		})[]
	> {
		return await this.getModel().project.findMany({
			include: {
				projectRoles: {
					include: {
						user: {
							select: {
								id: true,
								name: true,
								email: true,
								organization: true,
								position: true,
								isOutsource: true,
								admin: true,
								head: true,
								activated: true,
							},
						},
					},
				},
				tags: {
					include: {
						tag: true,
					},
				},
				pinnedProject: {
					select: {
						userId: true,
					},
				},
			},
		});
	}

	async findByIdWithIncludes(id: string): Promise<
		| (Project & {
				projectRoles: (ProjectRole & {
					user: { id: string; name: string; email: string };
				})[];
				tags: { tag: { id: string; name: string; isProject: boolean } }[];
				pinnedProject: { userId: string }[];
		  })
		| null
	> {
		return await this.getModel().project.findUnique({
			where: { id },
			include: {
				projectRoles: {
					include: {
						user: {
							select: {
								id: true,
								name: true,
								email: true,
								organization: true,
								position: true,
								isOutsource: true,
								admin: true,
								head: true,
								activated: true,
							},
						},
					},
				},
				tags: {
					include: {
						tag: true,
					},
				},
				pinnedProject: {
					select: {
						userId: true,
					},
				},
			},
		});
	}

	async findByUserIdWithIncludes(userId: string): Promise<
		(Project & {
			projectRoles: (ProjectRole & {
				user: { id: string; name: string; email: string };
			})[];
			tags: { tag: { id: string; name: string; isProject: boolean } }[];
			pinnedProject: { userId: string }[];
		})[]
	> {
		return await this.getModel().project.findMany({
			where: {
				projectRoles: {
					some: {
						userId: userId,
					},
				},
			},
			include: {
				projectRoles: {
					include: {
						user: {
							select: {
								id: true,
								name: true,
								email: true,
								organization: true,
								position: true,
								isOutsource: true,
								admin: true,
								head: true,
								activated: true,
							},
						},
					},
				},
				tags: {
					include: {
						tag: true,
					},
				},
				pinnedProject: {
					select: {
						userId: true,
					},
				},
			},
		});
	}

	async findByIdsWithIncludes(ids: string[]): Promise<
		(Project & {
			projectRoles: (ProjectRole & {
				user: { id: string; name: string; email: string };
			})[];
			tags: { tag: { id: string; name: string; isProject: boolean } }[];
			pinnedProject: { userId: string }[];
		})[]
	> {
		if (ids.length === 0) return [];

		return await this.getModel().project.findMany({
			where: {
				id: {
					in: ids,
				},
			},
			include: {
				projectRoles: {
					include: {
						user: {
							select: {
								id: true,
								name: true,
								email: true,
								organization: true,
								position: true,
								isOutsource: true,
								admin: true,
								head: true,
								activated: true,
							},
						},
					},
				},
				tags: {
					include: {
						tag: true,
					},
				},
				pinnedProject: {
					select: {
						userId: true,
					},
				},
			},
		});
	}
}
