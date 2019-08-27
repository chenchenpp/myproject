const webpack=require('webpack')
const merge=require('webpack-merge')
var path=require('path')
var SRCPATH=path.resolve(__dirname,'./src')
const { CleanWebpackPlugin }=require('clean-webpack-plugin')
const HtmlWebpackPlugin= require('html-webpack-plugin')
const developmentConfig= require('./webpack-config/webpack-dev-config.js')
const productionConfig= require('./webpack-config/webpack-pro-config.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const optimizeCssAssetsPlugin=require('optimize-css-assets-webpack-plugin')
const commonConfig={
    optimization: {
        minimizer: [
            new optimizeCssAssetsPlugin()//压缩css
        ]
    },
    entry: {
        index: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname,'./build'),//打包到哪个位置
        publicPath: '/',
        filename: '[name].bundle.js',    // 入口文件的输出文件
        chunkFilename: 'js/[id].bundle.js',//依赖的文件打包后的路径
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
                         /**
                         * style-loader 主要 将css 插入到head 的style 标签中内联
                         */
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                        },
                    },{
                       loader: 'css-loader',
                    },{
                        loader: 'postcss-loader',
                        options: {
                            plugins: ()=>{
                                require('autoprefixer')
                            }
                        }
                    }
                    // 'style-loader'
                ],
            },
            {
                test: /\.less$/,
                include: SRCPATH,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                        },
                    }, {
                        loader: 'css-loader',
                    }, {
                        loader: 'less-loader',
                    }
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
                    loader: 'file-loader',
                    options: {
                        outputPath: 'fonts/'//输出位置
                    }
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
        new CleanWebpackPlugin({     //是在每次build之前，清除dist目录
            cleanOnceBeforeBuildPatterns: [path.resolve(__dirname,'build')]
        }),
        new webpack.ProvidePlugin({ //在使用时将不再需要import和require进行引入，直接使用即可。
            $:'jquery',
            _:'underscore'
        }),
        new HtmlWebpackPlugin({
            title: 'smallChen的网站',//生成html文件的标题
            template: path.resolve(__dirname,'./src/index.html'),
            filename: 'index.html',//输出的html的文件名称
            hash: true//给生成的 js 文件一个独特的 hash 值
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: 'css/[id].css',//指定css打包到对应位置
        })
    ],
    // devServer: require('./webpack-config/server.dev.config.js')
}
module.exports= env=> {
    let config = env==='development'?developmentConfig:productionConfig;
    return merge(commonConfig,config)
}