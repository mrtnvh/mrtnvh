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
		camelcase: 0,
		"gridsome/format-query-block": "error",
		"prettier/prettier": "error",
		"no-console": process.env.NODE_ENV === "production" ? "error" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
	},
	globals: {},
	settings: {
		"import/resolver": {
			nuxt: {
				nuxtSrcDir: 'src',
			},
		},
	},
};
