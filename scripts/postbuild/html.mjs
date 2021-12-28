import posthtml from "posthtml";
import htmlnano from "htmlnano";
import maxPreset from "htmlnano/lib/presets/max.js";
import { replaceFilesContent } from "./_utils.mjs";

export default async () =>
	replaceFilesContent("**/*.html", async (content) => {
		const result = await posthtml()
			.use(htmlnano({ minifySvg: false }, maxPreset.default))
			.process(content);
		return result.html;
	});
