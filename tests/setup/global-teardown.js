const { teardown: teardownDevServer } = require("jest-dev-server");
const { teardown: teardownPuppeteer } = require("jest-environment-puppeteer");

module.exports = async function globalTeardown(globalConfig) {
  await teardownDevServer();
  await teardownPuppeteer(globalConfig);
};
