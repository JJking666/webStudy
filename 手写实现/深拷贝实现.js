// function deepClone(obj){
//     let objClone = Array.isArray(obj)?[]:{};
//     if(obj && typeof obj==="object"){
//         for(key in obj){
//             if(obj.hasOwnProperty(key)){//判断是否原型链上的属性，若false则是原型链的属性，不进行克隆
//                 //判断ojb子元素是否为对象，如果是，递归复制
//                 if(obj[key]&&typeof obj[key] ==="object"){
//                     objClone[key] = deepClone(obj[key]);
//                 }else{
//                     //如果不是，简单复制
//                     objClone[key] = obj[key];
//                 }
//             }
//         }
//     }
//     return objClone;
// }
// let a=[1,2,3,4],
//     b=deepClone(a);
// a[0]=2;
// console.log(a,b);
function tt(){}
tt.prototype.d='d'
let b =new tt();
b.a='a'
b.c='c'

for(const c in b){
    console.log(c)
}