import { dirname } from 'path';
import { fileURLToPath } from 'url';
// import { port as defaultPort } from './config.js';

export const removeTrailingSlash = (url: string) => (url.endsWith('/') ? url.slice(0, url.length - 1) : url);

// export const getUrl = (p: string, port = defaultPort) => (process.env.CI_BASEURL || `http://localhost:${port}`) + p;

export const customSnapshotIdentifier = (path: string, environmentName: string, extension: string) =>
  `pages${path === '/' ? '-index' : removeTrailingSlash(path).split('/').join('-')}-${environmentName}.${extension}`;

export const getFilename = fileURLToPath;
export const getDirname = (path: string) => dirname(getFilename(path));
