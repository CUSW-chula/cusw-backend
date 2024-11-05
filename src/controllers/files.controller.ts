import { Elysia, t } from "elysia";
import { type Context } from "../shared/interfaces.shared";
import { FilesService } from "../services/files.service";
import { WebSocket } from "../shared/utils/websocket.utils";
import { ActivityService } from "../services/activity-logs.service";
import { $Enums } from "@prisma/client";

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
			body: { taskId, file, projectId, authorId },
			db,
			redis,
			minio,
		}: Context & {
			body: {
				taskId: string;
				file: Blob;
				projectId: string;
				authorId: string;
			};
		}) => {
			const fileService = new FilesService(db, redis, minio);
			const activityService = new ActivityService(db, redis);
			try {
				const savedFile = await fileService.uploadFileByTaskId(
					taskId,
					file,
					projectId,
					authorId,
				);
				if (!savedFile) {
					return Response.json("file couldn't be saved", { status: 500 });
				}
				WebSocket.broadcast("add-file", savedFile);
				const uploadActivity = await activityService.postActivity(
					taskId,
					$Enums.ActivityAction.UPLOAD,
					"this file. ",
					authorId,
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
				authorId: t.String(),
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
				WebSocket.broadcast("remove-file", removeFile);
				if (!removeFile.taskId) {
					throw new Error("Task ID is null");
				}
				const removeActivity = await activityService.postActivity(
					removeFile.taskId,
					$Enums.ActivityAction.DELETE,
					"this file.",
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
