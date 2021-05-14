/**
 * webpack配置文件
 */
//自动清除dist 
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
//引入 提取js中的css代码的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//将css文件及代码进行极致压缩s
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

const {
    Hash
} = require('crypto');
const path = require('path');
console.log(path.resolve());
//引入html打包的插件 
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 引入 webpack
// const webpack = require('webpack');
// 把webpack的配置暴露出去
module.exports = {
    // 1. 入口
    entry: {
        home: './src/js/home.js',
        login: './src/js/login.js',
        register: './src/js/register.js'
    },
    // 2. 出口
    output: {
        path: path.resolve(__dirname, 'dist'), // 输出路径 必须是绝对路径
        filename: 'js/[name].js', // 输出的文件名
        publicPath: './', //打包完成之后的html文件引入其他资源的基础路径（相对路径）
    },
    // 3. 配置loader
    module: {
        // 配置loader规则
        rules: [{
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
            }, {
                test: /\.html$/, //配置html文件打包
                loader: 'html-loader'
            },
            // 配置图片 
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        // 重命名 图片 长度16位的随机字符串   ext ：原来的文件名
                        name: '[hash:16].[ext]',
                        // 限制 小于指定800*1024的才可以进行打包  
                        limit: 10 * 1024,
                        esModule: false,
                        outputPath: 'img'
                    },
                }, ],
            },
            // es6为es5
            {
                test: /\.js$/,
                loader: 'babel-loader', // loader 编译es6为es5
                exclude: /node_modules/ // 排除
            },
            // 打包字体图标
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader'
            }
        ],
    },



    // 4. 插件
    plugins: [
        new HtmlWebpackPlugin({ //配置html打包的插件
            template: './src/home.html', //以哪个html文件作为打包的模板
            filename: 'home.html',
            chunks: ['home']
        }),
        new HtmlWebpackPlugin({ //配置html打包的插件
            template: './src/login.html', //以哪个html文件作为打包的模板
            filename: 'login.html',
            chunks: ['login']
        }),
        new HtmlWebpackPlugin({ //配置html打包的插件
            template: './src/login.html', //以哪个html文件作为打包的模板
            filename: 'register.html',
            chunks: ['register']
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css' // 动态输出到css文件夹里
        }),
        new OptimizeCssAssetsWebpackPlugin(),
        // // 引入path模块，path是node内置的模块 主要用于处理路径拼接  ;
        //plugin 添加
        new CleanWebpackPlugin()

    ],
    //热更新
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'), // 启动服务器目录
        compress: true, // 启动gzip
        port: 666, // 端口  8080 80  8081 8082
        open: true, // 自动打开服务
        publicPath: '/', // 静态资源查找路径
        openPage: 'home.html', // 打开的页面
    },
    target: 'web', // 目标是浏览器

    // 5. 模式
    //修改webpack.config.js 中的mode 获取当前环境的变量
    mode: process.env.NODE_ENV // 开发模式 development 生产模式 production
}