import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import { includeIgnoreFile } from '@eslint/compat';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const gitignorePath = path.resolve(dirname, '.gitignore');
const compat = new FlatCompat({
  baseDirectory: dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  includeIgnoreFile(gitignorePath),
  {
    ignores: ['**/*.json'],
  },
  ...compat.extends('airbnb-base', 'plugin:prettier/recommended'),
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'no-console': 'off',
      'no-debugger': 'off',
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
  },
  {
    files: ['**/*.*'],
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
];
