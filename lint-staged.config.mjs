export default {
  '!(*snap)': 'prettier -w',
  '*.{js,mjs}': 'eslint --fix',
  '{src,public}/**/*.css': 'stylelint --fix',
};
