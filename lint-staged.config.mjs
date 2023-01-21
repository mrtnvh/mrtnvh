export default {
  '!*.(snap|svg|jpg|png|csv|npmrc)': 'prettier -w',
  '*.{js,mjs}': 'eslint --fix',
  '*.{css,astro}': 'stylelint --fix',
};
