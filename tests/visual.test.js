const { devices, pages } = require("./setup/config");
const { getUrl } = require("./setup/utils");

const customSnapshotIdentifier = (path, environmentName) =>
  `pages${
    path === "/" ? "-index" : path.split("/").join("-")
  }-${environmentName}`;

beforeEach(async () => {
  await jestPuppeteer.resetBrowser();
});

describe.each(pages)("%s", (path) => {
  describe("Visual snapshots", () => {
    test.each(Object.entries(devices))(
      "%s",
      async (environmentName, emulationSettings) => {
        const page = await browser.newPage();
        // Emulate device
        await page.emulate(emulationSettings);
        // Ensure light mode
        await page.emulateMediaFeatures([
          { name: "prefers-color-scheme", value: "light" },
        ]);
        await page.goto(getUrl(path));
        await page.waitForFunction("!!window.$nuxt");

        await page.waitForTimeout(500);

        const image = await page.screenshot({ fullPage: true });
        expect(image).toMatchImageSnapshot({
          comparisonMethod: "ssim",
          failureThreshold: 0.1,
          failureThresholdType: "percent",
          customSnapshotIdentifier: customSnapshotIdentifier(
            path,
            environmentName,
          ),
          allowSizeMismatch: true,
        });
      },
      20 * 1000,
    );
  });
});
