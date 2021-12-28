export default {
  '*': 'prettier -w',
  '*.{js,mjs}': 'eslint --fix',
  '{src,public}/**/*.{css,astro}': 'stylelint --fix',
};
