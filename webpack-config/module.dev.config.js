var path=require('path');
var SRCPATH=path.resolve(__dirname,'../src')
module.exports={
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
            include: path.resolve(__dirname,'../src/images'),
            loader: 'file-loader',
            options: {
                outputPath: 'images/'
            }
        }
    ]
}