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
				await page.goto(getUrl(path));

				const bodyWidth = await page.evaluate(
					() => document.body.scrollWidth,
				);
				const bodyHeight = await page.evaluate(
					() => document.body.scrollHeight,
				);
				await page.setViewport({
					width: bodyWidth,
					height: bodyHeight,
				});

				const image = await page.screenshot();
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
