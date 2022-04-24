# 作用域&变量提升&闭包
```ts
(function(){
   var x = y = 1;
})();
var z;

console.log(y); // 1
console.log(z); // undefined
console.log(x); // Uncaught ReferenceError: x is not defined
```
关键在于：var x = y = 1; 实际上这里是从右往左执行的，首先执行y = 1, 因为y没有使用var声明，所以它是一个全局变量，然后第二步是将y赋值给x，讲一个全局变量赋值给了一个局部变量，最终，x是一个局部变量，y是一个全局变量，所以打印x是报错。


```ts
var a, b
(function () {
   console.log(a);
   console.log(b);
   var a = b = 3;
   console.log(a);
   console.log(b);
})()
console.log(a);
console.log(b);
```
> undefined
undefined
3
3
undefined
3

与上题相似

```ts
var friendName = 'World';
(function() {
  if (typeof friendName === 'undefined') {
    var friendName = 'Jack';
    console.log('Goodbye ' + friendName);
  } else {
    console.log('Hello ' + friendName);
  }
})();
```
变量提升

```ts
f = function() {return true;};
g = function() {return false;};
(function() {
   if (g() && [] == ![]) {
      f = function f() {return false;};
      function g() {return true;}
   }
})();
console.log(f());
```
+ 输出结果： false
>这里首先定义了两个变量f和g，我们知道变量是可以重新赋值的。后面是一个匿名自执行函数，在 if 条件中调用了函数 g()，由于在匿名函数中，又重新定义了函数g，就覆盖了外部定义的变量g，所以，这里调用的是内部函数 g 方法，返回为 true。第一个条件通过，进入第二个条件。

>第二个条件是[] == ![]，先看 ![] ，在 JavaScript 中，当用于布尔运算时，比如在这里，对象的非空引用被视为 true，空引用 null 则被视为 false。由于这里不是一个 null, 而是一个没有元素的数组，所以 [] 被视为 true, 而 ![] 的结果就是 false 了。当一个布尔值参与到条件运算的时候，true 会被看作 1, 而 false 会被看作 0。现在条件变成了 [] == 0 的问题了，当一个对象参与条件比较的时候，它会被求值，求值的结果是数组成为一个字符串，[] 的结果就是 '' ，而 '' 会被当作 0 ，所以，条件成立。
两个条件都成立，所以会执行条件中的代码， f 在定义是没有使用var，所以他是一个全局变量。因此，这里会通过闭包访问到外部的变量 f, 重新赋值，现在执行 f 函数返回值已经成为 false 了。而 g 则不会有这个问题，这里是一个函数内定义的 g，不会影响到外部的 g 函数。所以最后的结果就是 false。