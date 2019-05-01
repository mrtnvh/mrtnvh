module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    parser: "vue-eslint-parser",
    extends: ["airbnb-base", "plugin:vue/recommended", "@vue/prettier"],
    plugins: ["prettier", "vue", "gridsome"],
    rules: {
        "linebreak-style": 0,
        "max-len": 0,
        "no-tabs": 0,
        camelcase: 0,
        "gridsome/format-query-block": "error",
        "prettier/prettier": "error",
        // "vue/html-indent": [
        //     "error",
        //     4,
        //     {
        //         attribute: 1,
        //         closeBracket: 0,
        //         alignAttributesVertically: true,
        //         ignores: [],
        //     },
        // ],
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    },
    globals: {},
};
