import { defineConfig, devices } from '@playwright/test';

const port = 3000;

export default defineConfig({
  use: {
    baseURL: process.env.CI_BASEURL || `http://localhost:${port}`,
  },
  ...(!process.env.CI && {
    workers: 1,
    retries: 2,
  }),
  projects: [
    {
      name: `desktop`,
      use: { ...devices['Desktop Chrome'], colorScheme: 'light' },
    },
    {
      name: `mobile`,
      use: { ...devices['Pixel 5'], colorScheme: 'light' },
    },
  ],
  /* Run your local dev server before starting the tests */
  ...(!process.env.CI_BASEURL && {
    webServer: {
      command: `npm run dev -- --port=${port}`,
      port,
      timeout: (process.env.CI ? 300 : 60) * 1000,
      reuseExistingServer: !process.env.CI,
    },
  }),
});
