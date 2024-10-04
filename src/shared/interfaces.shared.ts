import type { PrismaClient } from "@prisma/client";
import type Redis from "ioredis";
import type * as Minio from "minio";

export interface Context {
	db: PrismaClient;
	redis: Redis;
	minio: Minio.Client;
}
