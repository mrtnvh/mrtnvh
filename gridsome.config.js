// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const pkg = require("./package.json");

module.exports = {
	siteName: pkg.name,
	siteUrl: pkg.homepage,
	siteDescription: pkg.description,

	titleTemplate: "%s - Maarten Van Hoof",

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
};
