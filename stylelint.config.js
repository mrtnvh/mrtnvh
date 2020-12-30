module.exports = {
  extends: [
    "@wemake-services/stylelint-config-scss",
    "stylelint-config-prettier",
  ],
  plugins: ["stylelint-order"],
  rules: {
    "scss/media-feature-value-dollar-variable": null,
  },
};
