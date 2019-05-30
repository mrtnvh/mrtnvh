/* eslint-disable global-require, import/no-extraneous-dependencies */

module.exports = {
	plugins: [
		require("postcss-import"),
		// require("postcss-media-variables"),
		require("postcss-nested"),
		require("postcss-url"),
		require("autoprefixer")({
			cascade: false,
		}),
		require("postcss-preset-env")({
			stage: 0,
		}),
		// require("postcss-media-variables"),
		require("cssnano")({
			preset: "default",
			discardComments: { removeAll: true },
			zindex: false,
		}),
	],
};
