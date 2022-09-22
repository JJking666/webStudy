/*
 * @Descripttion:
 * @version:
 * @Author: congsir
 * @Date: 2022-07-29 17:31:51
 * @LastEditors:
 * @LastEditTime: 2022-07-29 17:31:56
 */
let fn = () => {
    console.log('执行SI');
}
function setTimeToInterval(fn, delay, times) {
    if (!times) {
        return
    }
    setTimeout(() => {
        fn()
        setTimeToInterval(fn, delay, --times)
    }, delay)
}
setTimeToInterval(fn, 2000, 3)