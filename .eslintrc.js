module.exports = {
  env: {
    browser: true,
    es2020: true,
    webextensions: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:react/recommended',
    'prettier',
    'prettier/flowtype', // if you are using flow
    'prettier/react',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['flowtype', 'react', 'jsx-a11y', 'prettier'],
  rules: {
    'prettier/prettier': ['warn'],
    'react/prop-types': 'off',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    'no-underscore-dangle': 'off',
    // 'no-useless-computed-key': 'off',
    // 'no-param-reassign': 'off',
    'no-console': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        mjs: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
    },
  },
};