<!--
 * @Descripttion:
 * @version:
 * @Author: congsir
 * @Date: 2022-07-23 22:54:12
 * @LastEditors: JJking666 1337802617@qq.com
 * @LastEditTime: 2023-01-31 15:33:22
-->

> vuex 和 localstorage 区别

- 保存位置不同，vuex 保存在浏览器内存，localstorage 在本地文件
- `vuex的数据可以进行响应式，localstorage不能`
- vuex 的全局状态管理可追踪，方便管理一目了然，而 localstorage 容易使数据混乱，难以管理
- 安全性 vuex 更强，localstorage 容易被用户直接查看
- localstorage 只能保存字符串(对象需要先 json.stringify)
- vuex 一般是用作组件的状态管理，localstorage 用作页面间数据保存
- 生命周期不同
- 保存内存大小不同

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

### 样式隔离

1. 给样式规则添加前缀（提高优先级，但是!important 会影响）
2. 添加隐藏 DOM(shadow DOM)类似 iframe,优点是能够完全隔离，缺点是在 ant 组件库 shadowDOM 可能会逃逸到主应用导致样式丢失，有些事件无法冒泡，与 React v17 前 事件机制有冲突

可以使用 shadowHostElement.attachShadow() 方法来将一个 shadow root 附加到调用方法的元素上。它接受一个配置对象作为参数，该对象有一个 mode 属性，值可以是 open 或者 closed：

`let shadowRoot = shadowHostElement.attachShadow({mode: 'open'});
let shadowRoot = shadowHostElement.attachShadow({mode: 'closed’});`
open 表示可以通过页面内的 JavaScript 来获取 Shadow DOM，例如使用 Element.shadowRoot 属性：

`let shadowRoot = shadowHostElement.shadowRoot;`
如果将 mode 设置为 closed，那么 elementRef.shadowRoot 将会返回 null。

```ts
// 使用 style 元素为 shadow DOM 添加样式
var style = document.createElement("style");
style.textContent = `
    .title {
        color: blue;
    }
`;
shadow.appendChild(style);

// 使用 link 标签为 Shadow DOM 添加样式
const linkElem = document.createElement("link");
linkElem.setAttribute("rel", "stylesheet");
linkElem.setAttribute("href", "style.css");
shadow.appendChild(linkElem);
```

### 沙箱

1.eval 会影响调用的上下文
2.geval 不会影响上下文，但是会直接在全局作用域下执行，变量等会挂到全局 3.严格 eval 可以读写上下文的变量，但是不能新增，代码执行为严格模式 4.严格 geval 同上，但是在全局作用域下执行
5.Function 相当于在全局作用域下创建一个匿名函数执行

第一种方式：iframe 1.先创建一个 iframe 标签，并添加到当前 document 2.然后通过 postmessage 和 onmessage 进行父子窗口通信 3.父窗口将执行代码发送给 iframe，iframe 接收后执行 4.执行后返回结果给父窗口

利用的是 iframe 的作用域与父窗口不同

```ts
const parent = window;
const frame = document.createElement("iframe");

// 限制代码 iframe 代码执行能力，实现跨域
frame.sandbox = "allow-same-origin";

const data = [1, 2, 3, 4, 5, 6];
let newData = [];

// 当前页面给 iframe 发送消息
frame.onload = function (e) {
  frame.contentWindow.postMessage(data);
};

document.body.appendChild(frame);

// iframe 接收到消息后处理
const code = `    return dataInIframe.filter((item) => item % 2 === 0)`;
frame.contentWindow.addEventListener("message", function (e) {
  const func = new frame.contentWindow.Function("dataInIframe", code);

  // 给副页面也送消息
  parent.postMessage(func(e.data));
});

// 父页面接收 iframe 发送过来的消息
parent.addEventListener(
  "message",
  function (e) {
    console.log("parent - message from iframe:", e.data);
  },
  false
);
```

第二种 with 和 proxy

```ts
function compileCode(code) {
  code = `with (sandbox) { ${code} }`; //待执行语句
  const fn = new Function("sandbox", code);
  return (sandbox) => {
    const proxy = new Proxy(sandbox, {
      // 拦截所有属性，防止到 Proxy 对象以外的作用域链查找。
      has(target, key) {
        return true;
      },
      get(target, key, receiver) {
        // 加固，防止逃逸
        if (key === Symbol.unscopables) {
          return undefined;
        }
        return Reflect.get(target, key, receiver);
      },
    });
    return fn(proxy);
  };
}
```

