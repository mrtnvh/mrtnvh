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
  ],
};
