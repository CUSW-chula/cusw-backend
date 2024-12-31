export default [
	require("./users.controller").UserController,
	require("./projects.controller").ProjectController,
	require("./comment.controller").CommentController,
	require("./tasks.controller").TaskController,
	require("./tag.controller").TagController,
	require("./files.controller").FileController,
	require("./activity-logs.controller").ActivityController,
];
