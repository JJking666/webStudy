<!--
 * @Descripttion:
 * @version:
 * @Author: congsir
 * @Date: 2022-04-25 22:25:01
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2023-01-06 23:17:18
-->

> 对伪元素的动态设置可以通过动态类来实现

如写一個伪元素的类，当需要伪元素出现时，给目标元素加上类，不需要则去掉类

> 只使用步骤条的左侧

1.将组件宽度设置好左侧条的宽度 2.之后将右侧内容与步骤条的父元素进行 flex row 布局即可 3.注意要将步骤条内类进行高度及宽度固定，有些需要 display：inline-block

> 下拉刷新更新更多历史

- 一个内容框有多个日期，每个日期有多个记录，故使用二维数组
- 第一次因为没有当前日期，故第一次直接加入到一个数组项且初始化当前日期
- 设置一个当前日期
  - 如果当前记录的日期等于当前日期则加入一个数组项
  - 若不等于，那么将数组项加到总数组中，然后将当前记录加入到一个新的数组项，设置新的当前日期
- 因为初始化时最后一个记录肯定没机会(走了第一个选项)加入到总数组，因此需要设置初始化时最后额外将数组项加入到总数组
- 之后刷新获取更多记录
- 对第一个记录进行判断(因为时间最邻近可能是同日期)

  - 若该记录的日期与总数组第一项中的日期相同，那么设置当前日期，并将总数组第一项复制给数组项，再将记录加入到数组项
    - 因为当前这次刷新获取的记录是直接加入到之前总数组里的，故不能重复加入
    - 进行判断如果总数组的第一项的第一个记录 id 等于当前数组项的第一个记录 id，说明两个数组是一样的，则不再加入
  - 若不同，那么没有当前日期，第一次直接加入到一个数组项且初始化当前日期

- 将接口英文和中文提取\`\s(.)+\s\'
- 提取中文\'[\u4e00-\u9fa5]+\'

- 对表单中 input 进行聚焦可以在行内使用 focus="{{item.focus}}"
- 之后检测时查看该字段的 require 和 value，若不满足 require 则设置 foces 为 true 聚焦
- 表单检测报错语句使用 item.err 来判断是否显示

> 怎么处理大量数据

- 使用分页，每次获取部分数据
- 下拉刷新获取数据
- 对于纯展示不需要变化的数据使用 Object.freeze 冻结(失去响应性)，减少 observer 和内存开销

```ts
this.item = Object.freeze(Object.assign({}, this.item));
```

scroll-view 滑动需要设置高度及滑动方向，若出现两条滑动条，说明 scorll-view 高度太大

> ant design react 表单

- 日期回显，如果初始化值为 moment，那么直接赋值，否则 moment(日期)
- 单/多选框回显，将初始化的值处理为和组件 value 同样的值即可
- 图片上传回显，将 url 数组处理为一个个 fileList 对象然后放入数组即可
- form.setFieldValues()传入数据对象即可回显

> 权限路由

- 第一种先设置基础路由,之后设置路由守卫第一次进入时判断身份，之后过滤路由，再通过 addRoute 添加额外的路由
- 第二种设置完整路由，之后设置路由守卫在每次进入时判断是否能进入

> 权限菜单

- 先写好完整菜单，之后通过后端传的权限对菜单进行过滤

> 按钮权限

- v-if 判断当前路由的路由元的权限属性
- v-指令判断，先将权限列表放在 localstorage，之后判断，如果没有权限则 el.parentNode.removeChild(el)删除该按钮

> 跨域

- cors 只需要在后端设置即可
  - 如果是简单请求 get post head 则只需要设置'Access-Control-Allow-Origin'为 '\*'
  - 如果是复杂请求 除简单请求方法外的，则要设置 Access-Control-Allow-Origin，Access-Control-Allow-Headers，Access-Control-Allow-Methods
- 使用代理
  - 在 vue.config.js 里设置

```ts
module.exports = {
  devServer: {
    host: "127.0.0.1",
    port: 8084,
    open: true, // vue项目启动时自动打开浏览器
    proxy: {
      "/api": {
        // '/api'是代理标识，用于告诉node，url前面是/api的就是使用代理的
        target: "http://xxx.xxx.xx.xx:8080", //目标地址，一般是指后台服务器地址
        changeOrigin: true, //是否跨域
        pathRewrite: {
          // pathRewrite 的作用是把实际Request Url中的'/api'用""代替
          "^/api": "",
        },
      },
    },
  },
};
```

注意设置基础路径`axios.defaults.baseURL = '/api'`

- jsonp 进行跨域

> sso 单点登录

多系统登录

- 首先用户访问系统 1，发现未登录则跳转到 sso 认证中心并以自身地址做参数
- 在认证中心发现未登录，没有可登录的令牌
- 进行登录，登录成功后会创建全局会话以及授权令牌
- 将重定向并把令牌作为参数返回给系统 1
- 系统 1 拿着令牌去访问认证中心，验证令牌成功后重定向回系统一，系统 1 用令牌创建局部会话
- 服务器返回资源给浏览器
- 之后用户想要登录系统 2，首先发现未登录然后跳转到 sso 认证中心并以自身地址做参数
- 在认证中心验证登录了之后返回一个令牌并重定向回系统 2
- 系统 2 再拿着这个令牌去认证中心验证，验证令牌成功后重定向回系统 2，系统 2 用令牌创建局部会话
- 服务器返回资源给浏览器

### 级联

- 级联的回显如果是多选的话需要传二维数组，否则是一维
- 扁平化可以使用在级联这里，因为回显需要二维，但是发请求的数据哩只要一维

### 浏览器调试

- console.log
- console.dir 打印出被略写的对象如 dom
- console.table 将对象或者数组以表格形式显示更清晰

### 路由菜单

希望某个路径显示高亮
如希望 task/xxx 都显示高亮
A.设置菜单项 index 为 task
B.设置菜单的 active 为计算属性返回一个**函数**，参数是$route.path
C.正则匹配 task/，如果匹配成功直接返回‘task’

#### console.log(JSON.stringify(xxxx,null,4))

可以让 json 格式对齐

### 为什么图片在动态引入时要加上 require

因为动态添加的 src 会被当作静态资源处理，被编译后的静态路径无法正确引入资源，所以要加上 require

### 给自定义事件添加参数

如父组件@event = “test”
子组件 emit(‘event’，val，I，item)
此时父组件也想给事件加参数 index
那么改成 test(…arguments, index)即可

### 页面加载大量图片优化

1.精灵图 2.打包时压缩图片 gzip 3.懒加载视图外的图片 4.在页面加载前预加载图片 5.压缩图片体积如改变图片格式

### vuex 数据不响应

原因：
在 data 中设置了 value = this.$store.state.value，这只能在初始化时赋值
但在 vuex 更新时不会使页面更新
解决： 1.直接 v-model 中绑定 ¥store.state.value 2.使用 mapState

### 对象判断是否空

- 使用 json.stringify
- 遍历 key
- 获取 key（）长度

### 按钮权限

- 可以使用 v-if 但是可读性差
- 权限组件（把原来的组件作为插槽放进权限组件）
- v-指令 可以统一处理（在指令在 created 中执行，如果 created 中去访问权限内容会有问题）

### 定位 bug

- 模拟线上环境
  先对项目进行生产环境的打包，然后使用 http-server 插件启动一个静态 http 服务器，打开页面后发现页面报错（但是因为代码压缩定位不到错误位置
- 使用 Ajax Interceptor 拓展程序，可以拦截并修改 axios 返回结果，帮助我们去调试
- 目的：给线上环境加 source-map
  按 1 进行打包开服务器，然后在打包后的文件找到 map 文件，然后将 map 文件添加到网页控制台的 source 中，这样就能定位错误代码位置

### 取消 axios 请求

```ts
//先获取 cancelToken 方法
const CancelToken = axios.CancelToken;

