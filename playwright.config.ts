import { defineConfig } from '@playwright/test';

import { baseURL, port } from './tests/setup/config.js';

export default defineConfig({
  use: {
    baseURL,
  },
  ...(!process.env.CI && {
    workers: 1,
    retries: 2,
  }),
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
