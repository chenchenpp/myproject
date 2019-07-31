const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
module.exports={
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
}