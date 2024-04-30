import { defineConfig } from 'astro/config'; // eslint-disable-next-line import/no-unresolved
import mdx from '@astrojs/mdx'; // eslint-disable-next-line import/no-unresolved
import sitemap from '@astrojs/sitemap';
import rehypeRewrite from 'rehype-rewrite';
import dsv from '@rollup/plugin-dsv';
import purgecss from 'astro-purgecss';
import playformInline from '@playform/inline';

const rehypePlugins = [
  [
    rehypeRewrite,
    {
      selector: 'a',
      rewrite: (node: any) => {
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
  integrations: [
    sitemap({
      filter: (page) => !page.includes('kitchensink'),
    }),
    mdx({
      // @ts-ignore
      rehypePlugins,
    }),
    purgecss(),
    playformInline({}),
  ],
  markdown: {
    // @ts-ignore
    rehypePlugins,
    shikiConfig: {
      // Choose from Shiki's built-in themes (or add your own)
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: 'css-variables',
    },
  },
  vite: {
    plugins: [
      // @ts-ignore
      dsv(),
    ],
  },
  site: 'https://mrtnvh.com/',
  devToolbar: {
    enabled: false,
  },
});
