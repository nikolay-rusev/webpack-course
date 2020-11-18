let express = require("express");
let path = require("path");

const server = express();
const webpack = require("webpack");
const config = require("../../config/webpack.dev.js");
const compiler = webpack(config);
const webpackDevMiddleware = require("webpack-dev-middleware")(compiler);
const webpackHotMiddleware = require("webpack-hot-middleware")(compiler);
const staticMiddleware = express.static("public");

server.use(webpackDevMiddleware);
server.use(webpackHotMiddleware);
server.use(staticMiddleware);

server.listen(8080, () => {
    console.log("Server is listening");
});
