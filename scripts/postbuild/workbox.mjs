import workboxBuild from "workbox-build";

import { BUILD_DIRECTORY } from "./_utils.mjs";

export default () =>
	workboxBuild.generateSW({
		globDirectory: BUILD_DIRECTORY,
		globPatterns: ["**/*.{html,json,js,css}"],
		globIgnores: ["**/stats.js"],
		swDest: "dist/sw.js",
		sourcemap: false,
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
	});
