import type { Prisma, PrismaClient } from "@prisma/client";
import type { DefaultArgs } from "@prisma/client/runtime/library";

export abstract class BaseModel<T, K> {
  private readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  abstract findAll(): Promise<T[]>;
  abstract findById(id: K): Promise<T | null>;
  abstract create(data: Partial<T>): Promise<T>;
  abstract update(id: K, data: Partial<T>): Promise<T>;
  abstract delete(id: K): Promise<T>;

  protected getModel(): PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>{
    return this.prisma;

  }
}
