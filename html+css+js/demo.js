// // let array = [-1,-2,0,1,5,8]
// // function go(arr){
// //     arr=[]
// //     for(let i=0;i<50;i++)arr.push(-105)
// //     for(let i=0;i<50;i++)arr.push(105)
// //     for(let i=0;i<5;i++)arr.push(-105)
// //     console.log('输入的是',arr)
// //     let arr2 = [...arr]
// //     arr2.sort((a,b)=>a-b)
// //     let l = 0,r = arr.length - 1
// //     for(let i=l;i<r;i++){
// //         if(arr[i]!=arr2[i])break
// //         l++
// //     }
// //     for(let i=r;i>l;i--){
// //         if(arr[i]!=arr2[i])break
// //         r--
// //     }
// //     let res = r-l+1 ==1?0:r-l+1
// //     return res
// // }
// // console.log('输出的是',go(array))

// export function format(name: string): string {
//     let res:string = ''
//     name = name.toLowerCase()
//     for(let i=0;i<name.length-1;i++){
//         if(name[i]==='_'&&name[i+1].charCodeAt(0)<=122&&name[i+1].charCodeAt(0)>=97){
//             res+= String.fromCharCode(res[i+1].charCodeAt(0) - 32)
//             i++
//         }else{
//             res+=name[i]
//         }
//     }
//     // write code here
//     return res
// }



// let n = 3
// let thing1 = [5,10,8],thing2 = [5,8,7]
// let m = 2
// let price1 = [15,22],price2 = [1,4]
// let allPrice = 0,lessPrice=0
// for(let i=0;i<n;i++){
//     allPrice = 0,lessPrice=0
//    	for(let j=0;j<=i;j++){
//         allPrice += parseInt(thing1[j]+'')
//         lessPrice += parseInt(thing2[j]+'')
//     }
//     let k=0
//     while(k<m){
//         if(allPrice<price1[k])break;
//         else k++
//     }
//     let now =0
//     if(k==0){
//         now = allPrice
//         if(now<lessPrice)console.log('M')
//         else if(now>lessPrice)console.log('Z')
//         else console.log('B')
//     }else{
//         now= allPrice - price2[k-1]
//         if(now<lessPrice)console.log('M')
//         else if(now>lessPrice)console.log('Z')
//         else console.log('B')
//     }
// }


// let n = 6,m=1
// let len=n
// let str = 'hahaha'.split('')
// let res = [],now = 0
// //hhhaaa
// if(m==1){
//     while(res.length<len){
//         res.splice(Math.ceil(now++/2),0,str.pop())
//     }
//     res=res.reverse()
//     console.log(...res)
// }
// else{
//     while(res.length<len){
//         res.push(str[Math.ceil(n/2)-1])
//         str.splice(Math.ceil(n--/2)-1,1)

//     }
//     console.log(...res)
// }
// function getData(api){
//    return new Promise((resolve,reject) => {
//      setTimeout(() => {
//        var ok = Math.random() > 0.5  // 模拟请求成功或失败
//        if(ok)
//          resolve('get ' + api + ' data')
//        else{
//          reject('error') // 正常的reject
//        }
//      },2000)
//    })
//  }
//  function getDatas(arr){
//    var promises = arr.map(item => getData(item))
//    return Promise.all(promises.map(p => p.catch(e => e))).then(values => { // 关键步骤，map(p => p.catch(e => e)) 在每个请求后加上 catch 捕获错误；
//      values.map((v,index) => {
//        if(v == 'error'){
//          console.log('第' + (index+1) + '个请求失败')
//        }else{
//          console.log(v)
//        }
//      })
//    }).catch(error => {
//      console.log(error)
//    })
//  }
//  getDatas(['./api1','./api2','./api3','./api4']).then(() => '请求结束')
