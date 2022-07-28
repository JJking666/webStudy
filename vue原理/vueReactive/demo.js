// let a = [1,2,3]
// a.xxx = 222222
// a.ccc = 33
// this.i=11
// a['w']=331
// let i=1777
// console.log(i)
// for(const i in a){
//     console.log(i,this.i)
// }
// for(const i of a){
//     console.log(i)
// }
let expr = '{{person.name}}--{{person.age}}'
let val=expr.replace(/\{\{(.+)?\}\}/,(...args)=>{
    console.log(args)                         //将正则匹配到的第一个字段返回给val
})
console.log(val)