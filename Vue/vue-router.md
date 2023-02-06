### router-link

我们没有使用常规的 a 标签，而是使用一个自定义组件 router-link 来创建链接。这使得 Vue Router 可以在不重新加载页面的情况下更改 URL，处理 URL 的生成以及编码。我们将在后面看到如何从这些功能中获益。

```ts
<!--使用 router-link 组件进行导航 -->
<!--通过传递 `to` 来指定链接 -->
<!--`<router-link>` 将呈现一个带有正确 `href` 属性的 `<a>` 标签-->
<router-link to="/">Go to Home</router-link>
```

### router-view

router-view 将显示与 url 对应的组件。你可以把它放在任何地方，以适应你的布局。

```ts
<!-- 路由出口 -->
<!-- 路由匹配到的组件将渲染在这里 -->
<router-view></router-view>
```

## router 使用

```ts
// 1. 定义路由组件.
// 也可以从其他文件导入
const Home = { template: "<div>Home</div>" };
const About = { template: "<div>About</div>" };

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
];

// 3. 创建路由实例并传递 `routes` 配置
const router = VueRouter.createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: VueRouter.createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});

// 5. 创建并挂载根实例
const app = Vue.createApp({});
//确保 _use_ 路由实例使
//整个应用支持路由。
app.use(router);

app.mount("#app");
```

## 带参数的动态路由匹配#

很多时候，我们需要将给定匹配模式的路由映射到同一个组件。例如，我们可能有一个 User 组件，它应该对所有用户进行渲染，但用户 ID 不同。在 Vue Router 中，我们可以在路径中使用一个动态字段来实现，我们称之为 路径参数

```ts
//router.js
const routes = [
  // 动态字段以冒号开始
  { path: '/users/:id', component: User },
]
//xxx.vue
<div>User {{ $route.params.id }}</div>
```

> 匹配模式 /users/:username/posts/:postId
> 匹配路径 /users/eduardo/posts/123
> $route.params { username: 'eduardo', postId: '123' }

## 路由的匹配语法

两个路由 /:orderId 和 /:productName，两者会匹配完全相同的 URL，所以我们需要一种方法来区分它们。最简单的方法就是在路径中添加一个静态部分来区分它们：

```ts
const routes = [
  // 匹配 /o/3549
  { path: "/o/:orderId" },
  // 匹配 /p/books
  { path: "/p/:productName" },
];
```

但在某些情况下，我们并不想添加静态的 /o /p 部分。由于，orderId 总是一个数字，而 productName 可以是任何东西，所以我们可以在括号中为参数指定一个自定义的正则

```ts
const routes = [
  // /:orderId -> 仅匹配数字
  { path: "/:orderId(\\d+)" },
  // /:productName -> 匹配其他任何内容
  { path: "/:productName" },
];
```

现在，转到 /25 将匹配 /:orderId，其他情况将会匹配 /:productName

> 可重复的参数

如果你需要匹配具有多个部分的路由，如 /first/second/third，你应该用 \*（0 个或多个）和 +（1 个或多个）将参数标记为可重复

```ts
//+号 1-多个     *号 0-多个
const routes = [
  // /:chapters ->  匹配 /one, /one/two, /one/two/three, 等
  { path: "/:chapters+" },
  // /:chapters -> 匹配 /, /one, /one/two, /one/two/three, 等
  { path: "/:chapters*" },
];
//结合正则
const routes = [
  // 仅匹配数字
  // 匹配 /1, /1/2, 等
  { path: "/:chapters(\\d+)+" },
  // 匹配 /, /1, /1/2, 等
  { path: "/:chapters(\\d+)*" },
];
```

> 可选参数
> 你也可以通过使用 ? 修饰符(0 个或 1 个)将一个参数标记为可选：

```ts
const routes = [
  // 匹配 /users 和 /users/posva
  { path: '/users/:userId?' },
  // 匹配 /users 和 /users/42
  { path: '/users/:userId(\\d+)?' },
]
请注意，* 在技术上也标志着一个参数是可选的，但 ? 参数不能重复。
```

## 嵌套路由

