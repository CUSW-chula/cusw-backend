import type Redis from "ioredis";

export abstract class BaseService<T> {
	protected readonly redis: Redis;
	protected readonly cacheTTL: number;

	constructor(redis: Redis, cacheTTL = 60) {
		this.redis = redis;
		this.cacheTTL = cacheTTL;
	}

	// Fetch data from cache
	protected async getFromCache(cacheKey: string): Promise<T | T[] | null> {
		const cachedData = await this.redis.get(cacheKey);
		if (cachedData !== null) {
			return JSON.parse(cachedData) as T | T[];
		}
		return null;
	}

	// Save data to cache
	protected async setToCache(cacheKey: string, data: T | T[]): Promise<void> {
		await this.redis.set(cacheKey, JSON.stringify(data), "EX", this.cacheTTL);
	}

	// Invalidate cache
	protected async invalidateCache(cacheKey: string): Promise<void> {
		await this.redis.del(cacheKey);
	}
}
