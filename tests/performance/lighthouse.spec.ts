/* eslint-disable import/extensions */
import { expect } from '@playwright/test';
import { playAudit } from 'playwright-lighthouse';
import { defu } from 'defu';
import type * as LH from 'lighthouse';
import { default as lighthouseMobileConfig } from 'lighthouse/core/config/default-config.js';
import { default as lighthouseDesktopConfig } from 'lighthouse/core/config/lr-desktop-config.js';
import { getPages } from '../setup/config.js';
import { customSnapshotIdentifier, getDirname } from '../setup/utils.js';
import { baseTest } from '../setup/baseTest.js';

const customConfig = { settings: { skipAudits: ['is-crawlable'] } };
const lighthouseConfig: Record<string, LH.Config> = {
  mobile: defu(customConfig, lighthouseMobileConfig),
  desktop: defu(customConfig, lighthouseDesktopConfig),
};

baseTest.describe('Lighthouse', async () => {
  getPages()
    // .filter((_, index) => index === 0)
    .forEach((path) => {
      baseTest(path, async ({ request, lhPort: port, page, baseURL }, testInfo) => {
        testInfo.setTimeout(60000);

        const environmentName = testInfo.project.name;
        const environmentConfig = lighthouseConfig[environmentName];

        if (!environmentConfig) throw new Error(`No lighthouse config found for ${environmentName}`);

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
              performance: 90,
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
