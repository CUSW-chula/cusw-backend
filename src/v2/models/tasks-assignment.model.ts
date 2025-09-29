import { type TaskAssignment } from "../../../generated";
import { BaseModel } from "../../core/model.core";

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

	async findByTaskId(taskId: string): Promise<TaskAssignment[] | null> {
		const taskAssignment = await this.getModel().taskAssignment.findMany({
			where: {
				taskId: taskId,
			},
		});
		return taskAssignment;
	}

	async findByUserId(userId: string): Promise<TaskAssignment[]> {
		const taskAssignment = await this.getModel().taskAssignment.findMany({
			where: {
				userId: userId,
			},
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

	async deleteByUserId(userId: string): Promise<number> {
		const deletedTaskAssignment =
			await this.getModel().taskAssignment.deleteMany({
				where: { userId: userId },
			});
		return deletedTaskAssignment.count;
	}

	async deleteByTaskId(taskId: string): Promise<number> {
		const deletedTaskAssignment =
			await this.getModel().taskAssignment.deleteMany({
				where: { taskId: taskId },
			});
		return deletedTaskAssignment.count;
	}

	// Optimized batch delete method
	async deleteByTaskIds(taskIds: string[]): Promise<number> {
		if (taskIds.length === 0) return 0;

		const deletedTaskAssignments =
			await this.getModel().taskAssignment.deleteMany({
				where: {
					taskId: {
						in: taskIds,
					},
				},
			});
		return deletedTaskAssignments.count;
	}
}
