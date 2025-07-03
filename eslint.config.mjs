import { defineConfig } from "eslint/config";
import globals from "globals";

export default defineConfig([{
    files: ["src/**/*.js", "src/**/*.mjs"],

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
        },

        ecmaVersion: 2022,
        sourceType: "module",
    },

    rules: {
        indent: ["error", 4],
        "no-tabs": "error",
        "spaced-comment": ["error", "always"],

        "no-multiple-empty-lines": ["error", {
            max: 2,
        }],

        "eol-last": ["error", "never"],
        "linebreak-style": ["error", "windows"],

        "brace-style": ["error", "1tbs", {
            allowSingleLine: true,
        }],

        curly: ["error", "all"],

        "newline-per-chained-call": ["error", {
            ignoreChainWithDepth: 2,
        }], "space-in-parens": ["error", "never"],
        "array-bracket-spacing": ["error", "always"],
        "object-curly-spacing": ["error", "never"],
        "space-infix-ops": "error",

        "comma-spacing": ["error", {
            before: false,
            after: true,
        }],

        "keyword-spacing": ["error", {
            before: true,
            after: true,
        }],

        "space-before-blocks": ["error", "always"],
        "space-before-function-paren": ["error", "never"],
        "func-call-spacing": ["error", "never"],

        "key-spacing": ["error", {
            beforeColon: false,
            afterColon: true,
        }], camelcase: ["warn", {
            properties: "never",
        }],

        "id-match": ["warn", "^[a-zA-Z_$][a-zA-Z0-9_$]*$", {
            properties: false,
        }],

        "new-cap": ["warn", {
            newIsCap: true,
            capIsNew: true,
        }],

        "prefer-const": "error",
        "prefer-template": "error",
        "prefer-arrow-callback": "error",
        "no-var": "error",
        eqeqeq: ["error", "always"],
        "no-unneeded-ternary": "error",

        "no-unused-vars": ["warn", {
            args: "all",
            argsIgnorePattern: "^_",
        }],

        "no-extra-boolean-cast": "error",
        "wrap-iife": ["error", "outside"],
        "no-lonely-if": "error",
        yoda: ["error", "never"],

        "no-else-return": ["error", {
            allowElseIf: false,
        }],

        "operator-linebreak": ["error", "before"],
        "no-nested-ternary": "error",
        "arrow-parens": ["error", "always"],
    },
}]);