module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-nested': {},
    'postcss-custom-selectors': {},
    'postcss-logical': {},
    autoprefixer: {},
    cssnano: {
      preset: 'default',
      discardComments: { removeAll: true },
      zindex: false,
    },
  },
};
