import { test, expect } from '@playwright/test';
import { preview } from 'vite';
import getPort from 'get-port';
import { devices } from '../setup/config.mjs';
import { getUrl, removeTrailingSlash } from '../setup/utils.mjs';

const links = {
  home: {
    desktop: '/',
    mobile: '/',
  },
  publications: {
    desktop: '/publications',
    mobile: '/publications',
  },
  talks: {
    desktop: '/talks',
    mobile: '/talks',
  },
  about: {
    desktop: '/about',
    mobile: '/about',
  },
  github: {
    desktop: 'https://github.com/vanhoofmaarten/',
    mobile: 'https://github.com/vanhoofmaarten/',
  },
  twitter: {
    desktop: 'https://twitter.com/mrtnvh/',
    mobile: 'https://mobile.twitter.com/mrtnvh/',
  },
  linkedin: {
    desktop: 'https://www.linkedin.com/in/mrtnvh/',
    mobile: 'https://www.linkedin.com/in/mrtnvh/',
  },
  youtube: {
    desktop: 'https://www.youtube.com/channel/UC7kjbPgAD2QYqX3h-Cqu1nQ',
    mobile: 'https://m.youtube.com/channel/UC7kjbPgAD2QYqX3h-Cqu1nQ',
  },
};

test.describe('Navigation', async () => {
  let port;
  let server;
  let context;
  let page;

  test.beforeAll(async () => {
    port = await getPort();
    server = await preview({ preview: { port } });
  });

  test.afterAll(async () => {
    await server.httpServer.close();
  });

  Object.entries(links).forEach(([key, to]) => {
    test.describe.parallel(`Navigation to ${key}`, async () => {
      Object.entries(devices).forEach(async ([environmentName, emulationSettings]) => {
        test(environmentName, async ({ browser }) => {
          const expectedUrl = to[environmentName];
          context = await browser.newContext({ ...emulationSettings });
          page = await context.newPage();

          await page.goto(getUrl('/', port));
          const $link = await page.$(`[data-testid="navigation-${key}"]`);

          if (expectedUrl.includes('http')) {
            const [popup] = await Promise.all([page.waitForEvent('popup'), $link.click()]);
            await popup.waitForLoadState();
            const url = await popup.url();

            if (expectedUrl.includes('youtube')) {
              expect(expectedUrl).toContain('youtube.com');
            } else {
              expect(removeTrailingSlash(url)).toEqual(removeTrailingSlash(expectedUrl));
            }
          } else {
            await $link.click();
            const url = await page.url();
            expect(removeTrailingSlash(url)).toEqual(removeTrailingSlash(getUrl(expectedUrl, port)));
          }

          await page.close();
          await context.close();
        });
      });
    });
  });
});
