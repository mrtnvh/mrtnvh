import posthtml from 'posthtml';
import htmlnano from 'htmlnano';
import { replaceFilesContent } from './_utils.mjs';

export default async () =>
  replaceFilesContent('**/*.html', async (content) => {
    const result = await posthtml()
      .use(htmlnano({ minifySvg: false }))
      .process(content);
    return result.html;
  });
