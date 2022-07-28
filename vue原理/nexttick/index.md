<!--
 * @Descripttion:
 * @version:
 * @Author: congsir
 * @Date: 2022-07-29 00:37:12
 * @LastEditors:
 * @LastEditTime: 2022-07-29 00:37:39
-->
## nexttick
https://cloud.tencent.com/developer/article/1633546

把回调函数放入callbacks等待执行

将执行函数放到微任务或者宏任务中

事件循环到了微任务或者宏任务，执行函数依次执行callbacks中的回调

再回到我们开头说的setTimeout，可以看出来nextTick是对setTimeout进行了多种兼容性的处理，宽泛的也可以理解为将回调函数放入setTimeout中执行；不过nextTick优先放入微任务执行，而setTimeout是宏任务，因此nextTick一般情况下总是先于setTimeout执行。