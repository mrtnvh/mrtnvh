import path from "path";
import pkg from "./package.json";
import { createSitemapRoutes } from "~/lib/Sitemap";

export default {
	publicRuntimeConfig: {
		cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
	},
	target: "static",
	srcDir: "src",
	layoutTransition: "fade",
	css: ["normalize.css", "./assets/styles/app.css"],
	modules: [
		"@nuxt/content",
		"portal-vue/nuxt",
		"@nuxtjs/sitemap",
		"@nuxtjs/sentry",
	],
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

	sitemap: {
		hostname: pkg.homepage,
		gzip: true,
		routes: createSitemapRoutes,
	},
};
