import { PrismaClient } from "@prisma/client";

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

  protected getModel() {
    return this.prisma;
    
  }
}
