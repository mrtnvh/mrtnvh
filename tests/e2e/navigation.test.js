/* eslint-disable jest/no-conditional-expect */
const {
  getDocument,
  queries: { getByTestId },
} = require('pptr-testing-library');
const { devices } = require('../setup/config');
const { getUrl, removeTrailingSlash } = require('../setup/utils');

const links = {
  home: '/',
  projects: '/projects',
  talks: '/talks',
  about: '/about',
  github: 'https://github.com/vanhoofmaarten/',
  twitter: 'https://twitter.com/mrtnvh/',
  linkedin: 'https://www.linkedin.com/in/mrtnvh/',
};

describe('Navigation', () => {
  beforeEach(async () => {
    await page.goto(getUrl('/'));
  });

  describe.each(Object.entries(links))('Navigate to %s', (key, to) => {
    test.each(Object.entries(devices))(
      '%s',
      async (environmentName, emulationSettings) => {
        await page.emulate(emulationSettings);
        const $document = await getDocument(page);
        const $linkContainer = await getByTestId(
          $document,
          environmentName === 'mobile' ? `off-canvas-menu` : `app-header-navs`,
        );

        if (environmentName === 'mobile') {
          const $toggle = await getByTestId(
            $document,
            `off-canvas-menu-toggle`,
          );
          await $toggle.click();
        }

        const $link = await getByTestId($linkContainer, `navigation-${key}`);
        await $link.click();

        if (to.includes('http')) {
          await page.waitForTimeout(2000);
          const tabs = await browser.pages();
          const latestTabIndex = tabs.length - 1;
          const url = await tabs[latestTabIndex].url();

          if (url.includes('linkedin')) {
            expect(new URL(url).hostname).toEqual(new URL(to).hostname);
          } else {
            expect(removeTrailingSlash(url)).toEqual(removeTrailingSlash(to));
          }
        } else {
          await page.waitForTimeout(300);
          const url = await page.url();
          expect(removeTrailingSlash(url)).toEqual(
            removeTrailingSlash(getUrl(to)),
          );
        }
      },
    );
  });
});
