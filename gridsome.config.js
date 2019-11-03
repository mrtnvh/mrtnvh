// const merge = require("webpack-merge");
const pkg = require("./package.json");
const postcssConfig = require("./postcss.config");
const svgoConfig = require("./.svgo");

const isProd = process.env.NODE_ENV === "production";

module.exports = {
	siteName: pkg.name,
	siteUrl: pkg.homepage,
	siteDescription: pkg.description,
	icon: "./src/favicon.png",

	css: {
		loaderOptions: {
			postcss: postcssConfig,
		},
	},

	templates: {
		Project: "/projects/:title",
		Folio: "/:title",
	},

	plugins: [
		{
			use: "@gridsome/source-filesystem",
			options: {
				path: "content/project/**/*.md",
				typeName: "Project",
			},
		},
		{
			use: "@gridsome/source-filesystem",
			options: {
				path: "content/pages/**/*.md",
				typeName: "Folio",
			},
		},
		...(isProd
			? [
					{
						use: "gridsome-plugin-gtm",
						options: {
							id: "GTM-NFXGVVV",
							enabled: true,
							debug: true,
						},
					},
			  ]
			: []),
		{
			use: "gridsome-plugin-pwa",
			options: {
				title: "Maarten Van Hoof",
				startUrl: "/",
				display: "standalone",
				statusBarStyle: "default",
				manifestPath: "manifest.json",
				serviceWorkerPath: "service-worker.js",
				shortName: "mrtnvh",
				themeColor: "#95ff00",
				backgroundColor: "#ffffff",
				icon: "./src/favicon.png",
			},
		},
	],

	transformers: {
		remark: {
			externalLinksTarget: "_blank",
			externalLinksRel: ["nofollow", "noopener", "noreferrer"],
			anchorClassName: "icon icon-link",
		},
	},

	chainWebpack: config => {
		const FILE_RE = /\.(vue|js|ts|svg)$/;

		config.module
			.rule("svg")
			.issuer(file => !FILE_RE.test(file))
			.oneOf("svg");

		config.module
			.rule("svg-component")
			.test(/\.svg$/)
			.issuer(file => FILE_RE.test(file))
			.oneOf("ignore")
			.resourceQuery(/\?ignore/)
			.use("file-loader")
			.loader("file-loader")
			.end()
			.end()
			.oneOf("normal")
			.use("vue")
			.loader("vue-loader")
			.end()
			.use("svg-to-vue-component")
			.loader("svg-to-vue-component/loader")
			.options({ svgoConfig });
	},
};
