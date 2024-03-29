<!--
 * @Descripttion:
 * @version:
 * @Author: congsir
 * @Date: 2022-07-23 22:54:12
 * @LastEditors: JJking666 1337802617@qq.com
 * @LastEditTime: 2023-02-10 13:19:30
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
function compileCode(code, sandbox) {
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
  })
  return with(proxy){
    code
  }
}
```

第三种 ses （仍在提案中，但可被使用）

### 语法环境，词法环境

### 执行上下文

https://juejin.cn/post/6844903682283143181#heading-4

全局上下文
函数执行上下文
Eval 函数执行上下文（少见）

执行上下文在创建阶段会

- 确定 this 值
- 创建词法环境 (环境记录器和一个外部环境的引用)。
  - 环境记录器是存储变量和函数声明的实际位置。
  - 外部环境的引用意味着它可以访问其父级词法环境（作用域）。
- 创建变量环境
  - 环境记录器持有变量声明语句在执行上下文中创建的绑定关系

在 ES6 中，词法环境组件和变量环境的一个不同就是前者被用来存储函数声明和变量（let 和 const）绑定，而后者只用来存储 var 变量绑定。

```ts
ExecutionContext = {
  ThisBinding = <this value>,
  LexicalEnvironment = { ... }, //词法环境
  VariableEnvironment = { ... },  //变量环境
}
```

举例：

```ts
let a = 20;
const b = 30;
var c;

function multiply(e, f) {
  var g = 20;
  return e * f * g;
}

c = multiply(20, 30);
```

执行上下文看起来像这样：

```ts
GlobalExectionContext = {

  ThisBinding: <Global Object>,

  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Object",
      // 在这里绑定标识符
      a: < uninitialized >,
      b: < uninitialized >,
      multiply: < func >
    }
    outer: <null>
  },

  VariableEnvironment: {
    EnvironmentRecord: {
      Type: "Object",
      // 在这里绑定标识符
      c: undefined,
    }
    outer: <null>
  }
}

FunctionExectionContext = {
  ThisBinding: <Global Object>,

  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",
      // 在这里绑定标识符
      Arguments: {0: 20, 1: 30, length: 2},
    },
    outer: <GlobalLexicalEnvironment>
  },

VariableEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",
      // 在这里绑定标识符
      g: undefined
    },
    outer: <GlobalLexicalEnvironment>
  }
}
```

注意 — 只有遇到调用函数 multiply 时，函数执行上下文才会被创建。

可能你已经注意到 let 和 const 定义的变量并没有关联任何值，但 var 定义的变量被设成了 undefined。
这是因为在创建阶段时，引擎检查代码找出变量和函数声明，虽然函数声明完全存储在环境中，但是变量最初设置为 undefined（var 情况下），或者未初始化（let 和 const 情况下）。

这就是为什么你可以在声明之前访问 var 定义的变量（虽然是 undefined），但是在声明之前访问 let 和 const 的变量会得到一个引用错误。
这就是我们说的变量声明提升。

```ts
function foo(){
  var a = 1 let b = 2
  {
    let b = 3
    var c = 4
    let d = 5
    console.log(a)
    console.log(b)
    }
    console.log(b)
    console.log(c)
    console.log(d)
  }

    foo()

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

### assets 和 static 的区别

> 相同点： assets 和 static 两个都是存放静态资源文件。项目中所需要的资源文件图片，字体图标，样式文件等都可以放在这两个文件下，这是相同点
> 不相同点：前者打包时会进行体积压缩和代码格式化，后者直接打包。assets 中存放的静态资源文件在项目打包时，也就是运行 npm run build 时会将 assets 中放置的静态资源文件进行打包上传，所谓打包简单点可以理解为压缩体积，代码格式化。而压缩后的静态资源文件最终也都会放置在 static 文件中跟着 index.html 一同上传至服务器。static 中放置的静态资源文件就不会要走打包压缩格式化等流程，而是直接进入打包好的目录，直接上传至服务器。
> 建议： 将项目中 template 需要的样式文件 js 文件等都可以放置在 assets 中，走打包这一流程。减少体积。而项目中引入的第三方的资源文件如 iconfoont.css 等文件可以放置在 static 中，因为这些引入的第三方文件已经经过处理，不再需要处理，直接上传。

### 传统编译

- 词法解析，将字符串解析成有意义的代码块
- 语法分析，生成抽象语法树
- 代码生成，将抽象语法树转成可执行代码

### js 作用域详解

https://juejin.cn/post/7102730175086854151

javascript 当中，编译器、作用域、引擎三者之间构成了一个很大的关系

比如:`var a = 2`;

- 编译器会将`var a = 2`;解析成一个抽象语法树，这个抽象语法树会被转换成可执行代码
- 这个过程当中，编译器解析`var a`的时候，会先去作用域中查看是否已经声明了一个变量名为`a `的变量，如果没有，编译器会在作用域当中添加一个变量名为`a`的变量
- 编译器会为引擎生成运行所需要的代码
- 这些代码被用来处理 a = 2，在引擎执行的之后， 会先询问作用域当中是否包含一个变量名为 a 的变量
  - 有，则将它赋值为 2
  - 无，引擎会为它在全局作用域中创建一个变量，并且赋值为 2

可理解为编译器是加工者，作用域是加工材料仓库，引擎是执行者]

### 作用域及块级作用域

https://juejin.cn/post/6844903797135769614

作用域分为全局作用域和函数作用域，es6 通过引入 let,const 提供了块级作用域

内部作用域可以访问到外部作用域，不能访问更内部的作用域

块级作用域可通过新增命令 let 和 const 声明，所声明的变量在指定块的作用域外无法被访问
块级作用域在如下情况被创建：

- 在一个函数内部
- 在一个代码块（由一对花括号包裹）内部

for 循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。

```ts
for (let i = 0; i < 3; i++) {
  let i = "abc";
  console.log(i);
}
// abc
// abc
// abc
```

```ts
var x = 10;
function fn() {
  console.log(x);
}
function show(f) {
  var x = 20(function () {
    f(); //10，而不是20
  })();
}
show(fn);
```

在 fn 函数中，取自由变量 x 的值时，要到哪个作用域中取？——要到创建 fn 函数的那个作用域中取，无论 fn 函数将在哪里调用。

### JS 的执行机制

https://juejin.cn/post/7171748794164805645

JavaScript 属于解释型语言，JavaScript 的执行分为：解释和执行两个阶段,这两个阶段所做的事并不一样：

解释阶段：

- 词法分析
- 语法分析
- 作用域规则确定

执行阶段：

- 创建执行上下文
- 执行函数代码
- 垃圾回收

JavaScript 解释阶段便会确定作用域规则，因此作用域在函数定义时就已经确定了，而不是在函数调用时确定，但是执行上下文是函数执行之前创建的。执行上下文最明显的就是 this 的指向是执行时确定的。而作用域访问的变量是编写代码的结构确定的。
作用域和执行上下文之间最大的区别是：
执行上下文在运行时确定，随时可能改变；作用域在定义时就确定，并且不会改变。

同一个作用域下，不同的调用会产生不同的执行上下文环境，继而产生不同的变量的值。

### let 和 const 实现块级作用域

和执行上下文有关,创建执行上下文会创建词法环境和变量环境，词法环境中存储当前作用域的 let 和 const 变量，变量环境中存储全局的 var 变量，当上下文访问块级变量时，外部作用域的词法环境不会存储内部作用域的块级变量，因此访问不到，从而实现了块级作用域。