//发送前获取该请求的 cancelToken
this.cancelToken = new CancelToken(c => {
this.cancel = c;
});
Await getXXX({data:xxx, cancelToken: this.cancelToken })

//组件销毁阶段调用 cancel 方法取消请求
beforeDestroy () {
this.cancel(`${this.pageName}取消请求`);
}
```

### 实现表单取消恢复初始值

initData 代表初始值
nowData 代表表单现在的值

在打开表单的时候 Object.assign(nowData, initData)
如果点击了取消则 Object.assign(nowData, initData)
若保存成功则 Object.assign(initData，nowData)

### require.context webpack 或 cli 中实现自动引入模块或注册全局组件

在出现想要引入一个目录下所有文件时，如果子文件只有 3 个，那么可以直接一个个引入，但如果有三十个，那么一个个引入显然不合理，故可以使用 require.context 进行自动化引入

require.context 函数接受三个参数

1. directory {String} -读取文件的路径
2. useSubdirectories {Boolean} -是否遍历文件的子目录
3. regExp {RegExp} -匹配文件的正则
   require.context(‘@src/components’, true, /.js$/);

```ts
//引入模块
// 获取当前页面下所有文件路径
let context = require.context("./modules", false, /\.js$/);
// 获取文件路径
let fileList = context.keys();
let list = {};
let filter = ["mock", "config"];
// 过滤非必要加载文件
fileList
  .filter((item) => {
    return !filter.filter((fd) => item.includes(fd));
  })
  .forEach((item) => {
    // 加载文件
    let me = context(item);
    let data = me.default || me;
    Object.assign(list, data);
  });

