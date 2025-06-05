import js from '@eslint/js';
import * as ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import a11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,

  /* TypeScript & React layer */
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module', ecmaFeatures: { jsx: true } }
    },
    plugins: {
      '@typescript-eslint': ts,
      react,
      'react-hooks': reactHooks,
      import: importPlugin,
      'jsx-a11y': a11y
    },
    settings: { react: { version: 'detect' } },
    rules: {
      ...ts.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off'
    }
  },

  /* Turn Prettier into ESLint formatting rules */
  prettier
];
