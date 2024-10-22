import { type TaskAssignment } from "@prisma/client";
import { BaseModel } from "../core/model.core";

export class TasksAssignmentModel extends BaseModel<TaskAssignment> {
	async findAll(): Promise<TaskAssignment[]> {
		const taskAssignments = await this.getModel().taskAssignment.findMany();
		return taskAssignments;
	}

	async findById(id: string): Promise<TaskAssignment | null> {
		const taskAssignment = await this.getModel().taskAssignment.findUnique({
			where: { id },
		});
		return taskAssignment;
	}

	async findByTaskIdAndUserId(
		taskId: string,
		userId: string,
	): Promise<TaskAssignment | null> {
		const taskAssignment = await this.getModel().taskAssignment.findFirst({
			where: {
				taskId: taskId,
				userId: userId,
			},
		});
		return taskAssignment;
	}

	async create(data: Partial<TaskAssignment>): Promise<TaskAssignment> {
		const createdtaskAsignment = await this.getModel().taskAssignment.create({
			data: {
				taskId: data.taskId ?? "",
				userId: data.userId ?? "",
			},
		});
		return createdtaskAsignment;
	}

	async update(
		id: string,
		data: Partial<TaskAssignment>,
	): Promise<TaskAssignment> {
		const updatedTaskAssignment = await this.getModel().taskAssignment.update({
			where: {
				id: id,
			},
			data: data,
		});
		return updatedTaskAssignment;
	}
	async delete(id: string): Promise<TaskAssignment> {
		const deletedTaskAssignment = await this.getModel().taskAssignment.delete({
			where: { id },
		});
		return deletedTaskAssignment;
	}
}
