import type Redis from "ioredis";

export abstract class BaseService<T> {
	protected readonly redis: Redis;
	protected readonly cacheTTL: number;

	private readonly projectCacheKey = "projects";
	private readonly taskCacheKey = "tasks";
	private readonly userCacheKey = "users";
	private readonly fileCacheKey = "files";
	private readonly tagCacheKey = "tags";
	private readonly templateCacheKey = "templates";

	protected getProjectCacheKey(params: string): string {
		return `${this.projectCacheKey}:${params}`;
	}

	protected getTaskCacheKey(params: string): string {
		return `${this.taskCacheKey}:${params}`;
	}

	protected getUserCacheKey(params: string): string {
		return `${this.userCacheKey}:${params}`;
	}

	protected getFileCacheKey(params: string): string {
		return `${this.fileCacheKey}:${params}`;
	}

	protected getTagCacheKey(params: string): string {
		return `${this.tagCacheKey}:${params}`;
	}

	protected getTemplateCacheKey(params: string): string {
		return `${this.templateCacheKey}:${params}`;
	}

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

	// Generic cache methods for any data type
	protected async getFromCacheGeneric<U>(cacheKey: string): Promise<U | null> {
		const cachedData = await this.redis.get(cacheKey);
		if (cachedData !== null) {
			return JSON.parse(cachedData) as U;
		}
		return null;
	}

	// Save data to cache
	protected async setToCache(cacheKey: string, data: T | T[]): Promise<void> {
		await this.redis.set(cacheKey, JSON.stringify(data), "EX", this.cacheTTL);
	}

	// Generic cache setter for any data type
	protected async setToCacheGeneric<U>(
		cacheKey: string,
		data: U,
	): Promise<void> {
		await this.redis.set(cacheKey, JSON.stringify(data), "EX", this.cacheTTL);
	}

	// Invalidate cache
	protected async invalidateCache(cacheKey: string): Promise<void> {
		await this.redis.del(cacheKey);
	}

	protected async invalidateAllCache(
		...categories: [string, ...string[]]
	): Promise<void> {
		for (const category of categories) {
			const pattern = `${category}:*`; // Example: "projects:*"
			let cursor = "0";
			do {
				const [nextCursor, keys] = await this.redis.scan(
					cursor,
					"MATCH",
					pattern,
					"COUNT",
					100,
				);
				cursor = nextCursor;
				if (keys.length > 0) {
					await this.redis.del(...keys);
				}
			} while (cursor !== "0");
		}
	}
}