```ts
const routes = [
  {
    path: "/user/:id",
    component: User,
    children: [
      {
        // 当 /user/:id/profile 匹配成功
        // UserProfile 将被渲染到 User 的 <router-view> 内部
        path: "profile",
        component: UserProfile,
      },
      {
        // 当 /user/:id/posts 匹配成功
        // UserPosts 将被渲染到 User 的 <router-view> 内部
        path: "posts",
        component: UserPosts,
      },
    ],
  },
];
```

注意，以 / 开头的嵌套路径将被视为根路径。这允许你利用组件嵌套，而不必使用嵌套的 URL

当你访问不存在的路由时，在 User 的 router-view 里面什么都不会呈现，因为没有匹配到嵌套路由。也许你确实想在那里渲染一些东西。在这种情况下，你可以提供一个空的嵌套路径

```ts
children: [
    // 当 /user/:id 匹配成功
    // UserHome 将被渲染到 User 的 <router-view> 内部
    { path: '', component: UserHome },      //path:'*'放在最底下

    // ...其他子路由
],
```

## 编程式路由

在 Vue 实例中，你可以通过 $router 访问路由实例。因此你可以调用 this.$router.push。这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，会回到之前的 URL

当你点击\<router-link> 时，内部会调用这个方法，所以点击 <router-link :to="..."> 相当于调用 router.push(...)

```ts
<router-link :to="{ name: 'user', params: { username: 'erina' }}">
//相当于
router.push({ name: 'user', params: { username: 'erina' } })

// 字符串路径
router.push('/users/eduardo')

// 带有路径的对象
router.push({ path: '/users/eduardo' })

// 命名的路由，并加上参数，让路由建立 url
router.push({ name: 'user', params: { username: 'eduardo' } })

// 带查询参数，结果是 /register?plan=private
router.push({ path: '/register', query: { plan: 'private' } })

// 带 hash，结果是 /about#team
router.push({ path: '/about', hash: '#team' })
```

该方法的参数可以是一个字符串路径，或者一个描述地址的对象。例如：

```ts
// 字符串路径
router.push("/users/eduardo");

// 带有路径的对象
router.push({ path: "/users/eduardo" });

// 命名的路由，并加上参数，让路由建立 url
router.push({ name: "user", params: { username: "eduardo" } });

// 带查询参数，结果是 /register?plan=private
router.push({ path: "/register", query: { plan: "private" } });

// 带 hash，结果是 /about#team
router.push({ path: "/about", hash: "#team" });
```

注意：如果提供了 path，params 会被忽略，上述例子中的 query 并不属于这种情况。取而代之的是下面例子的做法，你需要提供路由的 name 或手写完整的带有参数的 path ：

```ts
const username = "eduardo";
// 我们可以手动建立 url，但我们必须自己处理编码
router.push(`/user/${username}`); // -> /user/eduardo
// 同样
router.push({ path: `/user/${username}` }); // -> /user/eduardo
// 如果可能的话，使用 `name` 和 `params` 从自动 URL 编码中获益
router.push({ name: "user", params: { username } }); // -> /user/eduardo
// `params` 不能与 `path` 一起使用
router.push({ path: "/user", params: { username } }); // -> /user
```

由于属性 to 与 router.push 接受的对象种类相同，所以两者的规则完全相同。

router.push 和所有其他导航方法都会返回一个 Promise，让我们可以等到导航完成后才知道是成功还是失败

## 替换历史记录

它的作用类似于 router.push，唯一不同的是，它在导航时不会向 history 添加新记录，正如它的名字所暗示的那样——它取代了当前的条目。

> 声明式 \<router-link :to="..." replace>
> 编程式 router.replace(...)
> 或者在传递给 router.push 的 routeLocation 中增加一个属性 replace: true ：

router.push({ path: '/home', replace: true })
// 相当于
router.replace({ path: '/home' })

## 横跨历史

window.history.go(n) 或者 router.go(n)

```ts
// 向前移动一条记录，与 router.forward() 相同
router.go(1);
// 返回一条记录，与router.back() 相同
router.go(-1);
// 前进 3 条记录
router.go(3);
// 如果没有那么多记录，静默失败
router.go(-100);
router.go(100);
```

## 命名视图#

