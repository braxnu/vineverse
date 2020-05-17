const path = require('path');
module.exports = {
    entry: './src/client/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    mode: 'development',
    module: {
        rules: [
            {
              test: /\.js$/,
              use: {
                loader: 'babel-loader',
              }
            },
            {
              test: /\.s?css$/,
              use: [
               {
                  loader: 'css-loader',
                  options: {sourceMap: true},
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
