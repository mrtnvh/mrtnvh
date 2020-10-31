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

describe("Visual regression", () => {
	test.each(pages)("snapshot %s", async (path) => {
		await page.setCacheEnabled(false);
		await page.goto(getUrl(path));
		const image = await page.screenshot({ fullPage: true });
		expect(image).toMatchImageSnapshot({
			failureThresholdType: "percent",
			failureThreshold: 1,
			customSnapshotIdentifier: customSnapshotIdentifier(path),
		});
	});
});