有时候想同时 (同级) 展示多个视图，而不是嵌套展示，例如创建一个布局，有 sidebar (侧导航) 和 main (主内容) 两个视图，这个时候命名视图就派上用场了。你可以在界面中拥有多个单独命名的视图，而不是只有一个单独的出口。如果 router-view 没有设置名字，那么默认为 default。

```ts
<router-view class="view left-sidebar" name="LeftSidebar"></router-view>
<router-view class="view main-content"></router-view>
<router-view class="view right-sidebar" name="RightSidebar"></router-view>
```

一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件。确保正确使用 components 配置 (带上 s)：

```ts
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      components: {
        default: Home,
        LeftSidebar, // LeftSidebar: LeftSidebar 的缩写
        RightSidebar, // 它们与 `<router-view>` 上的 `name` 属性匹配
      },
    },
  ],
});
```

## 重定向和别名#

重定向也是通过 routes 配置来完成，下面例子是从 /home 重定向到 /：

```ts
const routes = [{ path: '/home', redirect: '/' }]
重定向的目标也可以是一个命名的路由：

const routes = [{ path: '/home', redirect: { name: 'homepage' } }]
甚至是一个方法，动态返回重定向目标：

const routes = [
  {
    // /search/screens -> /search?q=screens
    path: '/search/:searchText',
    redirect: to => {
      // to是/search
      // return 重定向的字符串路径/路径对象
      return { path: '/search', query: { q: to.params.searchText } }
    },
  },
  {
    path: '/search',
    // ...
  },
]
```

请注意，导航守卫并没有应用在跳转路由上，而仅仅应用在其目标上。在上面的例子中，在 /home 路由中添加 `beforeEnter` 守卫不会有任何效果。

在写 `redirect` 的时候，可以省略 `component` 配置，因为它从来没有被直接访问过，所以没有组件要渲染。唯一的例外是嵌套路由：如果一个路由记录有 `children` 和 `redirect` 属性，它也应该有 `component` 属性。

## 别名

重定向是指当用户访问 /home 时，URL 会被 / 替换，然后匹配成 /。那么什么是别名呢？

将 / 别名为 /home，意味着当用户访问 /home 时，URL 仍然是 /home，但会被匹配为用户正在访问 /。

上面对应的路由配置为：

```ts
const routes = [{ path: '/', component: Homepage, alias: '/home' }]
//用一个数组提供多个别名
{
    path: '/users',
    component: UsersLayout,
    children: [
      // 为这 3 个 URL 呈现 UserList
      // - /users
      // - /users/list
      // - /people
      { path: '', component: UserList, alias: ['/people', 'list'] },
    ],
  },
```

如果你的路由有参数，请确保在任何绝对别名中包含它们：

```ts
const routes = [
  {
    path: "/users/:id",
    component: UsersByIdLayout,
    children: [
      // 为这 3 个 URL 呈现 UserDetails
      // - /users/24
      // - /users/24/profile
      // - /24
      { path: "profile", component: UserDetails, alias: ["/:id", ""] },
    ],
  },
];
```

## 将 props 传递给路由组件#

在你的组件中使用 $route 会与路由紧密耦合，这限制了组件的灵活性，因为它只能用于特定的 `URL`。虽然这不一定是件坏事，但我们可以通过 `props` 配置来解除这种行为：

我们可以将下面的代码

```ts
const User = {
  template: "<div>User {{ $route.params.id }}</div>",
};
const routes = [{ path: "/user/:id", component: User }];
```

替换成

```ts
const User = {
  props: ["id"],
  template: "<div>User {{ id }}</div>",
};
const routes = [{ path: "/user/:id", component: User, props: true }];
```

## 布尔模式#

当 props 设置为 true 时，route.params 将被设置为组件的 props。

对于有命名视图的路由，你必须为每个命名视图定义 props 配置：

```ts
const routes = [
  {
    path: "/user/:id",
    components: { default: User, sidebar: Sidebar },
    props: { default: true, sidebar: false },
  },
];
```

## 不同的历史模式#

在创建路由器实例时，history 配置允许我们在不同的历史模式中进行选择。

`Hash` 模式#
`hash` 模式是用 `createWebHashHistory()` 创建的：

