export const SRC_SET_SIZES = [150, 300, 600, 900, 1200, 1500, 1800, 2100, 2400];

const isCloudinaryUrl = (url) => url.includes("https://res.cloudinary.com/");

export const getOgImage = ({ src }) => {
	if (!isCloudinaryUrl(src)) return src;
	const [preUrl, postUrl] = src.split("/upload");
	return `${preUrl}/upload/t_og_image${postUrl}`;
};

export const getSrcSet = ({
	publicId: publicIdProp,
	src,
	srcSet,
	type = "auto",
}) => {
	if (!src) return { src, srcSet };

	if (!publicIdProp && !isCloudinaryUrl(src))
		return {
			src,
			srcSet,
		};

	const [preUrl, postUrl] = src.split("/upload");
	const placeholder = `${preUrl}/upload/t_responsive_placeholder/${postUrl}`;

	return {
		src: placeholder,
		srcSet: SRC_SET_SIZES.map(
			(size) =>
				`${preUrl}/upload/c_scale,dpr_1.0,f_${type},q_auto,w_${size}${postUrl} ${size}w`,
		),
	};
};
