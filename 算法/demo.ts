//快速排序
// function quickSort(arr:number[]){
//     qSort(arr,0,arr.length-1)
// }

// function qSort(arr:number[], l:number,r:number){
//     console.log(2)
//     if(l>=r)return
//     let mid = sort(arr,l,r)
//     qSort(arr,l,mid-1)
//     qSort(arr,mid+1,r)
// }

// function sort(arr:number[], l:number,r:number):number {
//     console.log(3)
//     let m = arr[l];
//     while(l<r){
//         while(l<r && m<=arr[r])r--
//         arr[l] = arr[r];
//         while(l<r && arr[l]<=m)l++;
//         arr[r] = arr[l];
//     }
//     arr[l] = m
//     return l
// }
// let arr = [2,5,3]
// quickSort(arr)
// console.log(arr)

//归并排序
// function mergeSort(arr:number[],l:number,r:number){
//     if(l>=r)return
//     let mid:number = Math.floor((l+r)/2)
//     mergeSort(arr,l,mid)
//     mergeSort(arr,mid+1,r)
//     merge(arr,l,mid,r)
// }

// function merge(arr:number[],l:number,mid:number,r:number){
//     let temp = []
//     let [i,j] = [l,mid+1]
//     while(i<=mid&&j<=r){
//         if(arr[i]<=arr[j])temp.push(arr[i++])
//         else temp.push(arr[j++])
//     }
//     while(i<=mid)temp.push(arr[i++])
//     while(j<=r)temp.push(arr[j++])
//     for(let i=l;i<=r;i++){
//         arr[i] = temp[i-l]
//     }
// }

// let arr =[3,5,6,1,5,8,32,10]
// mergeSort(arr,0,arr.length-1)
// console.log(arr)

// function format(name: string): string {
//     let res:string = '',str=''
//     name = name.toLowerCase()
//     for(let i=0;i<name.length-1;i++){
//         str = name[i]+name[i+1]
//         if(name[i]==='_'&& str.charCodeAt(1)<=122&& str.charCodeAt(1)>=97){
//             res+= String.fromCharCode(str.charCodeAt(1) - 32)
//             i++
//         }else{
//             res+=name[i]
//             if(i===name.length-2)res+=name[i+1]
//         }
//     }
//     // write code here

//     return res
// }
let arr ='1as'
console.log(arr.includes('A'),arr.includes('a'),arr.includes('d'))