var path = require('path');

module.exports = {
    entry: ["./app/marketing/contacts-router.js", "whatwg-fetch"],
    output: {
        filename: "./example/assets/js/dependencies/bundle.js",
        sourceMapFilename: "./example/assets/js/dependencies/bundle.map"
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
