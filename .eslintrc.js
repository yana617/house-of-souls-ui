module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': 'error',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'max-len': ['error', { code: 120 }],
    'no-shadow': ['error', { builtinGlobals: false, hoist: 'functions', allow: ['state'] }],
    camelcase: ['error', {
      allow: [
        'egida_nick',
        'arrival_time',
        'additional_people',
        'user_additional_fields',
        'additional_field_template_id',
        'user_id',
        'is_guest',
        'guest_info',
      ],
    }],
    'no-underscore-dangle': 'off',
    'vue/script-setup-uses-vars': 'off',
  },
};
