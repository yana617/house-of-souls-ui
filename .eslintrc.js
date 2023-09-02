module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
        ],
      },
    },
  },
  rules: {
    'no-console': 'error',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'max-len': ['error', { code: 120 }],
    'no-shadow': ['error', { builtinGlobals: false, hoist: 'functions', allow: ['state'] }],
    camelcase: 'off',
    'no-underscore-dangle': 'off',
    'vue/script-setup-uses-vars': 'off',
    'vue/quote-props': 'off',
    'vue/require-default-prop': 'off',
    'vue/first-attribute-linebreak': 'off',
    'vue/no-child-content': 'off',
    'vuejs-accessibility/click-events-have-key-events': 'off',
    'vue/no-reserved-component-names': 'off',
    'vue/multi-word-component-names': 'off',
    'vuejs-accessibility/form-control-has-label': 'off',
    'vue/no-v-text-v-html-on-component': 'off',
    'vuejs-accessibility/label-has-for': 'warn',
  },
};
