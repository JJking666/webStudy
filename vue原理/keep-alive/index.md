<!--
 * @Descripttion:
 * @version:
 * @Author: congsir
 * @Date: 2022-07-16 22:30:38
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-07-17 11:01:35
-->
## keep-alive

(https://blog.csdn.net/JackieDYH/article/details/115555330)

+ 生成的是虚拟节点而不是真实节点
+ `exclude`的优先级大于`include`
+ 被缓存组件只会在第一次进入页面时调用`created`等钩子函数，之后进入退出页面只会执行`activated`,`deactivated`两个钩子函数
+ 故发起请求最好放在`activated`

```js
// src/core/components/keep-alive.js
export default {
  name: 'keep-alive',
  abstract: true, // 判断当前组件虚拟dom是否渲染成真实dom的关键
  props: {
      include: patternTypes, // 缓存白名单
      exclude: patternTypes, // 缓存黑名单
      max: [String, Number] // 缓存的组件最大个数
  },
  created() {
     this.cache = Object.create(null) // 缓存虚拟dom
     this.keys = [] // 缓存的虚拟dom的键集合
  },
  destroyed() {
    for (const key in this.cache) {
       // 删除所有的缓存
       pruneCacheEntry(this.cache, key, this.keys)
    }
  },
 mounted() {
   // 实时监听黑白名单的变动
   this.$watch('include', val => {
       pruneCache(this, name => matched(val, name))
   })
   this.$watch('exclude', val => {
       pruneCache(this, name => !matches(val, name))
   })
 },
 
 render() {
    // 先省略...
 }
}
```
keep-alive在它生命周期内定义了三个钩子函数：

created
初始化两个对象分别缓存VNode(虚拟DOM)和VNode对应的键集合
destroyed
删除this.cache中缓存的VNode实例。我们留意到，这不是简单地将this.cache置为null，而是遍历调用pruneCacheEntry函数删除。

```ts
// src/core/components/keep-alive.js
function pruneCacheEntry (
  cache: VNodeCache,
  key: string,
  keys: Array<string>,
  current?: VNode
) {
 const cached = cache[key]
 if (cached && (!current || cached.tag !== current.tag)) {
    cached.componentInstance.$destroyed() // 执行被缓存组件的destroy钩子函数
 }
 cache[key] = null
 remove(keys, key)
}
```
删除缓存的VNode还要执行对应组件实例的destory钩子函数

mounted
在mounted这个钩子中对include和exclude参数进行监听，然后实时地更新（删除）this.cache对象数据。pruneCache函数的核心也是去调用pruneCacheEntry

```ts

function pruneCache (keepAliveInstance: any, filter: Function) {
  const { cache, keys, _vnode } = keepAliveInstance
  for (const key in cache) {
    const cachedNode: ?VNode = cache[key]           //遍历所有缓存组件的vnode
    if (cachedNode) {
      const name: ?string = getComponentName(cachedNode.componentOptions)
      if (name && !filter(name)) {                  //如果组件名存在且在白名单或不在黑名单中的
        pruneCacheEntry(cache, key, keys, _vnode)
      }
    }
  }
}
```

render

```ts
render () {
  const slot = this.$slots.defalut          //获取插槽组件
  const vnode: VNode = getFirstComponentChild(slot) // 找到第一个子组件对象
  const componentOptions : ?VNodeComponentOptions = vnode && vnode.componentOptions
  if (componentOptions) { // 存在组件参数
    // check pattern
    const name: ?string = getComponentName(componentOptions) // 组件名
    const { include, exclude } = this
    //如果不在白名单或者在黑名单
    if (（include && (!name || !matches(include, name))）||(exclude && name && matches(exclude, name))) {
        return vnode        //直接返回组件节点
    }

    const { cache, keys } = this
    // 定义组件的缓存key
    const key: ?string = vnode.key === null ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '') : vnode.key
     if (cache[key]) { // 已经缓存过该组件
        vnode.componentInstance = cache[key].componentInstance      //将缓存过的组件实例赋值给现在的组件
        remove(keys, key)
        keys.push(key) // 调整key排序，将key放在最后
     } else {
        cache[key] = vnode //缓存组件对象
        keys.push(key)
        if (this.max && keys.length > parseInt(this.max)) {
          //超过缓存数限制，将第一个删除
          pruneCacheEntry(cahce, keys[0], keys, this._vnode)
        }
     }

      vnode.data.keepAlive = true //渲染和执行被包裹组件的钩子函数需要用到

 }
 return vnode || (slot && slot[0])
}
```

+ 第一步：获取keep-alive包裹着的第一个子组件对象及其组件名；
+ 第二步：根据设定的黑白名单（如果有）进行条件匹配，决定是否缓存。不匹配，直接返回组件实例（VNode），否则执行第三步；
+ 第三步：根据组件ID和tag生成缓存Key，并在缓存对象中查找是否已缓存过该组件实例。如果存在，直接取出缓存值并更新该key在this.keys中的位置（更新key的位置是实现LRU置换策略的关键），否则执行第四步；
+ 第四步：在this.cache对象中存储该组件实例并保存key值，之后检查缓存的实例数量是否超过max设置值，超过则根据LRU置换策略删除最近最久未使用的实例（即是下标为0的那个key）;
+ 第五步：最后并且很重要，将该组件实例的keepAlive属性值设置为true。

![](https://img-blog.csdnimg.cn/img_convert/214fcb69f7ee3ee0a60a341bc42959ae.png)
Vue的渲染是从图中render阶段开始的，但keep-alive的渲染是在patch阶段，这是构建组件树（虚拟DOM树），并将VNode转换成真正DOM节点的过程。

Vue在渲染的时候先调用原型上的_render函数将组件对象转化成一个VNode实例；而_render是通过调用createElement和createEmptyVNode两个函数进行转化；
createElement的转化过程会根据不同的情形选择new VNode或者调用createComponent函数做VNode实例化；

完成VNode实例化后，这时候Vue调用原型上的_update函数把VNode渲染成真实DOM，这个过程又是通过调用patch函数完成的（这就是patch阶段了）
![](https://img-blog.csdnimg.cn/img_convert/b44593362fecf7feeb169e30afe6a160.png)


```ts
export function initLifecycle (vm: Component) {
    const options= vm.$options
    // 找到第一个非abstract父组件实例
    let parent = options.parent
    if (parent && !options.abstract) {
        while (parent.$options.abstract && parent.$parent) {
              parent = parent.$parent
        }
        parent.$children.push(vm)
    }
    vm.$parent = parent
    // ...
}
```
Vue在初始化生命周期的时候，为组件实例建立父子关系会根据abstract属性决定是否忽略某个组件。在keep-alive中，设置了abstract:true，那Vue就会跳过该组件实例。

最后构建的组件树中就不会包含keep-alive组件，那么由组件树渲染成的DOM树自然也不会有keep-alive相关的节点了。

keep-alive包裹的组件是如何使用缓存的？
在patch阶段，会执行createComponent函数：

```ts
// src/core/vdom/patch.js
function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    let i = vnode.data
    if (isDef(i)) {
        const isReactivated = isDef(vnode.componentInstance) && i.keepAlive
        if (isDef(i = i.hook) && isDef(i = i.init)) {
            i(vnode, false)
        }
        if (isDef(vnode.componentInstance)) {
            initComponent(vnode, insertedVnodeQueue)
            insert(parentElem, vnode.elem, refElem) // 将缓存的DOM(vnode.elem) 插入父元素中
            if (isTrue(isReactivated)) {
                reactivateComponent(vnode, insertedVnodeQueue, parentEle, refElm)
            }
            return true
        }
    }
}
```
在首次加载被包裹组建时，由keep-alive.js中的render函数可知，vnode.componentInstance的值是undfined，keepAlive的值是true，因为keep-alive组件作为父组件，它的render函数会先于被包裹组件执行；那么只执行到i(vnode,false)，后面的逻辑不执行；
再次访问被包裹组件时，vnode.componentInstance的值就是已经缓存的组件实例，那么会执行insert(parentElm, vnode.elm, refElm)逻辑，这样就直接把上一次的DOM插入到父元素中。

一般的组件，每一次加载都会有完整的生命周期，即生命周期里面对于的钩子函数都会被触发，为什么被keep-alive包裹的组件却不是呢？
被缓存的组件实例会为其设置keepAlive= true，而在初始化组件钩子函数中：
```ts
// src/core/vdom/create-component.js
const componentVNodeHooks = {
    init (vnode: VNodeWithData, hydrating: boolean): ?boolean{
        if (
         vnode.componentInstance &&
         !vnode.componentInstance._isDestroyed &&
         vnode.data.keepAlive
        ) {
          // keep-alive components, treat as a patch
          const mountedNode:any = vnode
          componentVNodeHooks.prepatch(mountedNode, mountedNode)
        } else {
          const child = vnode.componentInstance = createComponentInstanceForVnode (vnode, activeInstance)

        }
    }
}
```
可以看出，当vnode.componentInstance和keepAlive同时为true时,即被缓存过之后，不再进入$mount过程，那mounted之前的所有钩子函数（beforeCreate、created、mounted）都不再执行。