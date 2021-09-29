const { devices, getPages } = require("../setup/config");
const { getUrl, customSnapshotIdentifier } = require("../setup/utils");

beforeEach(async () => {
	await jestPuppeteer.resetBrowser();
});

describe.each(getPages())("%s", (path) => {
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
				await page.waitForSelector('img:not([sizes="1px"])');
				await page.waitForTimeout(500);

				const body = await page.$("body");
				const image = await body.screenshot();
				expect(image).toMatchImageSnapshot({
					comparisonMethod: "ssim",
					customDiffConfig: {
						ssim: "original",
					},
					failureThreshold: 0.1,
					failureThresholdType: "percent",
					customSnapshotIdentifier: customSnapshotIdentifier(
						path,
						environmentName,
					),
					allowSizeMismatch: true,
				});
			},
			25 * 1000,
		);
	});
});
