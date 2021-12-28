import { resolve, dirname } from 'path';
import Critters from 'critters';
import { replaceFilesContent } from './_utils.mjs';

export default async () =>
  replaceFilesContent('**/*.html', async (content, path) => {
    const sanitizedContent = content.replaceAll('/_astro', '/dist/_astro');
    const c = new Critters({
      path: resolve(dirname(path)),
      external: false,
      logLevel: 'warn',
    });
    const res = await c.process(sanitizedContent);
    return res.replaceAll('/dist/_astro', '/_astro');
  });
