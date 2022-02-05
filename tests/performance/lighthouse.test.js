/* eslint-disable jest/no-conditional-expect */
const fetch = require('node-fetch');
const fs = require('fs-extra');
const lighthouse = require('lighthouse');
const lighthouseMobileConfig = require('lighthouse/lighthouse-core/config/lr-mobile-config');
const lighthouseDesktopConfig = require('lighthouse/lighthouse-core/config/lr-desktop-config');

const threshold = 0.95;

const { getPages } = require('../setup/config');
const { getUrl, customSnapshotIdentifier } = require('../setup/utils');

const customConfig = { settings: { skipAudits: ['seo/is-crawlable'] } };
const ligthouseConfigs = {
  mobile: { ...lighthouseMobileConfig, ...customConfig },
  desktop: { ...lighthouseDesktopConfig, ...customConfig },
};

describe('Lighthouse', () => {
  describe.each(getPages())('%s', (path) => {
    test.each(Object.entries(ligthouseConfigs))(
      '%s',
      async (environmentName, environmentConfig) => {
        const url = getUrl(path);
        const html = await fetch(url).then((res) => res.text());
        const clientSideRedirect = html.includes('http-equiv="refresh"');

        if (clientSideRedirect) {
          expect(true, `Client side redirect, don't perform performance test`).toBe(true);
        } else {
          const { lhr, report } = await lighthouse(
            getUrl(path),
            {
              port: new URL(browser.wsEndpoint()).port,
              output: 'html',
            },
            environmentConfig,
          );

          const reportFileName = customSnapshotIdentifier(path, environmentName);

          await fs.outputFile(`${__dirname}/__reports__/${reportFileName}.html`, report);

          const scores = Object.values(lhr.categories).map(({ title, score }) => ({
            title,
            score,
          }));

          scores.forEach(({ title, score }) => {
            expect(score, `${title} score below threshold of ${threshold * 100}%`).toBeGreaterThanOrEqual(threshold);
          });
        }
      },
      60 * 1000,
    );
  });
});
