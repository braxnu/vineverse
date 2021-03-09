module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'node': true,
    'jest/globals': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  plugins: [
    'jest',
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parser': 'babel-eslint',
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ]
  }
}
