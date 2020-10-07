/* eslint-disable import/no-extraneous-dependencies, global-require */
module.exports = {
	plugins: [
		require("postcss-import"),
		require("postcss-nested"),
		require("postcss-url"),
		require("autoprefixer")({
			cascade: false,
		}),
		require("postcss-preset-env")({
			stage: 0,
		}),
		require("cssnano")({
			preset: "default",
			discardComments: { removeAll: true },
			zindex: false,
		}),
	],
};
