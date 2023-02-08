<!--
 * @Author: JJking666 1337802617@qq.com
 * @Date: 2023-02-01 12:39:47
 * @LastEditors: JJking666 1337802617@qq.com
 * @LastEditTime: 2023-02-01 12:41:03
 * @FilePath: \webStudy\vue原理\index.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

### v-if、v-show、v-html 的原理

- v-if 会调用 addIfCondition 方法，生成 vnode 的时候会忽略对应节点(变成注释节点)，render 的时候就不会渲染；
- v-show 会生成 vnode，render 的时候也会渲染成真实节点，render 过程中会在节点的属性中修改 display；
- v-html 会先移除节点下的所有节点，设置 innerHTML 为 v-html 的值。

### vue 初始化

在 new Vue 的实例化过程中，会执行初始化方法 this.\_init，其中有

```ts
Vue.prototype._init = function (options) {
  // ...
  initState(vm);
  // ...
  callHook(vm, "created");
  // ...
  if (vm.$options.el) {
    vm.$mount(vm.$options.el);
  }
};

function initState(vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) {
    initProps(vm, opts.props);
  }
  if (opts.methods) {
    initMethods(vm, opts.methods);
  }
  if (opts.data) {
    initData(vm);
  } else {
    observe((vm._data = {}), true /* asRootData */);
  }
  if (opts.computed) {
    initComputed(vm, opts.computed);
  }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}
```

### watch --> created --> computed 分析

`new Vue`在实例化时会触发`Vue.prototype._init`,之后执行`watch`，而其中`computed`是通过`Object.defineProperty`为当前`vm`进行定义，再到后续创建 vNode 阶段才去触发执行其 `get` 函数，最终执行到计算属性`computed`对应的逻辑。
