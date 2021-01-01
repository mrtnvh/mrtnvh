module.exports = {
  extends: [
    "@wemake-services/stylelint-config-scss",
    "stylelint-config-prettier",
  ],
  plugins: ["stylelint-order"],
  rules: {
    "scss/media-feature-value-dollar-variable": null,
    "plugin/no-low-performance-animation-properties": [
      true,
      {
        ignoreProperties: ["color"],
      },
    ],
  },
};
