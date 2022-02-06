export default {
  '!*.(snap|svg)': 'prettier -w',
  '*.{js,mjs}': 'eslint --fix',
  '*.{css,astro}': 'stylelint --fix',
};