```ts
import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    //...
  ],
});
```

它在内部传递的实际 `URL` 之前使用了一个哈希字符（#）。由于这部分 URL 从未被发送到服务器，所以它不需要在服务器层面上进行任何特殊处理。不过，它在 `SEO` 中确实有不好的影响。如果你担心这个问题，可以使用 `HTML5` 模式。

HTML5 模式#
用 `createWebHistory()` 创建 `HTML5` 模式，推荐使用这个模式：

```ts
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    //...
  ],
});
```

当使用这种历史模式时，URL 会看起来很 "正常"，例如 https://example.com/user/id。 漂亮!

不过，问题来了。由于我们的应用是一个单页的客户端应用，**如果没有适当的服务器配置，用户在浏览器中直接访问 https://example.com/user/id，就会得到一个 404 错误**。

# 导航守卫

全局前置守卫
你可以使用 router.beforeEach 注册一个全局前置守卫：
每个守卫方法接收三个参数：

- to: 即将要进入的目标
- from: 当前导航正要离开的路由
- next: 进入目标路由(注意参数是一个**回调**函数（参数为 vm，即目标组件实例），可以在这修改实例 data 等)

可以返回的值如下:

- false: 取消当前的导航。如果浏览器的 `URL` 改变了，那么 URL 地址会重置到 from 路由对应的地址。
- 一个路由地址: 通过一个路由地址跳转到一个不同的地址，就像你调用 router.push() 一样，你可以设置诸如 `replace: true` 或` name: 'home'` 之类的配置。当前的导航被中断，然后进行一个新的导航，就和 `from` 一样。

如果遇到了意料之外的情况，可能会抛出一个 `Error`。这会取消导航并且调用 `router.onError()` 注册过的回调。

如果什么都没有，undefined 或返回 true，则导航是有效的，并调用下一个导航守卫

```ts
const router = createRouter({ ... })

router.beforeEach((to, from,next) => {
    if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
    else next()
  //return false
})
```

## 全局后置钩子#

你也可以注册全局后置钩子，然而和守卫不同的是，这些钩子不会接受 `next` 函数也不会改变导航本身：

```ts
router.afterEach((to, from) => {
  sendToAnalytics(to.fullPath); //跳转路由后调用函数
});
```

## 路由独享的守卫#

你可以直接在路由配置上定义 `beforeEnter` 守卫：

```ts
const routes = [
  {
    path: "/users/:id",
    component: UserDetails,
    beforeEnter: (to, from) => {
      // reject the navigation
      return false;
    },
  },
];
```

`beforeEnter` 守卫 只在进入路由时触发，不会在 `params`、`query` 或 `hash` 改变时触发。例如，从 `/users/2` 进入到 `/users/3` 。它们只有在 从一个不同的 路由导航时，才会被触发。

你也可以将一个**函数数组**传递给 `beforeEnter`，这在为不同的路由重用守卫时很有用：

```ts
function removeQueryParams(to) {
  if (Object.keys(to.query).length)
    return { path: to.path, query: {}, hash: to.hash };
}

function removeHash(to) {
  if (to.hash) return { path: to.path, query: to.query, hash: "" };
}

const routes = [
  {
    path: "/users/:id",
    component: UserDetails,
    beforeEnter: [removeQueryParams, removeHash],
  },
  {
    path: "/about",
    component: UserDetails,
    beforeEnter: [removeQueryParams],
  },
];
```

请注意，你也可以通过使用路径 `meta` 字段和`全局导航守卫`来实现类似的行为

# 组件内的守卫#

最后，你可以在路由组件内直接定义路由导航守卫(传递给路由配置的)

可用的配置 API#

- `beforeRouteEnter`
- `beforeRouteUpdate`
- `beforeRouteLeave`

```ts
const UserDetails = {
  template: `...`,
  beforeRouteEnter(to, from) {
    // 在渲染该组件的对应路由被验证前调用
    // 不能获取组件实例 `this` ！因为当守卫执行时，组件实例还没被创建！
  },
  beforeRouteUpdate(to, from) {
    // 在当前路由改变，但是该组件被复用复用复用时调用
    // 举例来说，对于一个带有动态参数的路径 `/users/:id`，在 `/users/1` 和 `/users/2` 之间跳转的时候
    // 因为在这种情况发生的时候，组件已经挂载好了，导航守卫可以访问组件实例 `this`
  },
  beforeRouteLeave(to, from) {
    // 在导航离开渲染该组件的对应路由时调用
    // 与 `beforeRouteUpdate` 一样，它可以访问组件实例 `this`
  },
};
```

