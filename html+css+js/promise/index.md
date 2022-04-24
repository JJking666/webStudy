## promise 易错题目
```ts
Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .then(console.log)
//第一行把1传给第二行
//第二行和第三行实际为then(null)，故把1给第四行
//第四行then(val=>console.log(val))打印值
```
> 输出结果如下：
> 1
> Promise {<fulfilled>: undefined}

Promise.resolve方法的参数如果是一个**原始值**，或者是**一个不具有then方法的对象**，则Promise.resolve方法返回一个新的Promise对象，状态为resolved，Promise.resolve方法的参数，会同时传给回调函数。
then方法接受的参数是函数，而如果传递的并非是一个函数，它实际上会将其解释为**then(null)**，这就会导致前一个Promise的结果会传递下面。

```ts
Promise.resolve().then(() => {
  return new Error('error!!!')
}).then(res => {
  console.log("then: ", res)
}).catch(err => {
  console.log("catch: ", err)
})
"then: " "Error: error!!!"
```
返回任意一个非 promise 的值都会被包裹成 promise 对象
因此这里的return new Error('error!!!')也被包裹成了return Promise.resolve(new Error('error!!!'))，因此它会被then捕获而不是catch

```ts
Promise.resolve('1')
  .then(res => {
    console.log(res)
  })
  .finally(() => {
    console.log('finally')
  })
Promise.resolve('2')
  .finally(() => {
    console.log('finally2')
  	return '我是finally2返回的值'
  })
  .then(res => {
    console.log('finally2后面的then函数', res)
  })
```
+ 输出
  + 1
  + finally2
  + finally
  + finally2后面的then函数 2

+ finally()一般用的很少，只要记住以下几点就可以了：
  + finally()方法**不接收参数**
  + finally()方法不管`Promise`对象最后的状态如何都会执行(**pending不执行**！)
  + finally()方法的回调函数不接受任何的参数，也就是说你在.`finally()`函数中是无法知道Promise最终的状态是`resolved`还是`rejected`的
  + 它最终返回的默认会是一个上一次的`Promise`对象值，不过如果抛出的是一个异常则返回异常的Promise对象。
  + finally本质上是`then`方法的特例

.finally()的错误捕获：
```ts
Promise.resolve('1')
  .finally(() => {
    console.log('finally1')
    throw new Error('我是finally中抛出的异常')
  })
  .then(res => {
    console.log('finally后面的then函数', res)
  })
  .catch(err => {
    console.log('捕获错误', err)
  })
```
输出结果为：
'finally1'
'捕获错误' Error: 我是finally中抛出的异常

## promise.all(a,b,c)
等a,b,c的promise对象全部resolve再执行then

## promise.race(a,b,c)
>等a,b,c的promise对象出现resolve就执行then

>注意有一个出现resolve并触发promise.race的then，其他promise对象照旧会执行不停止只是不捕获状态

>promise.race对resolve和reject都适用，若出现第一个reject则会触发promise.race的catch

>all和race传入的数组中如果有会抛出异常的异步任务，那么**只有最先抛出的错误会被捕获**，并且是被then的第二个参数或者后面的catch捕获；但并**不会影响数组中其它的异步任务的执行**。

## async/await
>async 函数返回的是一个 `Promise` 对象。async 函数（包含函数语句、函数表达式、`Lambda`表达式）会返回一个 `Promise` 对象，如果在函数中 `return` 一个直接量，`async` 会把这个直接量通过 `Promise.resolve()` 封装成 `Promise` 对象。

>如果 `async` 函数没有返回值， 它会返回 `Promise.resolve(undefined)`

>await 等待的是一个表达式，这个表达式的计算结果是 Promise 对象或者其它值（换句话说，await 可以等任意表达式的结果）。
>
>如果它等到的不是一个 Promise 对象，那 await 表达式的运算结果就是它等到的东西。
>
>如果它等到的是一个 Promise 对象，await 就忙起来了，它会阻塞后面的代码，等着 Promise 对象 resolve，然后得到 resolve 的值，作为 await 表达式的运算结果。
```ts
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
  setTimeout(() => {
    console.log('timer1')
  }, 0)
}
async function async2() {
  setTimeout(() => {
    console.log('timer2')
  }, 0)
  console.log("async2");
}
async1();
setTimeout(() => {
  console.log('timer3')
}, 0)
console.log("start")

输出结果如下：
async1 start
async2
start
async1 end
timer2
timer3
timer1
```
> 注意如果没有使用await后不是promise对象的话，不能进行排队(因为没有resolve无法按序),
> await后是promise对象，那么会等待resolve再往下执行
```ts
await async2();
console.log("async1 end");
```

```ts
async function async1 () {
  console.log('async1 start');
  await new Promise(resolve => {
    console.log('promise1')
    //resolve(1)
  })
  console.log('async1 success');
  return 'async1 end'
}
async1().then(res => console.log(res))
console.log('srcipt start')
console.log('srcipt end')

```
>打印
async1 start
promise1
srcipt start
srcipt end
加上resolve()
async1 success
async1 end

