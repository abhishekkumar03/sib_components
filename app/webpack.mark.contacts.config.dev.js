var path = require('path');

module.exports = {
    entry: ["./marketing/contacts/router.js", "whatwg-fetch"],
    output: {
        filename: "../../../../assets/js/dependencies/contacts-bundle.js",
        sourceMapFilename: "../../../../assets/js/dependencies/contacts-bundle.map"
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
