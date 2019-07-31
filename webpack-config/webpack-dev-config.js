let serverHttp='http://172.16.16.11:8080';
const path=require('path')
const eslintFriendlyFormatter=require('eslint-friendly-formatter')
module.exports={
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "eslint-loader",
                enforce: "pre",
                include: path.resolve(__dirname,'../src'),
                options: {
                    formatter: eslintFriendlyFormatter
                }
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname,'../build'),
        port: 8089,
        host: 'local.happyeasygo.com',
        hot: true,
        compress: true,
    }
}
    