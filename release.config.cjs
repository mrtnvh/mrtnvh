const conventionalChangelogConfig = require('./conventionalchangelog.config.cjs');

module.exports = {
  branches: ['develop'],
  plugins: [
    // https://github.com/semantic-release/commit-analyzer/
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'conventionalcommits',
        releaseRules: [
          ...['build', 'chore', 'ci', 'docs', 'style', 'refactor', 'perf', 'test'].map((type) => ({
            type,
            release: 'patch',
          })),
        ],
      },
    ],
    // https://github.com/semantic-release/release-notes-generator
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'conventionalcommits',
        presetConfig: {
          types: conventionalChangelogConfig.options.preset.types,
        },
      },
    ],
  ],
};
