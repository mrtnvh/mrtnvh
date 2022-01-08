import colors from '../../styles/colors.js';

export const SRC_SET_SIZES = [150, 300, 600, 900, 1200, 1500, 1800, 2100, 2400];

const isCloudinaryUrl = (url) => url.includes('https://res.cloudinary.com/');

export const getOgImage = ({ src }) => {
  if (!isCloudinaryUrl(src)) return src;
  const [preUrl, postUrl] = src.split('/upload');
  return `${preUrl}/upload/t_og_image${postUrl}`;
};

export const getSrcSet = ({
  publicId: publicIdProp = undefined,
  src,
  srcSet = undefined,
  type = 'auto',
  tint = undefined,
  dark = false,
  width = 1600,
  height = 900,
}) => {
  if (!src) return { src, srcSet };

  if (!publicIdProp && !isCloudinaryUrl(src))
    return {
      src,
      srcSet,
    };

  const [preUrl, postUrl] = src.split('/upload/');
  let shadows;
  let highlights;

  if (tint) {
    if (typeof tint === 'string') {
      if (dark) {
        shadows = colors[tint]['900'].replace('#', '');
        highlights = colors[tint]['600'].replace('#', '');
      } else {
        shadows = colors[tint]['500'].replace('#', '');
        highlights = colors[tint]['50'].replace('#', '');
      }
    } else if (tint.shadows && tint.highlights) {
      shadows = tint.shadows.replace('#', '');
      highlights = tint.highlights.replace('#', '');
    }
  }

  const getPlaceholder = () => {
    let placeholder = `${preUrl}/upload/t_responsive_placeholder`;
    if (shadows && highlights) {
      placeholder = `${placeholder}/e_grayscale/e_tint:100:${shadows}:0p:${highlights}:100p/t_noise`;
    }
    return `${placeholder}/${postUrl}`;
  };

  const getSrcSetValue = () =>
    SRC_SET_SIZES.map((size) => {
      const srcSetWidth = size;
      const srcSetHeight = Math.ceil((size / width) * height);
      let transformations = `c_scale/dpr_1.0/f_${type}/q_auto/w_${srcSetWidth}/h_${srcSetHeight}`;
      if (shadows && highlights) {
        transformations = `${transformations}/e_grayscale/e_tint:100:${shadows}:0p:${highlights}:100p/t_noise`;
      }
      return `${preUrl}/upload/${transformations}/${postUrl} ${size}w`;
    }).join(', ');

  return {
    src: getPlaceholder(),
    srcSet: getSrcSetValue(),
  };
};
