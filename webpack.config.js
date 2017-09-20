const path = require('path')

module.exports = {

  entry: './src/client/index.js',

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/assets')
  }
}
