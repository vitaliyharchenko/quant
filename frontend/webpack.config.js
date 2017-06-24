var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './react/main.js',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/../django/assets/react'
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                  presets: ['es2015', 'react']
                }
            }
        ]
    },
};

// https://www.twilio.com/blog/2015/08/setting-up-react-for-es6-with-webpack-and-babel-2.html