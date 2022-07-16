/*
 * @Descripttion:
 * @version:
 * @Author: congsir
 * @Date: 2022-04-25 22:25:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-07-16 21:41:12
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

function check() { }
const a = new check()
const d = new Date()
console.log(d instanceof Date)