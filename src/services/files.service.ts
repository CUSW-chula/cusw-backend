import { File, PrismaClient } from "@prisma/client";
import { BaseService } from "../core/service.core";
import { FilesModel } from "../models/files.model";
import * as Minio from "minio";
import Redis from "ioredis";
import mime from "mime-types"; // Import mime-types library to get the content type by extension
import { BunFile } from "bun";

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

	private async getPublicFileUrl(filePath: string): Promise<string> {
		const bucketName = "cusw-workspace";
		const url = await this.minIoClient.presignedUrl(
			"GET",
			bucketName,
			filePath,
		);
		return url;
	}

	async uploadFileByTaskId(
		taskId: string,
		file: Blob,
		projectId: string,
		authorId: string,
	): Promise<File | null> {
		const bucketName = "cusw-workspace";
		const fileKey = `${projectId}-${taskId}-${file.name}`;
		const arrBuf = await file.arrayBuffer();
		const fileBuffer = Buffer.from(arrBuf);

		// Get the MIME type based on the file extension
		const contentType = mime.lookup(fileName) || "application/octet-stream";

		await this.minIoClient.putObject(
			bucketName,
			fileKey,
			fileBuffer,
			file.size,
			{
				"Content-Type": contentType,
			},
		);

		const fileUrl = await this.getPublicFileUrl(fileKey);

		const savedFile = await this.fileModel.create({
			taskId: taskId,
			createdAt: new Date(),
			filePath: fileUrl,
			fileSize: file.size,
			projectId: projectId,
			uploadedBy: authorId,
		});

		return savedFile;
	}
}
