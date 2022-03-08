import crypto from 'crypto';
import fs from 'fs-extra';
import { globby } from 'globby';
import { extname, basename } from 'path';

import { BUILD_DIRECTORY, replaceFilesContent } from './_utils.mjs';

const FILES_TO_EXCLUDE = [
  'robots.txt',
  'sitemap.xml',
  '.html',
  '.css',
  '.js',
  '.woff',
  '.woff2',
  '/_astro/',
  'stats.js',
  'workbox',
];

const FILES_TO_INCLUDE = ['sw.js'];

const createHashFromFilePath = (filePath, { hashLength, hashAlgorithm } = {}) =>
  new Promise((resolve) => {
    const hash = crypto.createHash(hashAlgorithm || 'md5');
    const substr = (value) => (hashLength ? value.substring(0, hashLength) : value);
    fs.createReadStream(filePath)
      .on('data', (data) => hash.update(data))
      .on('end', () => resolve(substr(hash.digest('hex'))));
  });

const getFilePathsToHash = async () => {
  const filePaths = await globby(`${BUILD_DIRECTORY}/**/*.*`);
  const filteredFilePaths = filePaths.filter((path) => {
    if (FILES_TO_INCLUDE.some((inclusion) => path.includes(inclusion))) {
      return true;
    }
    return !FILES_TO_EXCLUDE.some((exclusion) => path.includes(exclusion));
  });
  const hashedAndOriginalFilePaths = await Promise.all(
    filteredFilePaths.map(async (filteredPath) => {
      const hash = await createHashFromFilePath(filteredPath, {
        hashLength: 8,
      });
      const extension = extname(filteredPath);
      const [pathWithoutExtension] = filteredPath.split(extension);

      return {
        original: filteredPath,
        hashed: `${pathWithoutExtension}.${hash}${extension}`,
      };
    }),
  );
  return hashedAndOriginalFilePaths;
};

const renameFiles = (hashedAndOriginalFilePaths) =>
  Promise.all(hashedAndOriginalFilePaths.map(({ original, hashed }) => fs.move(original, hashed, { overwrite: true })));

const replaceReferences = (hashedAndOriginalFilePaths) =>
  replaceFilesContent('**/*.!(png|jpg|ico)', async (content) =>
    hashedAndOriginalFilePaths.reduce((acc, { original, hashed }) => {
      const originalBasename = basename(original);
      const hashedBasename = basename(hashed);
      if (acc.includes(originalBasename)) {
        return acc.replaceAll(originalBasename, hashedBasename);
      }
      return acc;
    }, content),
  );

export default async () => {
  const hashedAndOriginalFilePaths = await getFilePathsToHash();
  const { files: alteredFiles } = await replaceReferences(hashedAndOriginalFilePaths);
  await renameFiles(hashedAndOriginalFilePaths);

  return {
    hashedAndOriginalFilePaths,
    alteredFiles,
  };
};
