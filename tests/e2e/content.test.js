const parser = require("fast-xml-parser");
const { getPages } = require("../setup/config");
const { getUrl } = require("../setup/utils");

// eslint-disable-next-line jest/no-disabled-tests
describe("Content DOM snapshots", () => {
	test.each(getPages())("%s", async (path) => {
		await page.goto(getUrl(path));
		await page.waitForTimeout(500);
		const content = await page.$eval("main", (el) => el.innerHTML);
		const sanitizedContent = parser.parse(content, {
			ignoreAttributes: false,
			attrValueProcessor: (val, attrName) => {
				switch (attrName) {
					// Remove Astro scoped classes
					case "class":
						return val
							.split(" ")
							.filter(
								(classEntry) => !classEntry.startsWith("astro"),
							)
							.join(" ");

					// Remove dynamically set sizes
					case "sizes":
						return "1px";
					default:
						return val;
				}
			},
			tagValueProcessor: (val, tagName) => {
				switch (tagName) {
					// Remove dynamic Astro tags
					case "link":
						return null;
					default:
						return val;
				}
			},
		});
		// const sanitizedContent = content.replace(/data-v-.*=""\s?/gm, "");
		expect(sanitizedContent).toMatchSnapshot();
	});
});
