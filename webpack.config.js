const path = require('path');
module.exports = {
    entry: './src/client/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    mode: 'development'
}