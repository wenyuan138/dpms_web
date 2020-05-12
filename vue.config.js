const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')

module.exports = {
    publicPath: './',//修改路径，防止打包空白
    devServer: {
        host: '127.0.0.1',
        port: '1019',//修改启动端口
    },
}