module.exports = {
	preset: "jest-puppeteer",
	setupFilesAfterEnv: ["./tests/setup.js"],
	globalSetup: "./tests/global-setup.js",
	globalTeardown: "./tests/global-teardown.js",
};
