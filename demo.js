/*
 * @Descripttion:
 * @version:
 * @Author: congsir
 * @Date: 2022-04-25 22:25:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-07-28 14:11:09
 */

// console.log(1)
// new Promise(resolve =>{
//     console.log(7)
//     for(let i=0; i<9000;i++){
//         if(i==666)resolve(i)
//     }
//   console.log(53)
// }).then(val=>{
//     console.log(val)
// })
// async function fo(){
//     console.log(2)
//     await go()
//     console.log(val)
// }
// async function go(){
//     console.log(3)
//     resolve(3)
// }
// fo()
// console.log(6)
// let o2 = Object.create({}, {
//     p: {
//         value: 42,
//         writable: true,
//         enumerable: true,
//         configurable: true
//     }
// });
// const obj = {
//     name: 'cy'
// }
// console.log(o2, Object.getPrototypeOf(o2))
// Object.setPrototypeOf(o2, obj)
// console.log(o2, Object.getPrototypeOf(o2))


// const object1 = {
//     prop: 'exists'
// };

// console.log(Object.hasOwn(object1, 'prop'));
// // expected output: true

// console.log(Object.hasOwn(object1, 'toString'));
// // expected output: false

// console.log(Object.hasOwn(object1, 'undeclaredPropertyValue'));
// // expected output: false
// const foo = Object.create(null);
// foo.prop = 'true';
// if (Object.hasOwn(foo, 'prop')) {
//     console.log(foo.prop); //true
// }
// foo.hasOwnProperty("prop");


// console.log(0 === -0);                 // true
// console.log(+0 === -0);                // true
// console.log(-0 === -0);                // true
// console.log(0n === -0n);               // true
// console.log(NaN === 0 / 0);              // false
// console.log(NaN === Number.NaN)        // false

// function showLoadingScreen() {
//     console.log(1)
// }
// function loadUIDataAsynchronously() {
//     console.log(2)
// }
// function hideLoadingScreen() {
//     console.log(3)
// }
// function* loadUI() {
//     showLoadingScreen();
//     yield loadUIDataAsynchronously();
//     hideLoadingScreen();
// }
// var loader = loadUI();
// // 加载UI
// loader.next()

// // 卸载UI
// loader.next()

// const target = Object.defineProperties({}, {
//     foo: {
//         value: 123,
//         writable: false,
//         configurable: false
//     },
// });

// const handler = {
//     get(target, propKey) {
//         return Reflect.get(target, propKey);
//     }
// };

// const proxy = new Proxy(target, handler);

// console.log(proxy.foo)


// const memoize = function (func, content) {
//     let cache = Object.create(null)
//     content = content || this
//     return (...key) => {
//         console.log(key, typeof key, Object.prototype.toString.call(key))
//         if (!cache[key]) {
//             cache[key] = func.apply(content, key)
//         }
//         return cache[key]
//     }
// }
// function add(x, y) {
//     return x + y
// }
// const calc = memoize(add);
// const num1 = calc(100, 200)
// const num2 = calc(100, 200) // 缓存得到的结果

// const pref = 'ab', suff = 'ba'
// const res = 'abbba'
// const reg = new RegExp((`${pref}.*?${suff}`), 'g')

// let r = res.match(reg)
// console.log(r)   //   [ 'apple', 'a2e' ]


// function check(c, item) {
//     let res = 0
//     for (let index = 0; index < c.length; index++) {
//         let item1 = c[index]
//         if (item1 === item[index]) res++
//         else res = 0
//         if (res === item.length) return true
//     }

//     if (res === item.length) return true
//     else return false
// }
// console.log(check('abbba', 'a1pp'))
// console.log(null instanceof Object)


