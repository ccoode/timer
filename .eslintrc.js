module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  rules: {
    semi: 0,
    'no-const-assign': 1,
    'no-extra-semi': 1,
    'no-mixed-spaces-and-tabs': 0,
    'no-undef': 1,
    'no-unreachable': 1,
    'no-unused-vars': 1,
    'no-use-before-define': 0,
    'no-underscore-dangle': ["error", { "allowAfterThis": true }],
    'func-names': 0,
    'valid-typeof': 1,
    'react/jsx-key': 1,
    'react/prefer-stateless-function': 1,
    'import/no-duplicates': 0,
    'comma-dangle': 0,
  },
  plugins: [
    'react',
  ],
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  settings: {
    'import/resolver': "webpack",
  },
  globals: {
    config: true,
  },
}
