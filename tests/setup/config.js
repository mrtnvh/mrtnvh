const puppeteer = require("puppeteer");

module.exports = {
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
