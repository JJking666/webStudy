### computed 和 使用函数
**计算属性是基于它们的响应式依赖进行缓存的**
```ts
<p>Reversed message: "{{ reversedMessage() }}"</p>
// 在组件中
methods: {
  reversedMessage: function () {
    return this.message.split('').reverse().join('')
  }
}
```
>我们可以将同一函数定义为一个方法而不是一个计算属性。两种方式的最终结果确实是完全相同的。然而，不同的是**计算属性是基于它们的响应式依赖进行缓存的**。只在相关响应式**依赖发生改变时**它们才会重新求值。这就意味着只要 `message` 还没有发生改变，多次访问 `reversedMessage` 计算属性会立即返回之前的计算结果，而不必再次执行函数。

这也同样意味着下面的计算属性将不再更新，因为` Date.now() `不是响应式依赖：
```ts
computed: {
  now: function () {
    return Date.now()
  }
}
```
相比之下，每当触发重新渲染时，调用方法将总会再次执行函数。

我们为什么需要缓存？假设我们有一个性能开销比较大的计算属性 A，它需要遍历一个巨大的数组并做大量的计算。然后我们可能有其他的计算属性依赖于 A。如果没有缓存，我们将不可避免的多次执行 A 的 `getter`！如果你**不希望有缓存**，请用方法来替代。+

## 计算属性的 setter
计算属性默认只有 `getter`，不过在需要时你也可以提供一个 `setter`：

``` ts
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
```
现在再运行 `vm.fullName = 'John Doe'` `时，setter` 会被调用，`vm.firstName` 和 `vm.lastName` 也会相应地被更新。

## 侦听器watch
虽然**计算属性在大多数情况下**更合适，但有时也需要一个自定义的侦听器。这就是为什么 `Vue` 通过 `watch` 选项提供了一个更通用的方法，来响应数据的变化。**当需要在数据变化时执行异步或开销较大的操作时**，这个方式是最有用的。

## vm.$watch
观察 Vue 实例上的一个**表达式**或者一个**函数计算结果的变化**。回调函数得到的参数为**新值和旧值**。表达式只接受简单的键路径。对于更复杂的表达式，用一个函数取代。

>注意：在变更 (不是替换) 对象或数组时，旧值将与新值相同，因为它们的引用指向同一个对象/数组。Vue 不会保留变更之前值的副本。

```ts
// 键路径
vm.$watch('a.b.c', function (newVal, oldVal) {
  // 做点什么
})

// 函数
vm.$watch(
  function () {
    // 表达式 `this.a + this.b` 每次得出一个不同的结果时
    // 处理函数都会被调用。
    // 这就像监听一个未被定义的计算属性
    return this.a + this.b
  },
  function (newVal, oldVal) {
    // 做点什么
  }
)
```

vm.$watch 返回一个取消观察函数，用来停止触发回调：
```ts
var unwatch = vm.$watch('a', cb)
// 之后取消观察
unwatch()
```
>选项：deep

为了发现对象内部值的变化，可以在选项参数中指定 deep: true。注意监听数组的变更不需要这么做。
```ts
vm.$watch('someObject', callback, {
  deep: true
})
```

>选项：immediate

在选项参数中指定 immediate: true 将立即以表达式的当前值触发回调：

```ts
vm.$watch('a', callback, {
  immediate: true
})
// 立即以 `a` 的当前值触发回调
```


## v-pre
+ 不需要表达式
+ 用法：跳过大量没有指令的节点会加快编译
+ 跳过这个元素和它的子元素的编译过程。可以用来显示原始 Mustache 标签。跳过大量没有指令的节点会加快编译。
+ 示例：
+ <span v-pre>{{ this will not be compiled }}</span>

## v-cloak
+ 不需要表达式
+ 用法：当组件未结束编译时作为类保持在元素上，用于**初始化**
+ 这个指令保持在元素上直到关联实例结束编译。和 CSS 规则如 [v-cloak] { display: none } 一起用时，这个指令可以隐藏未编译的 Mustache 标签直到实例准备完毕。

示例：

```ts
[v-cloak] {
  display: none;
}
<div v-cloak>
  {{ message }}
</div>
```
不会显示，直到编译结束。.

## 常见的事件修饰符及其作用

