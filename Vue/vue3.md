# Vue3

## setup()

- 组件的数据（方法和属性）
- setup()函数的两种返回值

  - 若返回一个对象，则对象中的属性、方法, 在模板中均可以直接使用。
  - 若返回一个渲染函数：则可以自定义渲染内容。（了解）

    ```ts
    <template>
        <h2>姓名：{{name}}</h2>
        <h2>年龄：{{age}}</h2>
        <h2>性别：{{gender}}</h2>
        <button @click="sayInfo">显示信息</button>
    </template>
    ```

    ```ts
    <script>
        //import {h} from 'vue'
        export default {
        name: "App",
        //此处只是测试一下setup，暂时不考虑响应式的问题。
        setup(){
            // 数据
            let name = "YK菌"
            let age = 18
            let gender = "男"

            // 方法
            function sayInfo(){
            alert(`你好${name}，你太厉害了吧`)
            }
            return {
            name,age, gender,sayInfo
            }
            // return ()=> h('h1','YK菌yyds')
        }
    };
    </script>
    ```

- 注意点：
  - 不要与 Vue2.x 配置混用
    - vue2 配置可以访问到 setup
    - 但 setup 不能访问 vue2 的配置
    - 如果有重名，则使用 setup
  - setup 不能是一个 async 函数，因为返回值不再是对象, 而是 promise, 模板看不到 return 对象中的属性。

## ref

- 作用: 定义一个响应式的数据
- 语法: const xxx = ref(initValue)
  - 创建一个包含响应式数据的引用对象（reference 对象，简称 ref 对象）
  - JS 中操作数据：xxx.value
  - 模板中读取数据: 不需要.value，直接：<div>{{xxx}}</div>
- 接收的数据可以是：基本类型、也可以是对象类型。
- 基本类型的数据：响应式依靠的是类上的 getter 与 setter 完成的
- 对象类型的数据：内部 "求助"了 reactive 函数。

```ts
  <template>
  <h1>博主的信息</h1>
  <h2>姓名：{{ name }}</h2>
  <h2>年龄：{{ age }}</h2>
  <h2>职业： {{ job.type }}</h2>
  <h2>工资：{{ job.salary }}</h2>
  <button @click="sayInfo">显示信息</button>
  <button @click="changeInfo">修改信息</button>
</template>
```

```ts
<script>
import { ref } from "vue";
export default {
  name: "App",
  setup() {
    // 数据
    let name = ref("YK菌");
    let age = ref(18);
    let job = ref({
      type: "前端工程师",
      salary: "30K",
    });
    // 方法
    function sayInfo() {
      alert(`你好${name.value}，你太厉害了吧，薪水${job.value.salary}这么高`);
    }
    function changeInfo() {
      name.value = "三十年后的YK菌";
      age.value = 48;
      job.value.type = "工程师";
      job.value.salary = "200K";
    }
    return {
      name,
      age,
      job,
      sayInfo,
      changeInfo,
    };
  },
};
</script>
```

**调用 ref 会返回一个 RefImpl 的实例对象，RefImpl 类中有 getter 和 setter 可以检测到数据的变化**

_使用 ref 的数据在调用时都需要加 xxx.value_

## reactive

- 作用: 定义一个对象类型的响应式数据（基本类型不要用它，要用 ref 函数）
- 语法：const 代理对象= reactive(源对象)接收一个对象（或数组），返回一个代理对象（proxy 对象）
- reactive 定义的响应式数据是“深层次的”。
- 内部基于 ES6 的 Proxy 实现，通过代理对象操作源对象内部数据进行操作。

```ts
<template>
  <h1>博主的信息</h1>
  <h2>姓名：{{ yk.name }}</h2>
  <h2>爱好：{{ yk.hobby }}</h2>
  <h3>测试数据：{{ yk.job.a.b.c }}</h3>
  <button @click="changeInfo">修改信息</button>
</template>

<script>
import { reactive } from "vue";
export default {
  name: "App",
  setup() {
    // 数据
    let yk = reactive({
      name: "YK菌",
      hobby: ["写博客", "学习", "看书"],
      job: {
        type: "前端工程师",
        salary: "30K",
        a: {
          b: {
            c: 666,
          },
        },
      },
    });
    function changeInfo() {
      yk.name = "三十年后的YK菌";
      yk.age = 48;
      yk.job.type = "工程师";
      yk.job.salary = "200K";
      yk.job.a.b.c = 888;
      // 直接通过数组下标修改，可以触发响应式
      yk.hobby[0] = "写小说";
    }
    return {
      yk,
      changeInfo,
    };
  },
};
</script>
```

