const { setup: setupPuppeteer } = require("jest-environment-puppeteer");
const { setup: setupDevServer } = require("jest-dev-server");
const { port, browserTimeout } = require("./config");

const setupNuxt = async () => {
	await setupDevServer({
		command: `nuxt start --port=${port}`,
		port,
		launchTimeout: browserTimeout,
	});
};

module.exports = async function globalSetup(globalConfig) {
	await setupPuppeteer(globalConfig);
	await setupNuxt();
};
