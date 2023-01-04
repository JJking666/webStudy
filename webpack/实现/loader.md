<!--
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-11-06 12:43:25
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-11-06 23:39:03
 * @FilePath: \webStudy\webpack\实现\loader.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

### loader和plugin实现

https://juejin.cn/post/6871239792558866440

### loader 

+ 本质是函数，参数接受webpack传入的文件源
+ 函数中的this是webpack提供的对象，能够获取当前loader需要的信息
+ 异步操作通过this.callback返回，返回值是string或者buffer

```ts
function loader( source ){
    const content = doSomething( source) //进行翻译操作
    const option = this.query             //如果loader配置了options，this.query将指向 options
    const context = this.context            //可以用作解析其他模块路径的上下文

    /*
     * this.callback 参数：
     * error：Error | null，当 loader 出错时向外抛出一个 error
     * content：String | Buffer，经过 loader 编译后需要导出的内容
     * sourceMap：为方便调试生成的编译后内容的 source map
     * ast：本次编译生成的 AST 静态语法树，之后执行的 loader 可以直接使用这个 AST，进而省去重复生成 AST 的过程
     */
    
    this.callback(null, content, sourceMap, ast)    //异步操作
    return content  //同步操作
}
```
一般在编写loader的过程中，保持功能单一，避免做多种功能

如less文件转换成 css文件也不是一步到位，而是 less-loader、css-loader、style-loader几个 loader的链式调用才能完成转换

```ts
//loader.js
function (source) {
    return source.replace(/var/g, 'const')
}

//待测试文件
function test() {
    var a = 1;
    var b = 2;
    var c = 3;
    console.log(a, b, c);
}

test()

//webpack中
const path = require('path')

module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: path.resolve('./src/loader.js'),
                    },
                ]
            }
        ]
    },
}

```
打包后 var 已经变成了 const

异步loader
```ts
function (source) {
    const callback = this.async()

    // 由于有 3 秒延迟，所以打包时需要 3+ 秒的时间
    setTimeout(() => {
        callback(null, `${source.replace(/;/g, '')}`)
    }, 3000)
}
```

### plugin

+ webpack打包流程会有很多广播很多事件，插件通过监听这些事件在特定时候执行自己的任务
+ 规范
  + 插件的本质是函数或者包含apply方法的对象，这样才能访问compiler实例
  + 异步的事件需要在插件处理完任务时调用回调函数通知 Webpack 进入下一个流程，不然会卡住

> Compiler 和 Compilation 在插件开发中最重要的两个资源就是 compiler 和 compilation 对象。理解它们的角色是扩展 webpack 引擎重要的第一步。
> compiler 对象代表了完整的 webpack **环境配置**。这个对象在启动 webpack 时被一次性建立，并配置好所有可操作的设置，包括 options，loader 和 plugin。当在 webpack 环境中应用一个插件时，插件将收到此 compiler 对象的引用。可以使用它来访问 webpack 的主环境。
> compilation 对象代表了当前构建编译的**资源内容**。当运行 webpack 开发环境中间件时，每当检测到一个文件变化，就会创建一个新的 compilation，从而生成一组新的编译资源。一个 compilation 对象表现了当前的模块资源、编译生成资源、变化的文件、以及被跟踪依赖的状态信息。compilation 对象也提供了很多关键时机的回调，以供插件做自定义处理时选择使用。


+ 一个 JavaScript 命名函数。
+ 在插件函数的 prototype 上定义一个 apply 方法。
+ 指定一个绑定到 webpack 自身的事件钩子。
+ 处理 webpack 内部实例的特定数据。
+ 功能完成后调用 webpack 提供的回调。


```ts
class Plugin {
    apply(){
        //找到合适的事件钩子，实现功能
        compiler.hooks.emit.tap('Plugin', compilation => {
            console.log(compilation)        //compilation是打包流程的上下文
            //do something
        })
    }
}