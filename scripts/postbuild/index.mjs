import criticalCss from './critical-css.mjs';
import purgeCss from './purge-css.mjs';
import sitemap from './sitemap.mjs';
import favicons from './favicons.mjs';
import hash from './hash.mjs';
import workbox from './workbox.mjs';
// import html from './html.mjs';

(async () => {
  console.log('[SITEMAP]', 'Start');
  await sitemap();
  console.log('[SITEMAP]', 'Completed');

  console.log('[FAVICONS]', 'Start');
  await favicons();
  console.log('[FAVICONS]', 'Completed');

  console.log('[PURGE CSS]', 'Start');
  await purgeCss();
  console.log('[PURGE CSS]', 'Completed');

  console.log('[CRITICAL CSS]', 'Start');
  await criticalCss();
  console.log('[CRITICAL CSS]', 'Completed');

  console.log('[WORKBOX]', 'Start');
  await workbox();
  console.log('[WORKBOX]', 'Completed');

  console.log('[HTML]', 'Start');
  // await html();
  console.log('[HTML]', 'Completed');

  console.log('[HASH]', 'Start');
  const { hashedAndOriginalFilePaths, alteredFiles } = await hash();
  console.log(
    '[HASH] Completed \n       Hashed %d files, replaced in %d files',
    hashedAndOriginalFilePaths.length,
    alteredFiles.length,
  );
})();
