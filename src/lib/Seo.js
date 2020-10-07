import urljoin from "url-join";
import { getOgImage } from "../components/Image/cloudinary";
import pkg from "../../package.json";

const isBranchMaster = process.env.IS_MASTER === "true";

export const titleDefault = "Maarten Van Hoof \\\\ Front End Developer";

const descriptionDefault =
	"Front-end developer at ISAAC in Eindhoven NL, Google Mobile Web Specialist, Open Source Contributer, Loud Noise Generator";

const titleTemplateDefault = (titleChunk) => {
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
}) => {
	const defaultOgImagePath = urljoin(siteUrl, "/og.png");
	const imagePath = image ? getOgImage({ src: image }) : defaultOgImagePath;

	return {
		title,
		titleTemplate,
		script: [
			{
				hid: "schemaOrg",
				type: "application/ld+json",
				json: {
					"@context": "http://schema.org",
					"@type": "WebSite",
					url: siteUrl,
					name: pkg.name,
				},
			},
			{
				hid: "structuredData",
				type: "application/ld+json",
				json: {
					"@context": "http://schema.org/",
					"@type": "Person",
					name: "Maarten Van Hoof",
					image:
						"https://res.cloudinary.com/mrtnvh/image/upload/c_scale,dpr_1.0,f_auto,q_auto,w_1200/v1570871092/mrtnvh.com/portrait",
					jobTitle: "Front-end Developer",
					url: "https://mrtnvh.com",
					sameAs: "https://mrtnvh.com",
					memberOf: {
						"@context": "http://schema.org",
						"@type": "Organization",
						name: "ISAAC",
						url: "https://isaac.nl",
						sameAs: "https://isaac.nl",
						slogan: "Turning .complexity into profitability",
						description:
							"Digital Agency specialized in Commerce en Finance",
						image: "https://www.isaac.nl/global/images/logo.svg",
						address: {
							"@type": "PostalAddress",
							addressLocality: "Eindhoven, The Netherlands",
							postalCode: "5621 AA",
							streetAddress: "Marconilaan 16",
						},
						email: "welkom@isaac.nl",
					},
				},
			},
		],
		// link: [
		// 	...(isBranchMaster
		// 		? [
		// 				{
		// 					hid: "robots",
		// 					rel: "canonical",
		// 					href: url,
		// 				},
		// 		  ]
		// 		: []),
		// ],
		meta: [
			...(!isBranchMaster
				? [
						{
							hid: "robots",
							name: "robots",
							content: "noindex, nofollow",
						},
				  ]
				: []),
			{
				hid: "Accept-CH",
				httpEquiv: "Accept-CH",
				content: "DPR, Viewport-Width, Width",
			},
			{ hid: "description", name: "description", content: description },
			{ hid: "image", name: "image", content: imagePath },

			// Open graph
			{ hid: "og:title", property: "og:title", content: title },
			{
				hid: "og:description",
				property: "og:description",
				content: description,
			},
			{ hid: "og:locale", property: "og:locale", content: "en_US" },
			// { hid: "og:url", property: "og:url", content: url },
			{
				hid: "og:site_name",
				property: "og:site_name",
				content: "mrtnvh",
			},
			{ hid: "og:image", property: "og:image", content: imagePath },
			{
				hid: "og:image:width",
				property: "og:image:width",
				content: 1200,
			},
			{
				hid: "og:image:height",
				property: "og:image:height",
				content: 630,
			},
			{ hid: "og:image:alt", property: "og:image:alt", content: title },
			{ hid: "og:type", property: "og:type", content: "article" },

			// Twitter card tags
			{
				hid: "twitter:card",
				name: "twitter:card",
				content: "summary_large_image",
			},
			{
				hid: "twitter:creator",
				name: "twitter:creator",
				content: "@mrtnvh",
			},
			{ hid: "twitter:title", name: "twitter:title", content: title },
			{
				hid: "twitter:description",
				name: "twitter:description",
				content: description,
			},
			{ hid: "twitter:image", name: "twitter:image", content: image },
		],
	};
};
