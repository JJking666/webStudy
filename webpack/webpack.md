# webpack.config.js 中

- loader 对于 css 的转换：less—>less-loader-css->css-loader>style->style->loader->让网页识别
- 注意 loader 的顺序是从右往左或从下往上执行

```ts
module: {
        rules: [
            {
                test: /\.css$/,  //匹配以.css结尾
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,  //匹配以.css结尾
                use: ['style-loader', 'css-loader', 'less-loader']    //从右往左执行
            }
        ]
    },
```

- entry (待打包的)文件入口
- output filename 是打包后的文件名，path 是打包后输出的路径(打包后放哪)，且 path 需要使用**绝对路径**
- path.resolve(\_\_dirname,'xxx)能够使我们不需要用绝对路径，但需要引入 path
- output 的 publicPath 设置后对本地资源访问的路径是域名+publicPath+filename(如 localhost:8080/xxx/indexjs),一般设置为/即可
- output 的 publicPath 是用来告诉打包后 index.html 的在哪找引入的静态资源

```ts
const path =require('path')
output:{
        filename:'build.js',
        path:path.resolve(__dirname,'dist'),
        publicPath:'/'      //开启server服务后对本地资源进行访问(默认值是空字符)
    }


```

- browserslist 放在 package.json 或者根目录下的.browserslist 配置文件，用来根据条件获取兼容的网页

```ts
{
  "browserslist": [
    "last 1 version",   //最新版本
    "> 1%",     //使用率大于1%
    "maintained node versions", //所有还被node协会维护的版本
    "not dead" //两年内更新过
  ]
}
```

- postcss 是用来对 css 作多个不同浏览器兼容的工具(如在 css 中加入兼容的前缀)，但是需要引入插件才能使用(如加前缀的插件 autoprefixer)
- 注意 postcss 处理的是 css,故 less-loader 应先处理再用 postcss-loader 处理产物 css
- postcss 需要有插件才能实现功能，插件放在 options 里

```ts
{
    test: /\.css$/,  //匹配以.css结尾
    use: [
        'style-loader',
        'css-loader',
        {
            loader: 'postcss-loader',
            options: {      //postcss-loader配置
                postcssOptions:{
                    plugins:['postcss-preset-env']     //该插件包含了很多常用插件，方便使用
                }
            }
        },
        'less-loader'
    ]
}
```

- 因为 postcss 比较冗余，故也可以在根目录下统一配置(postcss.config.js)

```ts
module.exports={
    plugins:[
        require('postcss-preset-env')
        require('autoprefixer')
    ]
}
//之后webpack.config.js中则可简写为'postcss-loader'
```

- importLoaders 为什么使用：在对 css 文件进行@import 引入 或者@media 或者 url 时，若样式需要加兼容性前缀，那么就应该通过 postcss-loader 处理，但是 postcss-loader 在处理完当前样式时，会使用 css-loader 继续转换，而对于@import 的 css 文件，postcss-loader 无法回过头重新对 css 文件样式进行处理，故会出现问题，故引入 importLoader

```ts
"style-loader",
  // 'css-loader',
  {
    loader: "css-loader",
    options: {
      importLoaders: 1, //为0则无用,为1表示回到前一步loader进行转换，为n表示回到前n步loader进行转换
    },
  },
  "less-loader";
```

//注意点

- file-loader 在 js 中加入图片节点并设置 src，打包后会无法识别图片资源，也需要做转换
- webpack 通常情况下也无法处理图片资料
- 在 js 引入的 css 中的背景图片等，是由 css-loader 处理而非 file-loader,它会将 url 处理返回 esModule 故应将 css-loader 配置下 esModule 设置为 false

```ts
import img1 from "xxx";
import "xxx.css";
function xx() {
  const item = document.createElement("img");
  item.src = require("xxx.jpg").default; //默认情况下
  item.src = require("xxx.jpg"); //在webpack下对图片资源添加esModule配置设置false
  item.src = img1; //直接引入图片
}
```

```ts
{
    test:/\.(png|jpg|svg|jpe|gif)$/,
    use:[{
        loader:'file-loader',
        options: {
            esModule:false
        }
    }]
}
    test: /\.css$/,  //匹配以.css结尾
    use: [
        'style-loader',
        // 'css-loader',
        {
            loader: 'css-loader',
            options: {
                esModule:false,
                importLoader: 1  //为0则无用,为1表示回到前一步loader进行转换，为n表示回步loader进行转换
            }
        },
        'postcss-loader'
    ]
},
```

- file-loader 的文件名配置
  - [name] 文件名
  - [hash:n] 以文件内容结合算法生成 hash 值 n 为 hash 值保留个数
  - [ext] 扩展名
  - [contentHash] 和 hash 基本一样
  - [path] 文件路径

```ts
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
}
```

- url-loader 将图片资源转成 base64 uri 的方式放在文件中，减少资源请求次数
- file-loader 将图片资源拷贝到指定文件 增加资源请求次数
- url-loader 内部也可以调用 file-loader
- limit 配置 设置大于该值的图片拷贝到指定文件，小于的转成 base64

```ts
{
    test:/\.(png|jpg|svg|jpe|gif)$/,
    use:[{
        loader:'url-loader',
        options: {
            name:'[name].[hash:6].[ext]',
            limit: 25 * 1024    (25KB)
        }
    }]
}
```

### asset 模块

- asset 模块用来简化 file-loader ,url-loader 等 loader(处理图片资源)的使用
- asset module type 资源类型模块
- 四大功能
  - asset/resource -> file-loader
  - asset/inline -> url-loader
  - asset/source -> raw-loader
  - asset

```ts
{
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
}
```

### plugins 插件

- loader 是对文件为对象的转换器，能加载和处理文件
- plugin 不直接操作文件，赋予了 webpack 各种灵活的功能
- plugin 的实现一般是 class，故以 new xx()形式放在插件中
- plugin 使用前需要 require 引入

```ts
const DefaultWebpackPlugin = require('webpack')                 //webpack内置插件,设置默认属性
const ClearWebpackPlugin = require('clear-webpack-plugin')      //删除之前打包的文件
const HtmlWebpackPlugin = require('html-webpack-plugin')        //创建一个 html 文件，并把 webpack 打包后的静态文件自动插入到这个 html 文件当中。
entry: './src/index.js',
output: {},
module: {},
plugins:[
        new ClearWebpackPlugin(),
        new HtmlWebpackPlugin({
            title:'titleName',                  //修改生成html里的标题
            template:'./public/index.html'          //安照public里的模板生成html
        }),
        new DefaultWebpackPlugin({
            BASE_URL:'"./"'                     //注意字符串需要加上"""
        })
    ]
```

## babel

- Babel 是将 ES6 及以上版本的代码转换为 ES5 的工具。
- 它用 babel.config.js 或 .babelrc 文件作为配置文件，其中最为重要的配置参数是 presets 和 plugins。
- plugins：Babel 插件可以将输入源码进行转换，输出编译后的代码。
- presets：一组 Babel 插件集合，目的是方便使用。官方已经内置了一些 preset，如 babel-preset-env。

```ts
{
    test:/\.js$/,
    use:[
        {
            loader:'babel-loader',
            options:{
                presets:[
                    '@babel/preset-env',
                    {targets: 'chrome 91'}  //兼容浏本  与.browserslistrc同时存在时以targ主,但为了全局复用,一般将兼容版本写在.browserslistrc
                ]
            }
        }
    ]
}
```

- 因为 babel 使用分包管理，因此更加推荐把 babel 用 babel.config.js 的方式全局管理

```ts
//babel.config.js中
module.exports = {
    presets:[
        '@babel/preset-env',
        {targets: 'chrome 91'}  //兼容浏本 browserslistrc同时存在时以targ主,但为了全局复用,兼容版本写在.browserslistrc
    ]
}
//webpack.config.js中
{
    test:/\.js$/,
    use:['babel-loader']
}
```

- polyfill 为什么使用:preset-env 能够完成大部分转换 es5 的功能，但还有小部分无法完成，故需要 polyfill 继续转换(类似补丁)
- polyfill 在 webpack4 中默认安装，但体积较大，故 webpack5 中是需要安装并按需配置
- polyfill 现在被拆成 core.js 和 generator-runtime,前者是处理语法功能，后者处理 async,await 等

```ts
//babel.config.js中
module.exports = {
  presets: [
    "@babel/preset-env",
    {
      //false 不对当前的js处理做polyfill填充(内存小)
      //useage 对当前的j根据需要做polyfill填充(内存中)
      //entry 对当前的js根据筛选的浏览器进行填充(因为兼容的浏览器可能需要填充其他函数，故填充后内存最大)
      useBuiltIns: false,
      corejs: 3, //默认版本是2，但是需要版本3
    },
  ],
};
```

- CopyWebpackPlugin 部分资源不需要打包，只需要拷贝时使用
- 因为配置了 htmlWebpackPlugin 以 index.html 为模板进行创建，会和 CopyWebpackPlugin 的拷贝文件重复，故要设置 ignore 忽略，注意路径前的\*\*/，代表 public/(官网要求)
- from 搭配的 to 一般省略，因为会默认找输出路径 output 下的 path

```ts
new CopyWebpackPlugin({
  patterns: {
    //配置
    from: "public", //对根目录下的public进行拷贝
    globOptions: {
      //全局配置
      ignore: "**/index.html", //忽略index.html
    },
  },
});
```

- 实现代码修改不需要刷新页面就能显示最新内容
  - 安装 live server 插件
  - 在 webpack.config.js 中设置 watch：true(默认 false)
  - 在 package.json 中设置
  - 不足:
    - 每次更新所有源代码会重新编译
    - 每次编译成功之后都需要进行读写，耗时
    - 有的编译器没有 live server 插件
    - 不能实现局部刷新
  - 最佳:在 package.json 中设置 serve

```ts
//webpack.config.js
module.exports = {
watch:true,
entry: './src/index.js',
output: {
    filename: 'build.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename:"img/[name].[hash:4][ext]",     //注[ext]前不需要加.
},
//package.json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "build":"webpack"
},
//package.json 最佳
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "build":"webpack",
  "serve":"webpack serve"
},
```

### webpack 实现热更新

- hmr

```ts
//webpack.config.js
devServer: {
  hot: true; //热更新开启，但默认情况下还是会刷新整个页面(所有页面)
}
//设置局部热更新
//title.js
console.log("title.js");
//index.js
import "./title.js";
if (module.hot) {
  //开启devServer下的hot则为true
  module.hot.accept(["title.js"], () => {
    //第一个参数数组是设置热更新的模块，第二个是更新后的回调函数
    console.log("title.js更新了");
  });
}
```

- vue 中设置热更新

```ts
//webpack.config.js
{
    test:/\.(png|jpg|svg|jpe|gif)$/,
    use:['vue-loader']          //14版本开箱即用，15版本需要引入vueloader插件，16版本支持的是vue3
}
//main.js
if(module.hot){                 //开启devServer下的hot则为true
    module.hot.accept(['title.js'],()=>{        //第一个参数数组是设置热更新的模块，第二个是更新后的回调函数
        console.log('title.js更新了')
    })
}
```

- 开发阶段时应屏蔽对浏览器的兼容(或修改 browserslistrc)，

```ts
//webpack.config.js
target: "web";
```

-

## devServer

- devServer 的 publicPath 是设置本地服务所在的目，一般设置为与 output 的 publicPath 相同

```ts
//index.js
<script type="text/javascript" src="/util.js"></script>
//webpack.config.js
devServer:{
        hot:true,
        publicPath:'/lg',
        contentBase:path.resolve(__dirname,'public'),    //若打包后的资源依赖其他(未打包)资源，告知其去哪(public/util.js)找(当前run serve时未打包)
        watchContentBase:true           //true时,监听并更新引入资源的修改
    },
devServer:{
    host:'0.0.0.0',               //设置主机地址默认值是localhost，如果希望其他地方也可以访问，可以设置为 0.0.0.0
        hot:true,
        publicPath:'/lg',
        hotOnly:true,               //页面下的组件出错后修改，重新编译，该页面不需要刷新
        port:4000,                  //指定服务端口号
        open:false,                 //每次编译是否打开新的端口
        compress:true,              //服务端可以把资源压缩再返回给客户端渲染
        historyApiFallback:true                        //解决SPA页面在history路由模式下，进行路由跳转之后进行页面刷新时，返回404的错误
    },
devServer: {
    historyApiFallback: {
        index: '/', // 默认返回的资源是index.html, 可以使用index属性修改默认返回的资源
        rewrites: [                           //若刷新页面后返回xx，按照匹配重新跳转
            { from: /^\/$/, to: '/views/landing.html' },
            { from: /^\/subpage/, to: '/views/subpage.html' },
            { from: /./, to: '/views/404.html' },
        ],
    },
},
```

### proxy(为了处理开发阶段的跨域问题)

```ts
proxy:{
    // api/users
    // http://localhost:4000/api/users
    '/api':{            //请求到 /api/xxx 现在会被代理到请求 http://localhost:3000/api/xxx, 例如 /api/user 现在会被代理到请求 http://localhost:3000/api/user
        target:'http://localhost:3000',
        pathRewrite:{"^api":""},            //请求到 /api/xxx 现在会被代理到请求 http://localhost:3000/xxx, 例如 /api/user 现在会被代理到请求 http://localhost:3000/user
        changeOrigin:true
    }
}
//代码多个路径代理到同一个target下
proxy: [{
    context: ['/auth', '/api'],
    target: 'http://localhost:3000',
}]
//解决跨域问题原理,changeOrigin参数, 是一个布尔值, 设置为true, 本地就会虚拟一个服务器接收你的请求并代你发送该请求,
proxy: {
    '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
    }
}
```

### resolve 解析模块

- 引入相对路径的文件时，根据当前文件的上下文查找该文件
- 引入绝对路径的文件时，根据根目录查找该文件
- 引入模块名时，在根目录下的 node_modules 下查找该模块

```ts
module.exports = {
  resolve: {
    extensions: [".js", "json", "jsx", "vue", "ts"], //当导入的文件没有后缀时，从数组中选择一个存在的补上，如存在html.js ，引入时'xxx/html'即可
    alias: {
      "@": path.resolve(__dirname, "src"), //给根目录下的src取别名为@,如src/component现在可写为@/component
    },
  },
};
```

## mode,devtool

- 开发的时候一定要用 development，因为追求的是打包速度，而不是体积；
- 发布上线的时候一定要用 production，因为上线追求的是体积小，而不是打包速度。
- 开发阶段,mode 设置为 development
- 浏览器加载 source-map 是通过 js 文件中的 sourceMappingRUL 来加载的，而且 sourceMapping 支持两种形式：文件路径或 base64 格式。
- 加载 source-map 之后，在浏览器 dev tool 中的 Sources 就能看到对应的信息代码 bug
- devtool:'eval'/'source-map'，后者能使得调试时直接定位到错误所在的文件，前者会定位到打包后总文件不利于调试

```ts
module.exports = {
  mood: "development",
  devtool: "source-map", //cheap-module-source-map更快找到代码文件，推荐用
};
```

- inline、hidden、eval 这几个模式是互斥的，描述的是 Source Map 的引入方式。
- cheap-module 不包含列信息，源码是开发时的代码
- nosources 使用这个关键字的 Source Map 不包含 sourcesContent，调试时只能看到文件信息和行信息，无法看到源码(保护代码)
- eval 生成代码和 Source Map 内容混淆在一起，通过 eval 输出。
- hidden 代码中没有 sourceMappingURL，浏览器不自动引入 Source Map。(定位不到 bug 所在文件，但是可用作生产环境下的调试)
- 开发阶段推荐使用
  - eval
  - eval-source-map
  - eval-cheap-source-map
  - eval-cheap-module-source-map
- 生产阶段：
  - none
  - source-map
  - hidden-source-map
  - nosources-source-map

## ts

- ts-loader 能将 ts 转译为 js，但不能针对浏览器对特性语法进行填充,若出现语法错误，打包前就会报错
- babel-loader 能将 ts 转译为 js 并针对浏览器对特性语法进行 polyfill 填充，但若出现语法错误,打包完成后打开页面后才能发现错误
- 两全其美的做法:使用 babel-loader 之前,先用 run tsc xx.ts 检验语法，成功之后再打包

```ts
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
//两全其美：
//package.json
{
    "build":"npm run go && webpack",
    "go": "tsc --noEmit"        //tsc转换ts成js，noEmit不生成对应的js
}
//webpack.config.js
{
    test:/\.ts$/,
    use:['babel-loader']
}
```

### vue

```ts
//webpack.config.js
{
    test:/\.vue$/,
    use:'vue-loader'
}
{
    test:/\.less$/,
    use:[
        'style-loader',
        {
            'css-loader',{          //对css中引入的less进行处理，返回lest-loader转换
                options:{
                    importLoaders:2
                }
            }
        },
        'postcss-loader',
        'less-loader'
    ]
}
plugins:{
    new VueLoaderPlugin()                   //版本15注意安装该插件，否则报错，版本14可不装
}
```

## 合并生产环境配置

- 先建立一个 config 文件存放不同环境下的配置
- 开发环境:webpack.dev.js
- 生产环境:webpack.prod.js
- 通用:webpack.common.js

```ts
//webpack.common.js
const { merge } = require("webpack-merge");
const devConfig = require("xx");
const prodConfig = require("xx");
const commonConfig = {};

module.exports = (env) => {
  //这里的env通过build:"webpack --env production"设置env.production为true，若设置--env development 那么env.development为true
  const isProduction = env.production;
  const config = isProduction ? prodConfig : devConfig;
  const mergeConfig = merge(commonConfig, config);
  return mergeConfig;
};
```

- 路径问题在 config 文件下设置 paths.js 目录

```ts
const path = require("path");
const appDir = process.pwd(); //当前终端的目录路径
const resolveApp = (path) => {
  return path.resolve(appDir, path);
};
module.exports = resolveApp;
```

# 多文件入口

```ts
entry: {
    main:path.resolve(__dirname,'../src/main.js'),
    header:path.resolve(__dirname,'../src/header.js')
},
plugins:[
  new HtmlWebpackPlugin({
    template:path.resolve(__dirname,'../public/index.html'),
    filename:'index.html',
    chunks:['main'] // 与入口文件对应的模块名
  }),
  new HtmlWebpackPlugin({
    template:path.resolve(__dirname,'../public/header.html'),
    filename:'header.html',
    chunks:['header'] // 与入口文件对应的模块名
  }),
]
```

### babel 和 polyfill

> 一个是转换语法，一个是实现功能，前者是开发依赖，后者是生产依赖

> babel 用来将 es6 及以上的语法转换成 es5 的，放在

> polyfill 用来实现浏览器不支持的原生功能的代码，如 es6 新增的 api(Array.from)

### 优化 css 去除无效样式

```ts
const PurifyCssWebpack = require("purify-css-webpack");
new PurifyCssWebpack({
  paths: glob.sync(path.join(__dirname, "public/*.html")), //步扫描所有html文件中所引用的css
});
```

## dev-server

```ts
 local: {
    mock: false,
    apiPrefix: `/prefix/`,		//请求地址的前缀(必须匹配否则不走代理)
    proxy: {
      "/prefix/": {
        target: "https://dev.benma-code.com",	//将当前域名更换https://dev.benma-code.com
        pathRewrite: { "^/prefix/": "/test2/api/enterprise-info-collect/" }, // 将/prefix/更换为/test2/api/enterprise-info-collect/
        secure: false, // 支持代理https，
        changeOrigin:true //允许修改域名
      },
    },
  },

```
