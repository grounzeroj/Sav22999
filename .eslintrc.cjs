module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    'no-else-return': ['error', {allowElseIf: false}],
    'no-var': 'warn',
    'one-var': 'off',
    'space-before-function-paren': ['error', 'never'],
    semi: ['error', 'always']
  }
}
