/* eslint-disable import/extensions */
import { test, expect, devices } from '@playwright/test';
import { playAudit } from 'playwright-lighthouse';
import { preview } from 'vite';
import getPort from 'get-port';
// import fs from 'fs-extra';
import { chromium } from 'playwright';
// import lighthouse from 'lighthouse';
import { defaultsDeep } from 'lodash-es';
import lighthouseMobileConfig from 'lighthouse/lighthouse-core/config/default-config.js';
import lighthouseDesktopConfig from 'lighthouse/lighthouse-core/config/lr-desktop-config.js';
import { getPages } from '../setup/config.mjs';
import { getUrl, customSnapshotIdentifier, getDirname } from '../setup/utils.mjs';

const threshold = 95;

const customConfig = { settings: { skipAudits: ['is-crawlable'] } };
const lighthouseConfig = {
  mobile: defaultsDeep(customConfig, lighthouseMobileConfig),
  desktop: defaultsDeep(customConfig, lighthouseDesktopConfig),
};

const lighthouseTest = test.extend({
  port: [
    // eslint-disable-next-line no-empty-pattern
    async ({}, use) => {
      // Assign a unique port for each playwright worker to support parallel tests
      const port = await getPort();
      await use(port);
    },
    { scope: 'worker' },
  ],

  browser: [
    async ({ port }, use) => {
      const browser = await chromium.launch({
        args: [`--remote-debugging-port=${port}`],
      });
      await use(browser);
    },
    { scope: 'worker' },
  ],

  // Start development server
  server: [
    async ({ port }, use) => {
      if (process.env.CI_BASEURL) return;
      const server = await preview({ preview: { port } });
      await use(server);
      await server.httpServer.close();
    },
  ],
});

lighthouseTest.describe('Lighthouse', async () => {
  getPages()
    // .filter((_, index) => index === 0)
    .forEach((path) => {
      lighthouseTest.describe.parallel(path, () => {
        Object.entries(lighthouseConfig).forEach(([environmentName, environmentConfig]) => {
          lighthouseTest(environmentName, async ({ request, port, browser }, testInfo) => {
            testInfo.setTimeout(60000);

            const url = getUrl(path, port);
            const html = await (await request.get(url)).text();
            const clientSideRedirect = html.includes('http-equiv="refresh"');

            if (clientSideRedirect) {
              expect(true, `Client side redirect, don't perform performance test`).toBe(true);
            } else {
              const context = await browser.newContext({
                ...(environmentName === 'mobile' && devices['Moto G4']),
              });
              const page = await context.newPage();
              await page.goto(url);

              const reportFileName = customSnapshotIdentifier(path, environmentName, 'html');
              const reportsDirectory = `${getDirname(import.meta.url)}/__reports__/`;
              await playAudit({
                page,
                port,
                config: environmentConfig,
                thresholds: {
                  performance: threshold,
                  accessibility: threshold,
                  'best-practices': threshold,
                  seo: threshold,
                  pwa: threshold,
                },
                reports: {
                  formats: {
                    html: true,
                  },
                  name: reportFileName,
                  directory: reportsDirectory,
                },
              });

              // const { lhr, report } = await lighthouse(
              //   url,
              //   {
              //     port: cdpPort,
              //     output: 'html',
              //   },
              //   environmentConfig,
              // );

              // const scores = Object.values(lhr.categories).map(({ title, score }) => ({
              //   title,
              //   score,
              // }));
              // scores.forEach(({ title, score }) => {
              //   expect(score, `${title} score below threshold of ${threshold * 100}%`).toBeGreaterThanOrEqual(threshold);
              // });
            }
          });
        });
      });
    });
});
