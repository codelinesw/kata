module.exports = {
  root: true,
  extends: [
    '@react-native',
    'plugin:prettier/recommended',
  ],
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
  },
};
