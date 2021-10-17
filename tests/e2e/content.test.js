const posthtml = require("posthtml");
const removeTags = require("posthtml-remove-tags");
const { getPages } = require("../setup/config");
const { getUrl } = require("../setup/utils");

describe("Content DOM snapshots", () => {
	test.each(getPages())(
		"%s",
		async (path) => {
			await page.goto(getUrl(path));
			await page.waitForTimeout(2000);
			const content = await page.$eval("main", (el) => el.innerHTML);

			const { tree: sanitizedContent } = await posthtml()
				.use(removeTags({ tags: ["link"] }))
				.process(content);
			await expect(sanitizedContent).toMatchSnapshot();
		},
		10 * 1000,
	);
});
