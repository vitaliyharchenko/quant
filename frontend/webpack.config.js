var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        'counter': './react/counter.js',
        'task': './react/task.js',
        'block': './react/block/index.js',
        'block1': './react/blocks/index.js',
        'v0.1': './react/v0.1/src/index.jsx',
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/src/react/'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react', 'stage-1']
                }
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};

// https://www.twilio.com/blog/2015/08/setting-up-react-for-es6-with-webpack-and-babel-2.html