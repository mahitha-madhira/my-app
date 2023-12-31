const path = require('path');

module.exports = {
    entry: './src/index.js',
    target: 'node',
    output: {
        path: path.resolve(__dirname, '.webpack'),
        filename: 'index.js',
    },
};
