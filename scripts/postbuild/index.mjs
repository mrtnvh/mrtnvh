import sitemap from './sitemap.mjs';
import favicons from './favicons.mjs';
import hash from './hash.mjs';
import workbox from './workbox.mjs';
import html from './html.mjs';

(async () => {
  console.log('[SITEMAP]', 'Start');
  await sitemap();
  console.log('[SITEMAP]', 'Completed');

  console.log('[FAVICONS]', 'Start');
  await favicons();
  console.log('[FAVICONS]', 'Completed');

  console.log('[WORKBOX]', 'Start');
  await workbox();
  console.log('[WORKBOX]', 'Completed');

  console.log('[HTML]', 'Start');
  await html();
  console.log('[HTML]', 'Completed');

  console.log('[HASH]', 'Start');
  const { hashedAndOriginalFilePaths, alteredFiles } = await hash();
  console.log(
    '[HASH] Completed \n       Hashed %d files, replaced in %d files',
    hashedAndOriginalFilePaths.length,
    alteredFiles.length,
  );
})();
