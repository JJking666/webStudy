/*
 * @Descripttion:
 * @version:
 * @Author: congsir
 * @Date: 2022-04-25 22:25:47
 * @LastEditors:
 * @LastEditTime: 2022-07-27 11:36:21
 */
function mergeSort(arr, left, right) {
    //console.log(1,arr,left,right)
    if (left >= right) return
    mergeSort(arr, left, Math.floor((left + right) / 2))
    mergeSort(arr, Math.floor((left + right) / 2) + 1, right)
    merge(arr, left, Math.floor((left + right) / 2) + 1, right)
}
function merge(arr, left, mid, right) {
    //console.log(2,arr,left,right)
    let arr1 = arr.slice(left, mid)
    let arr2 = arr.slice(mid, right + 1)
    let arr3 = []
    let [i, j] = [0, 0]
    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] <= arr2[j]) arr3.push(arr1[i++])
        else arr3.push(arr2[j++])
    }
    while (i < arr1.length) {
        arr3.push(arr1[i++])
    }
    while (j < arr2.length) {
        arr3.push(arr2[j++])
    }
    for (let i = left; i <= right; i++) {
        arr[i] = arr3.shift()   //注意i是从left开始不是0
    }
}
let a = [6, 5, 4, 2, 1, 9, 8, 4, 7]
// let a = [6,4,1,9,]
mergeSort(a, 0, a.length - 1)
console.log(a)


// 2.
function mergeSort(arr) {  // 采用自上而下的递归方法
    const len = arr.length;
    if (len < 2) {
        return arr;
    }
    let middle = Math.floor(len / 2),
        left = arr.slice(0, middle),
        right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    const result = [];

    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    while (left.length)
        result.push(left.shift());

    while (right.length)
        result.push(right.shift());

    return result;
}