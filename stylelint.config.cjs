module.exports = {
  extends: ['@wemake-services/stylelint-config-scss', 'stylelint-config-prettier'],
  rules: {
    'scss/at-function-named-arguments': null,
    'scss/media-feature-value-dollar-variable': null,
    'scale-unlimited/declaration-strict-value': null,
    'plugin/stylelint-no-indistinguishable-colors': null,
    'csstree/validator': {
      syntaxExtensions: ['sass'],
      ignoreAtrules: ['else', 'container', 'nest'],
      ignoreProperties: ['container', 'container-type', 'container-name', 'text-wrap'],
      ignoreValue: 'clamp',
    },
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
    'custom-property-pattern': null,
    'scss/at-import-no-partial-leading-underscore': null,
  },
  overrides: [
    {
      files: ['.astro'].flatMap((ext) => [`*${ext}`, `**/*${ext}`]),
      customSyntax: 'postcss-html',
    },
  ],
};
