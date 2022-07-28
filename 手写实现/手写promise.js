// class newPromise{
//     static value = '';
//     static err = '';
//     status = 'padding';
//     callback =[];
//     constructor(event){
//         this.value = undefined;
//         this.err = undefined;
//         this.status = 'padding';
//         event(this._resolve.bind(this),this._rejected.bind(this))       //执行promise中的异步事件
//     }
//     _resolve(value){
//         this.value = value;
//         this.status = 'resolved';
//         this.action(this.callback.shift())
//     }
//     _rejected(err){
//         this.err= err
//         this.status = 'rejected';
//         this.action(this.callback.shift())
//     }

//     _then(event1){
//         this.callback.push(event1)
//     }
//     _catch(event2){
//         this.callback.push(event2)
//     }

//     action(cb){
//         if(this.status == 'resolved'){
//             cb(this.value)
//         }else{
//             cb(this.err)
//         }
//     }
// }

// function go(){
//     return new newPromise((_resolve, _reject)=>{
//         setTimeout(()=>{
//             _resolve('haha')
//         })
//     })
// }
// go()._then((value)=>{
//     console.log(value)
//     _resolve('xxxx')
// })._catch((err)=>{
//     console.log(err)
// })


//实现链式
class WPromise {
    static pending = "pending";
    static fulfilled = "fulfilled";
    static rejected = "rejected";

    constructor(executor) {
        this.status = WPromise.pending; // 初始化状态为pending
        this.value = undefined; // 存储 this._resolve 即操作成功 返回的值
        this.reason = undefined; // 存储 this._reject 即操作失败 返回的值
        // 存储then中传入的参数
        // 至于为什么是数组呢？因为同一个Promise的then方法可以调用多次
        this.callbacks = [];
        executor(this._resolve.bind(this), this._reject.bind(this));
    }

    // onFulfilled 是成功时执行的函数
    // onRejected 是失败时执行的函数
    then(onFulfilled, onRejected) {
        // 返回一个新的Promise
        return new WPromise((nextResolve, nextReject) => {
            // 这里之所以把下一个Promsie的resolve函数和reject函数也存在callback中
            // 是为了将onFulfilled的执行结果通过nextResolve传入到下一个Promise作为它的value值
            this._handler({
                nextResolve,
                nextReject,
                onFulfilled,
                onRejected
            });
        });
    }

    _resolve(value) {
        this.value = value;
        this.status = WPromise.fulfilled; // 将状态设置为成功

        // 通知事件执行
        this.callbacks.forEach((cb) => this._handler(cb));
    }

    _reject(reason) {
        this.reason = reason;
        this.status = WPromise.rejected; // 将状态设置为失败

        this.callbacks.forEach((cb) => this._handler(cb));
    }

    _handler(callback) {
        const { onFulfilled, onRejected, nextResolve, nextReject } = callback;

        if (this.status === WPromise.pending) {
            this.callbacks.push(callback);
            return;
        }

        if (this.status === WPromise.fulfilled) {
            // 传入存储的值
            // 未传入onFulfilled时，将undefined传入
            const nextValue = onFulfilled ? onFulfilled(this.value) : undefined;
            nextResolve(nextValue);
            return;
        }

        if (this.status === WPromise.rejected) {
            // 传入存储的错误信息
            // 同样的处理
            const nextReason = onRejected ? onRejected(this.reason) : undefined;
            nextResolve(nextReason);
        }
    }
}

//Promise.all
Promise.prototype.all = function (promises) {
    let results = [];
    let promiseCount = 0;
    let promisesLength = promises.length;
    return new Promise(function (resolve, reject) {
        promises.forEach(function (val, i) {
            //val.then(function (res) {   适用promise，但对常量无法处理
            Promise.resolve(val).then(function (res) {
                promiseCount++;
                // results.push(res);
                results[i] = res;
                // 当所有函数都正确执行了，resolve输出所有返回结果。
                if (promiseCount === promisesLength) {
                    return resolve(results);
                }
            }, function (err) {
                return reject(err);
            });
        }
    });
};
let promise1 = new Promise(function (resolve) {
    resolve(1);
});
let promise2 = new Promise(function (resolve) {
    resolve(2);
});
let promise3 = new Promise(function (resolve, reject) {
    resolve(3);
});

let promiseAll = Promise.prototype.all([promise1, promise2, promise3]);
promiseAll.then(function (res) {
    console.log(res);
})
    .catch(function (err) {
        console.log(err);
    })


// Promise.race
Promise.prototype.race = function (promises) {
    return new Promise(function (resolve, reject) {
        promises.forEach(function (val, i) {
            Promise.resolve(val).then(function (res) {
                resolve(results)
            }, function (err) {
                reject(err);
            });
        }
    });
};

//Promise.all_settled
Promise.prototype.allSettled = function (promises) {
    let results = [];
    let num = 0, len = promises.length;
    console.log(111)
    return new Promise(function (resolve, reject) {
        promises.forEach(function (val, i) {
            Promise.resolve(val).then(val => {
                results[i] = val
                num++;
                if (num === len) resolve(results)
            }, val => {
                results[i] = val
                num++;
                if (num === len) resolve(results)
            })
        });
    })
}