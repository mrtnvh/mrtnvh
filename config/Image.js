const SRC_SET_SIZES = [150, 300, 600, 900, 1200, 1500, 1800, 2100, 2400];

const isCloudinaryUrl = (url) => url.includes("https://res.cloudinary.com/");

const getSrcSet = ({ src, srcSet, type = "auto" }) => {
  if (!isCloudinaryUrl(src))
    return {
      src,
      srcSet,
    };

  const [preUrl, postUrl] = src.split("/upload/");
  const placeholder = `${preUrl}/upload/t_responsive_placeholder/${postUrl}`;

  return {
    src: placeholder,
    srcSet: [
      ...[`${placeholder} 32w`],
      ...SRC_SET_SIZES.map(
        (size) =>
          `${preUrl}/upload/c_scale,dpr_1.0,f_${type},q_auto,w_${size}/${postUrl} ${size}w`,
      ),
    ],
  };
};

module.exports = (src, alt, className, width, height) => {
  const { src: source, srcSet: sourceSet } = getSrcSet({
    src,
  });

  const { srcSet: sourceSetWebp } = getSrcSet({
    src,
    type: "webp",
  });

  return `
  <picture>
    <source sizes="100vw" srcset="${sourceSetWebp}" type="image/webp" />
    <img
      src="${source}"
      srcset="${sourceSet}"
      sizes="100vw"
      alt="${alt}"
      class="image"
      loading="lazy"
      width="${width}"
      height="${height}"
    />
  </picture>
`;
};
