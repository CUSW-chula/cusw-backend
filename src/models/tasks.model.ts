import { TaskStatus, type Task } from "@prisma/client";
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

	async create(data: Partial<Task>): Promise<Task> {
		const createdProject = await this.getModel().task.create({
			data: {
				title: data.title ?? "",
				description: data.description ?? "",
				expectedBudget: data.expectedBudget ?? 0.0,
				realBudget: data.realBudget ?? 0.0,
				usedBudget: data.usedBudget ?? 0.0,
				status: data.status ?? TaskStatus.Unassigned,
				parentTaskId: data.parentTaskId ?? "",
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
}
