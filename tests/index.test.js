const parser = require("fast-xml-parser");
const fs = require("fs");

const port = 3001;
const getUrl = (p) => `http://localhost:${port}${p}`;
const sitemap = fs.readFileSync(`${process.cwd()}/dist/sitemap.xml`, "utf-8");
const sitemapJson = parser.parse(sitemap);
const pages = sitemapJson.urlset.url.map(({ loc }) => {
	const url = new URL(loc);
	return url.pathname;
});
const customSnapshotIdentifier = (path) => `pages${path.split("/").join("-")}`;

describe("Snapshots", () => {
	beforeEach(async () => {
		await jestPuppeteer.resetBrowser();
	});

	describe.each(pages)("%s", (path) => {
		test(
			"visual",
			async () => {
				const page = await browser.newPage();
				await page.goto(getUrl(path));
				await page.waitForFunction("!!window.$nuxt");

				await page.waitForTimeout(500);

				const image = await page.screenshot({ fullPage: true });
				expect(image).toMatchImageSnapshot({
					comparisonMethod: "ssim",
					failureThreshold: 0.1,
					failureThresholdType: "percent",
					customSnapshotIdentifier: customSnapshotIdentifier(path),
					allowSizeMismatch: true,
				});
			},
			20 * 1000,
		);
	});
});
