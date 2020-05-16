const path = require('path');
module.exports = {
    entry: './src/client/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    mode: 'development',
    module: {
        rules: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
        }]
    }
}
