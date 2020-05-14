const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')

module.exports = {
    publicPath: './',//修改路径，防止打包空白
    devServer: {
        host: '127.0.0.1',
        port: '1019',//修改启动端口
    },
    // 设置代理proxy
    // proxy: {
    //    '/api':{
    //        target:'http://101.200.229.64:9091',
    //        changeOrigin:true,    //表示是否跨域，
    //        pathRewrite:{           //表示需要rewrite重写的
    //            '^/api':'',
    //        }
    //    }
    // }   
}