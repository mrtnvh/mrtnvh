import { PurgeCSS } from "purgecss";

export default () =>
	new PurgeCSS().purge({
		content: ["dist/**/*.html"],
		css: ["dist/**/*.css"],
	});
