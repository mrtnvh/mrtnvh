const { pages } = require("../setup/config");
const { getUrl } = require("../setup/utils");

describe("Content DOM snapshots", () => {
	test.each(pages)("%s", async (path) => {
		await page.goto(getUrl(path));
		await page.waitForFunction("!!window.$nuxt");
		await page.waitForTimeout(500);
		const content = await page.$eval("main", (el) => el.innerHTML);
		const sanitizedContent = content.replace(/data-v-.*=""\s?/gm, "");
		expect(sanitizedContent).toMatchSnapshot();
	});
});
