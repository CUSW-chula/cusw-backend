import type Redis from "ioredis";
import type * as Minio from "minio";
import { $Enums, PrismaClient } from "../../generated";

export interface Context {
	db: PrismaClient;
	redis: Redis;
	minio: Minio.Client;
	cookie?: {
		session?: {
			value: string;
		};
	};
}

export type User = {
	id: string;
	email: string;
	name: string;
	admin: boolean;
	activated: boolean;
} | null;

export type Tag = {
	id: string;
	name: string;
	isProject: boolean;
} | null;

export type Task = {
	id: string;
	title: string;
	description: string;
	parentTaskId: string | null;
	projectId: string;
	position: number;
	startDate: Date | null;
	endDate: Date | null;
	expense: number;
	createdById: string | null;
	owner: User | null;
	members: User[];
	tags: Tag[];
	budget: number;
	advance: number;
	status: $Enums.TaskStatus;
	subtasks: Task[];
	emojis: Emoji[];
};

export type Comment = {
	id: string;
	content: string;
	taskId: string;
	author: User;
	createdAt: Date;
	isDeleted: boolean;
	editTime: Date | null;
};

export type Project = {
	id: string;
	title: string;
	description: string;
	budget: number;
	advance: number;
	expense: number;
	startDate: Date | null;
	endDate: Date | null;
	owner: User[];
	members: User[];
	tasks: Task[];
	tags: Tag[];
	isPinned: Boolean;
};

export type TaskAssignment = {
	user: User;
	task: Task;
};

export type Emoji = {
	id: string;
	emoji: string;
	taskId: string;
	user: User;
};

export type Activity = {
	id: string;
	action: $Enums.ActivityAction;
	detail: string | null;
	createdAt: Date;
	task: Task;
	user: User;
};

export type PinProject = {
	id: string;
	userId: string;
	projectId: string;
};
