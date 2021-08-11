const { promisify } = require("util");
const { exec: execSync } = require("child_process");
const { setup: setupPuppeteer } = require("jest-environment-puppeteer");
const { setup: setupDevServer } = require("jest-dev-server");
const { port, browserTimeout } = require("./config");

const exec = promisify(execSync);

const setupNuxt = async () => {
	await exec("astro build");
	await setupDevServer({
		command: `http-server dist --port=${port}`,
		port,
		launchTimeout: browserTimeout,
	});
};

module.exports = async function globalSetup(globalConfig) {
	await setupPuppeteer(globalConfig);
	await setupNuxt();
};
