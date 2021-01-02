const fs = require("fs-extra");
const path = require("path");
const posthtml = require("posthtml");
const { promisify } = require("util");
const favicons = promisify(require("favicons"));

const addIconsToHead = (html) => (tree) => {
  tree.match({ tag: "head" }, (head) => {
    return {
      ...head,
      content: [...head.content, ...html],
    };
  });

  return tree;
};

module.exports = async (config, options) => {
  const iconPath = options.iconPath || "./";
  const outDir = options.outDir || `${config.dir.output}`;
  const configuration = options.configuration || {};

  let html = "";

  config.on("beforeBuild", async () => {
    const response = await favicons(iconPath, configuration);
    const { images, files } = response;
    html = response.html;

    await Promise.all(
      [...images, ...files].map(({ name, contents }) =>
        fs.outputFile(path.resolve(outDir, name), contents),
      ),
    );
  });

  config.addTransform("favicons", async (content, outputPath) => {
    if (outputPath.endsWith(".html")) {
      const response = await posthtml()
        .use(addIconsToHead(html))
        .process(content);

      if (response) {
        return response.html;
      }
    }
    return content;
  });
};
