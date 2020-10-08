import path from "path";

export default {
	publicRuntimeConfig: {
		cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
	},
	target: "static",
	srcDir: "src",
	layoutTransition: "fade",
	css: ["normalize.css", "./assets/styles/app.css"],
	modules: ["@nuxt/content", "portal-vue/nuxt"],
	plugins: ["~/plugins/elementQuery"],
	buildModules: [
		"@nuxtjs/pwa",
		"@nuxtjs/svg",
		["@nuxtjs/eslint-module", { fix: true }],
		["@nuxtjs/stylelint-module", { fix: true }],
	],
	build: {
		extend(config, { isDev }) {
			return {
				...config,
				...(isDev && { devtool: "source-?map" }),
			};
		},
	},
	content: {
		dir: path.resolve(__dirname, "content"),
	},

	pwa: {
		meta: {
			theme_color: "#95FF00",
		},
		manifest: {
			display: "browser",
		},
		workbox: {
			runtimeCaching: [
				{
					urlPattern: "https?://res.cloudinary.com/mrtnvh/.*",
					handler: "StaleWhileRevalidate",
				},
			],
		},
	},
};