+ .stop：等同于 JavaScript 中的 event.stopPropagation() ，防止事件冒泡；
+ .prevent ：等同于 JavaScript 中的 event.preventDefault() ，防止执行预设的行为（如果事件可取消，则取消该事件，而不停止事件的进一步传播）；
+ .capture ：与事件冒泡的方向相反，事件捕获由外到内；
+ .self ：只会触发自己范围内的事件，不包含子元素；
+ .once ：只会触发一次。

## v-if、v-show 的原理

v-if会调用addIfCondition方法，生成vnode的时候会忽略对应节点，render的时候就不会渲染；
v-show会生成vnode，render的时候也会渲染成真实节点，只是在render过程中会在节点的属性中修改show属性值，也就是常说的display；
+ 手段：v-if是动态的向DOM树内添加或者删除DOM元素；v-show是通过设置DOM元素的display样式属性控制显隐；
+ 编译过程：v-if切换有一个局部编译/卸载的过程，切换过程中合适地销毁和重建内部的事件监听和子组件；v-show只是简单的基于css切换；
+ 编译条件：v-if是惰性的，如果初始条件为假，则什么也不做；只有在条件第一次变为真时才开始局部编译; v-show是在任何条件下，无论首次条件是否为真，都被编译，然后被缓存，而且DOM元素保留；
+ 性能消耗：v-if有更高的切换消耗；v-show有更高的初始渲染消耗；
+ 使用场景：v-if适合运营条件不大可能改变；v-show适合频繁切换。

## v-model 是如何实现的，语法糖实际是什么？
（1）作用在表单元素上
动态绑定了 input 的 value 指向了 messgae 变量，并且在触发 input 事件的时候去动态把 message设置为目标值：
```ts
<input v-model="sth" />
//  等同于
<input
    v-bind:value="message"
    v-on:input="message=$event.target.value"
>
```

## LRU （least recently used）缓存策略
LRU 缓存策略∶ 从内存中找出最久未使用的数据并置换新的数据。

LRU（Least rencently used）算法根据数据的历史访问记录来进行淘汰数据，其核心思想是 "如果数据最近被访问过，那么将来被访问的几率也更高"。 最常见的实现是使用一个链表保存缓存数据，详细算法实现如下∶

+ 新数据插入到链表头部
+ 每当缓存命中（即缓存数据被访问），则将数据移到链表头部
+ 链表满的时候，将链表尾部的数据丢弃

## Vue 单页应用与多页应用的区别
概念：

SPA单页面应用（SinglePage Web Application），指只有一个主页面的应用，一开始只需要加载一次js、css等相关资源。所有内容都包含在主页面，对每一个功能模块组件化。单页应用跳转，就是切换相关组件，仅仅刷新局部资源。
MPA多页面应用 （MultiPage Application），指有多个独立页面的应用，每个页面必须重复加载js、css等相关资源。多页应用跳转，需要整页资源刷新。

## Vue data 中某一个属性的值发生改变后，视图会立即同步执行重新渲染吗？

不会立即同步执行重新渲染。Vue 实现响应式并不是数据发生变化之后 DOM 立即变化，而是按一定的策略进行 DOM 的更新。Vue 在更新 DOM 时是异步执行的。只要侦听到数据变化， Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。
如果同一个watcher被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。然后，在下一个的事件循环tick中，Vue 刷新队列并执行实际（已去重的）工作。


## 子组件可以直接改变父组件的数据吗？
子组件不可以直接改变父组件的数据。这样做主要是为了维护父子组件的单向数据流。每次父级组件发生更新时，子组件中所有的 prop 都将会刷新为最新的值。如果这样做了，Vue 会在浏览器的控制台中发出警告。

assets和static的区别
+ 相同点： assets 和 static 两个都是存放静态资源文件。
+ 不相同点：assets 中存放的静态资源文件在项目打包时，会进行压缩体积，代码格式化。而压缩后的静态资源文件最终也都会放置在 static 文件中跟着 index.html 一同上传至服务器。static 中放置的静态资源文件就不会要走打包压缩格式化等流程，而是直接进入打包好的目录，直接上传至服务器。因为避免了压缩直接进行上传，在打包时会提高一定的效率，但是 static 中的资源文件由于没有进行压缩等操作，所以文件的体积也就相对于 assets 中打包后的文件提交较大点。在服务器中就会占据更大的空间。
+ 建议： 将项目中 template需要的样式文件js文件等都可以放置在 assets 中，走打包这一流程。减少体积。而项目中引入的第三方的资源文件如iconfoont.css 等文件可以放置在 static 中，因为这些引入的第三方文件已经经过处理，不再需要处理，直接上传。


