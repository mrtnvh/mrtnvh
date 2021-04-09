const baseConfig = {
	testRunner: "jest-circus/runner",
	preset: "jest-puppeteer",
	setupFilesAfterEnv: ["./tests/setup/setup-files-after-env.js"],
	globalSetup: "./tests/setup/global-setup.js",
	globalTeardown: "./tests/setup/global-teardown.js",
};

module.exports = {
	projects: [
		{
			...baseConfig,
			displayName: "e2e",
			testMatch: ["<rootDir>/tests/e2e/**/*.test.js"],
		},
		{
			...baseConfig,
			displayName: "visual",
			testMatch: ["<rootDir>/tests/visual/**/*.test.js"],
		},
		{
			...baseConfig,
			displayName: "performance",
			testMatch: ["<rootDir>/tests/performance/**/*.test.js"],
		},
	],
};
