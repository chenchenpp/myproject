const webpack=require('webpack')
const merge=require('webpack-merge')
var path=require('path')
var SRCPATH=path.resolve(__dirname,'./src')
const { CleanWebpackPlugin }=require('clean-webpack-plugin')
const HtmlWebpackPlugin= require('html-webpack-plugin')
const developmentConfig= require('./webpack-config/webpack-dev-config.js')
const productionConfig= require('./webpack-config/webpack-pro-config.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
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
                include: [
                    SRCPATH,
                    /(node_modules)/
                ],
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                        // you can specify a publicPath here
                        // by default it uses publicPath in webpackOptions.output
                        publicPath: '../',
                        },
                    },
                    'css-loader',
                    // 'style-loader'
                ],
            },
            {
                test: /\.less$/,
                include: SRCPATH,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                        // you can specify a publicPath here
                        // by default it uses publicPath in webpackOptions.output
                        publicPath: '../',
                        },
                    },
                    'css-loader',
                    'less-loader'
                ],
            },
            {
                test: /\.(png|jpg|gif)$/,
                include: SRCPATH,
                loader: 'file-loader',
                options: {
                    outputPath: 'images/'
                }
            },
            {
                // 专供iconfont方案使用的，后面会带一串时间戳，需要特别匹配到
                test: /\.(woff|woff2|svg|eot|ttf|otf)$/,
                include: path.resolve(__dirname, './src/fonts/font/fonts'),
                use: [{
                    loader: 'file-loader'
                }]
                
            }
        ]
    },
    resolve: {
        extensions: ['.js','.json','.vue','css'],
        alias: {
            '@': path.resolve(__dirname,'./src')
        }
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
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        })
    ],
    // devServer: require('./webpack-config/server.dev.config.js')
}
module.exports= env=> {
    let config = env==='development'?developmentConfig:productionConfig;
    return merge(commonConfig,config)
}