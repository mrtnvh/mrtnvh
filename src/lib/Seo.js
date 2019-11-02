import urljoin from "url-join";
// import slugify from "slugify";
import pkg from "../../package.json";
import defaultOgImage from "../og.png";

export const titleDefault = "Maarten Van Hoof \\\\ Front End Developer";
const descriptionDefault =
	"Front-end developer at ISAAC in Eindhoven NL, Google Mobile Web Specialist, Open Source Contributer, Loud Noise Generator";

const titleTemplateDefault = titleChunk => {
	return titleChunk && titleChunk !== titleDefault
		? [titleChunk, titleDefault].join(" \\\\ ")
		: titleDefault;
};

export default ({
	siteUrl = pkg.homepage,
	title = titleDefault,
	titleTemplate = titleTemplateDefault,
	description = descriptionDefault,
	image: imageProp,
	path,
}) => {
	// const slugifyConfig = { lower: true };

	/* eslint-disable no-nested-ternary */
	const image = imageProp
		? imageProp.includes("http")
			? imageProp
			: urljoin(siteUrl, imageProp)
		: defaultOgImage;
	/* eslint-enable no-nested-ternary */

	const url = urljoin(siteUrl, path);

	const schemaOrg = [
		{
			"@context": "http://schema.org",
			"@type": "WebSite",
			url: siteUrl,
			name: pkg.name,
		},
	];

	return {
		title,
		titleTemplate,
		script: [
			{
				key: "schemaOrg",
				type: "application/ld+json",
				json: JSON.stringify(schemaOrg),
			},
		],
		meta: [
			{
				key: "Accept-CH",
				httpEquiv: "Accept-CH",
				content: "DPR, Viewport-Width, Width",
			},
			{ key: "description", name: "description", content: description },
			{ key: "image", name: "image", content: image },

			// Open graph
			{ key: "og:title", property: "og:title", content: title },
			{
				key: "og:description",
				property: "og:description",
				content: description,
			},
			{ key: "og:locale", property: "og:locale", content: "en_US" },
			{ key: "og:url", property: "og:url", content: url },
			{
				key: "og:site_name",
				property: "og:site_name",
				content: "mrtnvh",
			},
			{ key: "og:image", property: "og:image", content: image },
			{
				key: "og:image:width",
				property: "og:image:width",
				content: 1200,
			},
			{
				key: "og:image:height",
				property: "og:image:height",
				content: 630,
			},
			{ key: "og:image:alt", property: "og:image:alt", content: title },
			{ key: "og:type", property: "og:type", content: "article" },

			// Twitter card tags
			{
				key: "twitter:card",
				name: "twitter:card",
				content: "summary_large_image",
			},
			{
				key: "twitter:creator",
				name: "twitter:creator",
				content: "@mrtnvh",
			},
			{ key: "twitter:title", name: "twitter:title", content: title },
			{
				key: "twitter:description",
				name: "twitter:description",
				content: description,
			},
			{ key: "twitter:image", name: "twitter:image", content: image },
		],
	};
};
