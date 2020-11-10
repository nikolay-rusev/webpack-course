const path = require("path");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        main: "./src/main.js"
    },
    mode: "development",
    output: {
        filename: "[name]-bundle.js",
        path: path.resolve(__dirname, "../dist"),
        publicPath: "/"
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: 'mocks', to: 'dest' },
                { from: 'other', to: 'public' },
            ],
        }),
    ],
    devServer: {
        contentBase: "dist",
        overlay: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [{ loader: "babel-loader" }],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [{ loader: "style-loader" }, { loader: "css-loader" }]
            },
            {
                test: /\.html$/,
                use: [
                    { loader: "file-loader", options: { name: "[name].html" } },
                    { loader: "extract-loader" },
                    {
                        loader: "html-loader",
                        options: {
                            attributes: {
                                list: [
                                    {
                                        tag: "img",
                                        attribute: "src",
                                        type: "src"
                                    }
                                ]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|gif|png)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "images/[name].[ext]"
                        }
                    }
                ]
            }
        ]
    }
};
