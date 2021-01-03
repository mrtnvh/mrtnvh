const { PurgeCSS } = require("purgecss");

module.exports = (snowpackConfig, pluginOptions) => {
  return {
    name: "purgecss-snowpack",
    async run() {
      const results = await new PurgeCSS().purge(pluginOptions);
      console.log(
        "Purged CSS from : \n",
        results.map((result) => result.file).join("\n\t"),
      );
    },
  };
};
