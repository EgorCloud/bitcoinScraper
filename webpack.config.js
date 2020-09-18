const path = require("path")
const fs = require("fs")
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');

const config = {
    entry: "./src/index.js",
    mode: "production",
    output: {
        path: path.join(__dirname, "build"),
        filename: "[name].js",
    },
    target: "node",
    externals: [nodeExternals()],
    node: {
        console: false,
        global: false,
        process: false,
        Buffer: false,
        __filename: false,
        __dirname: false,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    cache: true,
                },

            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-object-rest-spread']
                    }
                }
            },
            {
                test: /\.json$/,
                loader: "json",
            },
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets' }
            ],
        }),
    ],
}

module.exports = config