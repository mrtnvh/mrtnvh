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
  const outDir = options.outDir || `${config.dir.output}/icons`;
  const configuration = options.configuration || {};

  let images = "";
  let html = "";
  let files = "";

  config.on("beforeBuild", async () => {
    const response = await favicons(iconPath, configuration);
    images = response.images;
    html = response.html;
    files = response.files;
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

  await Promise.all(
    [...images, ...files].map(({ name, contents }) =>
      fs.outputFile(path.resolve(outDir, name), contents),
    ),
  );
};
