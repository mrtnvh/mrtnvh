const fs = require("fs-extra");
const path = require("path");
const posthtml = require("posthtml");

const addStylesToHead = (css) => (tree) => {
  tree.match({ tag: "head" }, (head) => ({
    ...head,
    content: [...head.content, `<style>${css}</style>`],
  }));

  return tree;
};

module.exports = (config, options) => {
  let css = "";

  config.on("beforeBuild", async () => {
    css = await fs.readFile(
      path.resolve(process.cwd(), options.input),
      "utf-8",
    );
  });

  console.log(css);

  config.addTransform("inlineCss", async (content, outputPath) => {
    if (outputPath.endsWith(".html")) {
      const response = await posthtml()
        .use(addStylesToHead(css))
        .process(content);

      if (response) {
        return response.html;
      }
    }
    return content;
  });
};
