import colors, { colorKeys } from '../../styles/colors';
import type { ColorKey } from '../../styles/colors';

export interface ImageVariant {
  sizes?: string;
  width: number;
  height: number;
  media?: string;
}

export const SRC_SET_SIZES = [300, 600, 900, 1200, 1500, 1800];

const isCloudinaryUrl = (url: string) => url.includes('https://res.cloudinary.com/');

const delimiters = ['youtube', 'upload', 'vimeo'];

const getShadowsHighlightFromTintDark = ({ tint, dark }: { tint: ColorKey | ImageTint | undefined; dark: boolean }) => {
  if (tint) {
    if (typeof tint !== 'string' && 'shadows' in tint && 'highlights' in tint) {
      return {
        shadows: tint.shadows.replace('#', ''),
        highlights: tint.shadows.replace('#', ''),
      };
    }
    if (colorKeys.includes(tint)) {
      if (dark) {
        return {
          shadows: colors[tint]['900'].replace('#', ''),
          highlights: colors[tint]['200'].replace('#', ''),
        };
      }
      return {
        shadows: colors[tint]['700'].replace('#', ''),
        highlights: colors[tint]['50'].replace('#', ''),
      };
    }
  }

  return {
    shadows: undefined,
    highlights: undefined,
  };
};

const getShadowsHighlights = ({
  shadows,
  highlights,
}: {
  shadows: string | undefined;
  highlights: string | undefined;
}) => {
  if (!shadows || !highlights) return undefined;
  return `${[`e_grayscale`, `e_tint:100:${shadows}:0p:${highlights}:100p`].join(',')}/t_noise`;
};

type GetPlaceholderOptions = {
  preUrl: string | undefined;
  postUrl: string | undefined;
  shadows: string | undefined;
  highlights: string | undefined;
  delimiter: string | undefined;
};

const getPlaceholder = ({ preUrl, postUrl, shadows, highlights, delimiter }: GetPlaceholderOptions) => {
  const transformations = [`t_responsive_placeholder`, getShadowsHighlights({ shadows, highlights })]
    .filter((transformation) => !!transformation)
    .join(',');
  return [preUrl, delimiter, transformations, postUrl].join('/');
};

type GetOgImageOptions = GetPlaceholderOptions;

const getOgImage = ({ preUrl, postUrl, shadows, highlights, delimiter }: GetOgImageOptions) => {
  const transformations = [`t_og_image`, getShadowsHighlights({ shadows, highlights })]
    .filter((transformation) => !!transformation)
    .join(',');
  return [preUrl, delimiter, transformations, postUrl].join('/');
};

type GetSrcSetOptions = GetPlaceholderOptions & {
  width: number;
  height: number;
  type: string;
};

const getSrcSet = ({ preUrl, postUrl, shadows, highlights, width, height, type, delimiter }: GetSrcSetOptions) =>
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

const getPrePostUrl = ({ src, delimiter }: { src: string; delimiter: string | undefined }) => {
  if (src.includes(`/${delimiter}/`) && !!delimiter) {
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
  tint?: ImageTint | ColorKey | undefined;
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
