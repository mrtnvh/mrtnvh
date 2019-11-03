import urljoin from "url-join";
import { getOgImage } from "~/components/Image/cloudinary";
import pkg from "../../package.json";

const isBranchMaster = process.env.NOW_GITHUB_COMMIT_REF === "master";

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
	image,
	path,
}) => {
	const defaultOgImagePath = urljoin(siteUrl, "/og.png");
	const imagePath = image ? getOgImage({ src: image }) : defaultOgImagePath;
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
		link: [
			...(isBranchMaster
				? [
						{
							key: "robots",
							rel: "canonical",
							href: url,
						},
				  ]
				: []),
		],
		meta: [
			...(!isBranchMaster
				? [
						{
							key: "robots",
							name: "robots",
							content: "noindex, nofollow",
						},
				  ]
				: []),
			{
				key: "Accept-CH",
				httpEquiv: "Accept-CH",
				content: "DPR, Viewport-Width, Width",
			},
			{ key: "description", name: "description", content: description },
			{ key: "image", name: "image", content: imagePath },

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
			{ key: "og:image", property: "og:image", content: imagePath },
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
