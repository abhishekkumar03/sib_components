var path = require('path');

module.exports = {
    entry: ["./app/campaigns-router.js", "whatwg-fetch"],
    output: {
        filename: "../assets/js/dependencies/campaigns-bundle.js",
        sourceMapFilename: "../assets/js/dependencies/campaigns-bundle.map"
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
