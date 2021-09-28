const { setup: setupPuppeteer } = require("jest-environment-puppeteer");
const { setup: setupDevServer } = require("jest-dev-server");
const { port, browserTimeout } = require("./config");

const setupApp = async () => {
	await setupDevServer({
		command: `ws -z -d dist -p ${port}`,
		port,
		launchTimeout: browserTimeout,
	});
};

module.exports = async function globalSetup(globalConfig) {
	await setupPuppeteer(globalConfig);
	await setupApp();
};
