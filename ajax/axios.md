# axios
```ts
const xhr = new XMLHttpRequest();
//设置接受数据的格式json
xhr.setResponseType='json'
//设置申请头
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
//设置申请头及自定义数据
//xhr.setRequestHeader("name","mch")
//设置发生方式及地址
xhr.open('GET', 'http://127.0.0.1:3000/serve',true); //第三个参数代表是否异步，一般使用true，false用作小型请求
//发送请求
xhr.send();         //若方法为post，则可携带参数
//准备码为0：初始化| 1：open（）结束 |2：send（）结束|3：接收部分数据|4：接收全部数据
xhr.onreadystatechange = () => {
if(xhr.readyState==4){
        if (xhr.status >= 200 && xhr.status < 300) {
             texts.innerHTML = xhr.responseText;//responseText||responseXml
        }
    }
}
```

在vue的main.js中全局声明
```ts
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000/'
Vue.prototype.$http = axios
```

## 方法中异步调用
```ts

methods:{
    async getStuData(){
      const {data:res}= await axios.get('/student')
      this.sData=res.data;
    }
```


+ 解决跨域问题
+ 在app.get(url,cb)回调函数中加入 
+ res.header("Access-Control-Allow-Origin","*"); 		//请求域名无限制



+ 注意点：
+ Form表单提交发出的请求不是axios，res.send()返回的是一个页面
+ 而axios发出请求res.send()返回的是内容


* Nodejs中获取url中query使用url.query *
* 可通过Object.keys和Object.Value获取键值对 *

## 搜索关键词
```ts
const getPhoneModel = (inputData) =>{
    let sel = new RegExp(inputData)
    return phoneModel.find({name:sel})
    .then((res)=>{return res;})
    .catch(err => console.error(err))
}
```

## get请求和post请求区别
>1、GET请求一般用去请求获取数据，
    POST一般作为发送数据到后台时使用

>2、GET请求也可传参到后台，但是其参数在浏览器的地址栏的url中可见，所以隐私性安全性较差，且参数长度也是有限制的
     POST请求传递参数放在Request body中，不会在url中显示，比GET要安全，且参数长度无限制

>3、GET请求刷新浏览器或回退时没有影响
    POST回退时会重新提交数据请求

>4、GET 请求可被缓存
    POST 请求不会被缓存

>5、GET 请求保留在浏览器历史记录中
     POST 请求不会保留在浏览器历史记录中

>6、GET 请求可被收藏为书签
    POST 不能被收藏为书签

>7、GET请求只能进行url编码（application/x-www-form-urlencoded）
    POST支持多种编码方式（application/x-www-form-urlencoded 或 multipart/form-data。为二进制数据使用多重编码。）

>8、GET请求比较常见的方式是通过url地址栏请求
    POST最常见是通过form表单发送数据请求

>9.GET产生一个TCP数据包；POST产生两个TCP数据包。
    对于GET方式的请求，浏览器会把http header和data一并发送出去，服务器响应200（返回数据）；
    而对于POST，浏览器先发送header，服务器响应100 continue，浏览器再发送data，服务器响应200 ok（返回数据）。网络差的时候能够检验数据包完整性

### HTTP Post请求的四种编码方式
>1.application/x-www-form-urlencoded 使用键值对拼接
>>抓包时获取:
Content-Type: application/x-www-form-urlencoded;charset=utf-8
//key1=val1&key2=val2
title=test&sub%5B%5D=1&sub%5B%5D=2&sub%5B%5D=3
>>用 JQuery 和 QWrap 的 Ajax提交数据时，Content-Type 默认值都是「application/x-www-form-urlencoded;charset=utf-8」
>>缺点:采用参数拼接，测试和测试困难

>2.Content-Type:multipart/form-data;
一般用作上传文件的表单发送请求(上传文件必须用该编码格式)

>3.application/json
axios发送请求时默认使用该编码格式
Content-Type: application/json;charset=utf-8
Js有支持json数据的Api，使用方便准确
JSON 格式支持比键值对复杂得多的结构化数据

>4.text/xml

# axios
```ts
//常用实例
axios.get('/user?ID=12345')
  .then(function (response) {
    // 处理成功情况
    console.log(response);
  })
  .catch(function (error) {
    // 处理错误情况
    console.log(error);
  })
  .then(function () {
    // 总是会执行
  });

// 上述请求也可以按以下方式完成（可选）
axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
    // 总是会执行
  });
//添加配置
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
  responseType: 'stream'            //规定响应数据类型
});
```

```ts
//别名
axios.request(config)
axios.get(url[, config])
axios.delete(url[, config])
axios.head(url[, config])
axios.options(url[, config])
axios.post(url[, data[, config]])
axios.put(url[, data[, config]])
axios.patch(url[, data[, config]])
```

