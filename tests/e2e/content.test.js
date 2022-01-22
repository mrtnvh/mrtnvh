const fetch = require('node-fetch');
const posthtml = require('posthtml');
const removeAttributes = require('posthtml-remove-attributes');
const { getPages } = require('../setup/config');
const { getUrl } = require('../setup/utils');
const { removeClass } = require('../setup/posthtml/removeClass');

describe('Content DOM snapshots', () => {
  test.each(getPages())(
    '%s',
    async (path) => {
      const html = await fetch(getUrl(path)).then((res) => res.text());
      const [content] = html.match(/<main(.*)main>/gm);
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
      // expect(true).toBe(true);
      await expect(sanitizedContent.match()).toMatchSnapshot();
    },
    10 * 1000,
  );
});
