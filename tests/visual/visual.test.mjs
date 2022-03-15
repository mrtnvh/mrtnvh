/* eslint-disable import/extensions */
import { test, expect } from '@playwright/test';
import { preview } from 'vite';
import getPort from 'get-port';
import { devices, getPages } from '../setup/config.mjs';
import { getUrl, customSnapshotIdentifier } from '../setup/utils.mjs';

test.describe('Visual snapshot', async () => {
  let port;
  let server;

  test.beforeAll(async () => {
    port = await getPort();
    server = await preview({ preview: { port } });
  });

  test.afterAll(async () => {
    await server.httpServer.close();
  });

  getPages().forEach((path) => {
    test.describe.parallel(path, () => {
      Object.entries(devices).forEach(([environmentName, emulationSettings]) => {
        test(environmentName, async ({ browser, request }, testInfo) => {
          const url = getUrl(path, port);
          const html = await (await request.get(url)).text();
          const clientSideRedirect = html.includes('http-equiv="refresh"');
          if (clientSideRedirect) {
            expect(true, `Client side redirect, don't perform visual test`).toBe(true);
          } else {
            await testInfo.setTimeout(60 * 1000);
            const context = await browser.newContext({ ...emulationSettings, colorScheme: 'light' });
            const page = await context.newPage();
            await page.goto(url);
            await page.evaluate(() => {
              window.scrollTo({
                top: Number.MAX_SAFE_INTEGER,
                behavior: 'smooth',
              });
            });
            await page.waitForLoadState('networkidle');
            const body = await page.$('body');
            const screenshot = await body.screenshot();

            expect(screenshot).toMatchSnapshot(customSnapshotIdentifier(path, environmentName, 'png'), {
              threshold: 0.3,
            });
          }
        });
      });
    });
  });
});
