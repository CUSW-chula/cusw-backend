import { Task } from "../interfaces.shared";

const sortTasks = (tasks: Task[]): Task[] => {
	return tasks
		.sort((a, b) => a.position - b.position)
		.map((task) => ({
			...task,
			subtasks: task.subtasks ? sortTasks(task.subtasks) : [],
		}));
};

export { sortTasks };
