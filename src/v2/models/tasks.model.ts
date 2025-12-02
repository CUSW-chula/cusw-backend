import { TaskStatus, BudgetStatus, type Task } from "../../../generated";
import { BaseModel } from "../../core/model.core";

export class TasksModel extends BaseModel<Task> {
	async findAll(): Promise<Task[]> {
		const tasks = await this.getModel().task.findMany();
		return tasks;
	}

	async findById(id: string): Promise<Task | null> {
		const task = await this.getModel().task.findUnique({ where: { id } });
		return task;
	}

	async findSubTask(id: string): Promise<Task[] | null> {
		const tasks = await this.getModel().task.findUnique({
			where: {
				id: id,
			},
			include: {
				subTasks: true,
			},
		});
		if (tasks) return tasks.subTasks;
		return null;
	}
	async findParentTask(id: string): Promise<Task | null> {
		const tasks = await this.getModel().task.findUnique({
			where: {
				id: id,
			},
			include: {
				parentTask: true,
			},
		});
		if (tasks) return tasks.parentTask;
		return null;
	}

	async create(data: Partial<Task>): Promise<Task> {
		const createdProject = await this.getModel().task.create({
			data: {
				title: data.title ?? "",
				description: data.description ?? "",
				statusBudgets: data.statusBudgets ?? BudgetStatus.Initial,
				budget: data.budget ?? 0.0,
				advance: data.advance ?? 0.0,
				expense: data.expense ?? 0.0,
				status: data.status ?? TaskStatus.Unassigned,
				parentTaskId: data.parentTaskId,
				position: data.position ?? 0.0,
				projectId: data.projectId ?? "",
				createdById: data.createdById ?? "",
				startDate: data.startDate,
				endDate: data.endDate,
			},
		});
		return createdProject;
	}

	async update(id: string, data: Partial<Task>): Promise<Task> {
		const updatedTask = await this.getModel().task.update({
			where: {
				id: id,
			},
			data: data,
		});
		return updatedTask;
	}

