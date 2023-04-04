import { defineConfig } from '@playwright/test';

const port = 3000;

export default defineConfig({
  use: {
    baseURL: process.env.CI_BASEURL || `http://localhost:${port}`,
  },
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
