module.exports = {
  branches: ['develop'],
  ci: true,
  dryRun: true,
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
          types: [
            { type: 'feat', section: 'Features' },
            { type: 'fix', section: 'Bug Fixes' },
            { type: 'chore', section: 'Chores', hidden: false },
            { type: 'docs', section: 'Documentation', hidden: false },
            { type: 'style', section: 'Styles', hidden: false },
            { type: 'refactor', section: 'Refactors', hidden: false },
            { type: 'perf', section: 'Performance', hidden: false },
            { type: 'test', section: 'Tests', hidden: false },
          ],
        },
      },
    ],
  ],
};
