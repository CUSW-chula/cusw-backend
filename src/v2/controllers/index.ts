export default [
	require("./projects.controller").ProjectController,
	require("./users.controller").UserController,
	require("./comment.controller").CommentController,
	require("./tasks.controller").TaskController,
	require("./tag.controller").TagController,
	require("./files.controller").FileController,
	require("./activity-logs.controller").ActivityController,
	require("./template.controller").TemplateController,
	require("./dashboard.controller").DashboardController,
	require("./ganttchart.controller").GanttChartController,
];