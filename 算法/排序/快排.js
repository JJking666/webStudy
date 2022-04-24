function quickSort(arr,left,right) {
    if(left>=right)return
    let mid = quick(arr,left,right)
    quickSort(arr,left,mid-1)
    quickSort(arr,mid+1,right)
}
function quick(arr,left,right){
    if(left>=right)return
    let t=  arr[left]
    let i = right
    let j = left
    while(j<i){
        while(j<i&&arr[i]>=t)i--
        arr[j] = arr[i]
        while(j<i&&arr[j]<=t)j++
        arr[i] = arr[j]
    }
    arr[i] = t
    return i
}
let a = [6,5,4,2,1,9,8,4,7]
quickSort(a,0,a.length-1)
console.log(a)