**不想用 xxx.value（ref），可以直接把基本数据放入一个对象中，然后用 reactive 定义这个对象**
_对对象使用 ref() 和 reactive()区别是 xxx.value.salary||xxx.salary_

## Vue3 响应式原理

- 实验原理
  - 通过 Proxy（代理）: 拦截对象中任意属性的变化, 包括：属性值的读写、属性的添加、属性的删除等。
  - 通过 Reflect（反射）: 对源对象的属性进行操作。
  - MDN 文档中描述的 Proxy 与 Reflect：
    - Proxy:https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy
    - Reflect:https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect

```ts
let person = {
  name: "YK菌",
  age: 18,
};

const p = new Proxy(person, {
  //有人读取p的某个属性时调用
  get(target, propName) {
    console.log(`有人读取了p身上的${propName}属性`);
    // return target[propName]
    return Reflect.get(target, propName);
  },
  //有人修改p的某个属性
  //p追加某个属性时调用
  set(target, propName, value) {
    console.log(`有人修改了p身上的${propName}属性，我要去更新界面了！`);
    // target[propName] = value
    return Reflect.set(target, propName, value);
  },
  //有人删除p的某个属性时调用
  deleteProperty(target, propName) {
    console.log(`有人删除了p身上的${propName}属性，我要去更新界面了！`);
    // return delete target[propName]
    return Reflect.deleteProperty(target, propName);
  },
});
```

### ref 和 reactive 对比

- 从定义数据角度对比
  - ref 用来定义：基本类型数据。
  - reactive 用来定义：对象（或数组）类型数据。
  - 备注：ref 也可以用来定义对象（或数组）类型数据, 它内部会自动通过 reactive 转为代理对象。
- 从原理角度对比
  - ref 通过类中的的 getter 与 setter 来实现响应式（数据劫持）。
  - reactive 通过使用 Proxy 来实现响应式（数据劫持）, 并通过 Reflect 操作源对象内部的数据。
- 从使用角度对比
  - ref 定义的数据：操作数据需要.value，读取数据时模板中直接读取不需要.value。
  - reactive 定义的数据：操作数据与读取数据：均不需要.value。

## setup 两个注意点

- setup 执行的时机
  - 在 beforeCreate 之前执行一次，this 是 undefined。
- setup 的参数
  - (props, context)
  - props：值为对象，包含：组件外部传递过来，且组件内部声明接收了的属性。
  - context：上下文对象
    - attrs: 值为对象，包含：组件外部传递过来，但没有在 props 配置中声明的属性, 相当于 this.$attrs。
    - slots: 收到的插槽内容, 相当于 this.$slots。
    - emit: 分发自定义事件的函数, 相当于 this.$emit。

```ts
<template>
  <h1>博主的信息</h1>
  <HelloWorld @hello="showHelloMsg" msg:"msg"></HelloWorld>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
export default {
  name: "App",
  setup(props, context) {
    function showHelloMsg(value) {
      alert(`你好啊，你触发了hello事件，我收到的参数是:${value}！`);
    }
    return { showHelloMsg };
  },
  components: { HelloWorld },
};
</script>

<template>
  <h2>姓名：{{ yk.name }}</h2>
  <button @click="test">测试触发一下HelloWorld组件的Hello事件</button>
</template>

<script>
import { reactive } from "@vue/reactivity";
export default {
  name: "HelloWorld",
  props: ['msg'], //不写会报错
  emits:["hello"], // 不写能执行，但是会报警告
  setup(props, context) {
    let yk = reactive({
      name: "YK菌",
    });
    function test() {
      context.emit("hello", "**子组件的信息**");
    }
    return { yk,test };
  },
};
</script>
```

