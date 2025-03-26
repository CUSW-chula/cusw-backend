import { Template, PrismaClient } from "@prisma/client";
import { BaseService } from "../../core/service.core";
import { TemplateModel } from "../models/template.model";
import * as Minio from "minio";
import Redis from "ioredis";
import mime from "mime-types"; // Import mime-types library to get the content type by extension
import {
	BadRequestException,
	NotFoundException,
	ServerErrorException,
} from "../../core/exception.core";
import { randomUUID } from "crypto";

export class TemplateService extends BaseService<Template> {
	private readonly templateModel: TemplateModel;
	private readonly minIoClient: Minio.Client;

	constructor(prisma: PrismaClient, redis: Redis, minio: Minio.Client) {
		super(redis, 60);
		this.templateModel = new TemplateModel(prisma);
		this.minIoClient = minio;
	}

	async getAllFile(): Promise<Template[]> {
		const cacheKey = this.getTemplateCacheKey("all");
		const cacheFiles = await this.getFromCache(cacheKey);

		if (cacheFiles) return cacheFiles as Template[];

		const files = await this.templateModel.findAll();
		await this.setToCache(cacheKey, files);
		return files;
	}

	async uploadTemplate(file: Blob, authorId: string): Promise<Template | null> {
		const bucketName = "cusw-workspace";
		const id = randomUUID();
		const fileKey = `template-${id}-${file.name}`;
		const arrBuf = await file.arrayBuffer();
		const fileBuffer = Buffer.from(arrBuf);

		// Get the MIME type based on the file extension
		const contentType = mime.lookup(file.name) || "application/octet-stream";
		if (contentType === "application/json") {
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

			const savedFile = await this.templateModel.create({
				createdAt: new Date(),
				filePath: filePath,
				fileName: file.name,
				fileSize: file.size,
				uploadedBy: authorId,
			});

			if (!savedFile) throw new ServerErrorException("Failed to save file");

			await this.invalidateAllCache("templates");

			return savedFile;
		}
		throw new BadRequestException("Require file type JSON");
	}

	async changeTemplateName(fileId: string, newName: string): Promise<Template> {
		const file = await this.templateModel.findById(fileId);
		if (!file) throw new NotFoundException("Template not found");
		const newTemplate = await this.templateModel.update(file.id, {
			fileName: newName,
		});
		await this.invalidateAllCache("templates");
		return newTemplate;
	}

	async removeTemplate(fileId: string): Promise<Template> {
		const file = await this.templateModel.findById(fileId);
		if (!file) throw new NotFoundException("Template not found");

		const bucketName = "cusw-workspace";
		await this.minIoClient.removeObject(bucketName, file.fileName);

		const removeFile = await this.templateModel.delete(file.id);
		if (!removeFile) throw new ServerErrorException("Failed to remove file");

		await this.invalidateAllCache("templates");
		return removeFile;
	}
}
