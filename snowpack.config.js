const isProd = process.env.NODE_ENV === "production";

module.exports = {
  mount: {
    dist: { url: "/", static: true },
    "./src/scripts": { url: "/scripts" },
  },
  plugins: [
    [
      "@snowpack/plugin-run-script",
      {
        cmd: "postcss src/styles/index.css -d dist/styles -m",
        watch: "$1 --watch",
      },
    ],
    [
      "@snowpack/plugin-run-script",
      {
        cmd: "eleventy",
        watch: "$1 --watch",
      },
    ],
    ...(!isProd
      ? []
      : [
          [
            "./config/purgecss.snowpack.js",
            {
              content: ["./dist/*.html"],
              css: ["./dist/styles/*.css"],
              output: ["./dist/styles/"],
              safelist: ["loaded"],
            },
          ],
          "snowpack-plugin-optimize",
        ]),
  ],
  installOptions: {
    NODE_ENV: true,
  },
  buildOptions: {
    clean: false,
    out: "dist",
  },
  devOptions: {
    open: "none",
  },
};
