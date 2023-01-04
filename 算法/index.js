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

// 控制并发
const fn = url => {
    // 实际场景这里用axios等请求库 发请求即可 也不用设置延时
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('完成一个任务', url, new Date());
            resolve({ url, date: new Date() });
        }, 1000);
    })
};

function limitQueue(urls, limit) {
    // 完成任务数
    let i = 0;
    // 填充满执行队列
    for (let excuteCount = 0; excuteCount < limit; excuteCount++) {
        console.log(excuteCount)
        run();
    }
    function run() {
        console.log(i)
        new Promise((resolve, reject) => {
            const url = urls[i];
            i++;
            resolve(fn(url))
        }).then(() => {
            if (i < urls.length) run()
        })
    }
};

const p1 = new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 0)
})
const p2 = new Promise((resolve, reject) => {
    setTimeout(() => resolve(2), 0)
})
const p3 = new Promise((resolve, reject) => {
    setTimeout(() => resolve(3), 0)
})
const p4 = new Promise((resolve, reject) => {
    setTimeout(() => resolve(4), 0)
})
limitQueue([p1, p2, p3, p4], 2)