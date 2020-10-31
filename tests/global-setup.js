const { setup: setupPuppeteer } = require("jest-environment-puppeteer");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const { setup: setupDevServer } = require("jest-dev-server");

const browserTimeout = 30 * 1000;

const setupNuxt = async () => {
	const port = 3001;
	await exec("rm -rf dist");
	await exec("npm run generate");
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
