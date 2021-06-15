const lighthouse = require("lighthouse");
const lighthouseMobileConfig = require("lighthouse/lighthouse-core/config/lr-mobile-config");
const lighthouseDesktopConfig = require("lighthouse/lighthouse-core/config/lr-mobile-config");

const { pages } = require("../setup/config");
const { getUrl } = require("../setup/utils");

const ligthouseConfigs = {
	mobile: lighthouseMobileConfig,
	desktop: lighthouseDesktopConfig,
};

jest.retryTimes(3);

describe("Lighthouse", () => {
	describe.each(pages)("%s", (path) => {
		beforeEach(async () => {
			await jestPuppeteer.resetPage();
		});

		test.each(Object.entries(ligthouseConfigs))(
			"%s",
			async (environmentName, environmentConfig) => {
				const { lhr } = await lighthouse(
					getUrl(path),
					{
						port: new URL(browser.wsEndpoint()).port,
						output: "json",
					},
					environmentConfig,
				);

				const scores = Object.values(lhr.categories).map(
					({ title, score }) => ({
						title,
						score,
					}),
				);

				scores.forEach(({ title, score }) => {
					expect(score, title).toBeGreaterThanOrEqual(0.65);
				});
			},
			60 * 1000,
		);
	});
});
