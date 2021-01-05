/* eslint-disable jest/no-conditional-expect */
const {
  getDocument,
  queries: { getByTestId },
} = require("pptr-testing-library");
const { devices } = require("./setup/config");
const { getUrl } = require("./setup/utils");

const links = {
  home: "/",
  projects: "/projects/",
  talks: "/talks/",
  about: "/about/",
  github: "https://github.com/vanhoofmaarten/",
  twitter: "https://twitter.com/mrtnvh/",
  linkedin: "https://www.linkedin.com/in/mrtnvh/",
};

jest.retryTimes(3);

describe("Navigation", () => {
  beforeEach(async () => {
    await page.goto(getUrl("/"));
  });

  describe.each(Object.entries(links))("Navigate to %s", (key, to) => {
    test.each(Object.entries(devices))(
      "%s",
      async (environmentName, emulationSettings) => {
        await page.emulate(emulationSettings);
        let $root = await getDocument(page);

        if (environmentName === "mobile") {
          const $toggle = await getByTestId($root, `offcanvasmenu-toggle`);
          await $toggle.click();
          $root = await getByTestId($root, `offcanvasmenu`);
          await page.waitForTimeout(500);
        }

        const $link = await getByTestId($root, `navigation-${key}`);
        await $link.click();

        if (to.includes("http")) {
          await page.waitForTimeout(1000);
          const tabs = await browser.pages();
          const latestTabIndex = tabs.length - 1;
          const url = await tabs[latestTabIndex].url();

          if (url.includes("linkedin")) {
            expect(new URL(url).hostname).toEqual(new URL(to).hostname);
          } else {
            expect(url).toEqual(to);
          }
        } else {
          await page.waitForTimeout(300);
          const url = await page.url();
          expect(url).toEqual(getUrl(to));
        }
      },
    );
  });
});
