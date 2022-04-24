# fetch
fetch()的功能与 XMLHttpRequest 基本相同，但有三个主要的差异。

+ fetch()使用 Promise，不使用回调函数，因此大大简化了写法，写起来更简洁。

+ fetch()采用模块化设计，API 分散在多个对象上（Response 对象、Request 对象、Headers 对象），更合理一些

+ fetch()通过数据流（Stream 对象）处理数据，可以分块读取，有利于提高网站性能表现，减少内存占用，对于请求大文件或者网速慢的场景相当有用。XMLHTTPRequest 对象不支持数据流，所有的数据必须放在缓存里，不支持分块读取，必须等待全部拿到后，再一次性吐出来。

示例:
```ts
fetch('https://api.github.com/users/ruanyf')
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(err => console.log('Request Failed', err)); 
```
fetch()接收到的response是一个 Stream 对象，response.json()是一个异步操作，取出所有内容，并将其转为 JSON 对象。

fetch()请求成功以后，得到的是一个 Response 对象。它对应服务器的 HTTP 回应。


const response = await fetch(url);
前面说过，Response 包含的数据通过 Stream 接口异步读取，但是它还包含一些同步属性，对应 HTTP 回应的标头信息（Headers），可以立即读取。


async function fetchText() {
  let response = await fetch('/readme.txt');
  console.log(response.status); 
  console.log(response.statusText);
}
上面示例中，response.status和response.statusText就是 Response 的同步属性，可以立即读取。

标头信息属性有下面这些。

+ Response.ok属性返回一个布尔值，表示请求是否成功，true对应 HTTP 请求的状态码 200 到 299，false对应其他的状态码。
+ Response.status属性返回一个数字，表示 HTTP 回应的状态码（例如200，表示成功请求）。
+ Response.statusText属性返回一个字符串，表示 HTTP 回应的状态信息（例如请求成功以后，服务器返回"OK"）。
+ Response.url属性返回请求的 URL。如果 URL 存在跳转，该属性返回的是最终 URL。
+ Response.type属性返回请求的类型。可能的值如下：
  + basic：普通请求，即同源请求。
  + cors：跨域请求。
  + error：网络错误，主要用于 Service Worker。
  + opaque：如果fetch()请求的type属性设为no-cors，就会返回这个值，详见请求部分。表示发出的是简单的跨域请求，类似<form>表单的那种跨域请求。
  + opaqueredirect：如果fetch()请求的redirect属性设为manual，就会返回这个值，详见请求部分。
+ Response.redirected属性返回一个布尔值，表示请求是否发生过跳转。

## 判断请求是否成功
fetch()发出请求以后，有一个很重要的注意点：只有网络错误，或者无法连接时，fetch()才会报错，其他情况都不会报错，而是认为请求成功。

这就是说，即使服务器返回的状态码是 4xx 或 5xx，fetch()也不会报错（即 Promise 不会变为 rejected状态）。

只有通过Response.status属性，得到 HTTP 回应的真实状态码，才能判断请求是否成功。请看下面的例子。

```ts
async function fetchText() {
  let response = await fetch('/readme.txt');
  if (response.status >= 200 && response.status < 300) {
    return await response.text();
  } else {
    throw new Error(response.statusText);
  }
}
```
上面示例中，response.status属性只有等于 2xx （200~299），才能认定请求成功。这里不用考虑网址跳转（状态码为 3xx），因为fetch()会将跳转的状态码自动转为 200。

另一种方法是判断response.ok是否为true。
```ts
if (response.ok) {
  // 请求成功
} else {
  // 请求失败
}
```

## Response.headers 属性
Headers 对象提供了以下方法，用来操作标头。

+ Headers.get()：根据指定的键名，返回键值。
+ Headers.has()： 返回一个布尔值，表示是否包含某个标头。
+ Headers.set()：将指定的键名设置为新的键值，如果该键名不存在则会添加。
+ Headers.append()：添加标头。
+ Headers.delete()：删除标头。
+ Headers.keys()：返回一个遍历器，可以依次遍历所有键名。
+ Headers.values()：返回一个遍历器，可以依次遍历所有键值。
+ Headers.entries()：返回一个遍历器，可以依次遍历所有键值对（[key, value]）。
+ Headers.forEach()：依次遍历标头，每个标头都会执行一次参数函数。
上面的有些方法可以修改标头，那是因为继承自 Headers 接口。对于 HTTP 回应来说，修改标头意义不大，况且很多标头是**只读**的，浏览器不允许修改。

这些方法中，最常用的是response.headers.get()，用于读取某个标头的值。
```ts
let response =  await  fetch(url);  
response.headers.get('Content-Type')
// application/json; charset=utf-8
```
Headers.keys()和Headers.values()方法用来分别遍历标头的键名和键值。

```ts
// 键名
for(let key of myHeaders.keys()) {
  console.log(key);
}

// 键值
for(let value of myHeaders.values()) {
  console.log(value);
}
Headers.forEach()方法也可以遍历所有的键值和键名。

let response = await fetch(url);
response.headers.forEach(
  (value, key) => console.log(key, ':', value)
);
```

## fetch()的第二个参数：定制 HTTP 请求
fetch()的第一个参数是 URL，还可以接受第二个参数，作为配置对象，定制发出的 HTTP 请求。

```ts
const response = await fetch(url, {
  method: 'POST',
  headers: {
    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
  },
  body: 'foo=bar&lorem=ipsum',
});

const json = await response.json();
```
+ method：HTTP 请求的方法，POST、DELETE、PUT都在这个属性设置。
+ headers：一个对象，用来定制 HTTP 请求的标头。
+ body：POST 请求的数据体。

```ts
const response = fetch(url, {
  method: "GET",
  headers: {
    "Content-Type": "text/plain;charset=UTF-8"
  },
  body: undefined,
  referrer: "about:client",
  referrerPolicy: "no-referrer-when-downgrade",
  mode: "cors",
  credentials: "same-origin",
  cache: "default",
  redirect: "follow",
  integrity: "",
  keepalive: false,
  signal: undefined
});
```

## 取消fetch()请求
fetch()请求发送以后，如果中途想要取消，需要使用AbortController对象。
```ts
let controller = new AbortController();
let signal = controller.signal;

fetch(url, {
  signal: controller.signal
});

signal.addEventListener('abort',
  () => console.log('abort!')
);

controller.abort(); // 取消

console.log(signal.aborted); // true
```
上面示例中，首先新建 AbortController 实例，然后发送fetch()请求，配置对象的signal属性必须指定接收 AbortController 实例发送的信号controller.signal。

controller.abort()方法用于发出取消信号。这时会触发abort事件，这个事件可以监听，也可以通过controller.signal.aborted属性判断取消信号是否已经发出。

下面是一个1秒后自动取消请求的例子。

```ts
let controller = new AbortController();
setTimeout(() => controller.abort(), 1000);

try {
  let response = await fetch('/long-operation', {
    signal: controller.signal
  });
} catch(err) {
  if (err.name == 'AbortError') {
    console.log('Aborted!');
  } else {
    throw err;
  }
}
```