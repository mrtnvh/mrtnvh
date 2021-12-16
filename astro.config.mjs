// @ts-check
import { camelCase } from "lodash-es";
import { svgSprite } from "rollup-plugin-svgsprite-generator";

/** @type {import('astro').AstroUserConfig} */
export default {
	renderers: [],
	vite: {
		packageOptions: {
			rollup: {
				plugins: [
					svgSprite({
						input: "public/images",
						output: "src/components/SvgSprite.astro",
						xml: false,
						doctype: false,
						idConvert: camelCase,
					}),
				],
			},
		},
	},
	buildOptions: {
		site: "https://mrtnvh.com",
		sitemap: true,
	},
};
