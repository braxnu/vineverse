const path = require('path')
const isCi = require('is-ci')

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = isCi ? 'production' : 'development'
}

module.exports = {
  entry: './src/client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  mode: process.env.NODE_ENV,
  devtool: isCi ? false : 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            options: {sourceMap: true},
          },
        ],
      },
    ]
  }
}
