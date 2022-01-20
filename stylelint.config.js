module.exports = {
  extends: ['@wemake-services/stylelint-config-scss', 'stylelint-config-prettier'],
  rules: {
    'scss/at-function-named-arguments': null,
    'scss/media-feature-value-dollar-variable': null,
    'scale-unlimited/declaration-strict-value': null,
    'csstree/validator': {
      ignoreAtrules: ['custom-selector'],
    },
  },
  overrides: [
    {
      files: ['.astro'].flatMap((ext) => [`*${ext}`, `**/*${ext}`]),
      customSyntax: 'postcss-html',
    },
  ],
};
