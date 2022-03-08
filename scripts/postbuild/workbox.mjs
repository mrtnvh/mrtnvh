import { resolve } from 'path';
import workboxBuild from 'workbox-build';
import fs from 'fs-extra';
import { BUILD_DIRECTORY, getDirname } from './_utils.mjs';

export default async () => {
  const pkg = await fs.readJSON(resolve(getDirname(import.meta.url), '../../package.json'));
  return workboxBuild.generateSW({
    cacheId: pkg.version,
    globDirectory: BUILD_DIRECTORY,
    globPatterns: ['**/*.{html,json,js,css}'],
    globIgnores: ['**/stats.js'],
    swDest: 'dist/sw.js',
    sourcemap: false,
    cleanupOutdatedCaches: true,
    runtimeCaching: [
      {
        urlPattern: 'https?://res.cloudinary.com/mrtnvh/.*',
        handler: 'StaleWhileRevalidate',
      },
      {
        urlPattern: 'https?://rsms.me/inter/.*',
        handler: 'StaleWhileRevalidate',
      },
    ],
  });
};
