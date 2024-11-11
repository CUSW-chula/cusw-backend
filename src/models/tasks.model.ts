import { TaskStatus, BudgetStatus, type Task } from "@prisma/client";
import { BaseModel } from "../core/model.core";

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
				projectId: data.projectId ?? "",
				createdById: data.createdById ?? "",
				startDate: data.startDate ?? new Date(),
				endDate: data.endDate ?? new Date(),
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
	async delete(id: string): Promise<Task> {
		const deletedTask = await this.getModel().task.delete({
			where: { id },
		});
		return deletedTask;
	}

	async findByProjectId(projectId: string): Promise<Task[]> {
		const tasks = await this.getModel().task.findMany({
			where: { projectId },
			include: {
				subTasks: true,
			},
		});
		return tasks;
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
		return tasks;
	}
}
