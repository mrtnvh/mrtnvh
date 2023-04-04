import { defineConfig } from 'astro/config'; // eslint-disable-next-line import/no-unresolved
import mdx from '@astrojs/mdx'; // eslint-disable-next-line import/no-unresolved
import sitemap from '@astrojs/sitemap';
import rehypeRewrite from 'rehype-rewrite';
import dsv from '@rollup/plugin-dsv';
import critters from 'astro-critters';
import purgecss from 'astro-purgecss';

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

export default defineConfig({
  integrations: [
    sitemap(),
    mdx({
      // @ts-ignore
      rehypePlugins,
    }),
    purgecss(),
    critters(),
  ],
  markdown: {
    // @ts-ignore
    rehypePlugins,

    shikiConfig: {
      // Choose from Shiki's built-in themes (or add your own)
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: 'dracula',
    },
  },
  vite: {
    plugins: [
      // @ts-ignore
      dsv(),
    ],
  },
  site: 'https://mrtnvh.com/',
});
