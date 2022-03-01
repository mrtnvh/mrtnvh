/* eslint-disable import/extensions */
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@playwright/test';
import { preview } from 'vite';
import getPort from 'get-port';
import fs from 'fs-extra';
import { chromium } from 'playwright';
import lighthouse from 'lighthouse';
import { defaultsDeep } from 'lodash-es';
import lighthouseMobileConfig from 'lighthouse/lighthouse-core/config/lr-mobile-config.js';
import lighthouseDesktopConfig from 'lighthouse/lighthouse-core/config/lr-desktop-config.js';
import { getPages } from '../setup/config.mjs';
import { getUrl, customSnapshotIdentifier } from '../setup/utils.mjs';

const getFilename = () => fileURLToPath(import.meta.url);
const getDirname = () => dirname(getFilename());

const threshold = 0.95;

const customConfig = { settings: { skipAudits: ['is-crawlable'] } };
const lighthouseConfig = {
  mobile: defaultsDeep(customConfig, lighthouseMobileConfig),
  desktop: defaultsDeep(customConfig, lighthouseDesktopConfig),
};

test.describe('Lighthouse', async () => {
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
      Object.entries(lighthouseConfig).forEach(([environmentName, environmentConfig]) => {
        let cdpPort;
        let browser;

        test.beforeEach(async () => {
          cdpPort = await getPort();
          browser = await chromium.launch({ args: [`--remote-debugging-port=${cdpPort}`] });
          await browser.newBrowserCDPSession();
        });

        test(environmentName, async ({ request }) => {
          const url = getUrl(path, port);
          const html = await (await request.get(url)).text();
          const clientSideRedirect = html.includes('http-equiv="refresh"');

          if (clientSideRedirect) {
            expect(true, `Client side redirect, don't perform performance test`).toBe(true);
          } else {
            const { lhr, report } = await lighthouse(
              url,
              {
                port: cdpPort,
                output: 'html',
              },
              environmentConfig,
            );

            const reportFileName = customSnapshotIdentifier(path, environmentName, 'html');
            await fs.outputFile(`${getDirname()}/__reports__/${reportFileName}`, report);
            const scores = Object.values(lhr.categories).map(({ title, score }) => ({
              title,
              score,
            }));
            scores.forEach(({ title, score }) => {
              expect(score, `${title} score below threshold of ${threshold * 100}%`).toBeGreaterThanOrEqual(threshold);
            });
          }
        });
      });
    });
  });
});