## delete和Vue.delete删除数组属性的区别
delete 只是被删除的元素变成了 empty/undefined 其他的元素的键值还是不变。
Vue.delete 直接删除了数组属性， 改变了数组的键值。

## 对SSR的理解
SSR也就是服务端渲染，也就是将Vue在客户端把标签渲染成HTML的工作放在服务端完成，然后再把html直接返回给客户端
SSR的优势：

更好的SEO
首屏加载速度更快

SSR的缺点：

开发条件会受到限制，服务器端渲染只支持beforeCreate和created两个钩子；
当需要一些外部扩展库时需要特殊处理，服务端渲染应用程序也需要处于Node.js的运行环境；
更多的服务端负载。


## 对 SPA 单页面的理解，它的优缺点分别是什么？
SPA（ single-page application ）仅在 Web 页面初始化时加载相应的 HTML、JavaScript 和 CSS。一旦页面加载完成，SPA 不会因为用户的操作而进行页面的重新加载或跳转；取而代之的是利用路由机制实现 HTML 内容的变换，UI 与用户的交互，避免页面的重新加载。
优点：

用户体验好、快，内容的改变不需要重新加载整个页面，避免了不必要的跳转和重复渲染；
基于上面一点，SPA 相对对服务器压力小；
前后端职责分离，架构清晰，前端进行交互逻辑，后端负责数据处理；

缺点：

初次加载耗时多：为实现单页 Web 应用功能及显示效果，需要在加载页面的时候将 JavaScript、CSS 统一加载，部分页面按需加载；
前进后退路由管理：由于单页应用在一个页面中显示所有的内容，所以不能使用浏览器的前进后退功能，所有的页面切换需要自己建立堆栈管理；
SEO 难度较大：由于所有的内容都在一个页面中动态替换显示，所以在 SEO 上其有着天然的弱势。


## vue初始化页面闪动问题
使用vue开发时，在vue初始化之前，由于div是不归vue管的，所以我们写的代码在还没有解析的情况下会容易出现花屏现象，看到类似于{{message}}的字样，虽然一般情况下这个时间很短暂，但是还是有必要让解决这个问题的。
首先：在css里加上以下代码：
[v-cloak] {    display: none;}
复制代码
如果没有彻底解决问题，则在根元素加上style="display: none;" :style="{display: 'block'}"


MVVM的优缺点?
优点:

分离视图（View）和模型（Model），降低代码耦合，提⾼视图或者逻辑的重⽤性: ⽐如视图（View）可以独⽴于Model变化和修改，⼀个ViewModel可以绑定不同的"View"上，当View变化的时候Model不可以不变，当Model变化的时候View也可以不变。你可以把⼀些视图逻辑放在⼀个ViewModel⾥⾯，让很多view重⽤这段视图逻辑
提⾼可测试性: ViewModel的存在可以帮助开发者更好地编写测试代码
⾃动更新dom: 利⽤双向绑定,数据更新后视图⾃动更新,让开发者从繁琐的⼿动dom中解放

缺点:

Bug很难被调试: 因为使⽤双向绑定的模式，当你看到界⾯异常了，有可能是你View的代码有Bug，也可能是Model的代码有问题。数据绑定使得⼀个位置的Bug被快速传递到别的位置，要定位原始出问题的地⽅就变得不那么容易了。另外，数据绑定的声明是指令式地写在View的模版当中的，这些内容是没办法去打断点debug的
⼀个⼤的模块中model也会很⼤，虽然使⽤⽅便了也很容易保证了数据的⼀致性，当时⻓期持有，不释放内存就造成了花费更多的内存
对于⼤型的图形应⽤程序，视图状态较多，ViewModel的构建和维护的成本都会⽐较⾼。


## Vuex 和 localStorage 的区别
（1）最重要的区别

vuex存储在内存中
localstorage 则以文件的方式存储在本地，只能存储字符串类型的数据，存储对象需要 JSON的stringify和parse方法进行处理。 读取内存比读取硬盘速度要快

