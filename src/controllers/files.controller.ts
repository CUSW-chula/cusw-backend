import { type Cookie, Elysia, t } from "elysia";
import { type Context } from "../shared/interfaces.shared";
import { FilesService } from "../services/files.service";
import { WebSocket } from "../shared/utils/websocket.utils";
import { ActivityService } from "../services/activity-logs.service";
import { $Enums } from "@prisma/client";

const MAX_FILENAME_LENGTH = 50; // Define your max length for filenames

function truncateFileName(fileName: string, maxLength: number): string {
	return fileName.length > maxLength
		? `${fileName.slice(0, maxLength)}...`
		: fileName;
}

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
					return Response.json("file not found", { status: 404 });
				}
				return files;
			} catch (_error) {
				const error = _error as Error;
				return Response.json(error.message, { status: 500 });
			}
		},
	)
	.post(
		"/",
		async ({
			body: { taskId, file, projectId },
			db,
			redis,
			minio,
			cookie: { session },
		}: Context & {
			body: {
				taskId: string;
				file: Blob;
				projectId: string;
			};
			cookie: { session: Cookie<string> };
		}) => {
			const fileService = new FilesService(db, redis, minio);
			const activityService = new ActivityService(db, redis);
			const userId = session.value;
			try {
				const savedFile = await fileService.uploadFileByTaskId(
					taskId,
					file,
					projectId,
					userId,
				);
				if (!savedFile) {
					return Response.json("file couldn't be saved", { status: 500 });
				}

				// Shorten fileName if necessary
				savedFile.fileName = truncateFileName(
					savedFile.fileName,
					MAX_FILENAME_LENGTH,
				);

				WebSocket.broadcast("add-file", savedFile);

				const uploadActivity = await activityService.postActivity(
					taskId,
					$Enums.ActivityAction.UPLOADED,
					savedFile.fileName,
					userId,
				);
				WebSocket.broadcast("activity", uploadActivity);

				return savedFile;
			} catch (_error) {
				const error = _error as Error;
				return Response.json(error.message, { status: 500 });
			}
		},
		{
			body: t.Object({
				taskId: t.String(),
				file: t.File(),
				projectId: t.String(),
			}),
		},
	)
	.delete(
		"/",
		async ({
			body: { fileId },
			db,
			redis,
			minio,
		}: Context & {
			body: {
				fileId: string;
			};
		}) => {
			const fileService = new FilesService(db, redis, minio);
			const activityService = new ActivityService(db, redis);
			try {
				const removeFile = await fileService.removeFileByFileId(fileId);
				if (!removeFile) {
					return Response.json("file couldn't be removed", { status: 500 });
				}

				// Shorten fileName if necessary
				removeFile.fileName = truncateFileName(
					removeFile.fileName,
					MAX_FILENAME_LENGTH,
				);

				WebSocket.broadcast("remove-file", removeFile);

				if (!removeFile.taskId) {
					throw new Error("Task ID is null");
				}

				const removeActivity = await activityService.postActivity(
					removeFile.taskId,
					$Enums.ActivityAction.DELETED,
					removeFile.fileName,
					removeFile.uploadedBy,
				);
				WebSocket.broadcast("activity", removeActivity);

				return removeFile;
			} catch (_error) {
				const error = _error as Error;
				return Response.json(error.message, { status: 500 });
			}
		},
		{
			body: t.Object({
				fileId: t.String(),
			}),
		},
	);
