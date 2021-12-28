module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
		es6: true,
	},
	extends: ["airbnb-base", "plugin:prettier/recommended"],
	rules: {
		"no-console": process.env.NODE_ENV === "production" ? "error" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
		"import/no-named-default": 0,
		"import/no-unresolved": [
			"error",
			{
				ignore: [".svg"],
			},
		],
	},
	overrides: [
		{
			files: ["*.*"],
			rules: {
				"import/no-extraneous-dependencies": 0,
			},
		},
		{
			files: ["src/js/**/*.*", "scripts/**/*.*"],
			rules: {
				"import/extensions": 0,
			},
		},
		{
			files: ["tests/**/*.*"],
			extends: ["plugin:jest/recommended"],
			globals: {
				page: true,
				browser: true,
				context: true,
				jestPuppeteer: true,
			},
			rules: {
				"jest/valid-expect": 0,
			},
		},
	],
};
