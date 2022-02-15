module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 'latest',
  },
  env: {
    browser: true,
    node: true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'import/no-named-default': 0,
    'import/no-unresolved': [
      'error',
      {
        ignore: ['.svg'],
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        mjs: 'always',
        jsx: 'never',
      },
    ],
  },
  overrides: [
    {
      files: ['*.*'],
      rules: {
        'import/no-extraneous-dependencies': 0,
      },
    },
    {
      files: ['src/**/*.*', 'scripts/**/*.*'],
      rules: {
        'import/extensions': 0,
      },
    },
  ],
};
