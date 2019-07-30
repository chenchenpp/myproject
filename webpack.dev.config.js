var path=require('path')
var devBuildPath=path.resolve(__dirname,'./build')
module.exports={
    entry: {
        index: './src/index.js'
    },
    output: {
        path: devBuildPath,
        publicPath: '/',
        filename: 'bundle.js',    // [name]表示entry每一项中的key，用以批量指定生成后文件的名称
        chunkFilename: '[id].bundle.js',
    },
    module: require("./webpack-config/module.dev.config"),
    plugins: require("./webpack-config/plugins.dev.config.js"),
    devServer: require('./webpack-config/server.dev.config.js')
}