`beforeRouteEnter` 守卫 不能 访问 `this`，因为守卫在导航确认前被调用，因此即将登场的新组件还没被创建。

不过，可以通过传一个**回调**给 next 来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数：

```ts
beforeRouteEnter (to, from, next) {
  next(vm => {
    // 通过 `vm` 访问组件实例
  })
}
```

注意 beforeRouteEnter 是支持给 `next` 传递回调的**唯一守卫**。对于 `beforeRouteUpdate` 和 `beforeRouteLeave` 来说，`this `已经可用了，所以不支持 传递回调，因为没有必要了：

这个 离开守卫 通常用来预防用户在还未保存修改前突然离开。该导航可以通过返回 false 来取消。

```ts
beforeRouteLeave (to, from) {
  const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
  if (!answer) return false
}
```

# 完整的导航解析流程#

- 导航被触发。
- 在失活的组件里调用 beforeRouteLeave 守卫。
- 调用全局的 beforeEach 守卫。
- 在重用的组件里调用 beforeRouteUpdate 守卫(2.2+)。
- 在路由配置里调用 beforeEnter。
- 解析异步路由组件。
- 在被激活的组件里调用 beforeRouteEnter。
- 调用全局的 beforeResolve 守卫(2.5+)。
- 导航被确认。
- 调用全局的 afterEach 钩子。
- 触发 DOM 更新。
- 调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作\* 为回调函数的参数传入

## 路由元信息#

有时，你可能希望将任意信息附加到路由上，如过渡名称、谁可以访问路由等。这些事情可以通过接收属性对象的 meta 属性来实现，并且它可以在路由地址和导航守卫上都被访问到。定义路由的时候你可以这样配置 meta 字段：

```ts
const routes = [
  {
    path: '/posts',
    component: PostsLayout,
    children: [
      {
        path: 'new',
        component: PostsNew,
        // 只有经过身份验证的用户才能创建帖子
        meta: { requiresAuth: true }
      },
      {
        path: ':id',
        component: PostsDetail
        // 任何人都可以阅读文章
        meta: { requiresAuth: false }
      }
    ]
  }
]
```

那么如何访问这个 meta 字段呢？

首先，我们称呼 routes 配置中的每个路由对象为 路由记录。路由记录可以是嵌套的，因此，当一个路由匹配成功后，它可能匹配多个路由记录。

例如，根据上面的路由配置，/posts/new 这个 URL 将会匹配父路由记录 (path: '/posts') 以及子路由记录 (path: 'new')。

一个路由匹配到的所有路由记录会暴露为 $route 对象(还有在导航守卫中的路由对象)的$route.matched 数组。我们需要遍历这个数组来检查路由记录中的 `meta` 字段，但是 `Vue Router `还为你提供了一个 `$route.meta` 方法，它是一个非递归合并所有 `meta` 字段的（从父字段到子字段）的方法。这意味着你可以简单地写

```ts
router.beforeEach((to, from) => {
  // 而不是去检查每条路由记录
  // to.matched.some(record => record.meta.requiresAuth)
  if (to.meta.requiresAuth && !auth.isLoggedIn()) {
    // 此路由需要授权，请检查是否已登录
    // 如果没有，则重定向到登录页面
    return {
      path: "/login",
      // 保存我们所在的位置，以便以后再来
      query: { redirect: to.fullPath },
    };
  }
});
```

> history 和 hash

