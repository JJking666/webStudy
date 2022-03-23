const path = require('path')
const webpack = require("webpack")
const glob = require('glob');
const chalk = require('chalk')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')        //部分资源不需要打包，只需要拷贝时使用
const DefaultWebpackPlugin = require('webpack')                 //webpack内置插件,设置默认属性
const { CleanWebpackPlugin } = require('clean-webpack-plugin')      //删除之前打包的文件
const HtmlWebpackPlugin = require('html-webpack-plugin')        //创建一个 html 文件，并把 webpack 打包后的静态文件自动插入到这个 html 文件当中。
module.exports = {
    mode: 'development',
    entry: {
        main: './src/js/index.js',
        index: './src/index.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]-bundle.js'
    },
    devServer:{
        host:'localhost',
        port: 3000,
        hot:true,
        open: true,
        compress: true,
        //openPage:[]   打开浏览器后默认的页面，若为数组则打开多个页面
    },
    resolve:{
        alias:{
            '@':path.join(__dirname, 'src'),
            'cs':path.join(__dirname, 'src/css')
        },
        extensions:['.css', '.js','.less']
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, {
                    loader: 'css-loader', options: {
                    }
                }]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {

                        }
                    }, 'less-loader']
            },
            {
                test: /\.(gif|jpg|png|jpeg|svg)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                      maxSize: 10000
                    }
                  },
                generator: {
                    filename: 'images/chunk-[contenthash:4][ext]'
                }
            },{
                test: /\.js$/,
                exclude: /node_modules/,
                use:'babel-loader'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'styles/[name][hash:4].css'
        }),
        new ProgressBarPlugin({
            format: ` build [:bar] ${chalk.green.bold(':percent')} (:elapsed seconds)`,
          })
    ]
}