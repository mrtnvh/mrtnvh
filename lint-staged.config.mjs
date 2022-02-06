export default {
  '!*.(snap|svg|jpg|png)': 'prettier -w',
  '*.{js,mjs}': 'eslint --fix',
  '*.{css,astro}': 'stylelint --fix',
};
