//import './src/index.js';

let a =function(n){
    return new Promise((resolve, reject) => {
        setTimeout(() =>{
            resolve(n);
        },0)
    })
}

async function go(n){
    let b = await a(n)
    console.log(1,b)
    return b
}

go(333)


// function takeLongTime(n) {
//     return new Promise(resolve => {
//         setTimeout(() => resolve(n + 200), n);
//     });
// }

// function step1(n) {
//     console.log(`step1 with ${n}`);
//     return takeLongTime(n);
// }

// function step2(n) {
//     console.log(`step2 with ${n}`);
//     return takeLongTime(n);
// }

// function step3(n) {
//     console.log(`step3 with ${n}`);
//     return takeLongTime(n);
// }


// // async await方式
// async function doIt() {
//     console.time("doIt");
//     const time1 = 300;
//     const time2 = await step1(time1);
//     const time3 = await step2(time2);
//     const result = await step3(time3);
//     const test =await takeLongTime(200)
//     console.log(`result is ${result}`);
//     console.log(test);
//     console.timeEnd("doIt");
// }
// doIt();