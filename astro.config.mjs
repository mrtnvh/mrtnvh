// @ts-check
import { camelCase } from 'lodash-es';
import { svgSprite } from 'rollup-plugin-svgsprite-generator';

/** @type {import('astro').AstroUserConfig} */
export default {
  renderers: [],
  markdownOptions: {
    render: [
      '@astrojs/markdown-remark',
      {
        rehypePlugins: [
          [
            'rehype-rewrite',
            {
              selector: 'a',
              rewrite: (node) => {
                if (node.properties.href.includes('http')) {
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
        ],
      },
    ],
  },
  vite: {
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
  buildOptions: {
    site: 'https://mrtnvh.com',
    sitemap: true,
  },
};
