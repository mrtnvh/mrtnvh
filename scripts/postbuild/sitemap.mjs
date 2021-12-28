import { replaceFilesContent } from "./_utils.mjs";

export default async () =>
	replaceFilesContent("**/sitemap*.xml", async (content) => {
		return content.replaceAll("/index.html", "/");
	});
