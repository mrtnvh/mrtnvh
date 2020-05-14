/* eslint-disable import/prefer-default-export */
import { Cloudinary } from "cloudinary-core";

const config = {
	srcSetSizes: [150, 300, 600, 900, 1200, 1500, 1800, 2100, 2400],
	core: new Cloudinary({
		cloud_name: process.env.GRIDSOME_CLOUDINARY_CLOUD_NAME || "",
	}),
	defaultOptions: {
		dpr: 1,
		crop: "scale",
		fetch_format: "auto",
		quality: "auto",
	},
};

const getPublicId = (input) =>
	input.replace(
		/(?:https:\/\/res.cloudinary.com\/.*\/image\/upload\/)(.*\/?.*)\..*/,
		"$1",
	);

const isCloudinaryUrl = (url) => url.includes("https://res.cloudinary.com/");

export const getOgImage = ({ src }) => {
	if (!isCloudinaryUrl(src)) return src;
	const publicId = getPublicId(src);
	return config.core.url(publicId, {
		transformation: "og_image",
	});
};

export const getSrcSet = ({ publicId: publicIdProp, src, srcSet }) => {
	if (!publicIdProp && !isCloudinaryUrl(src))
		return {
			src,
			srcSet,
		};

	const publicId = getPublicId(src);
	const cldnrySrc = config.core.url(publicId, {
		transformation: "responsive_placeholder",
	});

	return {
		src: cldnrySrc,
		srcSet: [
			...[`${cldnrySrc} 32w`],
			...config.srcSetSizes.map((size) => {
				const url = config.core.url(publicId, {
					...config.defaultOptions,
					width: size,
				});
				return `${url} ${size}w`;
			}),
		],
	};
};
