const webpack=require('webpack')
const merge=require('webpack-merge')
var path=require('path')
var SRCPATH=path.resolve(__dirname,'./src')
const { CleanWebpackPlugin }=require('clean-webpack-plugin')
const HtmlWebpackPlugin= require('html-webpack-plugin')
const developmentConfig= require('./webpack-config/webpack-dev-config.js')
const productionConfig= require('./webpack-config/webpack-pro-config.js')
const commonConfig={
    entry: {
        index: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname,'./build'),
        publicPath: '/',
        filename: 'bundle.js',    // [name]表示entry每一项中的key，用以批量指定生成后文件的名称
        chunkFilename: '[id].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                include: SRCPATH,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                include: SRCPATH,
                loader: 'html-loader',
            },
            {
                test: /\.css$/,
                include: SRCPATH,
                use: [{
                        loader: 'style-loader',
                    },{
                        loader: 'css-loader'
                    }
                ]
            },
            {
                test: /\.less$/,
                include: SRCPATH,
                use: [{
                    loader: 'style-loader',
                },{
                    loader: 'css-loader'
                },{
                    loader: 'less-loader'
                }]
            },
            {
                test: /\.(png|jpg|gif)$/,
                include: SRCPATH,
                loader: 'file-loader',
                options: {
                    outputPath: 'images/'
                }
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $:'jquery',
            _:'underscore'
        }),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: path.resolve(__dirname,'./src/index.html')
    
        }),
        new CleanWebpackPlugin()
    ],
    // devServer: require('./webpack-config/server.dev.config.js')
}
module.exports= env=> {
    let config = env==='development'?developmentConfig:productionConfig;
    return merge(commonConfig,config)
}