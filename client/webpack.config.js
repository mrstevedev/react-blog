const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require("webpack");
const env = require('dotenv').config({ path: '../.env' }).parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
}, {});

module.exports = {
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
        path: path.join(__dirname, '/public'),
        publicPath: '/',
        filename: 'index_bundle.js'
    },
    devServer: {
        hot: true,
        port: 3000
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                loaders: 'style-loader!css-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
                    }, 
                    {
                        loader: 'css-loader'
                    },
                     {
                        loader: 'sass-loader'
                     }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg|ttf|woff|woff2)$/i,
                use: 'url-loader'
              }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: true
            }
        }),
        new CopyWebpackPlugin({
            patterns: [
                {from: './public', to: '../public'}
            ]
        }),
        new webpack.DefinePlugin(envKeys)
    ]
};