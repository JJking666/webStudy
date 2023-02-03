/*
 * @Descripttion:
 * @version:
 * @Author: congsir
 * @Date: 2022-04-25 22:25:01
 * @LastEditors: JJking666 1337802617@qq.com
 * @LastEditTime: 2023-02-02 14:52:36
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

// const map = new Map();

// map.set('2', 'b')
// map.set('1', 'a')
// map.set('3', 'c')
// const map1 = new Map(map);
// map1.set('5', 'r')
// map1.set({}, '1r')

// const a = {
//     '2': 'b',
//     '1': 'a',
//     '3': 'c'
// }

// a[{} + 1] = '11{}'
// // for (const c of map1) {
// //     console.log(c)
// // }

// // for (const c of map) {
// //     console.log(c)
// // }
// let mySet = new Set();

// mySet.add(1); // Set(1) {1}
// mySet.add(5);
// mySet.add(+0);
// mySet.add(-0);

// console.log(map1.get({}), a[{} + 1]);

// Function.prototype.a = () => console.log(1)
// Object.prototype.b = () => console.log(2)
// function A() { }
// const a = new A()
// console.log(A.prototype)//{}
// a.b()
// A.a()  //报错  a - A.prototype - Object.prototype - null
// A.b()  //报错  a - A.prototype - Object.prototype - null

// class demo {
//     static obj = new demo();

//     demo() {
//         this.name = 'a';
//         console.log(this)
//     }
//     static getInstance() {
//         return this.obj
//     }
//     say() {
//         console.log('222', demo.obj.name)
//     }
// }
// const a = demo.getInstance()
// a.say();
// class SingleObject {

//     //创建 SingleObject 的一个对象
//     static instance = new SingleObject();

//     //让构造函数为 private，这样该类就不会被实例化
//     SingleObject() { }

//     //获取唯一可用的对象
//     static getInstance() {
//         return this.instance;
//     }

//     showMessage() {
//         console.log("Hello World!");
//     }
// }
// const a = SingleObject.getInstance();
// a.showMessage()

// function gb_sort(arr) {
//     if (arr.length <= 1) return arr;
//     const midIndex = Math.floor(arr.length / 2)
//     return sort(gb_sort(arr.slice(0, midIndex)), gb_sort(arr.slice(midIndex)))
//     function sort(a, b) {
//         let i = 0, j = 0, res = []
//         while (i != a.length && j != b.length) {
//             if (a[i] <= b[j]) res.push(a[i++])
//             else res.push(b[j++])
//         }
//         if (i != a.length) res = res.concat(a.slice(i))
//         if (j != b.length) res = res.concat(b.slice(j))
//         return res
//     }
// }
// console.log(gb_sort([52, 8, 4, 3, 5, 1, 8, 11]))

// const i = 1100;
// console.log(new Set(1100))

// this.a = 1
// const b = {
//     a: 10,
//     f0: {
//         a: 100,
//         f11: function () {
//             console.log(this + "!")
//             return this.a
//         },
//         f00: () => {
//             return this.a
//         }
//     },
//     f1: function () {
//         console.log(this + "!")
//         return this.a
//     },
//     f2: () => {
//         return this.a
//     },
// }
// console.log(b.f1(), b.f2(), b.f0.f00())
// const c = b.f1, d = b.f2
// console.log(c(), d())
// var b = 20;
// (function n() {
//     b = 120
//     console.log(b)
// })()
// console.log(2, b)

// const obj = {
//     a: 1,
//     b: 23
// }
// console.log(Object.prototype.toString.call(obj), obj, JSON.stringify(obj), Promise.resolve(2))

// const person = { name: 'qwe' }
// // person.name = 'asd'
// Object.defineProperty(person, 'name', { value: 'zxc' })

// console.log(person)

// function getLongestPalindrome(str) {
//     // write code here
//     const len = str.length
//     let max = -1, now = ''
//     for (let i = 0; i < len; i++) {
//         let j = 0
//         if (max >= len - i) break
//         while (i - j > 0 && i + j < len) {
//             let item = str.slice(i - j, i + j + 1)
//             if (item != item.split('').reverse().join('')) {
//                 break
//             }
//             if (2 * j + 1 > max) {
//                 max = 2 * j + 1
//                 now = item
//             }
//             j++
//         }
//         j = 0
//         if (str[i + 1] && str[i] == str[i + 1]) {
//             while (i - j >= 0 && i + j + 1 < len) {!
//                 let item = str.slice(i - j, i + j + 2)
//                 console.log(item)
//                 if (item != item.split('').reverse().join('')) {
//                     break
//                 }
//                 if (2 * j + 2 > max) {
//                     max = 2 * j + 2
//                     now = item
//                 }
//                 j++
//             }
//         }
//     }
//     console.log(max, now)
// }

// console.log(getLongestPalindrome("cb3eeee3bcd"))

// "ACDEFHGB", "DECAHFBG"

// "EDCHBGFA"
// function getPostOrderOfTree(preStr, midStr) {
//     // write code here
//     if (preStr.length == 0) return ''
//     const node = preStr[0], index = midStr.indexOf(preStr[0])
//     const nowLMid = midStr.slice(0, index), nowLPre = preStr.slice(1, 1 + nowLMid.length)
//     const nowRPre = preStr.slice(nowLPre.length + 1), nowRMid = midStr.slice(index + 1)
//     const left = getPostOrderOfTree(nowLPre, nowLMid), right = getPostOrderOfTree(nowRPre, nowRMid)
//     console.log(left, node, 1, right, left + node + right)
//     return left + right + node
// }
// console.log(getPostOrderOfTree("ACDEFHGB", "DECAHFBG"))
// a = 3
// {
//     this.a = 1
//     let a = 4
//     const f1 = function () {
//         console.log(this.a)
//     }
//     const f2 = () => {
//         console.log(this.a)
//     }
//     f1()
//     f2()
// }
// function fn() {
//     this.a = 1
//     this.f1 = function () {
//         console.log(this.a)
//     }
//     this.f2 = () => {
//         console.log(this.a)
//     }
// }
// function a() { }
// const obj = new a();
// console.log(obj.__proto__, Function.prototype.prototype, obj.constructor)
// console.log(obj.isPrototypeOf(a))
// a = 1
// function f() {
//     console.log(a)
//     let a = 3
//     console.log(a)
//     function a() { }
//     console.log(a)
// }
// f()
// function f() {
//     return new Promise(function (resolve, reject) {
//         setTimeout(() => {
//             console.log(3)
//             resolve()
//         }, 1000)
//     })
// }
// async function f1() {
//     console.log(1)
//     await f();
//     console.log(2)
//     await f();
//     console.log(2.5)
//     await f();
// }
// f1()
// while(1){
//     new Promise((res,rej)=>{
//         setTimeout(()=>{
//             console.log('red')
//             res()
//     }).then(()=>{
//         new Promise((res, rej) => {
//             setTimeout(() => {
//                 console.log('yellow')
//                 res()
//             })
//     })
// })
// }

// //1.防抖
// let p = null;

// function dfDemo(time) {
//     if (p) {
//         clearTimeout(p);
//     }
//     p = setTimeout(() => {
//         doThings()
//     }, time)
// }

// //2.字符串最长不重复子串

// function test(str) {
//     const map = new Map(), len = str.length
//     let res = [], left = 0, right = 0, max = 0, result = []
//     let t = 0
//     while (right != len - 1) {
//         t++;
//         if (map.has(str[right])) {
//             res.push(str[right])
//             map.set(str[right], 2)
//             while (map.get(str[right]) === 2) {
//                 const item = res.shift()
//                 map.set(item, map.get(item) - 1)
//                 if (!map.get(item)) map.delete(item)
//             }
//             right++
//         } else {
//             res.push(str[right])
//             map.set(str[right++], 1)
//             if (max < res.length) {
//                 result = [...res]
//                 max = res.length
//             }
//         }
//     }
//     return result
// }
// console.log(test('abcdbeaab'))

// let obj = [1, 2, [3, 4, 5, [6, 7, 8, [9, 10]]], 11]
// let res = []
// obj.forEach((item) => {
//     res.concat(item)
// })
// console.log(obj)

// const obj = {
//     f: 'f',
//     f1: function f1() {
//         console.log(this.f)
//     },
//     f2: function f2() {
//         return () => {
//             console.log(this.f)
//         }
//     },
//     f3: () => {
//         console.log(this.f)
//     },
//     f4() {
//         console.log(this.f)
//     },
//     f5: (function () {
//         return () => {
//             console.log(this.f)
//         }
//     })(),

// }
// this.f = 'no'
// global.f = 'aaaa'
// obj.f1()        //f
// console.log(1)
// obj.f2()()      //f
// console.log(2)
// obj.f3()        //no
// console.log(3)
// obj.f4()        //f
// console.log(4)
// obj.f5()        //aaaa

// const obj = {
//     f: 'f',
//     f1: function f1() {
//         console.log(this.f)
//     },
//     f2: function f2() {
//         return () => {
//             console.log(this.f)
//         }
//     },
//     f3: undefined,
//     f4: null
// }
// console.log(JSON.parse(JSON.stringify(obj)))

// // 字符串获取重复最多的字符及数字

// function demo(str) {
//     const map = new Map();
//     let max = -1, now, s = ''
//     for (const c of str) {
//         const item = map.get(c)
//         !item ? map.set(c, 1) : map.set(c, item + 1)
//         now = map.get(c)
//         if (now > max) {
//             max = now
//             s = c
//         }
//     }
//     console.log(max, s)
// }
// demo('asdsbfoiaaaa')

// function demo(str) {
//     const map = new Map();
//     let max = -1, now, arr = []
//     for (const c of str) {
//         const item = map.get(c)
//         !item ? map.set(c, 1) : map.set(c, item + 1)
//         now = map.get(c)
//         if (now > max) {
//             max = now
//             arr = []
//             arr[0] = c
//         } else if (now === max) {
//             arr.push(c)
//         } else {

//         }
//     }
//     console.log(max, arr)
// }
// demo('asdsbfoiaaaa')

// 2.promise.all

// const a = function () {
//     return new Promise(function (resolve, reject) {
//         setTimeout(function () {
//             resolve(1)
//         }, 500)
//     })
// }
// const b = function () {
//     return new Promise(function (resolve, reject) {
//         setTimeout(function () {
//             resolve(2)
//         }, 200)
//     })
// }
// const c = function () {
//     return new Promise(function (resolve, reject) {
//         setTimeout(function () {
//             resolve(3)
//         }, 300)
//     })
// }
// function all(promises) {
//     const result = [], len = promises.length
//     let error, p = 0
//     for (let i = 0; i < len; i++) {
//         item = promises[i]
//         item().then((val) => {
//             result[index] = val
//             p++
//             if (p === len) {
//                 console.log(result)
//                 return Promise.resolve(result)
//             }
//         }).catch((err) => {
//             error = err
//             console.log(error)
//             return Promise.reject(error)
//         })
//     }
//     // promises.forEach((item, index) => {
//     //     console.log(item)
//     // })
// }
// all([a, b, c])

// const obj = {
//     name: 'baidu',
//     arr: ['a', 'b', 'c']
// }

// var obj2 = obj
// var arr = obj.arr   //['a', 'b', 'c']

// obj2.arr = ['a', 'b', 'c', 'd']
// obj2.name = 'inke'

// console.log(arr)    //['a', 'b', 'c', 'd']
// console.log(obj.name)   //'inke'
// console.log(obj === obj2)   //true
// console.log(obj.arr === obj2.arr)   //true
// console.log(obj.arr === arr) //true
// console.log(obj, obj2, arr)
// var MAP = {
//     onclick: function () {

//     },
//     curry: function (val) {
//         return function (z) {
//             return val++ + z
//         }
//     }
// }

// var getInfo = function (val) {
//     return MAP[val]
// }
// var fn = getInfo('curry')

// var a = fn(100)

// console.log(a(200)) //300
// console.log(a(300)) //401
// console.log(fn(100)(200))   //300
// console.log(getInfo('curry')(100)(300)) //400

// var name = 'oop'

// var Person = function (options) {
//     this.name = options.name
// }

// Person.prototype.name = 'iron man'
// Person.prototype.getName = function () {
//     return this.name
// }
// Person.getName = () => {
//     return this.name;
// }

// var p = new Person({ name: 'inke' })

// console.log(p.constructor === Person) // true
// console.log(p instanceof Person) // true
// console.log(p.__proto__ === Person.prototype) // true

// // console.log(p.hasOwnProperty('name')) //trutName) // true

// console.log(getName()) // oop

// console.log(Person.prototype.getName()) // iron man
// console.log(p.getName()) //inke
// console.log(Person.getName()) // undefined

// useEffect()
// useMemo()
// usecallback()
// memo
// useState
// useRouter()
// useContext
// useRef
// useSelect

// function A() {
//     const a = useRef(null)
//     return < Child ref="a" ></ Child >
// }

// function B(A) {
//     //
//     return <>
//         <A></A>
//     </>
// }

// export function B(A)

// function demo(arr) {
//     const len = arr.length
//     if (len < 2) return arr
//     const mid = 0, left = [], right = []
//     for (let i = 0; i < len; i++) {
//         if (arr[i] < arr[mid]) {
//             left.push(arr[mid])
//         } else {
//             right.push(arr[mid])
//         }
//     }
//     return [...demo(left), arr[mid], ...demo(right)]
// }

// let f = 'i'
// const obj = {
//     f: 'f',
//     f1: function f1() {
//         console.log(this.f)
//     },
//     f2: function f2() {
//         const f = () => {
//             console.log(this.f)
//         }
//         f()
//     },
//     f3: () => {
//         console.log(this.f)
//     }
// }
// obj.f1()
// obj.f2()
// obj.f3()
// f = 'name'
// obj.f3()

// console.log(J)

// function makeChagne(change) {
//     // write code here
//     //     let res = new Array(5).fill(0)
//     //     for(let i=1;i <= change;i++){

//     //     },
//     // let now = change, res
//     const val = [100, 50, 20, 5, 1], arr = [0, 0, 0, 0, 0]
//     let min = Infinity, minv = [0, 0, 0, 0, 0]
//     let p = 0
//     function dfs(v, m) {
//         // console.log(v, m)
//         if (p) return
//         if (v > change) return
//         if (v == change && min > m) {
//             minv = [...arr]
//             min = m
//             p = 1
//             // console.log(minv, min, p, '!!!!!!!!')
//             return
//         }
//         for (let i = 0; i < 5; i++) {
//             if (m > min) break
//             arr[i]++
//             dfs((v - 0) + (val[i] - 0), m - 0 + 1)
//             arr[i]--
//         }
//     }
//     dfs(0, 0)
//     return minv
// }
// console.log(makeChagne(126))

// const arr = [[1, 2, 3], [2, 4], [5]]

// const obj = [1, 2, 3, 4, 5]
// console.log(obj.slice(1, 50), obj.slice(0, 5))
// let str = ' yyyy yyyy yyyy'
// console.log(str.replace(new RegExp(/yyyy/g), 222))
// str = str.replace(new RegExp(/yyyy/g), 1)
// str = str.replace(new RegExp(/dd/g), 1)
// str = str.replace(new RegExp(/HH/g), 2)
// str = str.replace(new RegExp(/mm/g), 2)
// str = str.replace(new RegExp(/ss/g), 3)
// console.log(str, 222)

// const line = readline().split(' ')

// let n = parseInt(line[0]),x= parseInt(line[1]),t = 0,p=n

const res = [1, 2, 3];
console.log(res.push(11));
console.log(res.push(11));
console.log(res.unshift(22));
console.log(res.unshift(22));
console.log(res.shift());
console.log(res.shift());
console.log(res.pop());
console.log(res.pop());
