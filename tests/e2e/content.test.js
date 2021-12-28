const posthtml = require('posthtml');
const removeAttributes = require('posthtml-remove-attributes');
const { getPages } = require('../setup/config');
const { getUrl } = require('../setup/utils');
const { removeClass } = require('../setup/posthtml/removeClass');

describe('Content DOM snapshots', () => {
  test.each(getPages())(
    '%s',
    async (path) => {
      await page.goto(getUrl(path));
      await page.waitForTimeout(2000);
      const content = await page.$eval('main', (el) => el.innerHTML);

      const { tree: sanitizedContent } = await posthtml()
        .use(
          removeClass('astro'),
          removeAttributes([
            'sizes',
            {
              name: 'href',
              value: /astro/,
            },
          ]),
        )
        .process(content);
      await expect(sanitizedContent).toMatchSnapshot();
    },
    10 * 1000,
  );
});
