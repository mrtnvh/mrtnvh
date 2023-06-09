import { test as base } from '@playwright/test';
import getPort from 'get-port';
import { chromium } from 'playwright';

export const baseTest = base.extend<{}, { lhPort: number }>({
  lhPort: [
    async ({}, use) => {
      // Assign a unique port for each playwright worker to support parallel tests
      const port = await getPort();
      await use(port);
    },
    { scope: 'worker' },
  ],

  browser: [
    async ({ lhPort }, use) => {
      const browser = await chromium.launch({
        args: [`--remote-debugging-port=${lhPort}`],
      });
      await use(browser);
    },
    { scope: 'worker' },
  ],

  context: async ({ context }, use) => {
    // Ignore third party scripts
    await context.route(/(vercel.live\/_next-live|codepen.io|\/js\/stats)/, (route) => route.abort());
    await use(context);
  },
});
