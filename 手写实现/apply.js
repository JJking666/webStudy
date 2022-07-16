// Function.prototype.myApply = function(context) {
//   // 判断调用对象是否为函数
//   if (typeof this !== "function") {
//     throw new TypeError("Error");
//   }
//   let result = null;
//   // 判断 context 是否存在，如果未传入则为 window
//   context = context || global;
//   // 将函数设为对象的方法
//   context.fn = this;
//   // 调用方法
//   if (arguments[1]) {
//     result = context.fn(...arguments[1]);
//   } else {
//     result = context.fn();
//   }
//   // 将属性删除
//   delete context.fn;
//   return result;
// };


Function.prototype.myApply=function(context,args){
    context = context || global
    context.fn = this
    let res
    if(args) {
        res = context.fn(...args)
    }else{
        res = context.fn()
    }
    delete context.fn
    return res
}
var person = {
    fullName: function() {
        return this.firstName + " " + this.lastName;
    }
}
var person1 = {
    firstName: "Bill",
    lastName: "Gates",
}
console.log(person.fullName.myApply(person1))


