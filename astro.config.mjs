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

export default defineConfig({
  integrations: [
    sitemap(),
    mdx({
      rehypePlugins,
    }),
    purgecss(),
    critters(),
  ],
  markdown: {
    rehypePlugins,
  },
  vite: {
    plugins: [dsv()],
  },
  site: 'https://mrtnvh.com/',
});
