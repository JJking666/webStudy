//全排列1
//let arr = [1,2,3,4,5,6]
// let swap = (arr,a,b) =>{
//     let t
//     t=arr[a]
//     arr[a]=arr[b]
//     arr[b]=t
// }
// let per = (arr,q,p)=>{
//     if(q==p){
//        // console.log(arr)
//     }
//     else{
//         for(let i = q; i<= p ; i++){
//             swap(arr,i,q)
//             per(arr,q+1,p)
//             swap(arr,i,q)
//         }
//     }
// }
//per(arr,0,arr.length-1)

//全排列2
// let arr = [1,2,3,4,5,6]
// let used = [0,0,0,0,0,0]
// let res = []
// let per = (arr)=>{
//     if(res.length ==arr.length){
//         console.log(res)
//     }
//     else{
//         for(let i = 0; i<= arr.length-1 ; i++){
//             if(!used[i]){
//                 //console.log(used,arr[i])
//                 res.push(arr[i])
//                 used[i] = 1
//                 per(arr)
//                 used[i] = 0
//                 res.pop()
//             }
//         }
//     }
// }
// per(arr)


// let arr = [1, 2, 3, 4, 5, 6, null, 8, null, 9, 10, 11, null, null, null]
// let res = [[1]]
// let a = [1],item =[]
// let t=1

// function haha(arr, a) {
//     for (let i = 0; i < a.length; i++) {
//         if (a[i] != null) {
//             a.push(arr[2 * i + 1])
//             a.push(arr[2 * i + 2])
//             item.push(arr[2 * i + 1])
//             item.push(arr[2 * i + 2])
//         }else if(a[i]==undefined){

//         }else{
//             a.push(null)
//             a.push(null)
//             item.push(null)
//             item.push(null)
//         }
//         if(i+1 == t){
//             res.push([...item])
//             console.log(item,i)
//             item=[]
//             t=2*t+1
//             console.log(t)
//         }
//     }
//     return res
// }
// console.log(haha(arr, a))
// console.log(1)


