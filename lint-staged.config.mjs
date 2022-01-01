export default {
  '!(*snap)': 'prettier -w',
  '*.{js,mjs}': 'eslint --fix',
  '*.{css,astro}': 'stylelint --fix',
};
