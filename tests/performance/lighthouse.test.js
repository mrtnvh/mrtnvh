const fs = require("fs-extra");
const lighthouse = require("lighthouse");
const lighthouseMobileConfig = require("lighthouse/lighthouse-core/config/lr-mobile-config");
const lighthouseDesktopConfig = require("lighthouse/lighthouse-core/config/lr-mobile-config");

const threshold = 0.8;

const { getPages } = require("../setup/config");
const { getUrl, customSnapshotIdentifier } = require("../setup/utils");

const ligthouseConfigs = {
	mobile: lighthouseMobileConfig,
	desktop: lighthouseDesktopConfig,
};

describe("Lighthouse", () => {
	describe.each(getPages())("%s", (path) => {
		beforeEach(async () => {
			await jestPuppeteer.resetPage();
		});

		test.each(Object.entries(ligthouseConfigs))(
			"%s",
			async (environmentName, environmentConfig) => {
				const { lhr, report } = await lighthouse(
					getUrl(path),
					{
						port: new URL(browser.wsEndpoint()).port,
						output: "html",
					},
					environmentConfig,
				);

				const reportFileName = customSnapshotIdentifier(
					path,
					environmentName,
				);

				await fs.outputFile(
					`${__dirname}/__reports__/${reportFileName}.html`,
					report,
				);

				const scores = Object.values(lhr.categories).map(
					({ title, score }) => ({
						title,
						score,
					}),
				);

				scores.forEach(({ title, score }) => {
					expect(
						score,
						`${title} score below threshold of ${threshold * 100}%`,
					).toBeGreaterThanOrEqual(threshold);
				});
			},
			60 * 1000,
		);
	});
});
