/*
 * @Descripttion:
 * @version:
 * @Author: congsir
 * @Date: 2022-07-09 23:01:46
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-07 17:21:25
 */

// let n = parseInt(readline())
async function async1() {
    console.log('async1 start')
    await async2()
    console.log('async1 end')
}
async function async2() {
    console.log('async2')
}
console.log('script start')
setTimeout(function () {
    console.log('setTimeout0')
}, 0)
setTimeout(function () {
    console.log('setTimeout3')
}, 3)
setImmediate(() => console.log('setImmediate'));
process.nextTick(() => console.log('nextTick'));
async1();
new Promise(function (resolve) {
    console.log('promise1')
    resolve();
    console.log('promise2')
}).then(function () {
    console.log('promise3')
})
console.log('script end')