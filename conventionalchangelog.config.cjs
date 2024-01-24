module.exports = {
  options: {
    preset: {
      name: 'conventionalcommits',
      types: [
        { type: 'feat', section: 'Features' },
        { type: 'fix', section: 'Bug Fixes' },
        { type: 'chore', section: 'Chores', hidden: false },
        { type: 'docs', section: 'Documentation', hidden: false },
        { type: 'style', section: 'Styles', hidden: false },
        { type: 'refactor', section: 'Refactors', hidden: false },
        { type: 'perf', section: 'Performance', hidden: false },
        { type: 'test', section: 'Tests', hidden: false },
        { type: 'ci', section: 'CI', hidden: false },
        { type: 'build', section: 'Build', hidden: false },
      ],
    },
  },
};
