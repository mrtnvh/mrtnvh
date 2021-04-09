import path from "path";
import pkg from "./package.json";
import { createSitemapRoutes } from "./src/lib/Sitemap";

const isMaster = process.env.IS_MASTER === "true";

export default {
	env: {
		cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
	},
	target: "static",
	srcDir: "src",
	modern: true,
	pageTransition: "fade",
	modules: ["@nuxt/content", "portal-vue/nuxt", "@nuxtjs/sitemap"],
	plugins: ["~/plugins/elementQuery"],
	buildModules: [
		"@nuxt/postcss8",
		"@nuxtjs/pwa",
		"@nuxtjs/svg",
		["@nuxtjs/eslint-module", { fix: true }],
		["@nuxtjs/stylelint-module", { fix: true }],
	],
	build: {
		postcss: {
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
		},
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
				{
					urlPattern: "https?://rsms.me/inter/.*",
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
	head: {
		script: [
			...(isMaster
				? [
						{
							async: true,
							defer: true,
							"data-domain": "mrtnvh.com",
							src: "https://stats.mrtnvh.com/js/index.js",
						},
				  ]
				: []),
		],
		link: [
			{ rel: "icon", type: "image/x-icon", href: "/favicon.png" },
			{
				rel: "preload",
				href: "https://rsms.me/inter/inter.css",
				as: "style",
			},
			{
				rel: "stylesheet",
				href: "https://rsms.me/inter/inter.css",
			},
		],
	},
	css: ["normalize.css", "./assets/styles/app.css"],
};
