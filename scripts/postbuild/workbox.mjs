import workboxBuild from "workbox-build";

import { BUILD_DIRECTORY } from "./_utils.mjs";

export default () =>
	workboxBuild.generateSW({
		globDirectory: BUILD_DIRECTORY,
		globPatterns: ["**/*.{html,json,js,css}"],
		swDest: "dist/sw.js",
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
