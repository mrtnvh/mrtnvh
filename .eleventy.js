const isProd = process.env.NODE_ENV === "production";

const navigationPlugin = require("@11ty/eleventy-navigation");
const criticalCss = require("eleventy-critical-css");
const sitemap = require("@quasibit/eleventy-plugin-sitemap");
const favicons = require("./config/favicons");
const fs = require("fs");

const pkg = require("./package.json");
const shortcodes = require("./config/shortcodes");

process.setMaxListeners(25);

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

  config.addFilter("jsonStringify", (obj) => JSON.stringify(obj));

  if (isProd) {
    config.addPlugin(criticalCss, {
      minify: true,
      dimensions: [
        { height: 480, width: 360 },
        { height: 900, width: 1200 },
      ],
    });

    config.addPlugin(sitemap, {
      sitemap: {
        hostname: pkg.homepage + "/sitemap.xml",
      },
    });

    config.addPlugin(favicons, {
      iconPath: "./src/static/favicon.png",
      outDir: "./dist",
      configuration: {
        path: "/icons",
        appName: pkg.name,
        appShortName: pkg.name,
        appDescription: pkg.description,
        developerName: pkg.author.name,
        developerURL: pkg.author.url,
        dir: "auto",
        lang: "en-US",
        background: "#fff",
        theme_color: "#fff",
        appleStatusBarStyle: "black-translucent",
        orientation: "any",
        scope: "/",
        start_url: "/?standalone=true",
        display: "browser",
        background: "#ffffff",
        theme_color: "#95FF00",
        lang: "en",
        version: pkg.version,
        logging: false,
        pixel_art: false,
        loadManifestWithCredentials: false,
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: false,
          coast: false,
          favicons: true,
          firefox: false,
          windows: false,
          yandex: false,
        },
      },
    });
  }

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
