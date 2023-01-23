import colors from '../../styles/colors.js';

export interface ImageVariant {
  sizes?: string;
  width: number;
  height: number;
  media?: string;
}

export const SRC_SET_SIZES = [300, 600, 900, 1200, 1500, 1800];

const isCloudinaryUrl = (url) => url.includes('https://res.cloudinary.com/');

const delimiters = ['youtube', 'upload', 'vimeo'];

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

const getShadowsHighlights = ({ shadows, highlights }) => {
  if (shadows && highlights) {
    return `${[`e_grayscale`, `e_tint:100:${shadows}:0p:${highlights}:100p`].join(',')}/t_noise`;
  }
  return undefined;
};

const getPlaceholder = ({ preUrl, postUrl, shadows, highlights, delimiter }) => {
  const transformations = [`t_responsive_placeholder`, getShadowsHighlights({ shadows, highlights })]
    .filter((transformation) => !!transformation)
    .join(',');
  return [preUrl, delimiter, transformations, postUrl].join('/');
};

const getOgImage = ({ preUrl, postUrl, shadows, highlights, delimiter }) => {
  const transformations = [`t_og_image`, getShadowsHighlights({ shadows, highlights })]
    .filter((transformation) => !!transformation)
    .join(',');
  return [preUrl, delimiter, transformations, postUrl].join('/');
};

const getSrcSet = ({ preUrl, postUrl, shadows, highlights, width, height, type, delimiter }) =>
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
      getShadowsHighlights({
        shadows,
        highlights,
      }),
    ]
      .filter((transformation) => !!transformation)
      .join(',');
    const url = [preUrl, delimiter, transformations, postUrl].join('/');
    return `${url} ${size}w`;
  })
    .filter((transformation) => !!transformation)
    .join(', ');

const getPrePostUrl = ({ src, delimiter }) => {
  if (src.includes(`/${delimiter}/`)) {
    return src.split(`/${delimiter}/`);
  }
  return [src];
};

export interface ImageTint {
  shadows: string;
  highlights: string;
}

export type ImageVariantsParams = {
  publicId?: string;
  src?: string;
  srcSet?: string;
  type?: 'auto' | 'jpg' | 'png' | 'webp' | 'avif';
  tint?: ImageTint | string;
  dark?: boolean;
  width?: number;
  height?: number;
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
}: ImageVariantsParams) => {
  if (!src || (!publicIdProp && !isCloudinaryUrl(src))) {
    return { src, srcSet, og: src };
  }

  const delimiter = delimiters.find((delimiter) => src.includes(`/${delimiter}/`));

  const [preUrl, postUrl] = getPrePostUrl({ src, delimiter });
  const { shadows, highlights } = getShadowsHighlightFromTintDark({ tint, dark });

  if (!postUrl) {
    return {
      src,
      srcSet: src,
      og: src,
    };
  }

  return {
    src: getPlaceholder({ preUrl, postUrl, shadows, highlights, delimiter }),
    srcSet: getSrcSet({ preUrl, postUrl, shadows, highlights, width, height, type, delimiter }),
    og: getOgImage({ preUrl, postUrl, shadows, highlights, delimiter }),
  };
};
