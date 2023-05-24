/* eslint-disable import/extensions */
import { expect, devices } from '@playwright/test';
import { playAudit } from 'playwright-lighthouse';
import { defaultsDeep } from 'lodash-es';
import { default as lighthouseMobileConfig } from 'lighthouse/core/config/default-config.js';
import { default as lighthouseDesktopConfig } from 'lighthouse/core/config/lr-desktop-config.js';
import { getPages } from '../setup/config.js';
import { customSnapshotIdentifier, getDirname } from '../setup/utils.js';
import { baseTest } from '../setup/baseTest.js';

const customConfig = { settings: { skipAudits: ['is-crawlable'] } };
const lighthouseConfig = {
  mobile: defaultsDeep(customConfig, lighthouseMobileConfig),
  desktop: defaultsDeep(customConfig, lighthouseDesktopConfig),
};

baseTest.describe('Lighthouse', async () => {
  getPages()
    // .filter((_, index) => index === 0)
    .forEach((path) => {
      baseTest.describe.parallel(path, () => {
        Object.entries(lighthouseConfig).forEach(([environmentName, environmentConfig]) => {
          baseTest.use({
            contextOptions: {
              ...(environmentName === 'mobile' && devices['Moto G4']),
            },
          });

          baseTest(environmentName, async ({ request, lhPort: port, page, baseURL }, testInfo) => {
            testInfo.setTimeout(60000);

            const url = baseURL + path;
            const html = await (await request.get(url)).text();
            const clientSideRedirect = html.includes('http-equiv="refresh"');

            if (clientSideRedirect) {
              expect(true, `Client side redirect, don't perform performance test`).toBe(true);
            } else {
              await page.goto(path, { waitUntil: 'networkidle' });
              const reportFileName = customSnapshotIdentifier(path, environmentName, 'html');
              const reportsDirectory = `${getDirname(import.meta.url)}/__reports__/`;
              await playAudit({
                page,
                port,
                config: environmentConfig,
                thresholds: {
                  performance: 80,
                  accessibility: 100,
                  'best-practices': 100,
                  seo: 100,
                  pwa: 100,
                },
                reports: {
                  formats: {
                    html: true,
                  },
                  name: reportFileName,
                  directory: reportsDirectory,
                },
              });
            }
          });
        });
      });
    });
});
