import type { Prisma, PrismaClient } from "@prisma/client";
import type { DefaultArgs } from "@prisma/client/runtime/library";

export abstract class BaseModel<T> {
	private readonly prisma: PrismaClient;

	constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}

	abstract findAll(): Promise<T[]>;
	abstract findById(id: string): Promise<T | null>;
	abstract create(data: Partial<T>): Promise<T>;
	abstract update(id: string, data: Partial<T>): Promise<T>;
	abstract delete(id: string): Promise<T>;

	protected getModel(): PrismaClient<
		Prisma.PrismaClientOptions,
		never,
		DefaultArgs
	> {
		return this.prisma;
	}
}
