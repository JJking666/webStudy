## 默认绑定
```ts
function foo() {
    console.log(this.a);
}
var a = 1;
foo(); // 2
```
调用foo的时候，this应用了默认绑定，this指向了全局对象，但是在严格模式下，那么全局对象将无法进行默认绑定，因此this会绑定到undefined

## 隐式绑定
```ts
function foo() {
    console.log(this.a);
}
var obj = {
    a: 2,
    foo: foo
};
obj.foo(); // 2
```

但是无论是直接在 obj 中定义还是先定义再添加为引用属性， 这个函数严格来说都不属于 obj 对象，然而， 调用位置会使用 obj 上下文来引用函数， 因此你可以说函数被调用时 obj 对象“ 拥有” 或者“ 包含” 它

对象属性引用链中只有最后一层会影响调用位置。 举例来说：
```ts
function foo() {
    console.log(this.a);
}
var obj2 = {
    a: 42,
    foo: foo
};
var obj1 = {
    a: 2,
    obj2: obj2
};
obj1.obj2.foo(); // 42
```
## 隐式丢失

一个最常见的 this 绑定问题就是被隐式绑定的函数会丢失绑定对象， 也就是说它会应用默认绑定， 从而把 this 绑定到全局对象或者 undefined 上， 取决于是否是严格模式，

```ts
function foo() {
    console.log(this.a);
}
var obj = {
    a: 2,
    foo: foo
};
var bar = obj.foo; // 函数别名！
var a = "oops, global"; // a 是全局对象的属性
bar(); // "oops, global"
```
虽然 bar 是 obj.foo 的一个引用， 但是实际上， 它引用的是 foo 函数本身， 因此此时的 bar() 其实是一个不带任何修饰的函数调用， 因此应用了默认绑定。在js内置函数中如setTimeout也是如此：

```ts
function foo() {
    console.log(this.a);
}
var obj = {
    a: 2,
    foo: foo
};
var a = "oops, global"; // a 是全局对象的属性
setTimeout(obj.foo, 100); // "oops, global"
```


## 显示绑定
call(...),apply(...)可以指定this的绑定对象（前者接收多个参数如call(this, param1, param2, param3...)，后者接受一个或两个参数apply(this, [...])）

```ts
function foo() {
    console.log(this.a);
}
var obj = {
    a: 2
};
foo.call(obj); // 2
```
通过 foo.call(..)， 我们可以在调用 foo 时强制把它的 this 绑定到 obj 上。 如果你传入了一个原始值（ 字符串类型、 布尔类型或者数字类型） 来当作 this 的绑定对 象， 这个原始值会被转换成它的对象形式（ 也就是 new String(..)、 new Boolean(..) 或者 new Number(..)）

## 硬绑定
```ts
function foo() {
    console.log(this.a);
}
var obj = {
    a: 2
};
var bar = function() {
    foo.call(obj);
};
bar(); // 2
setTimeout(bar, 100); // 2
// 硬绑定的 bar 不可能再修改它的 this
bar.call(window); // 2
```
我们创建了函数 bar()， 并在它的内部手动调用 了 foo.call(obj)， 因此强制把 foo 的 this 绑定到了 obj。 无论之后如何调用函数 bar， 它 总会手动在 obj 上调用 foo。 这种绑定是一种显式的强制绑定， 因此我们称之为硬绑定

## new绑定

在 JavaScript 中， 构造函数只是一些 使用 new 操作符时被调用的函数。 它们并不会属于某个类， 也不会实例化一个类。 实际上， 它们甚至都不能说是一种特殊的函数类型， 它们只是被 new 操作符调用的普通函数而已。使用 new 来调用函数， 或者说发生构造函数调用时， 会自动执行下面的操作：

    1. 创建（ 或者说构造） 一个全新的对象

    2. 这个新对象会被执行 [[ 原型 ]] 连接//执行构造函数

    3. 这个新对象会绑定到函数调用的 this

    4. 如果函数没有返回其他对象， 那么 new 表达式中的函数调用会自动返回这个新对象

## 绑定优先级
new绑定 > 显式绑定 > 隐式绑定 > 默认绑定




```ts
function a() {
  console.log(this);
}
a.call(null);
```
window对象
如果第一个参数传入的对象调用者是null或者undefined，call方法将把全局对象（浏览器上是window对象）作为this的值。

