const path = require('path');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const mode = 'development';

const config = {
    mode: mode,
    entry: { 
        content: path.join(__dirname, 'dev', 'content.js'), 
        background: path.join(__dirname, 'dev', 'background.js'),
        options: path.join(__dirname, 'dev', 'options.js')
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
              test: /\.scss$/,
              use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            },
            {
              test: /\.html$/,
              loader: "html-loader",
              exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(["dist"]),
        new CopyWebpackPlugin([{
            from: "dev/manifest.json"
        }]),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "dev", "options.html"),
            filename: "options.html",
            chunks: ["options"]
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "dev", "background.html"),
            filename: "background.html",
            chunks: ["background"]
        })
    ],
    devtool: "source-map"
};

module.exports = config;