>在`async1`中`await`后面的`Promise`是没有返回值的，也就是它的状态始终是`pending`状态，所以在`await`之后的内容是不会执行的，包括`async1`后面的 `.then`

```ts
async function async1 () {
  await async2();
  console.log('async1');
  return 'async1 success'
}
async function async2 () {
  return new Promise((resolve, reject) => {
    console.log('async2')
    reject('error')
  })
}
async1().then(res => console.log(res))
```

>输出结果如下：
async2
Uncaught (in promise) error

可以看到，如果async函数中抛出了错误，就会终止错误结果，不会继续向下执行。
如果想要让错误不足之处后面的代码执行，可以使用catch来捕获：
```ts
async function async1 () {
  await Promise.reject('error!!!').catch(e => console.log(e))
  console.log('async1');
  return Promise.resolve('async1 success')
}
async1().then(res => console.log(res))
console.log('script start')
```

>这样的输出结果就是：
script start
error!!!
async1
async1 success

```ts
Promise.resolve().then(() => {
    console.log('1');
    throw 'Error';
}).then(() => {
    console.log('2');
}).catch(() => {
    console.log('3');
    throw 'Error';
}).then(() => {
    console.log('4');
}).catch(() => {
    console.log('5');
}).then(() => {
    console.log('6');
});
```
>输出
1
3
5
6

在这道题目中，我们需要知道，无论是thne还是catch中，只要throw 抛出了错误，就会被catch捕获，如果没有throw出错误，就被继续执行后面的then。

>promise all 怎么分别捕捉错误

由于Promise.all(request).then(…).catch(…) 会在所有request都resolve时才会进then方法，并且把所
有结果以一个数组返回，只要有一个失败，就会进catch。
而如果在单个请求中定义了catch方法，那么就不会进Promise.all的catch方法。
因此，可以在单个的catch中对失败的promise请求做处理，可以使成功的请求正常返回。
```ts
function getData(api){
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      var ok = Math.random() > 0.5  // 模拟请求成功或失败
      if(ok)
        resolve('get ' + api + ' data')
      else{
        reject('error') // 正常的reject
      }
    },2000)
  })
}
function getDatas(arr){
  var promises = arr.map(item => getData(item))
  return Promise.all(promises.map(p => p.catch(e => e))).then(values => { // 关键步骤，map(p => p.catch(e => e)) 在个请求后加上 catch 捕获错误；这样就不会进入promise.all的catch中
    values.map((v,index) => {
      if(v == 'error'){
        console.log('第' + (index+1) + '个请求失败')
      }else{
        console.log(v)
      }
    })
  }).catch(error => {
    console.log(error)
  })
}
getDatas(['./api1','./api2','./api3','./api4']).then(() => '请求结束')
 ```

出现错误请求之后不进行reject操作,而是继续resolve('error), 之后同意交给promise.all()进行处理.(最方便)
```ts
function getData(api){
   return new Promise((resolve,reject) => {
     setTimeout(() => {
       var ok = Math.random() > 0.5  // 模拟请求成功或失败
       if(ok)
         resolve('get ' + api + ' data')
       else{
        // reject(api + ' fail')   // 如果调用reject就会使Promise.all()进行失败回调
        resolve('error')    // Promise all的时候做判断  如果是error则说明这条请求失败
      }
    },2000)
  })
}
function getDatas(arr){
  var promises = arr.map(item => getData(item))
  return Promise.all(promises).then(values => {
    values.map((v,index) => {
      if(v == 'error'){
        console.log('第' + (index+1) + '个请求失败')
      }else{
        console.log(v)
      }
    })
  }).catch(error => {
    console.log(error)
  })
}
getDatas(['./api1','./api2','./api3','./api4']).then(() => '请求结束')
```

Primise.allSettled

注意：这个方法是ES2020中的新特性，只适用于ES2020版本哦！
无论数组中promise返回reject还是resolve，都会执行then，而then中的value是对象数组，每个对象按顺序对应promise，若该promise返回reject，则对象里包含`"status":"rejected","reason":"xxx"`,若返回resolve，则包含`"status":"fulfilled","value":"xxx"`

```ts
var promise1 = new Promise(function(resolve,reject){
  setTimeout(function(){
    reject('promise1')
  },2000)
})
var promise2 = new Promise(function(resolve,reject){
  setTimeout(function(){
    resolve('promise2')
  },3000)
})

var promise3 = Promise.resolve('promise3')
var promise4 = Promise.reject('promise4')

Promise.allSettled([promise1,promise2,promise3,promise4]).then(function(args){
  console.log(args);
  /*
  result:
  [
    {"status":"rejected","reason":"promise1"},
    {"status":"fulfilled","value":"promise2"},
    {"status":"fulfilled","value":"promise3"},
    {"status":"rejected","reason":"promise4"}
  ]*/
})
```