```ts
var obj = {
  name : 'cuggz',
  fun : function(){
    console.log(this.name);
  }
}
obj.fun()     // cuggz
new obj.fun() // undefined
```

使用new构造函数时，其this指向的是全局环境window。

```ts
global.number = 2;
var obj = {
 number: 3,
 db1: (function(){
   console.log('1');
   this.number *= 4;
   return function(){
     console.log('2');
     this.number *= 5;
   }
 })()
}
var db1 = obj.db1;
db1();
obj.db1();
console.log(obj.number);     // 15
console.log(global.number);  // 40
```
>执行db1()时，this指向全局作用域，所以global.number * 4 = 8，然后执行匿名函数， 所以window.number * 5 = 40；
执行obj.db1()时，this指向obj对象，执行匿名函数，所以obj.number * 5 = 15。

```ts
var length = 10;    //全局
function fn() {
    console.log(this.length);
}

var obj = {
  length: 5,
  method: function(fn) {
    fn();
    arguments[0](); //arguments[0]看作arguments.fn
  }
};

obj.method(fn, 1);
10 2
```
>第一次执行fn()，this指向window对象，输出10。
第二次执行arguments0，相当于arguments调用方法，this指向arguments，而这里传了两个参数，故输出arguments长度为2。

```ts
var a = 1;
function printA(){
  console.log(this.a);
}
var obj={
  a:2,
  foo:printA,
  bar:function(){
    printA();
  }
}

obj.foo(); // 2
obj.bar(); // 1
var foo = obj.foo;
foo(); // 1
```
>obj.foo()，foo 的this指向obj对象，所以a会输出2；
obj.bar()，printA在bar方法中执行，所以此时printA的this指向的是window，所以会输出1；
foo()，foo是在全局对象中执行的，所以其this指向的是window，所以会输出1；

```ts
var x = 3;
var y = 4;
var obj = {
    x: 1,
    y: 6,
    getX: function() {
        var x = 5;
        return function() {
            return this.x;
        }();
    },
    getY: function() {
        var y = 7;
        return this.y;
    }
}
console.log(obj.getX()) // 3
console.log(obj.getY()) // 6
```

>***匿名函数的this是指向全局对象的***，所以this指向window，会打印出3；
getY是由obj调用的，所以其this指向的是obj对象，会打印出6。


```ts
var a = 10;
var obt = {
  a: 20,
  fn: function(){
    var a = 30;
    console.log(this.a)
  }
}
obt.fn();  // 20
obt.fn.call(); // 10
(obt.fn)(); // 20
```
>obt.fn()，fn是由obt调用的，所以其this指向obt对象，会打印出20；
obt.fn.call()，这里call的参数啥都没写，就表示null，我们知道如果call的参数为undefined或null，那么this就会指向全局对象this，所以会打印出 10；
(obt.fn)()， 这里给表达式加了括号，而括号的作用是改变表达式的运算顺序，而在这里加与不加括号并无影响；相当于  obt.fn()，所以会打印出 20


```ts
function a(xx){
  this.x = xx;
  return this
};
var x = a(5);
var y = a(6);

console.log(x.x)  // undefined
console.log(y.x)  // 6
```

>1.最关键的就是var x = a(5)，函数a是在全局作用域调用，所以函数内部的this指向window对象。**所以 this.x = 5 就相当于：window.x = 5。**之后 return this，也就是说 var x = a(5) 中的x变量的值是window，这里的x将函数内部的x的值覆盖了。然后执行console.log(x.x)， 也就是console.log(window.x)，而window对象中没有x属性，所以会输出undefined。
2.当指向y.x时，会给全局变量中的x赋值为6，所以会打印出6。.



```ts
function foo(something){
    this.a = something
}

var obj1 = {
    foo: foo
}

var obj2 = {}

obj1.foo(2);
console.log(obj1.a); // 2

obj1.foo.call(obj2, 3);
console.log(obj2.a); // 3

var bar = new obj1.foo(4)
console.log(obj1.a); // 2
console.log(bar.a); // 4
```
>考察this绑定的优先级了，new 绑定是比隐式绑定优先级高，所以会输出4

```ts
function foo(something){
    this.a = something
}

var obj1 = {}

var bar = foo.bind(obj1);
bar(2);
console.log(obj1.a); // 2

var baz = new bar(3);
console.log(obj1.a); // 2
console.log(baz.a); // 3
```
this绑定的优先级：new绑定 > 显式绑定 > 隐式绑定 > 默认绑定。