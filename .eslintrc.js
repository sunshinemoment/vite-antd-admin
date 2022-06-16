module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:vue/essential', 'prettier', 'vue-global-api'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['vue'],
  rules: {
    'vue/multi-word-component-names': 0,
    'vue/no-multiple-template-root': 0,
    'vue/no-v-model-argument': 0,
  },
};
