const { port } = require("./config");

exports.getUrl = (p) => `http://localhost:${port}${p}`;
