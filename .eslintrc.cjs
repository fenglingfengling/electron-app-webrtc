module.exports = {
  root: true,
  env:{
    browser: true,
    Commontjs: true,
    es6: true,
    node: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions:{
    ecmaFeatures:{
      jsx: true,
    },
    sourceType: 'module',
    exmaVersion: 2021,
  },
  plugins:['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    '@electron-toolkit/eslint-config-ts/recommended',
    '@electron-toolkit/eslint-config-prettier',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended'


  ],
  rule:{
    "@typescript-eslint/explicit-function-return-type":'off',
    "@typescript-eslint/explicit-module-boundary-types":'off',
    "@typescript-eslint/no-explicit-any":'error',
    "@typescript-eslint/no-non-null-assertion":'off',
    "@typescript-eslint/no-var-requires":'off'
  }
}
