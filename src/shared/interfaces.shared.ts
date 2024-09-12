import type { PrismaClient } from "@prisma/client";
import type Redis from "ioredis";

export interface Context {
	db: PrismaClient;
	redis: Redis;
}
