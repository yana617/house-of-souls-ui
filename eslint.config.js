import pluginVue from "eslint-plugin-vue";

export default [
    ...pluginVue.configs['flat/recommended'],
    {
        files: ["**/*.js", "**/*.vue"],
        rules: {
            "no-console": "error",
            "no-debugger": "warn",
            "max-len": [
                "error",
                {
                    "code": 120
                }
            ],
            "vue/max-attributes-per-line": ["error", {
                "singleline": {
                    "max": 3
                },
                "multiline": {
                    "max": 1
                }
            }],
            "vue/first-attribute-linebreak": ["error", {
                "singleline": "ignore",
                "multiline": "below"
            }],
            "no-shadow": [
                "error",
                {
                    "builtinGlobals": false,
                    "hoist": "functions",
                    "allow": [
                        "state"
                    ]
                }
            ],
            "no-underscore-dangle": "off",
            "vue/script-setup-uses-vars": "off",
            "vue/quote-props": "off",
            "vue/require-default-prop": "off",
            "vue/no-child-content": "off",
            "vuejs-accessibility/click-events-have-key-events": "off",
            "vue/no-reserved-component-names": "off",
            "vue/multi-word-component-names": "off",
            "vuejs-accessibility/form-control-has-label": "off",
            "vue/no-v-text-v-html-on-component": "off",
            "vue/prop-name-casing": "off",
            'no-unused-vars': ["error", { "argsIgnorePattern": "^_" }]
        }
    }
];