> axios.create(config)  使用自定义配置新建一个实例
```ts
const instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});
```
>配置
```ts
// `url` 是用于请求的服务器 URL
url: '/user',
// `method` 是创建请求时使用的方法
method: 'get', // 默认值
// `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
// 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对URL
baseURL: 'https://some-domain.com/api/',
// `transformResponse` 在传递给 then/catch 前，允许修改响应数据
transformResponse: [function (data) {
  // 对接收的 data 进行任意转换处理
  return data;
}],
// 自定义请求头
headers: {'X-Requested-With': 'XMLHttpRequest'},
// `params` 是与请求一起发送的 URL 参数,放入地址栏中
// 必须是一个简单对象或 URLSearchParams 对象
params: {
  ID: 12345
},
// `data` 是作为请求体被发送的数据
// 仅适用 'PUT', 'POST', 'DELETE 和 'PATCH' 请求方法
// 在没有设置 `transformRequest` 时，则必须是以下类型之一:
// - string, plain object, ArrayBuffer, ArrayBufferView,URLSearchParams
// - 浏览器专属: FormData, File, Blob
// - Node 专属: Stream, Buffer
data: {
  firstName: 'Fred'
},

// 发送请求体数据的可选语法
// 请求方式 post
// 只有 value 会被发送，key 则不会
data: 'Country=Brasil&City=Belo Horizonte',

 // `timeout` 指定请求超时的毫秒数。
// 如果请求时间超过 `timeout` 的值，则请求会被中断
timeout: 1000, // 默认值是 `0` (永不超时)

// `withCredentials` 表示跨域请求时是否需要使用凭证
//登录之后的请求会带登录用户信息，需要把登录时的cookie设置到之后请求头里面。
//而跨域请求要想带上cookie，必须要请求属性withCredentials=true这是浏览器的同源策略导致的问题：不允许JS访问跨域的Cookie。
withCredentials: false, // default

// `auth` HTTP Basic Auth HTTP基本凭证会覆盖掉headers 设置的定义 Authorization头
auth: {
  username: 'janedoe',
  password: 's00pers3cret'
},
//以auth为优先，作用同auth
headers: {		'Authorization': 'Basic ' + getToken()	//	可以是授权证用的参数值	}

// `responseType` 表示浏览器将要响应的数据类型
responseType: 'json', // 默认值

 // `maxContentLength` 定义了node.js中允许的HTTP响应内容的最字节数
maxContentLength: 2000,

// `maxBodyLength`（仅Node）定义允许的http请求内容的最大字节数
maxBodyLength: 2000,

// `validateStatus` 定义了对于给定的 HTTP状态码是 resolve 还是reject promise。
// 如果 `validateStatus` 返回 `true` (或者设置为 `null` 或`undefined`)，
// 则promise 将会 resolved，否则是 rejected。
validateStatus: function (status) {
  return status >= 200 && status < 300; // 默认值
}
```

>取消请求
```ts
//第一种方式 推荐
const controller = new AbortController();

axios.get('/foo/bar', {
   signal: controller.signal
}).then(function(response) {
   //...
});
// 取消请求
controller.abort()
//第二种方式 新版本弃用
const CancelToken = axios.CancelToken;
let cancel;

axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    cancel = c
  })
})

// 执行取消请求操作
cancel()
```

>请求的响应包
```ts
{
  // `data` 由服务器提供的响应
  data: {},

  // `status` 来自服务器响应的 HTTP 状态码
  status: 200,

  // `statusText` 来自服务器响应的 HTTP 状态信息
  statusText: 'OK',

  // `headers` 是服务器响应头
  // 所有的 header 名称都是小写，而且可以使用方括号语法访问
  // 例如: `response.headers['content-type']`
  headers: {},

  // `config` 是 `axios` 请求的配置信息
  config: {},

  // `request` 是生成此响应的请求
  // 在node.js中它是最后一个ClientRequest实例 (in redirects)，
  // 在浏览器中则是 XMLHttpRequest 实例
  request: {}
}
//获取响应内容
axios.get('/user/12345')
  .then(function (response) {
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
  });
```

>全局axios默认值
```ts
axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
```

>自定义实例默认值
```ts
// 创建实例时配置默认值
const instance = axios.create({
  baseURL: 'https://api.example.com'
});

// 创建实例后修改默认值
instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
```
>重写默认值
```js
// 使用库提供的默认配置创建实例
// 此时超时配置的默认值是 `0`
const instance = axios.create();

// 重写库的超时默认值
// 现在，所有使用此实例的请求都将等待2.5秒，然后才会超时
instance.defaults.timeout = 2500;

// 重写此请求的超时时间，因为该请求需要很长时间
instance.get('/longRequest', {
  timeout: 5000
});
```

>拦截器
```ts
在请求或响应被 then 或 catch 处理前拦截它们。

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });

//如果你稍后需要移除拦截器，可以这样：
const myInterceptor = axios.interceptors.request.use(function () {/*...*/});
axios.interceptors.request.eject(myInterceptor);

//可以给自定义的 axios 实例添加拦截器。
const instance = axios.create();
instance.interceptors.request.use(function () {/*...*/});
```

>错误处理
```ts
axios.get('/user/12345')
  .catch(function (error) {
    if (error.response) {
      // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // 请求已经成功发起，但没有收到响应
      // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
      // 而在node.js中是 http.ClientRequest 的实例
      console.log(error.request);
    } else {
      // 发送请求时出了点问题
      console.log('Error', error.message);
    }
    console.log(error.config);
  });
//或者在配置中
axios.get('/user/12345', {
  validateStatus: function (status) {
    return status < 500; // 处理状态码小于500的情况
  }
})
//使用 toJSON 可以获取更多关于HTTP错误的信息
axios.get('/user/12345')
  .catch(function (error) {
    console.log(error.toJSON());
  });
```