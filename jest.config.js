module.exports = {
  testRunner: "jest-circus/runner",
  preset: "jest-puppeteer",
  setupFilesAfterEnv: ["./tests/setup/setup-files-after-env.js"],
  globalSetup: "./tests/setup/global-setup.js",
  globalTeardown: "./tests/setup/global-teardown.js",
};
