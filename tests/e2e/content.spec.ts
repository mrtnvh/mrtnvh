import { expect } from '@playwright/test';
import posthtml from 'posthtml';
import { getPages } from '../setup/config.js';
import { baseTest } from '../setup/baseTest.js';
import { customSnapshotIdentifier } from '../setup/utils.js';
import removeClass from '../setup/posthtml/removeClass.js';

// @ts-ignore
import removeAttributes from 'posthtml-remove-attributes';

baseTest.describe.skip('Content DOM snapshots', async () => {
  (await getPages())
    // .filter((link, index) => index === 0)
    .forEach((path) => {
      baseTest(path, async ({ request, baseURL }) => {
        const url = baseURL + path;
        const html = await (await request.get(url)).text();
        const [content] = html.match(/<main(.*)main>/gms) || [''];
        const { tree: sanitizedContent } = await posthtml()
          .use(
            removeClass('astro'),
            // @ts-ignore
            removeAttributes([
              'sizes',
              {
                name: 'href',
                value: /astro/,
              },
            ]),
          )
          .process(content);

        // @ts-ignore
        const match = JSON.stringify(sanitizedContent.match(), null, 2);
        expect(match).toMatchSnapshot(customSnapshotIdentifier(path, '', 'snap'));
      });
    });
});
