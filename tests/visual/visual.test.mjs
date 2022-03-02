/* eslint-disable import/extensions */
import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { preview } from 'vite';
import { Eyes, Target } from '@applitools/eyes-playwright';
import getPort from 'get-port';
import { devices, getPages } from '../setup/config.mjs';
import { getUrl } from '../setup/utils.mjs';

test.describe('Visual snapshot', async () => {
  let port;
  let server;
  let eyes;

  test.beforeAll(async () => {
    eyes = new Eyes();
    eyes.setBatch({
      id: 'VISUAL_SNAPSHOTS',
      name: 'Visual snapshots',
    });
    port = await getPort();
    server = await preview({ preview: { port } });
  });

  test.afterAll(async () => {
    await server.httpServer.close();
  });

  test.afterEach(async () => {
    await eyes.abort();
  });

  getPages().forEach((path) => {
    test.describe.parallel(path, () => {
      Object.entries(devices).forEach(([environmentName, emulationSettings]) => {
        test(environmentName, async ({ browser, request }, testInfo) => {
          testInfo.setTimeout(60 * 1000);
          const url = getUrl(path, port);
          const html = await (await request.get(url)).text();
          const clientSideRedirect = html.includes('http-equiv="refresh"');
          if (clientSideRedirect) {
            expect(true, `Client side redirect, don't perform visual test`).toBe(true);
          } else {
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

            await eyes.open(page, 'mrtnvh', `Visual snapshots - ${path} - ${environmentName}`);
            await eyes.check(path, Target.window().fully());
            await eyes.close();
          }
        });
      });
    });
  });
});