// Promise.prototype.allSettled = function (promises) {
//     let results = [];
//     let num = 0, len = promises.length;
//     console.log(111)
//     return new Promise(function (resolve, reject) {
//         promises.forEach(function (val, i) {
//             Promise.resolve(val).then(val => {
//                 results[i] = val
//                 num++;
//                 if (num === len) resolve(results)
//             }, val => {
//                 results[i] = val
//                 num++;
//                 if (num === len) resolve(results)
//             })
//         });
//     })
// }
// let promise1 = new Promise(function (resolve) {
//     setTimeout(() => {
//         resolve(1);
//     })
// });
// let promise2 = new Promise(function (resolve, reject) {
//     resolve(2);
// });
// let promise3 = new Promise(function (resolve, reject) {
//     resolve(3);
// });

// let promiseAll = Promise.prototype.allSettled([promise1, promise2, promise3]);
// promiseAll.then(function (res) {
//     console.log(res);
// })


// function myInstanceof(left, right) {
//     let proto = Object.getPrototypeOf(left), // 获取对象的原型
//         prototype = Object.getPrototypeOf(new right()) // 获取构造函数的 prototype 对象

//     // 判断构造函数的 prototype 对象是否在对象的原型链上
//     while (true) {
//         if (!proto) return false;
//         if (proto === prototype) return true;

//         proto = Object.getPrototypeOf(proto);
//     }
// }
// // console.log(myInstanceof(new Date(), Date), Object.prototype.toString.call(Object.getPrototypeOf(Date)), Object.prototype.toString.call(Date.prototype));
// function a() {

// }
// function b() {

// }
// a.prototype.a = function () {
//     console.log(a)
// }
// b.prototype.b = function () {
//     console.log(b)
// }
// Object.setPrototypeOf(a, b.prototype)
// console.dir(a.prototype === b.prototype)
// const e = new a()
// a.b()
// console.dir(Object.getPrototypeOf(e) === b.prototype)

// const PENDING = "pending";
// const RESOLVED = "resolved";
// const REJECTED = "rejected";

// function MyPromise(fn) {
//     // 保存初始化状态
//     var self = this;

//     // 初始化状态
//     this.state = PENDING;

//     // 用于保存 resolve 或者 rejected 传入的值
//     this.value = null;

//     // 用于保存 resolve 的回调函数
//     this.resolvedCallbacks = [];

//     // 用于保存 reject 的回调函数
//     this.rejectedCallbacks = [];

//     // 状态转变为 resolved 方法
//     function resolve(value) {
//         // 判断传入元素是否为 Promise 值，如果是，则状态改变必须等待前一个状态改变后再进行改变
//         if (value instanceof MyPromise) {
//             return value.then(resolve, reject);
//         }

//         // 保证代码的执行顺序为本轮事件循环的末尾
//         setTimeout(() => {
//             // 只有状态为 pending 时才能转变，
//             if (self.state === PENDING) {
//                 // 修改状态
//                 self.state = RESOLVED;

//                 // 设置传入的值
//                 self.value = value;

//                 // 执行回调函数
//                 self.resolvedCallbacks.forEach(callback => {
//                     callback(value);
//                 });
//             }
//         }, 0);
//     }

//     // 状态转变为 rejected 方法
//     function reject(value) {
//         // 保证代码的执行顺序为本轮事件循环的末尾
//         setTimeout(() => {
//             // 只有状态为 pending 时才能转变
//             if (self.state === PENDING) {
//                 // 修改状态
//                 self.state = REJECTED;

//                 // 设置传入的值
//                 self.value = value;

//                 // 执行回调函数
//                 self.rejectedCallbacks.forEach(callback => {
//                     callback(value);
//                 });
//             }
//         }, 0);
//     }
//     // 将两个方法传入函数执行
//     try {
//         fn(resolve, reject);
//     } catch (e) {
//         // 遇到错误时，捕获错误，执行 reject 函数
//         reject(e);
//     }
// }
// MyPromise.prototype.then = function (onFulfilled, onReject) {
//     // 保存前一个promise的this
//     const self = this;
//     return new MyPromise((resolve, reject) => {
//         // 封装前一个promise成功时执行的函数
//         let fulfilled = () => {
//             try {
//                 const result = onFulfilled(self.value); // 承前
//                 return result instanceof MyPromise ? result.then(resolve, reject) : resolve(result); //启后
//             } catch (err) {
//                 reject(err)
//             }
//         }
//         // 封装前一个promise失败时执行的函数
//         let rejected = () => {
//             try {
//                 const result = onReject(self.reason);
//                 return result instanceof MyPromise ? result.then(resolve, reject) : reject(result);
//             } catch (err) {
//                 reject(err)
//             }
//         }
//         switch (self.status) {
//             case PENDING:
//                 self.onFulfilledCallbacks.push(fulfilled);
//                 self.onRejectedCallbacks.push(rejected);
//                 break;
//             case FULFILLED:
//                 fulfilled();
//                 break;
//             case REJECT:
//                 rejected();
//                 break;
//         }
//     })
// }

