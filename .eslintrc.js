module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
		es6: true,
	},
	parser: "vue-eslint-parser",
	extends: [
		"airbnb-base",
		"plugin:vue/recommended",
		"plugin:nuxt/recommended",
		"plugin:prettier/recommended",
		"@vue/prettier",
	],
	// plugins: ["vue"],
	rules: {
		// camelcase: 0,
		"no-console": process.env.NODE_ENV === "production" ? "error" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
		"import/no-unresolved": [
			"error",
			{
				ignore: [".svg"],
			},
		],
	},
	globals: {},
	settings: {
		"import/core-modules": ["vue"],
		"import/resolver": {
			nuxt: {
				nuxtSrcDir: "src",
			},
		},
	},
};
