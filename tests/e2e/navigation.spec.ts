import { expect } from '@playwright/test';
import { devices } from '../setup/config.js';
import { removeTrailingSlash } from '../setup/utils.js';
import { baseTest } from '../setup/baseTest.js';

const links = {
  home: {
    desktop: '/',
    mobile: '/',
  },
  events: {
    desktop: '/events',
    mobile: '/events',
  },
  about: {
    desktop: '/about',
    mobile: '/about',
  },
  github: {
    desktop: 'https://github.com/vanhoofmaarten/',
    mobile: 'https://github.com/vanhoofmaarten/',
  },
  mastodon: {
    desktop: 'https://techhub.social/@mrtnvh/',
    mobile: 'https://techhub.social/@mrtnvh/',
  },
  linkedin: {
    desktop: 'https://www.linkedin.com/in/mrtnvh/',
    mobile: 'https://www.linkedin.com/in/mrtnvh/',
  },
  youtube: {
    desktop: 'https://www.youtube.com/channel/UC7kjbPgAD2QYqX3h-Cqu1nQ',
    mobile: 'https://m.youtube.com/channel/UC7kjbPgAD2QYqX3h-Cqu1nQ',
  },
  codepen: {
    desktop: 'https://codepen.io/mrtnvh',
    mobile: 'https://codepen.io/mrtnvh',
  },
};

baseTest.describe('Navigation', async () => {
  Object.entries(links).forEach(([key, to]) => {
    baseTest.describe.parallel(`Navigation to ${key}`, async () => {
      Object.entries(devices).forEach(async ([environmentName, emulationSettings]) => {
        baseTest.use({ contextOptions: { ...emulationSettings, colorScheme: 'light' } });

        baseTest(environmentName, async ({ page, baseURL }) => {
          // @ts-ignore
          const expectedUrl = to[environmentName];
          await page.goto('/');
          const $link = await page.$(`[data-testid="navigation-${key}"]`);

          if (expectedUrl.includes('http')) {
            const [popup] = await Promise.all([page.waitForEvent('popup'), $link?.click()]);
            await popup.waitForLoadState();
            const url = popup.url();

            if (expectedUrl.includes('youtube')) {
              expect(expectedUrl).toContain('youtube.com');
            } else {
              expect(removeTrailingSlash(url)).toEqual(removeTrailingSlash(expectedUrl));
            }
          } else {
            await $link?.click();
            const url = page.url();
            expect(removeTrailingSlash(url)).toEqual(removeTrailingSlash(baseURL + expectedUrl));
          }
        });
      });
    });
  });
});
