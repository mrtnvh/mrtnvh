module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-nested': {},
    'postcss-custom-selectors': {},
    autoprefixer: {},
    cssnano: {
      preset: 'default',
      discardComments: { removeAll: true },
      zindex: false,
    },
  },
};