// new MyPromise((res, reject) => {
//     setTimeout(() => {
//         res(111)
//     }, 100)
// })
//     .then((val) => {
//         console.log(val)
//         return 1
//     })
//     .then((val) => {
//         console.log(val)
//         throw new Error(3)
//     })

// Function.prototype.myBind = myBind
// function myBind(context) {
//     if (typeof this != 'function') throw new TypeError('error')
//     context = context || window
//     const context_params = [...arguments].slice(1)
//     context.fn = this
//     return function (params) {
//         const result = context.fn(context_params)
//         console.log(params)
//         delete context.fn
//         return result
//     }
// }
// function my() { }

// console.log(Object.prototype.toString.myBind(my)())

// const data = {
//     name: "zhangsan",
//     age: 20,
//     info: {
//         address: "北京" // 需要深度监听
//     },
//     nums: [10, 20, 30]
// };

// const proxyData = new Proxy(data, {
//     get(target, key, receive) {
//         // 只处理本身(非原型)的属性
//         const ownKeys = Reflect.ownKeys(target)
//         if (ownKeys.includes(key)) {
//             console.log('get', key) // 监听
//         }
//         const result = Reflect.get(target, key)
//         return result
//     },
//     set(target, key, val, reveive) {
//         // 重复的数据，不处理
//         const oldVal = target[key]
//         if (val == oldVal) {
//             return true
//         }
//         const result = Reflect.set(target, key, val, reveive)
//         console.log('set', key, val)
//         // return result
//     },
//     deleteProperty(target, key) {
//         const result = Reflect.deleteProperty(target, key)
//         console.log('delete property', key)
//         console.log('result', result)
//         // return result
//     }
// })

// console.log(proxyData.age);    // 20
// console.log(proxyData.info);   // { address: '北京' }

// function quick_sort(arr) {
//     const len = arr.length, left = [], right = [];
//     if (len <= 1) return [...arr]
//     const mid = Math.floor(len / 2)
//     for (let i = 0; i < len; i++) {
//         if (mid === i) continue;
//         if (arr[mid] >= arr[i]) left.push(arr[i])
//         else right.push(arr[i])
//     }
//     return [...quick_sort([...left]), arr[mid], ...quick_sort([...right])]
// }
// console.log(quick_sort(arr))
// const arr = [3, 2, 1, 5, 8]

// function allSort(arr) {
//     const result = [], len = arr.length;
//     function dfs(item, visit) {
//         if (item.length === len) {
//             result.push([...item])
//             return
//         }
//         for (let i = 0; i < len; i++) {
//             if (visit.includes(i)) continue
//             dfs([...item, arr[i]], [...visit, i])
//         }
//     }
//     dfs([], [])
//     return result
// }
// console.log(allSort(arr).length)

// 缓存机制
// http模型

//     ******
// * 空 *
// ******
// * 父子 *
// * 父 *

//     isArray
// Object.prototype.toString
//     instanceof
//     Array.prototype === arr.__proto__

// for of    for in

// const obj = {
//     name: 'mch',
//     age: 18
// }
// const data = Object.create(obj)
// data.child = 'cy'
// console.log(Object.keys(data))
// for (const key in data) {
//     console.log(key)
// }
// let a = -1
// console.log(+a)

let a = [41, 3, 3, 2, 3, 6]
let b = a.pop()
console.log(b)
console.log(undefined + 1)