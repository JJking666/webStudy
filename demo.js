
// console.log(1)
// new Promise(resolve =>{
//     console.log(7)
//     for(let i=0; i<9000;i++){
//         if(i==666)resolve(i)
//     }
 //   console.log(53)
// }).then(val=>{
//     console.log(val)
// })
// async function fo(){
//     console.log(2)
//     await go()
//     console.log(val)
// }
// async function go(){
//     console.log(3)
//     resolve(3)
// }
// fo()
// console.log(6)
function aa () {
  this.j = 'j'
  this.k = 'k'
  this.m = 'm'
}
aa.prototype.p = 'p'
let b = new aa()
for(const key in b){
  console.log(key) + '222'
}