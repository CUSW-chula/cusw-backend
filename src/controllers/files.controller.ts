import { Elysia, t } from "elysia";
import { type Context } from "../shared/interfaces.shared";
import { FilesService } from "../services/files.service";

export const FileController = new Elysia({ prefix: "/file" })
	.get(
		"/:id",
		async ({
			params: { id },
			db,
			redis,
			minio,
		}: Context & { params: { id: string } }) => {
			const fileService = new FilesService(db, redis, minio);
			try {
				const files = await fileService.getFileByTaskId(id);
				if (!files) {
					return {
						status: 404,
						body: { error: "Files not found" },
					};
				}
				return files;
			} catch (_error) {
				return {
					status: 500,
					body: { error: _error },
				};
			}
		},
	)
	.get(
		"/view/:filePath",
		async ({
			params: { filePath },
			db,
			redis,
			minio,
		}: Context & { params: { filePath: string } }) => {
			const fileService = new FilesService(db, redis, minio);
			try {
				const fileUrl = await fileService.getPublicFileUrl(filePath);
				if (!fileUrl) {
					return {
						status: 404,
						body: { error: "File URL not found" },
					};
				}
				return fileUrl;
			} catch (_error) {
				return {
					status: 500,
					body: { error: _error },
				};
			}
		},
	)
	.post(
		"/",
		async ({
			body: { taskId, fileName, fileSize, file, projectId, authorId },
			db,
			redis,
			minio,
		}: Context & {
			body: {
				taskId: string;
				fileName: string;
				fileSize: number;
				file: string;
				projectId: string;
				authorId: string;
			};
		}) => {
			const fileService = new FilesService(db, redis, minio);
			try {
				const savedFile = await fileService.uploadFileByTaskId(
					taskId,
					fileName,
					fileSize,
					file,
					projectId,
					authorId,
				);
				if (!savedFile) {
					return {
						status: 500,
						body: { error: "File could not be saved" },
					};
				}
				return savedFile;
			} catch (_error) {
				return {
					status: 500,
					body: { error: _error },
				};
			}
		},
		{
			body: t.Object({
				taskId: t.String(),
				fileName: t.String(),
				fileSize: t.Number(),
				file: t.String(),
				projectId: t.String(),
				authorId: t.String(),
			}),
		},
	);
