let serverHttp='http://172.16.16.11:8080';
const path=require('path')
module.exports={
    contentBase: path.resolve(__dirname,'../build'),
    port: 8089,
    host: 'local.happyeasygo.com',
    hot: true,
    compress: true,
}