const parser = require("fast-xml-parser");
const fs = require("fs");
const { devices } = require("./setup/config");
const { getUrl } = require("./setup/utils");

const sitemap = fs.readFileSync(`${process.cwd()}/dist/sitemap.xml`, "utf-8");
const sitemapJson = parser.parse(sitemap);
const pages = sitemapJson.urlset.url.map(({ loc }) => {
	const url = new URL(loc);
	return url.pathname;
});
const customSnapshotIdentifier = (path, environmentName) =>
	`pages${
		path === "/" ? "-index" : path.split("/").join("-")
	}-${environmentName}`;

describe("Snapshots", () => {
	beforeEach(async () => {
		await jestPuppeteer.resetBrowser();
	});

	describe.each(pages)("%s", (path) => {
		describe("visual", () => {
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
});
