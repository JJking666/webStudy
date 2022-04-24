## pinia

> 入门
- 使用场景，存储应该包含可以在整个应用程序中访问的数据。
- 包含三个概念，状态、getter和动作，并且可以安全地假设这些概念等同于data,computed和methods在组件中
- store是一个被reactive包裹的对象，所以不能对store使用解构，可以直接访问
```ts
export default defineComponent({
  setup() {
    const store = useStore()
    const { name, doubleCount } = store//出错！

    name // "eduardo"
    doubleCount // 2

    return {
      // will always be "eduardo" 无响应性
      name,
      // will always be 2 无响应性
      doubleCount,
      // this one will be reactive 有响应性
      doubleValue: computed(() => store.doubleCount),
      }
  },
})
```
> 使用`storeToRefs()`为属性创建响应性（可解构）
```ts
import { storeToRefs } from 'pinia'

export default defineComponent({
  setup() {
    const store = useStore()
    const { name, doubleCount } = storeToRefs(store)
    const { increment } = store

    return {
      name,
      doubleCount
      increment,
    }
  },
})
```

> 访问state
```ts
const store = useStore()
store.counter++
```

>重置状态
```ts
const store = useStore()
store.$reset()
```

> 与setup结合使用(不需要map函数)
```ts
//store
import { defineStore } from 'pinia',

const useCounterStore = defineStore('counterStore', {
  state: () => ({
    counter: 0
  })
})
//组件
import { useCounterStore } from '../stores/counterStore'

export default {
  setup() {
    const counterStore = useCounterStore()

    return { counterStore }
  },
  computed: {
    tripleCounter() {
      return this.counterStore.counter * 3
    },
  },
}
```

> 不与setup结合使用(需要map函数)
```ts
import { mapState } from 'pinia'
import { useCounterStore } from '../stores/counterStore'

export default {
  computed: {
    ...mapState(useCounterStore, ['counter'])    //从useCounterStore拿到counter
    ...mapState(useCounterStore, {
      myOwnName: 'counter',                 //获取counter并更名为myOwnName
      double: store => store.counter * 2,       //使用函数实现与store数据连接
      // it can have access to `this` but it won't be typed correctly...
      magicValue(store) {               //能够连接到counter但类型无法约束
        return store.someGetter + this.counter + this.double
      },
    }),
  },
}
```

> 批量改变状态
```ts
store.$patch({
  counter: store.counter + 1,
  name: 'Abalam',
})
//对数组和对象修改比较麻烦，故可传入一个函数进行修改
cartStore.$patch((state) => {
  state.items.push({ name: 'shoes', quantity: 1 })
  state.hasChanged = true
})
```

> 替换state
```ts
store.$state = { counter: 666, name: 'Paimon' }
//或者
pinia.state.value = {}
```

> 当组件被卸载时，它们将被自动删除。如果要在组件卸载后保留它们，请{ detached: true }作为第二个参数传递
```ts
export default {
  setup() {
    const someStore = useSomeStore()
    someStore.$subscribe(callback, { detached: true })  //组件卸载时 该pinia实例不卸载
  },
}
```

> 监听pinia实例状态并保存
```ts
watch(
  pinia.state,
  (state) => {
    // persist the whole state to the local storage whenever it changes
    localStorage.setItem('piniaState', JSON.stringify(state))
  },
  { deep: true }
)
```

## getter state的计算值
```ts
export const useStore = defineStore('main', {
  state: () => ({
    counter: 0,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,   //最好使用箭头函数
  },
})
```

> 可以在store实例直接访问getter
```ts
//store
export const useStore = defineStore('main', {
  state: () => ({
    counter: 0,
  }),
  getters: {
    // automatically infers the return type as a number
    doubleCount(state) {
      return state.counter * 2
    },
    // the return type **must** be explicitly set
    doublePlusOne(): number {
      // autocompletion and typings for the whole store ?
      return this.doubleCount + 1
    },
  },
})
//组件中
<template>
  <p>Double count is {{ store.doubleCount }}</p>
</template>

<script>
export default {
  setup() {
    const store = useStore()

    return { store }
  },
}
</script>
```

