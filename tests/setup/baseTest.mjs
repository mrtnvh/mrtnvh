/* eslint-disable import/prefer-default-export */
import { test as base } from '@playwright/test';

export const baseTest = base.extend({
  context: async ({ context }, use) => {
    // Ignore third party scripts
    await context.route(/(vercel.live\/_next-live)/, (route) => route.abort());
    await use(context);
  },
});