### computed 计算属性

```ts
import {computed} from 'vue'  //引入

setup(){
    ...
	//计算属性 —— 简写
    let fullName = computed(()=>{
        return person.firstName + '-' + person.lastName
    })
    //计算属性 —— 完整
    let fullName = computed({
        get(){
            return person.firstName + '-' + person.lastName
        },
        set(value){
            const nameArr = value.split('-')
            person.firstName = nameArr[0]
            person.lastName = nameArr[1]
        }
    })
}
```

## watch 属性

- 注意点

  - 监视 reactive 定义的对象时：oldValue 无法正确获取 强制开启了深度监视（deep 配置失效）。
  - 监视 reactive 定义的响应式数据中某个属性(基本数据类型)时：deep 配置有效。

- 监视基本类型数据

```ts
watch(
  sum,
  (newValue, oldValue) => {
    console.log("sum变化了", newValue, oldValue);
  },
  { immediate: true }
);
//监视多个数据
watch([sum, msg], (newValue, oldValue) => {
  console.log("sum或msg变化了", newValue, oldValue);
});
```

- 监视对象（ref 定义）

```ts
watch(person.value, (newValue, oldValue) => {
  console.log("person变化了", newValue, oldValue);
});
或者;
watch(
  person,
  (newValue, oldValue) => {
    console.log("person变化了", newValue, oldValue);
  },
  { deep: true }
);
```

- 监视对象（reactive 定义）

```ts
//函数返回值
watch(
  [() => person.job, () => person.name],
  (newValue, oldValue) => {
    console.log("person的job变化了", newValue, oldValue);
  },
  { immediate: true, deep: true }
);
```

## watchEffect 函数（常用）

- watch 的套路是：既要指明监视的属性，也要指明监视的回调。

- watchEffect 的套路是：不用指明监视哪个属性，监视的回调中用到哪个属性，那就监视哪个属性。

- watchEffect 有点像 computed：

  - 但 computed 注重的计算出来的值（回调函数的返回值），所以必须要写返回值。

  - 而 watchEffect 更注重的是过程（回调函数的函数体），所以不用写返回值。

```ts
//watchEffect所指定的回调中用到的数据只要发生变化，则直接重新执行回调。
watchEffect(() => {
  const x1 = sum.value;
  const x2 = person.age;
  console.log("watchEffect配置的回调执行了");
});
```

## 生命周期

一般来说，组合式 API 里的钩子会比配置项的钩子先执行，组合式 API 的钩子名字有变化
生命周期函数需要 import 导入，在 setup()中使用

- Vue3.0 也提供了 Composition API 形式的生命周期钩子，与 Vue2.x 中钩子对应关系如下：

  - beforeCreate===>setup()
  - created=======>setup()
  - beforeMount ===>onBeforeMount
  - mounted=======>onMounted
  - beforeUpdate===>onBeforeUpdate
  - updated =======>onUpdated
  - beforeUnmount ==>onBeforeUnmount
  - unmounted =====>onUnmounted

```ts
<script lang='ts'>
import {
    ref,
    reactive,
    toRefs,
    onBeforeMount,// 在组件挂载之前执行的函数
    onMounted,
    onBeforeUpdate,// 在组件修改之前执行的函数
    onUpdated,
    onBeforeUnmount,// 在组件卸载之前执行的函数
    onUnmounted
} from "vue";
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  // 使用setup 代替 data
  // 这里使用的是typescript，因此需要给参数指定类型
  setup(props:any,context:any){
    console.log("1-开始创建组件-----setup()");
    // ref 定义响应式数据
    // let count = ref(0);

    // reactive 创建响应式对象
    let data = reactive({
      // 定义响应式数据
      count:0,
    });

    const clickMe = () => {
      // 使用ref关键字绑定的变量，赋值 的时候必须使用.value
      // count.value++;
      // 调用reactive 定义对象的参数的时候需要使用对象.来调用
      data.count++;
      alert('hi');
    }

    onBeforeMount(() => {
      console.log("2-组件挂载到页面之前执行-----onBeforeMount()");
    });

    onMounted(() => {
      console.log("3-组件挂载到页面之后执行-----onMounted()");
    });
    onBeforeUpdate(() => {
      console.log("4-组件更新之前-----onBeforeUpdate()");
    });

    onUpdated(() => {
      console.log("5-组件更新之后-----onUpdated()");
    });

    // 使用toRefs函数对data对象进行包装，确保使用扩展运算符进行解构之后，仍具有响应式
    let param = toRefs(data);
    return {
      // data,
      ...param,
      clickMe
    }
  },
}
</script>
```

