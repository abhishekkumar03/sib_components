var path = require('path');
var webpack = require('webpack');

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
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: true
            }
        })
    ]
}
