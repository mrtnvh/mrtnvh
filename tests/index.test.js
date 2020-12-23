const parser = require("fast-xml-parser");
const fs = require("fs");
const puppeteer = require("puppeteer");

const port = 3001;
const getUrl = (p) => `http://localhost:${port}${p}`;
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

const devices = {
	mobile: puppeteer.devices["iPhone X"],
	desktop: {
		viewport: {
			width: 1440,
			height: 900,
			deviceScaleFactor: 2,
			isLandscape: true,
		},
		userAgent:
			"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:85.0) Gecko/20100101 Firefox/85.0",
	},
};

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