> getter只能有state一个参数，但可以通过科里化来添加参数(但是会导致getter中不缓存)
```ts
export const useStore = defineStore('main', {
  getters: {
    getUserById: (state) => {
      return (userId) => state.users.find((user) => user.id === userId)
    },
  },
})

//组件中
<script>
export default {
  setup() {
    const store = useStore()

    return { getUserById: store.getUserById }
  },
}
</script>

<template>
  <p>User 2: {{ getUserById(2) }}</p>
</template>
```

> 使用其他pinia实例的数据
```ts
import { useOtherStore } from './other-store'

export const useStore = defineStore('main', {
  state: () => ({
    // ...
  }),
  getters: {
    otherGetter(state) {
      const otherStore = useOtherStore()
      return state.localData + otherStore.data
    },
  },
})
```

## action  支持同步异步
```ts
//store
import { mande } from 'mande'
const api = mande('/api/users')
export const useUsers = defineStore('users', {
  state: () => ({
    userData: null,
    // ...
  }),
  actions: {
    async registerUser(login, password) {
      try {
        this.userData = await api.post({ login, password })
        showTooltip(`Welcome back ${this.userData.name}!`)
      } catch (error) {
        showTooltip(error)
        // let the form component display the error
        return error
      }
    },
  },
})
//组件
export default defineComponent({
  setup() {
    const main = useMainStore()
    // call the action as a method of the store
    main.randomizeCounter()

    return {}
  },
})
```

> 访问其他pinia实例
```ts
import { useAuthStore } from './auth-store'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    preferences: null,
  }),
  actions: {
    async fetchUserPreferences() {
      const auth = useAuthStore()
      if (auth.isAuthenticated) {
        this.preferences = await fetchPreferences()
      } else {
        throw new Error('User must be authenticated')
      }
    },
  },
})
```

> setup中
```ts
import { useCounterStore } from '../stores/counterStore'

export default {
  setup() {
    const counterStore = useCounterStore()

    return { counterStore }
  },
  methods: {
    incrementAndPrint() {
      this.counterStore.increment()     //直接调用
      console.log('New Count:', this.counterStore.count)
    },
  },
}
```

> 没有setup
```ts
import { mapActions } from 'pinia'
import { useCounterStore } from '../stores/counterStore'

export default {
  methods: {
    // gives access to this.increment() inside the component
    // same as calling from store.increment()
    ...mapActions(useCounterStore, ['increment'])
    // same as above but registers it as this.myOwnName()
    ...mapActions(useCounterStore, { myOwnName: 'doubleCounter' }),
  },
}
```

>订阅操作 观察action及结果
```ts
const unsubscribe = someStore.$onAction(
  ({
    name, // name of the action
    store, // store instance, same as `someStore`
    args, // array of parameters passed to the action
    after, // hook after the action returns or resolves
    onError, // hook if the action throws or rejects
  }) => {
    // a shared variable for this specific action call
    const startTime = Date.now()
    // this will trigger before an action on `store` is executed
    console.log(`Start "${name}" with params [${args.join(', ')}].`)

    // this will trigger if the action succeeds and after it has fully run.
    // it waits for any returned promised
    after((result) => {
      console.log(
        `Finished "${name}" after ${
          Date.now() - startTime
        }ms.\nResult: ${result}.`
      )
    })

    // this will trigger if the action throws or returns a promise that rejects
    onError((error) => {
      console.warn(
        `Failed "${name}" after ${Date.now() - startTime}ms.\nError: ${error}.`
      )
    })
  }
)

// manually remove the listener
unsubscribe()
```

> 组件卸载后保留状态
```ts
export default {
  setup() {
    const someStore = useSomeStore()

    // this subscription will be kept after the component is unmounted
    someStore.$onAction(callback, true)

    // ...
  },
}
```

