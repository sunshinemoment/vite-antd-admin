module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/base',
    'eslint:recommended',
    'plugin:vue/essential',
    'prettier',
    './.eslintrc-auto-import.json',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['vue'],
  rules: {
    'vue/multi-word-component-names': 0,
    'vue/no-multiple-template-root': 0,
    'vue/no-v-model-argument': 0,
  },
  globals: {
    defineOptions: true,
  },
};
