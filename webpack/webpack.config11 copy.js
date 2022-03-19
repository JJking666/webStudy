const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')        //部分资源不需要打包，只需要拷贝时使用
const DefaultWebpackPlugin = require('webpack')                 //webpack内置插件,设置默认属性
const ClearWebpackPlugin = require('clear-webpack-plugin')      //删除之前打包的文件
const HtmlWebpackPlugin = require('html-webpack-plugin')        //创建一个 html 文件，并把 webpack 打包后的静态文件自动插入到这个 html 文件当中。
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename:"img/[name].[hash:4][ext]",     //注意[ext]前不需要加.
        publicPath:'/lg'
    },
    devServer:{
        host:'0.0.0.0',               //设置主机地址默认值是localhost，如果希望其他地方也可以访问，可以设置为 0.0.0.0
        hot:true,
        publicPath:'/lg',
        hotOnly:true,               //页面下的组件出错后修改，重新编译，该页面不需要刷新
        port:4000,                  //是否打开浏览器
        open:false,                 //每次编译是否打开新的端口
        compress:true,              //服务端可以把资源压缩再返回给客户端渲染
        historyApiFallback:true                        //解决SPA页面在history路由模式下，进行路由跳转之后进行页面刷新时，返回404的错误
    },
    module: {
        rules: [
            {
                test: /\.css$/,  //匹配以.css结尾
                use: [
                    'style-loader',
                    // 'css-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            esModule:false,
                            importLoader: 1  //为0则无用,为1表示回到前一步loader进行转换，为n表示回到前n步loader进行转换
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions:{
                                plugins:['postcss-preset-env']      //该插件包含了很多常用插件，方便使用
                            }
                        }
                    }
                ]
            },
            {
                test: /\.less$/,  //匹配以.css结尾
                use: ['style-loader', 'css-loader', 'less-loader']    //从右往左执行
            },
            {
                test:/\.(png|jpg|svg|jpe|gif)$/,
                use:[{
                    loader:'file-loader',
                    options: {
                        esModule:false,
                        name:'[name].[hash:6].[ext]',
                        outputPath:'img'        //或者去掉该配置将name改为'img/[name]....'
                    }
                }]
            },
            {
                test:/\.(png|jpg|svg|jpe|gif)$/,
                use:[{
                    loader:'url-loader',
                    options: {
                        name:'[name].[hash:6].[ext]',
                        limit: 25 * 1024   // (25KB)
                    }
                }]
            },{
                test:/\.(png|jpg|svg|jpe|gif)$/,
                type:'asset/resource',
                generator:{
                    filename:'img/[name].[hash:4].[ext]'        //输出文件路径
                },
            },{
                test:/\.(png|jpg|svg|jpe|gif)$/,
                type:'asset/inline',
            },
            {
                test:/\.(png|jpg|svg|jpe|gif)$/,
                type:'asset',
                generator:{
                    filename:'img/[name].[hash:4].[ext]'        //输出文件路径
                },
                parser:{
                    dataUrlCondition:{                          //类似limit
                        maxSize:30*1024
                    }
                }
            },
            {
                test:/\.js$/,
                use:[
                    {
                        loader:'babel-loader',
                        options:{
                            presets:[
                                '@babel/preset-env',
                                {targets: 'chrome 91'}  //兼容浏览器版本 与.browserslistrc同时存在时以target为主
                            ]
                        }
                    }
                ]
            },
            {
                test:/\.ts$/,
                use:[
                    'ts-loader'
                ]
            },
            {
                test:/\.ts$/,
                use:['babel-loader']
            }
        ]
    },
    plugins:[
        new ClearWebpackPlugin(),
        new HtmlWebpackPlugin({
            title:'titleName',                  //修改生成html里的标题
            template:'./public/index.html'          //安照public里的模板生成html
        }),
        new DefaultWebpackPlugin({
            BASE_URL:'"./"'                     //注意字符串需要加上"""
        }),
        new CopyWebpackPlugin({
            patterns:{                              //配置
                from:'public',                      //对根目录下的public进行拷贝
                globOptions:{                       //全局配置
                    ignore:'**/index.html'          //忽略index.html
                }
            }
        })
    ]
        //xx,


}