>定义一个store
```ts
//store
import  {defineStore } from 'pinia'

export const firstStore = defineStore('demo',{      //demo是id，可直接写在state上方
	state:()=>{
        return{
            count:0
        }
        //或者
        {
            count:0
        }
	},
    actions:{
        increment(){
            this.count++
        }
    }
})
```
>在组件中使用
```ts
import {firstStore} from '@/store/demo'

export default{
    setup(){
        const store = firstStore()
        //使count加1，直接修改
        store.count++
        //使count加1，批量修改
        store.$patch({
            count:store.count+1
            xx:y
        })
        //使count加1,调用自定义方法
        store.increment()
    }
}
```
>用函数定义一个store
```ts
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  function increment() {
    count.value++
  }

  return { count, increment }
})
```
> 同时也支持vuex形式
```ts
const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    }
  }
})

const useUserStore = defineStore('user', {
  // ...
})

export default {
  computed: {
    // other computed properties
    // ...
    // gives access to this.counterStore and this.userStore
    ...mapStores(useCounterStore, useUserStore)
    // gives read access to this.count and this.double
    ...mapState(useCounterStore, ['count', 'double']),
  },
  methods: {
    // gives access to this.increment()
    ...mapActions(useCounterStore, ['increment']),
  },
}
```

> 一个完整例子
```ts
import { defineStore } from 'pinia'

export const todos = defineStore('todos', {
  state: () => ({
    todos: [],
    filter: 'all',
    nextId: 0,
  }),
  getters: {
    finishedTodos(state) {
      return state.todos.filter((todo) => todo.isFinished)
    },
    unfinishedTodos(state) {
      return state.todos.filter((todo) => !todo.isFinished)
    },
    filteredTodos(state) {
      if (this.filter === 'finished') {
        return this.finishedTodos
      } else if (this.filter === 'unfinished') {
        return this.unfinishedTodos
      }
      return this.todos
    },
  },
  actions: {
    addTodo(text) {
      this.todos.push({ text, id: this.nextId++, isFinished: false })
    },
  },
})
```

## 插件
> 例子 通过返回一个对象为所有商店添加一个静态属性：
```ts
import { createPinia } from 'pinia'

// add a property named `secret` to every store that is created after this plugin is installed
// this could be in a different file
function SecretPiniaPlugin() {
  return { secret: 'the cake is a lie' }
}

const pinia = createPinia()
// give the plugin to pinia
pinia.use(SecretPiniaPlugin)

// in another file
const store = useStore()
store.secret // 'the cake is a lie'
```

> 订阅
```ts
<template>
  <div>
    {{ baseUrl }}
  </div>
  <div v-show="isShow">
    该我出现了
  </div>
  <button @click="changeData">
    通过actions改变数据
  </button>
</template>
 
<script>
import appStore from "@/store/app"
import {storeToRefs} from "pinia"
import {ref} from "vue"
 
export default {
  name: "PiniaSubscribe",
  setup() {
    const store = appStore()
    const {baseUrl} = storeToRefs(store)
    const afterChangeUrl = 'https://www.taobao.com/'
    let isShow = ref(false)
 
    const subscribe = store.$subscribe((mutation, state) => {
      /*
      * mutation主要包含三个属性值：
      *   events：当前state改变的具体数据，包括改变前的值和改变后的值等等数据
      *   storeId：是当前store的id
      *   type：用于记录这次数据变化是通过什么途径，主要有三个分别是
      *         “direct” ：通过 action 变化的
                ”patch object“ ：通过 $patch 传递对象的方式改变的
                “patch function” ：通过 $patch 传递函数的方式改变的
      *
      * */
      // 我们就可以在此处监听store中值的变化，当变化为某个值的时候，去做一些业务操作之类的
      console.log(mutation)
      console.log(state.baseUrl)
      if (state.baseUrl === afterChangeUrl) isShow.value = true
      else isShow.value = false
    }, {detached: false})  //第二个参数options对象，是各种配置参数
    //detached:布尔值，默认是 false，正常情况下，当订阅所在的组件被卸载时，订阅将被停止删除，
    // 如果设置detached值为 true 时，即使所在组件被卸载，订阅依然在生效
    //参数还有immediate，deep，flush等等参数 和vue3 watch的参数是一样的，多的就不介绍了，用到再看文档吧
 
    // 停止订阅
    // subscribe()  //调用上方声明的变量值，示例（subscribe），即可以停止订阅
 
    function changeData() {
      store.changeState(afterChangeUrl)
    }
 
    return {
      isShow,
      baseUrl,
      changeData
    }
  }
}
</script>
```

