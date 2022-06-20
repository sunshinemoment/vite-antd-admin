module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'stylelint-config-prettier',
    'stylelint-config-prettier-scss',
    'stylelint-config-recommended-vue',
    'stylelint-config-rational-order',
    'stylelint-config-html/html',
    'stylelint-config-html/vue',
  ],
  plugins: [
    'stylelint-order',
    'stylelint-declaration-block-no-ignored-properties',
    'stylelint-scss',
  ],
  rules: {
    'comment-empty-line-before': null,
    'declaration-empty-line-before': null,
    'function-name-case': 'lower',
    'no-descending-specificity': null,
    'no-invalid-double-slash-comments': null,
    'selector-class-pattern': null,
    'no-empty-source': null,
    'scss/at-import-partial-extension': null,
    'font-family-no-duplicate-names': null,
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep'],
      },
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'local', 'deep'],
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.vue'],
      customSyntax: 'postcss-html',
    },
    {
      files: '**/*.scss',
      customSyntax: 'postcss-scss',
    },
  ],
  ignoreFiles: ['node_modules/**/*', 'dist/**/*'],
};