	async updateTaskTitleAndDesc(id: string, title: tring, description: string): Promise<Task> {
		const updatedTask = await this.getModel().task.update({
			where: {
				id: id,
			},
			data: {
				title: title,
				description: description
		});
		return updatedTask;
	}

	async delete(id: string): Promise<Task> {
		const deletedTask = await this.getModel().task.delete({
			where: { id },
		});
		return deletedTask;
	}

	async loadNestedSubtasks(taskId: string): Promise<Task> {
		const task = await this.getModel().task.findUnique({
			where: { id: taskId },
			include: { subTasks: true },
		});

		if (!task) throw new Error("Task not found");

		// Recursively fetch subtasks for each subTask
		if (task.subTasks && task.subTasks.length > 0) {
			task.subTasks = await Promise.all(
				task.subTasks.map(async (subTask) => {
					return await this.loadNestedSubtasks.call(this, subTask.id);
				}),
			);
		}
		return task;
	}

	async findByProjectId(projectId: string): Promise<Task[]> {
		// Retrieve only top-level tasks (those without a parentId)
		const topLevelTasks = await this.getModel().task.findMany({
			where: { projectId: projectId, parentTaskId: null },
			include: { subTasks: true },
		});

		// Load nested subtasks for each top-level task
		const tasksWithNestedSubtasks = await Promise.all(
			topLevelTasks.map(
				async (task) => await this.loadNestedSubtasks.call(this, task.id),
			),
		);

		return tasksWithNestedSubtasks;
	}

	async findByParentTaskId(parentTaskId: string): Promise<Task[]> {
		const tasks = await this.getModel().task.findMany({
			where: {
				parentTaskId: parentTaskId,
			},
			include: {
				subTasks: true,
			},
		});

		const tasksWithNestedSubtasks = await Promise.all(
			tasks.map(
				async (task) => await this.loadNestedSubtasks.call(this, task.id),
			),
		);
		return tasksWithNestedSubtasks;
	}

	async findTaskWithTagsAndSubTasksByProjectId(projectId: string): Promise<
		(Task & {
			tags: {
				tag: {
					name: string;
				};
			}[];
			subTasks: Task[];
		})[]
	> {
		const tasks = await this.getModel().task.findMany({
			where: { projectId },
			include: {
				tags: {
					include: {
						tag: true,
					},
				},
				subTasks: true,
			},
		});
		return tasks;
	}

	async findAssignedTasksByUserId(userId: string): Promise<
		{
			task: Task & {
				project: {
					id: string;
					title: string;
					startDate: Date | null;
					endDate: Date | null;
					tags: {
						tag: {
							name: string;
							isProject: boolean;
						};
					}[];
				};
			};
		}[]
	> {
		const assignedTasks = await this.getModel().taskAssignment.findMany({
			where: { userId },
			include: {
				task: {
					include: {
						project: {
							include: {
								tags: {
									include: {
										tag: true,
									},
								},
							},
						},
					},
				},
			},
		});
		return assignedTasks;
	}
	async findAllWithProjectByCreatedById(userId: string) {
		return await this.getModel().task.findMany({
			where: { createdById: userId },
			include: { project: true },
		});
	}

	// Optimized methods with includes to reduce N+1 queries
	async findAllWithIncludes(): Promise<Task[]> {
		return await this.getModel().task.findMany({
			include: {
				createdBy: true,
				assignedUsers: {
					include: {
						user: true,
					},
				},
				tags: {
					include: {
						tag: true,
					},
				},
				emojiTaskUsers: {
					include: {
						user: true,
					},
				},
				subTasks: {
					include: {
						createdBy: true,
						assignedUsers: {
							include: {
								user: true,
							},
						},
						tags: {
							include: {
								tag: true,
							},
						},
						emojiTaskUsers: {
							include: {
								user: true,
							},
						},
					},
				},
			},
		});
	}

	async findByIdWithIncludes(id: string): Promise<Task | null> {
		return await this.getModel().task.findUnique({
			where: { id },
			include: {
				createdBy: true,
				assignedUsers: {
					include: {
						user: true,
					},
				},
				tags: {
					include: {
						tag: true,
					},
				},
				emojiTaskUsers: {
					include: {
						user: true,
					},
				},
				subTasks: {
					include: {
						createdBy: true,
						assignedUsers: {
							include: {
								user: true,
							},
						},
						tags: {
							include: {
								tag: true,
							},
						},
						emojiTaskUsers: {
							include: {
								user: true,
							},
						},
					},
				},
			},
		});
	}

	async findByProjectIdWithIncludes(projectId: string): Promise<Task[]> {
		return await this.getModel().task.findMany({
			where: {
				projectId: projectId,
				parentTaskId: null, // Only top-level tasks
			},
			include: {
				createdBy: true,
				assignedUsers: {
					include: {
						user: true,
					},
				},
				tags: {
					include: {
						tag: true,
					},
				},
				emojiTaskUsers: {
					include: {
						user: true,
					},
				},
				subTasks: {
					include: {
						createdBy: true,
						assignedUsers: {
							include: {
								user: true,
							},
						},
						tags: {
							include: {
								tag: true,
							},
						},
						emojiTaskUsers: {
							include: {
								user: true,
							},
						},
						subTasks: true, // Nested subtasks
					},
				},
			},
		});
	}

	async findByParentTaskIdWithIncludes(parentTaskId: string): Promise<Task[]> {
		return await this.getModel().task.findMany({
			where: { parentTaskId },
			include: {
				createdBy: true,
				assignedUsers: {
					include: {
						user: true,
					},
				},
				tags: {
					include: {
						tag: true,
					},
				},
				emojiTaskUsers: {
					include: {
						user: true,
					},
				},
				subTasks: {
					include: {
						createdBy: true,
						assignedUsers: {
							include: {
								user: true,
							},
						},
						tags: {
							include: {
								tag: true,
							},
						},
						emojiTaskUsers: {
							include: {
								user: true,
							},
						},
					},
				},
			},
		});
	}

	async findByUserIdWithIncludes(userId: string): Promise<Task[]> {
		const assignments = await this.getModel().taskAssignment.findMany({
			where: { userId },
			include: {
				task: {
					include: {
						createdBy: true,
						assignedUsers: {
							include: {
								user: true,
							},
						},
						tags: {
							include: {
								tag: true,
							},
						},
						emojiTaskUsers: {
							include: {
								user: true,
							},
						},
						subTasks: {
							include: {
								createdBy: true,
								assignedUsers: {
									include: {
										user: true,
									},
								},
								tags: {
									include: {
										tag: true,
									},
								},
								emojiTaskUsers: {
									include: {
										user: true,
									},
								},
							},
						},
					},
				},
			},
		});

		return assignments.map((assignment) => assignment.task);
	}

	// Additional optimized methods
	async getTaskCountByProjectId(projectId: string): Promise<number> {
		return await this.getModel().task.count({
			where: { projectId },
		});
	}

	async createTaskWithProjectUpdate(
		taskData: Partial<Task>,
		projectUpdate: { budget: number; advance: number; expense: number },
	): Promise<Task> {
		// Use transaction for atomic operations
		return await this.getModel().$transaction(async (prisma) => {
			// Create task
			const createdTask = await prisma.task.create({
				data: {
					title: taskData.title ?? "",
					description: taskData.description ?? "",
					statusBudgets: taskData.statusBudgets ?? BudgetStatus.Initial,
					budget: taskData.budget ?? 0.0,
					advance: taskData.advance ?? 0.0,
					expense: taskData.expense ?? 0.0,
					status: taskData.status ?? TaskStatus.Unassigned,
					parentTaskId: taskData.parentTaskId,
					position: taskData.position ?? 0.0,
					projectId: taskData.projectId ?? "",
					createdById: taskData.createdById ?? "",
					startDate: taskData.startDate,
					endDate: taskData.endDate,
				},
			});

			// Update project budget
			await prisma.project.update({
				where: { id: taskData.projectId },
				data: projectUpdate,
			});

			return createdTask;
		});
	}
}
