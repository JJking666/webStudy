const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require("webpack")
// const glob = require('glob');
//const CopyWebpackPlugin = require('copy-webpack-plugin')        //部分资源不需要打包，只需要拷贝时使用
const DefaultWebpackPlugin = require('webpack')                 //webpack内置插件,设置默认属性
const {CleanWebpackPlugin} = require('clean-webpack-plugin')      //删除之前打包的文件
const HtmlWebpackPlugin = require('html-webpack-plugin')        //创建一个 html 文件，并把 webpack 打包后的静态文件自动插入到这个 html 文件当中。
module.exports = {
    mode: 'development',
    watch: true,
    entry: ['@babel/polyfill', path.resolve(__dirname, 'src/index.js')],
    // devtool: false,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'main.js',
        clean: true
    },
    devServer: {
        static: [
            {
                directory: path.join(__dirname, 'public'),
            },
            {
                directory: path.join(__dirname, 'src'),
            },
        ],
        host: 'localhost',
        hot: true,
        compress: true,
        port: 4000,
        open: true
    },
    module: {
        rules: [
            {
                test: /\.(jpg|png|gif|svg)$/,
                type:'asset',
                generator:{
                    filename: 'img/[name][hash:4][ext]'
                },
                parser:{
                    dataUrlCondition:{
                        maxSize:30*1024
                    }
                }
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader','less-loader']
            },
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles/[name].css',
            chunkFilename: '[id].css'
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'htmlWeb.html',
        }),
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(),
        // new webpack.DefinePlugin({ // webpack自带该插件，无需单独安装
        //     'process.env' : {
        //         NODE_ENV: process.env.NODE_ENV // 将属性转化为全局变量，让代码中可以正常访问
        //     }
        // })
    ],
}