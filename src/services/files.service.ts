import { File, PrismaClient } from "@prisma/client";
import { BaseService } from "../core/service.core";
import { FilesModel } from "../models/files.model";
import * as Minio from "minio";
import Redis from "ioredis";

export class FilesService extends BaseService<File> {
	private readonly fileModel: FilesModel;
	private readonly minIoClient: Minio.Client;

	constructor(prisma: PrismaClient, redis: Redis, minio: Minio.Client) {
		super(redis, 60);
		this.fileModel = new FilesModel(prisma);
		this.minIoClient = minio;
	}

	async getAllFile(): Promise<File[]> {
		const cacheKey = "files:all";
		const cacheFiles = await this.getFromCache(cacheKey);

		if (cacheFiles) return cacheFiles as File[];

		const files = await this.fileModel.findAll();
		await this.setToCache(cacheKey, files);
		return files;
	}

	async getFileByTaskId(taskId: string): Promise<File[] | null> {
		const cacheKey = `files:${taskId}`;
		const cacheFile = await this.getFromCache(cacheKey);

		if (cacheFile) return cacheFile as File[];

		const file = await this.fileModel.findByTaskId(taskId);
		if (!file) throw new Error("File not found");

		await this.setToCache(cacheKey, file);
		return file;
	}

	async uploadFileByTaskId(
		taskId: string,
		fileName: string,
		fileSize: number,
		file: string,
		projectId: string,
		authorId: string,
	): Promise<File | null> {
		const bucketName = "cusw-workspace";
		const randomString = (Math.random() + 1).toString(36).substring(7);
		const fileKey = `${projectId}/${randomString}/${taskId}/${fileName}`;
		await this.minIoClient.putObject(bucketName, fileKey, file);

		const savedFile = await this.fileModel.create({
			taskId: taskId,
			createdAt: new Date(),
			filePath: fileKey,
			fileSize: fileSize,
			projectId: projectId,
			uploadedBy: authorId,
		});

		return savedFile;
	}

	async getPublicFileUrl(
		filePath: string,
		expirySeconds: number = 3600,
	): Promise<string> {
		const bucketName = "cusw-workspace";
		const url = await this.minIoClient.presignedUrl(
			"GET",
			bucketName,
			filePath,
			expirySeconds,
		);
		return url;
	}
}