## 自定义 hook 函数（重点）

- 什么是 hook？—— 本质是一个函数，把 setup 函数中使用的 Composition API 进行了封装。

- 类似于 vue2.x 中的 mixin。

- 自定义 hook 的优势: 复用代码, 让 setup 中的逻辑更清楚易懂。

创建一个 hooks 文件夹，里面创建文件 usePoint.js

```ts
import { reactive, onMounted, onBeforeUnmount } from "vue";
export default function () {
  //实现鼠标“打点”相关的数据
  let point = reactive({
    x: 0,
    y: 0,
  });

  //实现鼠标“打点”相关的方法
  function savePoint(event) {
    point.x = event.pageX;
    point.y = event.pageY;
    console.log(event.pageX, event.pageY);
  }

  //实现鼠标“打点”相关的生命周期钩子
  onMounted(() => {
    window.addEventListener("click", savePoint);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("click", savePoint);
  });

  return point;
}
```

在组件中使用

```ts
<template>
	<h2>我是HelloWorld组件</h2>
	<h2>当前点击时鼠标的坐标为：x：{{point.x}}，y：{{point.y}}</h2>
</template>

<script>
	import usePoint from '../hooks/usePoint'
	export default {
		name:'HelloWorld',
		setup(){
			const point = usePoint()
			return {point}
		}
	}
</script>
```

## toRef(常用)

- 作用：创建一个 ref 对象，其 value 值指向另一个对象中的某个属性。

- 语法：const name = toRef(person,'name')

- 应用: 要将响应式对象中的某个属性单独提供给外部使用时。

- 扩展：toRefs 与 toRef 功能一致，但可以批量创建多个 ref 对象，语法：toRefs(person)

```ts
<template>
	<h4>{{person}}</h4>
	<h2>姓名：{{name}}</h2>
	<h2>年龄：{{age}}</h2>
	<h2>薪资：{{job.j1.salary}}K</h2>
	<button @click="name+='~'">修改姓名</button>
	<button @click="age++">增长年龄</button>
	<button @click="job.j1.salary++">涨薪</button>
</template>

<script>
	import {ref,reactive,toRef,toRefs} from 'vue'
	export default {
		name: 'Demo',
		setup(){
			//数据
			let person = reactive({
				name:'张三',
				age:18,
				job:{
					j1:{
						salary:20
					}
				}
			})

			// const name1 = person.name
			// console.log('%%%',name1)

			// const name2 = toRef(person,'name')
			// console.log('####',name2)

			const x = toRefs(person)
			console.log('******',x)

			return {
				person,
				// name:toRef(person,'name'),
				// age:toRef(person,'age'),
				// salary:toRef(person.job.j1,'salary'),
				...toRefs(person)
			}
		}
	}
</script>
```

## shallowReactive 与 shallowRef

- shallowReactive：只处理对象最外层属性的响应式（浅响应式）。

- shallowRef：只处理基本数据类型的响应式, 不进行对象的响应式处理。

- 什么时候使用?
  - 如果有一个对象数据，结构比较深, 但变化时只是外层属性变化 ===> shallowReactive。
  - 如果有一个对象数据，后续功能不会修改该对象中的属性，而是生新的对象来替换 ===> shallowRef。

## readonly 与 shallowReadonly

- readonly: 让一个响应式数据变为只读的（深只读）。
- shallowReadonly：让一个响应式数据变为只读的（浅只读）。
- 应用场景: 不希望数据被修改时。

## customRef

- 作用：创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制。

实现防抖效果

