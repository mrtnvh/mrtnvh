module.exports = {
	plugins: {
		"postcss-import": {},
		"postcss-nested": {},
		"postcss-custom-selectors": {},
		cssnano: {
			preset: "default",
			discardComments: { removeAll: true },
			zindex: false,
		},
	},
};
