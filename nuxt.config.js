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
};
