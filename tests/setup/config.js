const parser = require("fast-xml-parser");
const fs = require("fs");
const puppeteer = require("puppeteer");

const sitemap = fs.readFileSync(`${process.cwd()}/dist/sitemap.xml`, "utf-8");
const sitemapJson = parser.parse(sitemap);
const pages = sitemapJson.urlset.url.map(({ loc }) => {
	const url = new URL(loc);
	return url.pathname;
});

module.exports = {
	pages,
	browserTimeout: 30 * 1000,
	port: 3001,
	devices: {
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
	},
};
