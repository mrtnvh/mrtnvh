import posthtml from 'posthtml';
import htmlnano from 'htmlnano';
import { replaceFilesContent } from './_utils.mjs';

export default async () =>
  replaceFilesContent('index.html', async (content) => {
    const result = await posthtml()
      .use(
        htmlnano({
          minifySvg: false,
          sortAttributesWithLists: false,
          deduplicateAttributeValues: false,
        }),
      )
      .process(content);
    return result.html;
  });
