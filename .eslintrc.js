module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'no-only-tests', '@shopify'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': ['error', {argsIgnorePattern: '_'}],
    '@typescript-eslint/no-empty-interface': ['error', {allowSingleExtends: true}],
    'no-only-tests/no-only-tests': 'error',
    'no-console': 'error',
    '@shopify/typescript/prefer-pascal-case-enums': 'error',
    '@shopify/typescript/prefer-singular-enums': 'error',
  },
}
