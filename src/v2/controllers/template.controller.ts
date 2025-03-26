import { type Cookie, Elysia, t } from "elysia";
import { type Context } from "../../shared/interfaces.shared";
import { TemplateService } from "../services/template.service";

const MAX_FILENAME_LENGTH = 50; // Define your max length for filenames

function truncateFileName(fileName: string, maxLength: number): string {
	return fileName.length > maxLength
		? `${fileName.slice(0, maxLength)}...`
		: fileName;
}

export const TemplateController = new Elysia({
	prefix: "/template",
	tags: ["Version 2"],
})
	.get(
		"/",
		async ({ db, redis, minio }: Context & { params: { id: string } }) => {
			const templateService = new TemplateService(db, redis, minio);
			const files = await templateService.getAllFile();
			return files;
		},
	)
	.patch(
		"/",
		async ({
			body: { templateId, newFileName },
			db,
			redis,
			minio,
		}: Context & {
			body: {
				templateId: string;
				newFileName: string;
			};
		}) => {
			const templateService = new TemplateService(db, redis, minio);
			const updatedFile = await templateService.changeTemplateName(
				templateId,
				newFileName,
			);

			// Shorten fileName if necessary
			updatedFile.fileName = truncateFileName(
				updatedFile.fileName,
				MAX_FILENAME_LENGTH,
			);

			return updatedFile;
		},
		{
			body: t.Object({
				templateId: t.String(),
				newFileName: t.String(),
			}),
		},
	)
	.post(
		"/:projectId",
		async ({
			body: { file },
			db,
			redis,
			params: { projectId },
			minio,
			cookie: { session },
		}: Context & {
			body: {
				file: Blob;
			};
			params: { projectId: string };
			cookie: { session: Cookie<string> };
		}) => {
			const templateService = new TemplateService(db, redis, minio);
			const userId = session.value;
			const savedFile = await templateService.uploadTemplate(file, userId);
			if (!savedFile) {
				return Response.json("file couldn't be saved", { status: 500 });
			}

			// Shorten fileName if necessary
			savedFile.fileName = truncateFileName(
				savedFile.fileName,
				MAX_FILENAME_LENGTH,
			);

			return savedFile;
		},
		{
			body: t.Object({
				file: t.File(),
			}),
		},
	)
	.delete(
		"/",
		async ({
			body: { templateId },
			db,
			redis,
			minio,
		}: Context & {
			body: {
				templateId: string;
			};
		}) => {
			const templateService = new TemplateService(db, redis, minio);
			const removeFile = await templateService.removeTemplate(templateId);

			// Shorten fileName if necessary
			removeFile.fileName = truncateFileName(
				removeFile.fileName,
				MAX_FILENAME_LENGTH,
			);

			if (!removeFile.id) {
				throw new Error("Template ID is null");
			}

			return removeFile;
		},
		{
			body: t.Object({
				templateId: t.String(),
			}),
		},
	);
