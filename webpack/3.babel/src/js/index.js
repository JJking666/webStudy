function Foo(name, age, sex) {

    this.name = name;

    this.age = age;

    this.sex = sex;

}

let b = function () { }

b.prototype = new Foo('a212',15,'s')
let d = 2
console.log(new b().name, d)