const path=require('path')
const webpack=require('webpack')
const { CleanWebpackPlugin }=require('clean-webpack-plugin')
const staticRootPath=path.resolve(__dirname,'../')
const HtmlWebpackPlugin= require('html-webpack-plugin')
module.exports=[
    new webpack.ProvidePlugin({
        $:'jquery',
        _:'underscore'
    }),
    new HtmlWebpackPlugin({
        filename: './index.html',
        template: path.resolve(__dirname,'../src/index.html')

    }),
    new CleanWebpackPlugin()
]
