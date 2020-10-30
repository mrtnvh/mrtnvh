const { execSync } = require("child_process");
const { loadNuxt, build } = require("nuxt");
// const getPort = require("get-port");

(async () => {
	const port = 3000;
	const nuxt = await loadNuxt({ for: "dev", port });
	await build(nuxt);
	execSync(`jest --runInBand`, {
		env: { ...process.env, PORT: port },
	});
	// nuxt.close();
})();
