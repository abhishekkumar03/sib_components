var path = require('path');

module.exports = {
    entry: ["./app/templates-router.js", "whatwg-fetch"],
    output: {
        filename: "../assets/js/dependencies/templates-bundle.js",
        sourceMapFilename: "../assets/js/dependencies/templates-bundle.map"
    },
    devtool: '#cheap-module-source-map',
    module: {
        loaders: [
            {
                loader: 'babel',
                exclude: /node_modules/
            },
            { test: /\.css$/, loader: "style-loader!css-loader" },
        ]
    }
}
