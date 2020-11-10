const fs = require("fs");
const path = require("path");

const CopyPlugin = require("copy-webpack-plugin");
let plugins = [];
const baseFrom = "mocks";
const baseTo = "api";

function filter(resourcePath) {
    let pathAsArray = resourcePath.split(path.sep);
    let fileName = pathAsArray[pathAsArray.length - 1];
    // filter out data
    return fileName.match(/.json$/gm) && !fileName.match(/data/gm);
}

async function transformPath(targetPath, resourcePath) {
    let pathAsArray = resourcePath.split(path.sep);
    let fileName = pathAsArray[pathAsArray.length - 1];
    // mixin without id in json workaround (use name)
    let tempId = fileName.split(".");
    let data = await fs.promises.readFile(resourcePath);
    let stringData = data.toString();
    let json = JSON.parse(stringData);
    let id = json.id || tempId[0];
    let targetPathArray = targetPath.split(path.sep);
    return (
        targetPathArray[0] +
        path.sep +
        targetPathArray[1] +
        path.sep +
        id +
        path.sep +
        "configuration"
    );
}

plugins.push(
    new CopyPlugin({
        patterns: [
            {
                from: baseFrom + path.sep + "dashboards",
                to: baseTo + path.sep + "dashboards",
                filter: filter,
                transformPath: transformPath
            },
            {
                from: baseFrom + path.sep + "widgets",
                to: baseTo + path.sep + "widgets",
                filter: filter,
                transformPath: transformPath
            },
            {
                from: baseFrom + path.sep + "mixins",
                to: baseTo + path.sep + "mixins",
                filter: filter,
                transformPath: transformPath
            }
        ]
    })
);

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
    plugins,
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
