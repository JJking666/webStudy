<!--
 * @Descripttion:
 * @version:
 * @Author: congsir
 * @Date: 2022-07-23 22:54:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-12 23:00:51
-->
> vuex和localstorage区别

+ 保存位置不同，vuex保存在浏览器内存，localstorage在本地文件
+ `vuex的数据可以进行响应式，localstorage不能`
+ vuex的全局状态管理可追踪，方便管理一目了然，而localstorage容易使数据混乱，难以管理
+ 安全性vuex更强，localstorage容易被用户直接查看
+ localstorage只能保存字符串(对象需要先json.stringify)
+ vuex一般是用作组件的状态管理，localstorage用作页面间数据保存
+ 生命周期不同
+ 保存内存大小不同

> 什么是“沙箱”

也称作：“沙箱/沙盒/沙盘”。沙箱是一种安全机制，为运行中的程序提供隔离环境。通常是作为一些来源不可信、具破坏力或无法判定程序意图的程序提供实验之用。沙箱能够安全的执行不受信任的代码，且不影响外部实际代码影响的独立环境。

即使变量访问的作用域局限在一个范围，不让它访问更上层作用域，不去影响外部实际代码

> babel 是什么，原理了解吗

Babel 是一个 JavaScript 编译器。他把最新版的 javascript 编译成当下可以执行的版本，简言之，利用 babel 就可以让我们在当前的项目中随意的使用这些新最新的 es6，甚至 es7 的语法。
Babel 的三个主要处理步骤分别是： 解析（parse），转换（transform），生成（generate）。

解析
将代码解析成抽象语法树（AST），每个 js 引擎（比如 Chrome 浏览器中的 V8 引擎）都有自己的 AST 解析器，而 Babel 是通过 Babylon 实现的。在解析过程中有两个阶段：词法分析和语法分析，词法分析阶段把字符串形式的代码转换为令牌（tokens）流，令牌类似于 AST 中节点；而语法分析阶段则会把一个令牌流转换成 AST 的形式，同时这个阶段会把令牌中的信息转换成 AST 的表述结构。

转换
在这个阶段，Babel 接受得到 AST 并通过 babel-traverse 对其进行深度优先遍历，在此过程中对节点进行添加、更新及移除操作。这部分也是 Babel 插件介入工作的部分。

生成
将经过转换的 AST 通过 babel-generator 再转换成 js 代码，过程就是深度优先遍历整个 AST，然后构建可以表示转换后代码的字符串。

链接：https://juejin.cn/post/7004638318843412493