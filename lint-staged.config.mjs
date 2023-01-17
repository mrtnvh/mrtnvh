export default {
  '!*.(snap|svg|jpg|png|csv)': 'prettier -w',
  '*.{js,mjs}': 'eslint --fix',
  '*.{css,astro}': 'stylelint --fix',
};
