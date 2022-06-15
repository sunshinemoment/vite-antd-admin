module.exports = {
  '*.{js,ts,tsx}': 'eslint --cache --fix',
  '*.vue': ['eslint --cache --fix', 'stylelint --fix'],
  '*.css': 'stylelint',
  '*.scss': 'stylelint --syntax=scss --fix',
  '*.{js,jsx,ts,tsx,md,html,css}': 'prettier --write',
};
