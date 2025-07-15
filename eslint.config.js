// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

const js = require('@eslint/js');

module.exports = [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        process: 'readonly',
        global: 'readonly',
        Image: 'readonly'
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    rules: {
      // We use _ to define private variables and methods in classes
      'no-underscore-dangle': 'off',
      // This seems to be buggy we don't want eslint to check this
      'import/no-extraneous-dependencies': 'off',
      // We can write JSX in any file we want
      'react/jsx-filename-extension': 'off',
      // We don't like this rule
      'arrow-body-style': 'off',
      // We don't like this rule. We write arrow functions only when we needed
      'prefer-arrow-callback': 'off',
      // We don't need to write function names always
      'func-names': 'off',
      // propTypes can be object
      'react/forbid-prop-types': 'off',
      // Allow console for debugging
      'no-console': 'warn',
      // Relax some rules for the current codebase
      'no-var': 'off',
      'prefer-const': 'warn'
    }
  },
  {
    files: ['**/*.test.js', '**/*.spec.js'],
    languageOptions: {
      globals: {
        jest: 'readonly',
        describe: 'readonly',
        test: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        HTMLCanvasElement: 'readonly',
        fetch: 'readonly',
        setTimeout: 'readonly',
      },
    },
  }
];