// let arrTree = [
//     {
//         id: '1', children: [
//             { id: '1-1', children: [{ id: '1-1-1' }, { id: '1-1-2' }] },
//             { id: '1-2', children: [{ id: '1-2-1', children: [{ id: '1-2-1-1' }, { id: '1-2-1-2' }] }]},
//         ]
//     }
// ]
//         a
//    b         c
// d    e     f
//          g   h
// //广度优先遍历
// let gdtree = (arr) => {
//     let res = [];
//     for (let i = 0; i < arr.length; i++) {
//         console.log(arr[i]);
//         if (arr[i].children) arr = arr.concat(arr[i].children);
//     }
// }
// gdtree(arr);
// console.log("--------------------");
// //深度优先遍历（包括了前中后序遍历）
// let sdtree = (arr) => {
//     console.log(arr.id)
//     if (arr.children) {
//         for (let i = 0; i < arr.children.length; i++) {
//             sdtree(arr.children[i]);
//         }
//     }
// }
// sdtree(arr[0]);
// console.log("--------------------");


//前序遍历
// let frontTree = (arr)=>{
//     if(arr){
//         console.log(arr.id)
//         if(arr.children&&arr.children[0]){
//             frontTree(arr.children[0])
//         }
//         if(arr.children&&arr.children[1]){
//             frontTree(arr.children[1])
//         }
//     }
// }
// frontTree(arrTree[0])
//中序遍历
// let middleTree=(arr) => {
//     if (arr) {
//         if (arr.children&&arr.children[0]) {
//             middleTree(arr.children[0])
//         }
//         console.log(arr.id);
//         if (arr.children&&arr.children[1]) {
//             middleTree(arr.children[1])
//         }
//     }
// }
// middleTree(arrTree[0])

//后序遍历
// let behindTree = (arr)=>{
//     if(arr){
//         if(arr.children&&arr.children[0]){
//             behindTree(arr.children[0])
//         }
//         if(arr.children&&arr.children[1]){
//             behindTree(arr.children[1])
//         }
//         console.log(arr.id)
//     }
// }
// behindTree(arrTree[0])

//数组转换树
// let data = [
//     { id: 0, parentId: null, name: '生物' },
//     { id: 1, parentId: 0, name: '动物' },
//     { id: 2, parentId: 0, name: '植物' },
//     { id: 3, parentId: 0, name: '微生物' },
//     { id: 4, parentId: 1, name: '哺乳动物' },
//     { id: 5, parentId: 1, name: '卵生动物' },
//     { id: 6, parentId: 2, name: '种子植物' },
//     { id: 7, parentId: 2, name: '蕨类植物' },
//     { id: 8, parentId: 4, name: '大象' },
//     { id: 9, parentId: 4, name: '海豚' },
//     { id: 10, parentId: 4, name: '猩猩' },
//     { id: 11, parentId: 5, name: '蟒蛇' },
//     { id: 12, parentId: 5, name: '麻雀' }
// ]
// let arrToTree=(tree) => {
//     let result = [];
//     let map=[];
//     data.forEach(item => {
//         map[item.id]=item;
//     })
//     data.forEach(item => {
//         let parent = map[item.parentId];
//         if(parent){
//             (parent.children||(parent.children=[])).push(item);
//         }else{
//             result.push(item)
//         }
//     })
//     return result;
// }
// console.log(JSON.parse(JSON.stringify(arrToTree(data))));
// [
//     {
//         "id":0,
//         "parentId":null,
//         "name":"生物",
//         "children":[
//             {
//                 "id":1,
//                 "parentId":0,
//                 "name":"动物",
//                 "children":[
//                     {
//                         "id":4,
//                         "parentId":1,
//                         "name":"哺乳动物",
//                         "children":[
//                             {
//                                 "id":8,
//                                 "parentId":4,
//                                 "name":"大象"
//                             },
//                             {
//                                 "id":9,
//                                 "parentId":4,
//                                 "name":"海豚"
//                             },
//                             {
//                                 "id":10,
//                                 "parentId":4,
//                                 "name":"猩猩"
//                             }
//                         ]
//                     },
//                     {
//                         "id":5,
//                         "parentId":1,
//                         "name":"卵生动物",
//                         "children":[
//                             {
//                                 "id":11,
//                                 "parentId":5,
//                                 "name":"蟒蛇"
//                             },
//                             {
//                                 "id":12,
//                                 "parentId":5,
//                                 "name":"麻雀"
//                             }
//                         ]
//                     }
//                 ]
//             },
//             {
//                 "id":2,
//                 "parentId":0,
//                 "name":"植物",
//                 "children":[
//                     {
//                         "id":6,
//                         "parentId":2,
//                         "name":"种子植物"
//                     },
//                     {
//                         "id":7,
//                         "parentId":2,
//                         "name":"蕨类植物"
//                     }
//                 ]
//             },
//             {
//                 "id":3,
//                 "parentId":0,
//                 "name":"微生物"
//             }
//         ]
//     }
// ]


// let a=[0,1,2,3,null,null,null,4,null,null,null,null,null,null,null,5]
// let treeLength=(arr,i)=>{
//     if(arr[i]==null)return 0;
//     return Math.max(treeLength(arr,2*i),treeLength(arr,2*i+1))+1
// }


//全排列
// let b=[1,2,3,4]
// let perm=(arr,p,q)=>{
//     if(q==p){
//         console.log(arr);
//     }
//     for(let i=p;i<=q;i++){
//         [arr[p],arr[i]]=[arr[i],arr[p]]
//         perm(arr,p+1,q);
//         [arr[p],arr[i]]=[arr[i],arr[p]]
//     }
// }
// perm(b,0,b.length-1)
const arr = {
    person:{
        name:"hug"
    },
    name:"ccc"
}
let t="person.name"
let total = t.split(".").reduce((data, cur)=>{
    console.log(data,cur,1)
    data[cur]=t;
    return data[cur]
}, arr)
arr.person.name="ss"
console.log(arr)