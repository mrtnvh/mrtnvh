/* eslint-disable jest/no-conditional-expect */
const fetch = require('node-fetch');
const { devices, getPages } = require('../setup/config');
const { getUrl, customSnapshotIdentifier } = require('../setup/utils');

beforeEach(async () => {
  await jestPuppeteer.resetBrowser();
});

describe.each(getPages())('%s', (path) => {
  describe('Visual snapshots', () => {
    test.each(Object.entries(devices))(
      '%s',
      async (environmentName, emulationSettings) => {
        const url = getUrl(path);
        const html = await fetch(url).then((res) => res.text());
        const clientSideRedirect = html.includes('http-equiv="refresh"');
        if (clientSideRedirect) {
          expect(true, `Client side redirect, don't perform visual test`).toBe(true);
        } else {
          const page = await browser.newPage();
          // Emulate device
          await page.emulate(emulationSettings);
          // Ensure light mode
          await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'light' }]);
          await page.goto(url);
          await page.evaluate(() => {
            window.scrollTo({
              top: Number.MAX_SAFE_INTEGER,
              behavior: 'smooth',
            });
          });

          const body = await page.$('body');
          const image = await body.screenshot();
          expect(image).toMatchImageSnapshot({
            comparisonMethod: 'ssim',
            customDiffConfig: {
              ssim: 'original',
            },
            failureThreshold: 0.2,
            failureThresholdType: 'percent',
            blur: 25,
            customSnapshotIdentifier: customSnapshotIdentifier(path, environmentName),
            allowSizeMismatch: true,
          });

          await page.close();
        }
      },
      25 * 1000,
    );
  });
});
