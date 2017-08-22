var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        'vue': './vue/src/auth/index.js',
    },
    output: {
        filename: '[name].js',
        path: __dirname + './vue/src/'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react', 'stage-1'],
                    plugins: ['transform-runtime']
                }
            },
            {   
                test: /\.css$/,
                loader: "style-loader!css-loader?importLoaders=1"
            },
            {
                test: /\.vue$/,
                loader: 'vue'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};

// https://www.twilio.com/blog/2015/08/setting-up-react-for-es6-with-webpack-and-babel-2.html