第三种 ses （仍在提案中，但可被使用）

### 语法环境，词法环境

### 执行上下文

全局上下文
函数执行上下文
Eval 函数执行上下文（少见）

执行上下文在创建阶段会 1.确定 this 值 2.创建词法环境 3.创建变量环境

```ts
function foo(){ var a = 1 let b = 2 { let b = 3 var c = 4 let d = 5 console.log(a) console.log(b) } console.log(b) console.log(c) console.log(d) } foo()

在执行到 let b = 2 时
词法环境 b = 2，变量环境 a=1，c=undefined

在执行到 console.log(a)时
词法环境 b = 3，d = 5, b = 2,变量环境 a = 1，c = 4

执行到 console.log(d)时
词法环境 b = 2,变量环境 a = 1，c = 4
```

获取变量值时会先搜索词法环境（栈顶到栈底），搜不到再搜变量环境（同）

简单记即块级变量和函数放在词法环境，全局变量放在变量环境

### 图片格式和特点

jpg / jpeg：
优点：能将图片压缩至很小的存储空间；对色彩信息的保留较好，适用于互联网传播。
缺点：有损压缩会降低图片数据质量。

png：
优点：支持高级别无损耗压缩；支持透明背景。
缺点：对旧浏览器和软件兼容性较差。

gif：
优点：支持动态和静态展示；图片存储空间小，加载速度快；支持透明背景。
缺点：有损压缩会降低图片数据质量。

psd:
优点：存储源文件信息方便修改；保留透明底、图层、路径、通道等 PS 处理信息。
缺点：需要专业图形处理软件打开；占用空间大。

TIFF:
优点：保存丰富的图像层次和细节；画面质量无损。
缺点：占用存储空间大。

#### eval 为什么不能使用

能够将传入的字符串作为 js 进行执行

- 编译效率低，速度慢
- ！eval 被调用时会被第三方看见作用域，不安全
- eval 有被篡改的可能，导致网页受到攻击

#### with 不推荐使用

能够改变作用域

- 如果进行了右查询且变量不存在那么会在全局创建新的变量，值为 undifined
- 性能弱

#### 路由懒加载原理

正常：
Webpack 打包时将所有路由对应资源打包到一个 js 文件中，在页面加载时请求该 js 文件
懒加载：
Webpack 打包时会将懒加载路由对应资源打包到一个独立 js 文件中，需要时在请求该 js 文件

### Service Worker

Service Worker 是运行在浏览器背后的独立线程，一般可以用来实现缓存功能，必须使用 https 因为涉及请求拦截

一般分为三个步骤：首先需要先注册 Service Worker，然后监听到 install 事件以后就可以缓存需要的文件，那么在下次用户访问的时候就可以通过拦截请求的方式查询是否存在缓存，存在缓存的话就可以直接读取缓存文件，否则就去请求数据。

```ts
// index.js
if (navigator.serviceWorker) {
  navigator.serviceWorker
    .register("sw.js")
    .then(function (registration) {
      console.log("service worker 注册成功");
    })
    .catch(function (err) {
      console.log("servcie worker 注册失败");
    });
}
// sw.js
// 监听 `install` 事件，回调中缓存所需文件
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("my-cache").then(function (cache) {
      return cache.addAll(["./index.html", "./index.js"]);
    })
  );
});
// 拦截所有请求事件
// 如果缓存中已经有请求的数据就直接用缓存，否则去请求数据
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then(function (response) {
      if (response) {
        return response;
      }
      console.log("fetch source");
    })
  );
});
```

### CSS 如何阻塞文档解析？

理论上，既然样式表不改变 DOM 树，也就没有必要停下文档的解析等待它们。然而，存在一个问题，JavaScript 脚本执行时可能在文档的解析过程中请求样式信息，如果样式还没有加载和解析，脚本将得到错误的值，显然这将会导致很多问题。所以如果浏览器尚未完成 CSSOM 的下载和构建，而我们却想在此时运行脚本，那么浏览器将延迟 JavaScript 脚本执行和文档的解析，直至其完成 CSSOM 的下载和构建。也就是说，在这种情况下，浏览器会先下载和构建 CSSOM，然后再执行 JavaScript，最后再继续文档的解析。

即当 cssOM 树未构建完成就运行 js 脚本时，会阻塞 js 脚本和文档解析直至构建完成再执行 js 脚本，再完成文档解析
