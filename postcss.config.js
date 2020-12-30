/* eslint-disable import/no-extraneous-dependencies, global-require */
module.exports = {
  plugins: [
    require("postcss-import")({
      path: ["./src/styles"],
    }),
    require("postcss-nested"),
    require("postcss-url"),
    require("postcss-preset-env")({
      stage: 0,
    }),
    ...(process.env.NODE_ENV === "production"
      ? [
          require("autoprefixer")({
            cascade: false,
          }),
          require("cssnano")({
            preset: "default",
            discardComments: { removeAll: true },
            zindex: false,
          }),
        ]
      : []),
  ],
};