1.hash 模式(http://www.test.com/#/)就是 Hash URL，当#后面的哈希值发生变化时，可以通过 hashchange 事件来监听到 URL 的变化，从而进行跳转页面，并且无论哈希值如何变化，服务端接收到的 URL 请求永远是http://www.test.com。Hash 模式相对来说更简单，并且兼容性也更好。每一次改变#后的部分，都会在浏览器的访问历史中增加一个记录，使用"后退"按钮，就可以回到上一个位置。

2.history 模式 History 模式是 HTML5 新推出的功能，主要使用 history.pushState 和 history.replaceState 改变 URL。通过 History 模式改变 URL 同样不会引起页面的刷新，只会更新浏览器的历史记录。当用户做出浏览器动作时，比如点击后退按钮时会触发 popState 事件。

两种路由模式的区别
1.Hash 模式只可以更改 # 后面的内容，History 模式可以通过 API 设置任意的同源 URL
2.History 模式可以通过 API 添加任意类型的数据到历史记录中，Hash 模式只能更改哈希值，也就是字符串
3.Hash 模式下， 多次刷新为通一个页面的话，记录只添加一次
4.Hash 模式无需后端配置，并且兼容性好。History 模式在用户手动输入地址或者刷新页面的时候会发起 URL 请求，后端需要配置 index.html 页面用于匹配不到静态资源的时候

hash 虽然出现在 URL 中，但不会被包括在 HTTP 请求中，对后端完全没有影响，因此改变 hash 不会重新加载页面。

在 history 路由中，我们一定会使用 window.history 中的方法，常见的操作有：

- back()：后退到上一个路由；
- forward()：前进到下一个路由，如果有的话；
- go(number)：进入到任意一个路由，正数为前进，负数为后退；
- pushState(obj, title, url)：前进到指定的 URL，不刷新页面；
- replaceState(obj, title, url)：用 url 替换当前的路由，不刷新页面；
  调用这几种方式时，都会只是修改了当前页面的 URL，页面的内容没有任何的变化。但前 3 个方法只是路由历史记录的前进或者后退，无法跳转到指定的 URL；而 pushState 和 replaceState 可以跳转到指定的 URL。如果有面试官问起这个问题“如何仅修改页面的 URL，而不发送请求”，那么答案就是这 5 种方法。

可以说，hash 模式和 history 模式都属于浏览器自身的特性，Vue-Router 只是利用了这两个特性（通过调用浏览器提供的接口）来实现前端路由.

> pushState 和 replaceState 两个方法跟 location.href 和 location.replace 两个方法有什么区别呢？应用的场景有哪些呢？

location.href 和 location.replace 切换时要向服务器发送请求，而 pushState 和 replace 仅修改 url，除非主动发起请求；
仅切换 url 而不发送请求的特性，可以在前端渲染中使用，例如首页是服务端渲染，二级页面采用前端渲染；
可以添加路由切换的动画；
在浏览器中使用类似抖音的这种场景时，用户滑动切换视频时，可以静默修改对应的 URL，当用户刷新页面时，还能停留在当前视频

pushState 方法、replaceState 方法，只能导致 history 对象发生变化，从而改变当前地址栏的 URL，但浏览器不会向后端发送请求，也不会触发 popstate 事件的执行

popstate 事件的执行是在点击浏览器的前进后退按钮的时候，才会被触发

> popstate

每当激活同一文档中不同的历史记录条目时，popstate 事件就会在对应的 window 对象上触发。如果当前处于激活状态的历史记录条目是由 history.pushState() 方法创建的或者是由 history.replaceState() 方法修改的，则 popstate 事件的 state 属性包含了这个历史记录条目的 state 对象的一个拷贝。

调用 history.pushState() 或者 history.replaceState() 不会触发 popstate 事件。popstate 事件只会在浏览器某些行为下触发，比如点击后退按钮（或者在 JavaScript 中调用 history.back() 方法）。即，在同一文档的两个历史记录条目之间导航会触发该事件。

```ts
window.onpopstate = function (event) {
  alert(
    "location: " + document.location + ", state: " + JSON.stringify(event.state)
  );
};

history.pushState({ page: 1 }, "title 1", "?page=1");
history.pushState({ page: 2 }, "title 2", "?page=2");
history.replaceState({ page: 3 }, "title 3", "?page=3");
history.back(); // 弹出 "location: http://example.com/example.html?page=1, state: {"page":1}"
history.back(); // 弹出 "location: http://example.com/example.html, state: null
history.go(2); // 弹出 "location: http://example.com/example.html?page=3, state: {"page":3}
```
