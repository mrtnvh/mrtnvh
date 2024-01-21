import { expect } from '@playwright/test';
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
    desktop: 'https://github.com/mrtnvh/',
    mobile: 'https://github.com/mrtnvh/',
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
    baseTest(`Can navigate to ${key}`, async ({ page, baseURL }, workerInfo) => {
      // @ts-ignore
      const expectedUrl = to[workerInfo.project.name];
      await page.goto('/');
      const $link = await page.$(`[data-testid="navigation-${key}"]`);

      if (expectedUrl.includes('http')) {
        const [popup] = await Promise.all([page.waitForEvent('popup'), $link?.click()]);
        await popup.waitForLoadState();
        const url = popup.url();

        if (expectedUrl.includes('youtube')) {
          expect(expectedUrl).toContain('youtube.com');
        } else {
          expect(removeTrailingSlash(url)).toContain(removeTrailingSlash(expectedUrl));
        }
      } else {
        await $link?.click();
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(500);
        const url = page.url();
        expect(removeTrailingSlash(url)).toEqual(removeTrailingSlash(baseURL + expectedUrl));
      }
    });
  });
});
