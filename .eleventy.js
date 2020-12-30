const navigationPlugin = require("@11ty/eleventy-navigation");
const fs = require("fs");
const pkg = require("./package.json");
const shortcodes = require("./config/shortcodes");

module.exports = function (config) {
  config.addPassthroughCopy({ "./src/static": "/" });

  shortcodes(config);

  config.addPlugin(navigationPlugin);

  config.addLayoutAlias("default", "layouts/base.njk");
  config.addLayoutAlias("project", "layouts/project.njk");

  config.addCollection("projects", (collectionApi) =>
    collectionApi
      .getAllSorted()
      .filter(({ data }) => data.tag === "projects")
      .reverse(),
  );

  config.addCollection("currentProjects", (collectionApi) =>
    collectionApi
      .getAllSorted()
      .filter(({ data }) => data.tag === "projects" && data.current)
      .reverse(),
  );

  config.addCollection("pastProjects", (collectionApi) =>
    collectionApi
      .getAllSorted()
      .filter(({ data }) => data.tag === "projects" && !data.current)
      .reverse(),
  );

  config.addFilter("ogImageFromThumbnail", (src) => {
    const siteUrl = pkg.homepage;
    const defaultOgImageUrl = siteUrl + "/og.png";
    const isCloudinaryUrl = (url) =>
      url.includes("https://res.cloudinary.com/");
    if (!src) return defaultOgImageUrl;
    if (!isCloudinaryUrl(src)) return src;
    const [preUrl, postUrl] = src.split("/upload");
    return `${preUrl}/upload/t_og_image/${postUrl}`;
  });

  config.addFilter("jsonStringify", (obj) => JSON.stringify(obj))

  return {
    dir: {
      input: "src",
      output: "dist",
    },
    passthroughFileCopy: true,
    templateFormats: ["html", "md", "njk"],
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
