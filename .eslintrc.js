module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  extends: [
    '@vue/airbnb',
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'no-console': 'error',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'max-len': ['error', { code: 120 }],
    'no-shadow': ['error', { builtinGlobals: false, hoist: 'functions', allow: ['state'] }],
    camelcase: 'off',
    'no-underscore-dangle': 'off',
    'vue/script-setup-uses-vars': 'off',
    'vue/max-len': ['error', {
      code: 120,
      template: 120,
      tabWidth: 2,
      comments: 120,
    }],
    'vue/require-default-prop': 'off',
    'vue/multi-word-component-names': 'off',

    // TODO: fix
    'vuejs-accessibility/click-events-have-key-events': 'off',
    'vuejs-accessibility/label-has-for': 'off',
    'vuejs-accessibility/form-control-has-label': 'off',
  },

  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src/']],
        extensions: ['.js', '.vue'],
      },
    },
  },
};
