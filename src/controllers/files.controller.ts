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
	.post(
		"/",
		async ({
			body: { taskId, file, projectId, authorId },
			db,
			redis,
			minio,
		}: Context & {
			body: {
				taskId: string;
				fileSize: number;
				file: Blob;
				projectId: string;
				authorId: string;
			};
		}) => {
			const fileService = new FilesService(db, redis, minio);
			try {
				const savedFile = await fileService.uploadFileByTaskId(
					taskId,
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
				file: t.File(),
				projectId: t.String(),
				authorId: t.String(),
			}),
		},
	);
