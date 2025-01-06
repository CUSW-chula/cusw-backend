import type { $Enums, PrismaClient } from "@prisma/client";
import type Redis from "ioredis";
import type * as Minio from "minio";

export interface Context {
	db: PrismaClient;
	redis: Redis;
	minio: Minio.Client;
}

export type User = {
	id: string;
	email: string;
	name: string;
} | null;

export type Tag = {
	id: string;
	name: string;
} | null;

export type Task = {
	id: string;
	title: string;
	description: string;
	parentTaskId: string | null;
	projectId: string;
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

export type Prorject = {
	id: string;
	title: string;
	description: string;
	startDate: Date;
	endDate: Date;
	createdById: string;
	owner: User[];
	members: User[];
	tasks: Task[];
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
