/*
 * @Descripttion:
 * @version:
 * @Author: congsir
 * @Date: 2022-04-25 22:25:47
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-07-27 11:33:35
 */
// 快排

// 快排是冒泡排序的优化
// 快排是不稳定的, 时间复杂度平均是O(nlog2n), 最差是O(n2)(退化为冒泡排序)
// 稳定性指的是两个相同的值的先后顺序, 如果在排完序后发生改变则是不稳定, 否则是稳定的(快排每轮最后一次交换left和基准点导致的不稳定)
// 最坏情况当找的基准值是序列里的最大或者最小值时, 每轮区间划分长度会变成1和n - 1, 时间复杂度变为n2
// 解决方法: 尽量找到中间值或者接近中间值

function quickSort(arr, left, right) {
    if (left >= right) return
    let mid = quick(arr, left, right)
    quickSort(arr, left, mid - 1)
    quickSort(arr, mid + 1, right)
}
function quick(arr, left, right) {
    if (left >= right) return
    let t = arr[left]
    let i = left
    let j = right
    while (i < j) {
        while (i < j && arr[j] >= t) j--
        arr[i] = arr[j]
        while (i < j && arr[i] <= t) i++
        arr[j] = arr[i]
    }
    arr[i] = t      //导致不稳定性
    return i
}
let a = [6, 5, 4, 2, 1, 9, 8, 4, 7]
quickSort(a, 0, a.length - 1)
console.log(a)


function quick_sort(arr) {
    const len = arr.length, left = [], right = [];
    if (len <= 1) return arr
    const mid = 0
    for (let i = 0; i < len; i++) {
        if (mid === i) continue;
        if (arr[mid] >= arr[i]) left.push(arr[i])
        else right.push(arr[i])
    }
    return [...quick_sort(left), arr[mid], ...quick_sort(right)]
}
const arr = [3, 2, 1, 5, 8]
console.log(quick_sort(arr))
