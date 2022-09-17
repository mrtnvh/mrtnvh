import { defineConfig } from 'astro/config'; // eslint-disable-next-line import/no-unresolved
import mdx from '@astrojs/mdx'; // eslint-disable-next-line import/no-unresolved
import sitemap from '@astrojs/sitemap';
import { camelCase } from 'lodash-es';
import { svgSprite } from 'rollup-plugin-svgsprite-generator';
import copy from 'rollup-plugin-copy';
import rehypeRewrite from 'rehype-rewrite';

const rehypePlugins = [
  [
    rehypeRewrite,
    {
      selector: 'a',
      rewrite: (node) => {
        if (node?.properties?.href.includes('http')) {
          // eslint-disable-next-line no-param-reassign
          node.properties = {
            ...node.properties,
            className: [node.properties.className, 'external'].join(''),
            target: '_blank',
            rel: 'noopener noreferrer',
          };
        }
      },
    },
  ],
];

// https://astro.build/config
export default defineConfig({
  integrations: [sitemap(), mdx({ rehypePlugins })],
  markdown: {
    rehypePlugins,
  },
  vite: {
    plugins: [
      copy({
        targets: [
          {
            src: [
              './node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2',
              './node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff',
              './node_modules/@fontsource/inter/files/inter-latin-400-normal.woff2',
              './node_modules/@fontsource/inter/files/inter-latin-400-normal.woff',
              './node_modules/@fontsource/inter/files/inter-latin-500-normal.woff2',
              './node_modules/@fontsource/inter/files/inter-latin-500-normal.woff',
              './node_modules/@fontsource/inter/files/inter-latin-700-normal.woff2',
              './node_modules/@fontsource/inter/files/inter-latin-700-normal.woff',
              './node_modules/@fontsource/inter/files/inter-latin-800-normal.woff2',
              './node_modules/@fontsource/inter/files/inter-latin-800-normal.woff',
            ],
            dest: 'public/fonts',
          },
        ],
      }),
    ],
    packageOptions: {
      rollup: {
        plugins: [
          svgSprite({
            input: 'public/images',
            output: 'src/components/SvgSprite.astro',
            xml: false,
            doctype: false,
            idConvert: camelCase,
          }),
        ],
      },
    },
  },
  site: 'https://mrtnvh.com',
});
