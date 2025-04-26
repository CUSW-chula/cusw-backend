import { type Cookie, Elysia, t } from "elysia";
import { type Context } from "../../shared/interfaces.shared";
import { FilesService } from "../services/files.service";
import { WebSocket } from "../../shared/utils/websocket.utils";
import { ActivityService } from "../services/activity-logs.service";
import { $Enums } from "../../../generated";

const MAX_FILENAME_LENGTH = 50; // Define your max length for filenames

function truncateFileName(fileName: string, maxLength: number): string {
	return fileName.length > maxLength
		? `${fileName.slice(0, maxLength)}...`
		: fileName;
}

export const FileController = new Elysia({
	prefix: "/file",
	tags: ["Version 2"],
})
	.get(
		"/:id",
		async ({
			params: { id },
			db,
			redis,
			minio,
		}: Context & { params: { id: string } }) => {
			const fileService = new FilesService(db, redis, minio);
			const files = await fileService.getFileByTaskId(id);
			return files;
		},
	)
	.post(
		"/:taskId",
		async ({
			body: { file, projectId },
			db,
			params: { taskId },
			redis,
			minio,
			cookie: { session },
		}: Context & {
			body: {
				taskId: string;
				file: Blob;
				projectId: string;
			};
			params: { taskId: string };
			cookie: { session: Cookie<string> };
		}) => {
			const fileService = new FilesService(db, redis, minio);
			const activityService = new ActivityService(db, redis);
			const userId = session.value;
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
			WebSocket.broadcast(`activity:${taskId}`, uploadActivity);

			return savedFile;
		},
		{
			body: t.Object({
				file: t.File(),
				projectId: t.Optional(t.String()),
			}),
		},
	)
	.delete(
		"/:taskId",
		async ({
			body: { fileId },
			db,
			params: { taskId },
			redis,
			minio,
		}: Context & {
			body: {
				fileId: string;
			};
			params: { taskId: string };
		}) => {
			if (!taskId) {
				throw new Error("Task ID is null");
			}
			const fileService = new FilesService(db, redis, minio);
			const activityService = new ActivityService(db, redis);
			const removeFile = await fileService.removeFileByFileId(fileId);

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
			WebSocket.broadcast(`activity:${removeFile.taskId}`, removeActivity);

			return removeFile;
		},
		{
			body: t.Object({
				fileId: t.String(),
			}),
		},
	);
