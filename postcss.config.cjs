module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-nested': {},
    'postcss-custom-selectors': {},
    'postcss-logical': {
      dir: 'ltr',
    },
    autoprefixer: {},
    cssnano: {
      preset: 'default',
      discardComments: { removeAll: true },
      zindex: false,
    },
  },
};
