import colors from '../../styles/colors.js';

export const SRC_SET_SIZES = [300, 600, 900, 1200, 1500, 1800];

const isCloudinaryUrl = (url) => url.includes('https://res.cloudinary.com/');

const getShadowsHighlightFromTintDark = ({ tint, dark }) => {
  if (tint) {
    if (typeof tint === 'string') {
      if (dark) {
        return {
          shadows: colors[tint]['900'].replace('#', ''),
          highlights: colors[tint]['500'].replace('#', ''),
        };
      }
      return {
        shadows: colors[tint]['500'].replace('#', ''),
        highlights: colors[tint]['50'].replace('#', ''),
      };
    }

    if (tint.shadows && tint.highlights) {
      return {
        shadows: tint.shadows.replace('#', ''),
        highlights: tint.shadows.replace('#', ''),
      };
    }
  }

  return {
    shadows: undefined,
    highlights: undefined,
  };
};

const getTransformations = ({ shadows, highlights }) => {
  if (shadows && highlights) {
    return `${[`e_grayscale`, `e_tint:100:${shadows}:0p:${highlights}:100p`].join(',')}/t_noise`;
  }
  return undefined;
};

const getPlaceholder = ({ preUrl, postUrl, shadows, highlights }) => {
  const transformations = [`t_responsive_placeholder`, getTransformations({ shadows, highlights })].join(',');
  return [preUrl, `upload`, transformations, postUrl].join('/');
};

const getOgImage = ({ preUrl, postUrl, shadows, highlights }) => {
  const transformations = [`t_og_image`, getTransformations({ shadows, highlights })].join(',');
  return [preUrl, `upload`, transformations, postUrl].join('/');
};

const getSrcSet = ({ preUrl, postUrl, shadows, highlights, width, height, type }) =>
  SRC_SET_SIZES.map((size) => {
    const srcSetWidth = size;
    const srcSetHeight = Math.ceil((size / width) * height);
    const transformations = [
      `c_fill`,
      `dpr_1`,
      `f_${type}`,
      `q_50`,
      `w_${srcSetWidth}`,
      `h_${srcSetHeight}`,
      getTransformations({
        shadows,
        highlights,
      }),
    ].join(',');
    const url = [preUrl, `upload`, transformations, postUrl].join('/');
    return `${url} ${size}w`;
  }).join(', ');

const getPrePostUrl = (url) => {
  if (url.includes('/upload/')) {
    return url.split('/upload/');
  }
  return [url];
};

export const getImageVariants = ({
  publicId: publicIdProp = undefined,
  src,
  srcSet = undefined,
  type = 'auto',
  tint = undefined,
  dark = false,
  width = 1600,
  height = 900,
}) => {
  if (!src || (!publicIdProp && !isCloudinaryUrl(src))) {
    return { src, srcSet, og: src };
  }

  const [preUrl, postUrl] = getPrePostUrl(src);
  const { shadows, highlights } = getShadowsHighlightFromTintDark({ tint, dark });

  if (!postUrl) {
    return {
      src,
      srcSet: src,
      og: src,
    };
  }

  return {
    src: getPlaceholder({ preUrl, postUrl, shadows, highlights }),
    srcSet: getSrcSet({ preUrl, postUrl, shadows, highlights, width, height, type }),
    og: getOgImage({ preUrl, postUrl, shadows, highlights }),
  };
};
