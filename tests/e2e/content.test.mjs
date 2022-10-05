import { test, expect } from '@playwright/test';
import { preview } from 'vite';
import getPort from 'get-port';
import posthtml from 'posthtml';
import removeAttributes from 'posthtml-remove-attributes';
import { getPages } from '../setup/config.mjs';
import { getUrl, customSnapshotIdentifier } from '../setup/utils.mjs';
import removeClass from '../setup/posthtml/removeClass.mjs';

test.describe.skip('Content DOM snapshots', async () => {
  let port;
  let server;

  test.beforeAll(async () => {
    port = await getPort();
    server = await preview({ preview: { port } });
  });

  test.afterAll(async () => {
    await server.httpServer.close();
  });

  getPages()
    // .filter((link, index) => index === 0)
    .forEach((path) => {
      test(path, async ({ request }) => {
        const url = getUrl(path, port);
        const html = await (await request.get(url)).text();
        const [content] = html.match(/<main(.*)main>/gms);
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

        const match = JSON.stringify(sanitizedContent.match(), null, 2);
        await expect(match).toMatchSnapshot(customSnapshotIdentifier(path, '', 'snap'));
      });
    });
});
