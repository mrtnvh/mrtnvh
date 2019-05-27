// const merge = require("webpack-merge");
const pkg = require("./package.json");
const postcssConfig = require("./postcss.config");
const svgoConfig = require("./.svgo");

module.exports = {
	siteName: pkg.name,
	siteUrl: pkg.homepage,
	siteDescription: pkg.description,

	titleTemplate: "%s - Maarten Van Hoof",

	css: {
		loaderOptions: {
			postcss: postcssConfig,
		},
	},

	transformers: {
		remark: {
			externalLinksTarget: "_blank",
			externalLinksRel: ["nofollow", "noopener", "noreferrer"],
			anchorClassName: "icon icon-link",
			plugins: [
				// ...global plugins
			],
		},
	},

	plugins: [
		{
			use: `gridsome-plugin-netlify-cms`,
			options: {
				modulePath: `src/admin/index.js`,
			},
		},
		{
			use: "@gridsome/source-filesystem",
			options: {
				path: "project/**/*.md",
				typeName: "Project",
				remark: {
					plugins: [
						// ...local plugins
					],
				},
			},
		},
	],

	// configureWebpack(config) {
	// 	const newConfig = {
	// 		module: {
	// 			rules: [
	// 				{
	// 					test: /\.svg$/,
	// 					use: [
	// 						"vue-loader",
	// 						{
	// 							loader: "svg-to-vue-component/loader",
	// 						},
	// 					],
	// 				},
	// 			],
	// 		},
	// 	};

	// 	return merge(newConfig, config);
	// },

	chainWebpack: config => {
		// Only convert .svg files that are imported by these files as Vue component
		const FILE_RE = /\.(vue|js|ts|svg)$/;

		// Use vue-cli's default rule for svg in non .vue .js .ts files
		config.module.rule("svg").issuer(file => !FILE_RE.test(file));

		// Use our loader to handle svg imported by other files
		config.module
			.rule("svg-component")
			.test(/\.svg$/)
			.issuer(file => FILE_RE.test(file))
			.use("vue")
			.loader("vue-loader")
			.end()
			.use("svg-to-vue-component")
			.loader("svg-to-vue-component/loader")
			.options({ svgoConfig: svgoConfig });
	},
};
