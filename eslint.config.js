import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["src/**/*.tsx", "src/**/*.ts"],
    plugins: {
      react,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      'react/display-name': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
  {
    files: ["**/*.js"],
    plugins: {
      pluginJs,
    },
  },
  ...tseslint.configs.recommended
  , {
    ignores: [
      "src/assets/**",
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/public/**",
      "**/temp/**",
    ],
  }
];