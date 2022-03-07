import { port as defaultPort } from './config.mjs';

export const removeTrailingSlash = (url) => (url.endsWith('/') ? url.slice(0, url.length - 1) : url);

export const getUrl = (p, port = defaultPort) => (process.env.CI_BASEURL || `http://localhost:${port}`) + p;

export const customSnapshotIdentifier = (path, environmentName, extension) =>
  `pages${path === '/' ? '-index' : removeTrailingSlash(path).split('/').join('-')}-${environmentName}.${extension}`;
