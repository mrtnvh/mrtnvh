/* eslint-disable import/extensions */
import { expect } from '@playwright/test';
import { devices, getPages } from '../setup/config.js';
import { customSnapshotIdentifier } from '../setup/utils.js';
import { baseTest } from '../setup/baseTest.js';

baseTest.describe('Visual snapshot', async () => {
  (await getPages()).forEach((path) => {
    baseTest.describe.parallel(path, () => {
      Object.entries(devices).forEach(([environmentName, emulationSettings]) => {
        baseTest.use({ contextOptions: { ...emulationSettings, colorScheme: 'light' } });
        baseTest(environmentName, async ({ request, page, baseURL }, testInfo) => {
          const url = baseURL + path;
          const html = await (await request.get(url)).text();
          const clientSideRedirect = html.includes('http-equiv="refresh"');
          if (clientSideRedirect) {
            expect(true, `Client side redirect, don't perform visual test`).toBe(true);
          } else {
            testInfo.setTimeout(60 * 1000);
            await page.goto(path);
            await page.evaluate(() => {
              window.scrollTo({
                top: Number.MAX_SAFE_INTEGER,
                behavior: 'smooth',
              });
            });
            await page.waitForLoadState('networkidle');
            const body = await page.$('body');
            const screenshot = await body?.screenshot();

            expect(screenshot).toMatchSnapshot(customSnapshotIdentifier(path, environmentName, 'png'), {
              maxDiffPixels: 25,
              threshold: 0.3,
            });
          }
        });
      });
    });
  });
});
