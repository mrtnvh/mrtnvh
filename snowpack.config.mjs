import { camelCase } from "lodash-es";
import { svgSprite } from "rollup-plugin-svgsprite-generator";

export default {
	plugins: ["@snowpack/plugin-postcss"],
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
};
