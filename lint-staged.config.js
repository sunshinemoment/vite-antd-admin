module.exports = {
  '*.{js,ts,tsx}': 'eslint --cache --fix',
  '*.vue': [
    'eslint --cache --fix',
    'stylelint --fix',
    'stylelint --custom-syntax=postcss-scss --fix',
  ],
  '*.css': 'stylelint --fix',
  '*.scss': 'stylelint --custom-syntax=postcss-scss --fix',
  '*.{js,jsx,ts,tsx,md,html,css}': 'prettier --write',
};
