module.exports = {
	preset: "jest-puppeteer",
	// setupFilesAfterEnv: ["./tests/setup.js"],
	globalSetup: "./tests/setup.js",
	globalTeardown: "./tests/teardown.js",
};