```ts
<template>
  <input type="text" v-model="keyWord" />
  <h3>{{ keyWord }}</h3>
</template>

<script>
import { customRef } from "vue";
export default {
  name: "App",
  setup() {
    //自定义一个ref——名为：myRef
    function myRef(value, delay) {
      let timer;
      return customRef((track, trigger) => {
        return {
          get() {
            console.log(`有人从myRef这个容器中读取数据了，我把${value}给他了`);
            track(); // 通知Vue追踪value的变化（提前和get商量一下，让他认为这个value是有用的）
            return value;
          },
          set(newValue) {
            console.log(`有人把myRef这个容器中数据改为了：${newValue}`);
            clearTimeout(timer);
            timer = setTimeout(() => {
              value = newValue;
              trigger(); // 通知Vue去重新解析模板
            }, delay);
          },
        };
      });
    }

    // let keyWord = ref('hello') //使用Vue提供的ref
    let keyWord = myRef("hello", 500); //使用程序员自定义的ref

    return { keyWord };
  },
};
</script>
```

## provide 与 inject

- 作用：实现祖与后代组件间通信

- 套路：父组件有一个 provide 选项来提供数据，后代组件有一个 inject 选项来开始使用这些数据

祖组件中：

```ts
setup(){
	......
    let car = reactive({name:'奔驰',price:'40万'})
    provide('car',car) // 给自己的后代组件传递数据
    ......
}
```

后代组件中：

```ts
setup(props,context){
	......
    const car = inject('car') // 拿到祖先的数据
    return {car}
	......
}
```

### Fragment

- 在 Vue2 中: 组件必须有一个根标签
- 在 Vue3 中: 组件可以没有根标签, 内部会将多个标签包含在一个 Fragment 虚拟元素中
  好处: 减少标签层级, 减小内存占用
  **_template 里不需要放 div，默认会有 Fragment 虚拟元素包裹_**

## Suspense

- 等待异步组件时渲染一些额外内容，让应用有更好的用户体验

- 使用步骤：

  - 异步引入组件

```ts
import { defineAsyncComponent } from "vue";
const Child = defineAsyncComponent(() => import("./components/Child.vue"));
```

使用 Suspense 包裹组件，并配置好 default 与 fallback

```ts
<template>
  <div class="app">
    <h3>我是App组件</h3>
    <Suspense>
      <template v-slot:default>
        <Child />
      </template>
      <template v-slot:fallback>
        <h3>加载中.....</h3>
      </template>
    </Suspense>
  </div>
</template>
```

default：就是组件要显示的内容

fallback：就是组件没加载完全的“备胎”

### Teleport

Teleport 是一种能够将我们的组件 html 结构移动到指定位置的技术。

```ts
<template>
  <div>
    <button @click="isShow = true">点我弹个窗</button>
    <teleport to="body">
    <div v-if="isShow" class="mask">
      <div class="dialog">
        <h3>我是一个弹窗</h3>
        <h4>一些内容</h4>
        <h4>一些内容</h4>
        <h4>一些内容</h4>
        <button @click="isShow = false">关闭弹窗</button>
      </div>
    </div>
    </teleport>
  </div>
</template>
```

## 过渡类名

```css
.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.v-leave-from,
.v-enter-to {
  opacity: 1;
}
```

### Vue3 diff

https://juejin.cn/post/7014504484449550350#heading-6 1.头头往后比较 2.尾尾往前比较
当出现

a b c
a b
此时 e1 = 2，e2 = 1, i = 2
I > e2, i <= e1 那么将 i 到 e1 的节点进行卸载

a b
a b c
此时 e1 = 1，e2 = 2, i = 2
e1 < i 且 e2 >= i, 进行新增节点

a b e f g h
a b c t n h
中间乱序，但是可以移动进行复用 1.用 keyToNewIndexMap 保存乱序部分的 key 和下标 2.用 newIndexToOldIndexMap 保存新节点在旧节点的位置
3.maxNewIndexSoFar 表示当前可复用节点(旧)在新节点的下标 newindex 的最大值
如果 newindex 小于 maxNewIndexSoFar，说明发生交叉，需要移动 3.之后用最长递增字串方式来获得可复用节点
