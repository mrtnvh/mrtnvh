module.exports = {
  mount: {
    dist: { url: "/", static: true },
    "./src/scripts": { url: "/scripts" },
    "./src/styles": { url: "/styles" },
  },
  plugins: [
    "@snowpack/plugin-postcss",
    [
      "@snowpack/plugin-run-script",
      {
        cmd: "eleventy",
        watch: "$1 --watch",
      },
    ],
  ],
  installOptions: {
    NODE_ENV: true,
  },
  buildOptions: {
    clean: true,
    out: "dist",
  },
  devOptions: {
    open: "none",
  },
};