// 注册全局组件
const requireComponents = require.context("../views/components", true, /\.vue/);
// 打印结果
// 遍历出每个组件的路径
requireComponents.keys().forEach((fileName) => {
  // 传入文件名获取对应组件实例
  const reqCom = requireComponents(fileName);
  // 截取路径作为组件名
  const reqComName = fileName.split("/")[1];
  // 组件挂载
  Vue.component(reqComName, reqCom.default || reqCom);
});
```

### 封装 axios 实现进度条

```ts
axios({
  url: 'https://www.***.com/***.png',
  method: 'get',
  onDownloadProgress (progress) {
    console.log(Math.round(progress.loaded / progress.total \* 100) + '%');
    }
  })

const httpPost = (URL, params, config = {}) => {
  return axios({
    url: URL,
    method: 'post',
    data: { ...params },
    ...config
    })
  }
httpPost('http://hah.com', {}, {
  onUploadProgress (progress) {
    console.log(Math.round(progress.loaded / progress.total \* 100) + '%');
    }
  })


```

### \n 换行符在字符串中不会换行

添加`white-space: pre-line;`即可换行

### white-space

- Normal : 空白符会直接被忽略
- Pre：空白符会被保留
- Nowrap：不换行直到遇到`<br>`
- Pre-wrap：保留空白符，正常换行
- Pre-line：合并空白符，保留换行
- inherit：继承父

### 图片压缩

- 通过 input 的 change 事件获取 file
- 对 file 的 size 进行判断
- 将 file 转成 base64 格式

```ts
const reader = new FileReader();
reader.readAsDataURL(file);
reader.onLoad((e) => {
  const base64Url = e.target.result;
  reader = null;
});
```

- 计算图片宽高，压缩宽高
- 获取 canvas 上下文，使用 drawImage 绘制图片
- 使用 canvas.toDataURL('image/jpeg', 0.8)获取压缩后的 url
- 上传到后端

### 黑暗模式

- 在 html 标签上加上 filter：grayscale(%)使所有图片转为灰色
- 使用媒体查询判断系统设置@media (prefers-color-scheme: dark)
- 使用 js 根据系统切换类名
  注意 filter 虽然能够实现黑暗模式，但是有个问题，图片和背景图也会被滤镜，可以通过对图片再 filter 一次解决这个问题。

```css
html {
  background: #fff;
  filter: invert(1) hue-rotate(180deg);
}
html img {
  filter: invert(1) hue-rotate(180deg);
}
```

### 单点登录

1.同根域下
直接将 cookie 的 domain 设置为根域，这样所有站点都能通过该 cookie 登录

2.不同根域下：
A.用户访问应用 A，查看 cookie 发现没有登录
B.用户跳转到认证 z 中心（url 携带应用 A 的路径）
C.认证中心发现用户没有登录，于是进行登录
D.登录成功后，服务端返回令牌，认证中心创建全局会话，跳转回应用 A 并在 url 带上令牌
E.应用 A 创建局部会话，并带上令牌再向认证中心发请求，验证成功，返回资源
F.用户访问应用 B，查看 cookie 发现没有登录
G.用户跳转到认证 z 中心（url 携带应用 A 的路径）
H.认证中心发现用户已经登录，于是跳转回应用 B 并在 url 带上令牌
I.应用 B 创建局部会话，并带上令牌再向认证中心发请求，验证成功，返回资源

### 实现 a-model 效果，使 div 具有失焦效果

A. 在根元素设置点击事件，使 div 隐藏
B.在当前 div 设置点击事件，并且设置阻止冒泡
C.这样当点击 div 时，不会冒泡到根元素去隐藏，而点击 div 外的元素则会隐藏 div

#### 进入页面时默认打开路由菜单的第一项

S.先检查是否有已缓存的路径，有则直接使用然后 return
A.首先获取路由菜单对象
B.根据权限过滤路由菜单对象
C.之后获取到首个菜单项
D.之后根据菜单项来获取被选中路径
E.可以在进入页面时调用函数触发使用 push，也可以在路由拦截器里根据情况触发函数。

#### 切换版本时，保存原来页面的路由菜单情况

A.在每次点击路由菜单时，使用 localstorage 或者 cookie 去保存当前路径信息
️ 当默认打开路由菜单时注意也要保存默认路径信息，否则会丢失上一次路径信息
️️ 可以使用 watch 监听路径变化，直接保存更加简便
B.返回时触发默认打开路由菜单第一项

#### 首屏加载时间

a.DOMContentLoaded 是 dom🌲 构建完成
B.window.onload 整个页面加载完成，包括图片，视频等外部资源
C.使用 performance 的 api 进行计算
times = (performance.timing.domComplete - performance.timing.navigationStart) / 1000

#### 首屏优化

A.路由懒加载
B.打包时将体积小的图片资源转成 base64，减少请求发送
C.多使用缓存
D.对第三方库如组件库进行按需加载
E.打包时进行 compress 压缩
F.打包时使用 CommonsChunkPlugin 抽离公共模块
g.使用 tree-shaking
H.对渲染内容进行懒加载
