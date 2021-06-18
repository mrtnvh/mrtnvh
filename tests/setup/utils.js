const { port } = require("./config");

exports.getUrl = (p) => `http://localhost:${port}${p}`;

exports.customSnapshotIdentifier = (path, environmentName) =>
	`pages${
		path === "/" ? "-index" : path.split("/").join("-")
	}-${environmentName}`;
