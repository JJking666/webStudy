/*
 * @Descripttion:
 * @version:
 * @Author: congsir
 * @Date: 2022-07-11 15:30:08
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-07-16 21:46:19
 */
function mynew(func, ...args) {
    const obj = new Object();
    obj.__proto__ = func.prototype;
    let result = func.apply(obj, args)
    return result instanceof Object ? result : obj
}
function Person(name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype.say = function () {
    console.log(this.name)
}

let p = mynew(Person, "huihui", 123)
console.log(p, Object.getPrototypeOf(p)) // Person {name: "huihui", age: 123}
p.say() // huihui

1.新创建一个对象
2.将对象的_proto__指向构造函数的 prototype 对象
3.通过apply强绑定将this绑定在新对象上
4.对新对象执行构造函数
5.返回这个对象