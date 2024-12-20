import { File, PrismaClient } from "@prisma/client";
import { BaseService } from "../core/service.core";
import { FilesModel } from "../models/files.model";
import * as Minio from "minio";
import Redis from "ioredis";
import mime from "mime-types"; // Import mime-types library to get the content type by extension

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
		file: Blob,
		projectId: string,
		authorId: string,
	): Promise<File | null> {
		const cacheKey = `files:${taskId}`;
		const bucketName = "cusw-workspace";
		const fileKey = `${projectId}-${taskId}-${file.name}`;
		const arrBuf = await file.arrayBuffer();
		const fileBuffer = Buffer.from(arrBuf);

		// Get the MIME type based on the file extension
		const contentType = mime.lookup(file.name) || "application/octet-stream";

		await this.minIoClient.putObject(
			bucketName,
			fileKey,
			fileBuffer,
			file.size,
			{
				"Content-Type": contentType,
			},
		);

		const fileUrl = "http://localhost:9000/cusw-workspace/" + fileKey;
		let filePath = fileUrl;

		// Check if in production and if the URL starts with localhost
		if (
			process.env.NODE_ENV === "production" &&
			fileUrl.startsWith("http://localhost")
		) {
			// Replace 'localhost' with your production domain
			filePath = fileUrl.replace(
				"http://localhost:9000",
				"https://cusw-workspace.sa.chula.ac.th",
			);
		}

		const savedFile = await this.fileModel.create({
			taskId: taskId,
			createdAt: new Date(),
			filePath: filePath,
			fileName: file.name,
			fileSize: file.size,
			projectId: projectId,
			uploadedBy: authorId,
		});

		this.invalidateCache(cacheKey);

		return savedFile;
	}

	async removeFileByFileId(fileId: string): Promise<File> {
		const cacheKey = "files:all";
		const file = await this.fileModel.findById(fileId);
		if (!file) throw new Error("File not found");

		const bucketName = "cusw-workspace";
		await this.minIoClient.removeObject(bucketName, file.fileName);

		const removeFile = await this.fileModel.delete(file.id);
		await this.invalidateCache(cacheKey);
		return removeFile;
	}
}
