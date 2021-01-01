const lighthouse = require("lighthouse");
const lighthouseMobileConfig = require("lighthouse/lighthouse-core/config/lr-mobile-config");
const lighthouseDesktopConfig = require("lighthouse/lighthouse-core/config/lr-mobile-config");

const { pages } = require("./setup/config");
const { getUrl } = require("./setup/utils");

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

				const scores = Object.entries(
					lhr.categories,
				).map(([name, { score }]) => [name, score]);

				scores.forEach(([name, score]) => {
					expect(score, name).toBeGreaterThan(0.7);
				});
			},
			20 * 1000,
		);
	});
});