（2）应用场景

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。vuex用于组件之间的传值。
localstorage是本地存储，是将数据存储到浏览器的方法，一般是在跨页面传递数据时使用 。
Vuex能做到数据的响应式，localstorage不能

（3）永久性
刷新页面时vuex存储的值会丢失，localstorage不会。
注意： 对于不变的数据确实可以用localstorage可以代替vuex，但是当两个组件共用一个数据源（对象或数组）时，如果其中一个组件改变了该数据源，希望另一个组件响应该变化时，localstorage无法做到，原因就是区别

## 为什么 Vuex 的 mutation 中不能做异步操作？

Vuex中所有的状态更新的唯一途径都是mutation，异步操作通过 Action 来提交 mutation实现，这样可以方便地跟踪每一个状态的变化，从而能够实现一些工具帮助更好地了解我们的应用。
每个mutation执行完成后都会对应到一个新的状态变更，这样devtools就可以打个快照存下来，然后就可以实现 time-travel 了。如果mutation支持异步操作，就没有办法知道状态是何时更新的，无法很好的进行状态的追踪，给调试带来困难。


## Vuex的严格模式是什么,有什么作用，如何开启？
在严格模式下，无论何时发生了状态变更且不是由mutation函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到。
在Vuex.Store 构造器选项中开启,如下
```ts
const store = new Vuex.Store({
    strict:true,
})
```

## 虚拟dom
能够更好的跨平台，因为它的结构是js语法的对象

因为操作真实dom会引起页面的重绘重排，而操作虚拟dom，其实就是修改对象开销很小，之后将修改完成的虚拟dom映射为真实dom，这样能够较大提高渲染的效率和性能

它是真实dom的抽象，通过对象的形式模仿真实dom的结构。能够通过事务处理机制，将对dom的多次修改一次性更新到页面中，从而有效的减少页面重新渲染的次数，提高渲染性能

在每次数据发生变化时，虚拟dom都会进行缓存，然后用现在的虚拟dom与缓存dom进行diff算法比较，再进行更新

## 虚拟DOM真的比真实DOM性能好吗
首次渲染大量DOM时，由于多了一层虚拟DOM的计算，性能稍差。
正如它能保证性能下限，在真实DOM操作的时候进行针对性的优化时，性能更好。

> attr,listeners

可理解为是一个从父组件到孙组件(或更深)的数据流，其中的数据如果子组件引入到props中使用就会消失，剩下的数据流向更底下的组件
```ts
//parent
<template>
  <div>
    <h2>浪里行舟</h2>
    <child-com1 :foo="foo" :boo="boo" :coo="coo" :doo="doo" title="前端工匠"></child-com1>
  </div>
</template>
<script>
const childCom1 = () => import("./childCom1.vue");
export default {
  components: { childCom1 },
  data() {
    return {
      foo: "Javascript",
      boo: "Html",
      coo: "CSS",
      doo: "Vue"
    };
  }
};
</script>
// childCom1.vue
<template class="border">
  <div>
    <p>foo: {{ foo }}</p>
    <p>childCom1的$attrs: {{ $attrs }}</p>
    <child-com2 v-bind="$attrs"></child-com2>
  </div>
</template>
<script>
const childCom2 = () => import("./childCom2.vue");
export default {
  components: {
    childCom2
  },
  inheritAttrs: false, // 可以关闭自动挂载到组件根元素上的没有在props声明的属性
  props: {
    foo: String // foo作为props属性绑定
  },
  created() {
    console.log(this.$attrs); // 父组件中的属性，且不在当前组件props中的属性。{ "boo": "Html", "coo": "CSS", "doo": "Vue", "title": "前端工匠" }
  }
};
</script>
// childCom2.vue
<template>
  <div class="border">
    <p>boo: {{ boo }}</p>
    <p>childCom2: {{ $attrs }}</p>
    <child-com3 v-bind="$attrs"></child-com3>
  </div>
</template>
<script>
const childCom3 = () => import("./childCom3.vue");
export default {
  components: {
    childCom3
  },
  inheritAttrs: false,
  props: {
    boo: String
  },
  created() {
    console.log(this.$attrs); // / 父组件中的属性，且不在当前组件props中的属性。{"coo": "CSS", "doo": "Vue", "title": "前端工匠" }
  }
};
</script>
```







