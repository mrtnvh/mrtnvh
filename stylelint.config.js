module.exports = {
    extends: ["stylelint-config-shopify", "stylelint-config-prettier"],
    plugins: ["stylelint-order"],
    rules: {
        indentation: 4,
        "string-quotes": "double",
        "color-no-hex": null,
    },
    ignoreAtRules: ["tailwind", "apply", "responsive", "variants", "screen"],
};
