Function.prototype.myCall = function(context) {
  // 判断调用对象
  if (typeof this !== "function") {
    console.error("type error");
  }
  // 获取参数
  let args = [...arguments].slice(1),
    result = null;
  // 判断 context 是否传入，如果未传入则设置为 window
  context = context || window;
  // 将调用函数设为对象的方法
  context.fn = this;
  // 调用函数
  result = context.fn(...args);
  // 将属性删除
  delete context.fn;
  return result;
}


Function.prototype.myCall2 = function(context,...args){
    if(typeof this !== "function")return false
    context = context || window
    context.fn = this
    console.log(...args,Object.prototype.toString.call(args),args,args.toString(),args.valueOf())
    const result  = context.fn(...args)
    delete context.fn
    return result
}

function getName (a,b,c){
    return a+b+c
}

const obj = {

}
console.log(getName.myCall2(obj,1,2,3))