> 字符串转boolean

```ts
console.log(!!0);  //返回false

console.log(!!1);  //返回true

console.log(!!"");  //返回false

console.log(!!NaN);  //返回false

console.log(!!null);  //返回false

console.log(!!undefined);  //返回false

console.log(!![]);  //返回true

console.log(!!{});  //返回true

console.log(!!function(){});  //返回true
//或者
console.log(Boolean("0"));  //返回true

console.log(Boolean("1"));  //返回true

console.log(Boolean(""));  //返回false
```

> vue同时绑定多个事件
```ts
<input v-model="msg" type="text" v-on="{input:a, focus:b}"/>
```

> 在vue中watch和created哪个先执行
watch 中的 immediate 会让监听在初始值声明的时候去执行监听计算，否则就是 created 先执行

> 在vue中created与activated有什么区别
created():在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (data observer)，property 和方法的运算，watch/event 事件回调。然而，挂载阶段还没开始，$el property 目前尚不可用。

activated()：是在路由设置<keep-alive></keep-alive>时，才会有这个生命周期。在被 keep-alive 缓存的组件激活时调用

> 在vue事件中传入$event，使用e.target和e.currentTarget有什么区别

currentTarget： 事件绑定的元素

target： 鼠标触发的元素


> vue的表单修饰符.lazy

在输入框中，v-model默认是在input事件中同步输入框的数据（除了输入法中文输入的情况），使用修饰符 .lazy 会转变为 change 事件中同步（类似懒加载）:
此时，message并不是实时更新的，而是在失焦或按回车时才更新。


> 对于部分数据处理，可以使用filter过滤器，可以节省创建新变量的开销

> 表單修飾符

+ lazy 标签失焦时在赋值，也就是在change事件后再赋值
+ trim 自动删除输入文本前后的空格
+ number 自动转成数字，即使用了parseFloat

> 事件修飾符

+ stop 阻止冒泡
+ prevent 阻止默认行为
+ self 当事件target等于currentTarget时才会触发
+ once 只触发一次
+ capture 事件从元素顶层往下执行,即捕获阶段
+ passive 移动端进行onscroll时会变卡，而加上passive相当于有lazy的效果。
+ native 用来帮*组件*区分原生事件，因为组件上v-on只能触发自定义事件，故需要native来判断，注意：只能是组件上使用native，普通标签使用会使事件无效！

> v-bind修饰符

+ async 用来给`prop`进行双向绑定
```ts
//父组件
<comp :myMessage.sync="bar"></comp>
//子组件
this.$emit('update:myMessage',params);

//以上这种方法相当于以下的简写

//父亲组件
<comp :myMessage="bar" @update:myMessage="func"></comp>
func(e){
    this.bar = e;
}
//子组件js
func2(){
    this.$emit('update:myMessage',params);
}
```
  + 使用sync的时候，子组件传递的事件名格式必须为update:value，其中value必须与子组件中props中声明的名称完全一致

  + 注意带有 .sync 修饰符的 v-bind 不能和表达式一起使用

  + 将 v-bind.sync 用在一个字面量的对象上，例如 v-bind.sync=”{ title: doc.title }”，是无法正常工作的

> 鼠标修饰符

+ left 左键点击
+ right 右键点击
+ middle 中键点击

> 指令的作用

+ 给节点添加属性或样式或事件
+ 进行判断，如按钮的权限判断++

> keep-alive

keep-alive是一个抽象组件：它自身不会渲染一个DOM元素，也不会出现在父组件链中；使用keep-alive包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。

在动态组件中的应用
```vue
<keep-alive :include="whiteList" :exclude="blackList" :max="amount">
     <component :is="currentComponent"></component>
</keep-alive>
在vue-router中的应用
<keep-alive :include="whiteList" :exclude="blackList" :max="amount">
    <router-view></router-view>
</keep-alive>
```
include定义缓存白名单，keep-alive会缓存命中的组件；exclude定义缓存黑名单，被命中的组件将不会被缓存；max定义缓存组件上限，超出上限使用LRU的策略置换缓存数据。

> watch

+ watch在开启deep后，可以监听到嵌套对象数据的变化，但监听不到数组长度和设置值的变化，必须使用push等api