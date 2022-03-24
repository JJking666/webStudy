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
不会显示，直到编译结束。