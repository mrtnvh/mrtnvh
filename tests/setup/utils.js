const { port } = require('./config');

const removeTrailingSlash = (url) => (url.endsWith('/') ? url.slice(0, url.length - 1) : url);

const getUrl = (p) => (process.env.CI_BASEURL || `http://localhost:${port}`) + p;

const customSnapshotIdentifier = (path, environmentName) =>
  `pages${path === '/' ? '-index' : removeTrailingSlash(path).split('/').join('-')}-${environmentName}`;

exports.removeTrailingSlash = removeTrailingSlash;
exports.customSnapshotIdentifier = customSnapshotIdentifier;
exports.getUrl = getUrl;
