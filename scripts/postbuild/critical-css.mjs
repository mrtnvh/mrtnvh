import Critters from "critters";
import { replaceFilesContent } from "./_utils.mjs";

export default async () =>
	replaceFilesContent("**/*.html", async (content) => {
		const sanitizedContent = content.replaceAll("/_astro", "/dist/_astro");
		const c = new Critters({});
		const res = await c.process(sanitizedContent);
		return res.replaceAll("/dist/_astro", "/_astro");
	});
