const puppeteerConfig = {
  preset: 'jest-puppeteer',
  setupFilesAfterEnv: ['./tests/setup/setup-files-after-env.js'],
  globalSetup: './tests/setup/global-setup.js',
  globalTeardown: './tests/setup/global-teardown.js',
};

module.exports = {
  projects: [
    {
      ...puppeteerConfig,
      displayName: 'e2e',
      testMatch: ['<rootDir>/tests/e2e/**/*.test.js'],
    },
    {
      ...puppeteerConfig,
      displayName: 'visual',
      testMatch: ['<rootDir>/tests/visual/**/*.test.js'],
    },
    {
      ...puppeteerConfig,
      displayName: 'performance',
      testMatch: ['<rootDir>/tests/performance/**/*.test.js'],
    },
  ],
};
