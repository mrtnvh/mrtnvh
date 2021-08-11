import criticalCss from "./critical-css.mjs";
import purgeCss from "./purge-css.mjs";
import favicons from "./favicons.mjs";
import hash from "./hash.mjs";

(async () => {
	console.log("[FAVICONS]", "Start");
	await favicons();
	console.log("[FAVICONS]", "Completed");

	console.log("[PURGE CSS]", "Start");
	await purgeCss();
	console.log("[PURGE CSS]", "Completed");

	console.log("[CRITICAL CSS]", "Start");
	await criticalCss();
	console.log("[CRITICAL CSS]", "Completed");

	console.log("[HASH]", "Start");
	const { hashedAndOriginalFilePaths, alteredFiles } = await hash();
	console.log(
		"[HASH] Completed \n       Hashed %d files, replaced in %d files",
		hashedAndOriginalFilePaths.length,
		alteredFiles.length,
	);
})();
