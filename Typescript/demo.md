# ***Typescript***
## 数据类型
|  类型  |  值  |
|  ---  |  ---  |
|  number  |  数值  |
|  string  |  字符串  |
|  undefined  |  未赋值  |
|  any  |  任何值
|  void  |  空值  |
## ReadonlyArray<T>
***ReadonlyArray<T>类型，它与Array<T>相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改：***
```ts
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[0] = 12; // error!
ro.push(5); // error!
ro.length = 100; // error!
a = ro; // error!
```
***把整个ReadonlyArray赋值到一个普通数组也是不可以的。 但是你可以用类型断言重写***
```ts
a = ro as number[];
```
## readonly vs const
***看要把它做为变量使用还是做为一个属性。 做为变量使用的话用const，若做为属性则使用readonly。***
## Never
    [^_^]: never类型表示的是那些永不存在的值的类型。 例如，never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 变量也可能是never类型，当它们被永不为真的类型保护所约束时。
    [^_^]: never类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。 即使any也不可以赋值给never。
    [^_^]: **默认情况下null和undefined是所有类型的子类型。 就是说你可以把null和undefined赋值给number类型的变量。**

##  类型断言
*类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。 它没有运行时的影响，只是在编译阶段起作用。*
```ts
[^_^]: “尖括号”语法
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;

[^_^]: as语法
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;

```
***当你在TypeScript里使用JSX时，只有as语法断言是被允许的。***

## 解构
>数组解构
>> let [first, ...rest] = [1, 2, 3, 4];
>>console.log(first);               // 1
>>console.log(rest);                // [ 2, 3, 4 ]

>对象解构
>>let o = {
>>  a: "foo",
>>  b: 12,
>>  c: "bar"
>>};
>>let { a, b } = o;                 //a="foo" b=12

>属性重命名
>>let { a: newName1, b: newName2 } = o;
>>let {a, b}: {a: string, b: number} = o;
**这里的冒号不是指示类型的。 如果你想指定它的类型， 仍然需要在其后写上完整的模式。**

## 默认值
```ts
function keepWholeObject(wholeObject: { a: string, b?: number=20 }) {  [^_^]: ?代表该参数可有可无,=20为默认值
    let { a, b = 1001 } = wholeObject;                                 [^_^]: b=1001为默认值
}
```
*wholeObject是一个变量（对象类型）*
## 函数声明（解构赋值）
```ts
type C = { a: string, b?: number }
function f({ a, b=1000 }: C): void {            [^_^]: b=1000默认值
    // ...
}
```
## 展开运算符
>数组展开
>>let first = [1, 2];
>>let second = [3, 4];
>>let bothPlus = [0, ...first, ...second, 5];

>对象展开
>>let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
>>let search = { ...defaults, food: "rich" };
>>*...defaults代表defaults里的所有元素,而后面的值会覆盖defaults中的值*

## 数组
```ts
let arr1:number[] = [1,2,3];             [^_^]: 第一种方式
let arr2:Array<number> = [1,2,3];        [^_^]: 第二种方式
```

## 元组
```ts
let x: [string, number];
x = ['hello', 10]; ## OK                [^_^]: #Initialize it

[^_^]: Initialize it incorrectly
x = [10, 'hello']; // Error
[^_^]: 当访问一个越界的元素，会使用联合类型替代：
x[3] = 'world';                         [^_^]: OK, 字符串可以赋值给(string | number)类型
console.log(x[5].toString());           [^_^]: OK, 'string' 和 'number' 都有 toString
x[6] = true;                            [^_^]: Error, 布尔不是(string | number)类型

代码里它的值是2
```

## 枚举
```ts
enum Color {Red, Green, Blue}       [^_^]: 数值默认从0开始
let c: Color = Color.Green;         [^_^]: 输出1

enum Color {Red = 1, Green, Blue}
let c: Color = Color.Green;         [^_^]: 输出2

enum Color {Red = 1, Green = 2, Blue = 4}   [^_^]: 可手动赋值
let c: Color = Color.Green;
let colorName: string = Color[2];           [^_^]: 可通过数值取值
alert(colorName);                           [^_^]: 显示'Green' 因为上面
```
## 函数重载
```ts
function fn(param1: String):void
function fn(param1: number):void
function fn(param1: any):any {
    if(typeof param1 !== "number")return "string"
    else return "number"
}
console.log(fn('a'))                [^_^]: string
```

## 类的继承
```ts
[^_^]: 使用extends super()

class Parent1 {
    public name:string;

    constructor(name:string){
        this.name = name
    }

    say(){
        return this.name+" say!"
    }
    getName():string {
        return this.name
    }
    setName(name:string){
        this.name = name
    }
}

class Son1 extends Parent1{
    constructor(name:string){
        super(name);
    }

    [^_^]: 可添加自己的方法
    work(){
        return this.name+" work!"
    }
    [^_^]: 重写父类的方法
    say(){
        return this.name+" nosay!"
    }
}
```

## class 修饰符

```ts
[^_^]: public 类，子类，类外
********************************
class Person1 {
    public name:string;

    constructor(name:string){
        this.name = name
    }

    getName():string {
        return this.name
    }
    setName(name:string){
        this.name = name
    }
}
class Son_1 extends Person1{
    constructor(name:string){
        super(name);
    }
    [^_^]: 可添加自己的方法
    work(){
        return this.name+" work!"
    }
    [^_^]: 重写父类的方法
    say(){
        return this.name+" nosay!"
    }
}
let p1 = new Person1('mch');
let s1 = new Son_1('cy')
console.log("public")
console.log(p1.name)                        [^_^]: 类外
console.log(p1.getName())                   [^_^]: 类内
console.log(s1.getName())                   [^_^]: 子类
console.log(s1.work())                      [^_^]: 子类添加方法
console.log(s1.getName())                   [^_^]: 子类重写父类方法

[^_^]: protected
********************************
class Person2 {
    protected name:string;

    constructor(name:string){
        this.name = name
    }

    getName():string {
        return this.name
    }
    setName(name:string){
        this.name = name
    }
}
class Son_2 extends Person2{
    constructor(name:string){
        super(name);
    }
    [^_^]: 可添加自己的方法
    work(){
        return this.name+" work!"
    }
    [^_^]: 重写父类的方法
    say(){
        return this.name+" nosay!"
    }
}
let p2 = new Person2('mch');
let s2 = new Son_2('cy')
console.log("public")
console.log(p2.name)                        [^_^]: 类外报错
console.log(p2.getName())                   [^_^]: 类内
console.log(s2.getName())                   [^_^]: 子类

[^_^]: private
********************************
class Person3 {
    private name:string;

    constructor(name:string){
        this.name = name
    }

    getName():string {
        return this.name
    }
    setName(name:string){
        this.name = name
    }
}
class Son_3 extends Person3{
    constructor(name:string){
        super(name);
    }
    [^_^]: 可添加自己的方法
    work(){
        return this.name+" work!"           [^_^]: 子类报错
    }
    [^_^]: 重写父类的方法
    say(){
        return this.name+" nosay!"          [^_^]: 子类报错
    }
}
let p3 = new Person3('mch');
let s3 = new Son_3('cy')
console.log("public")
console.log(p3.name)                        [^_^]: 类外报错
console.log(p3.getName())                   [^_^]: 类内
console.log(s3.getName())                   [^_^]: 子类
```

## static静态
```ts
class Person3 {
    public name:string;
    static sex="男"
    constructor(name:string){
        this.name = name
    }

    getName():string {
        return this.name
    }
    setName(name:string){
        this.name = name
    }
    static go() {
        conosle.log("static"+Person3.sex);              //"男"
        console.log("public"+this.name);                //undefined
    }
}
let sex = Person3.sex;                  //男
Person3.go();                           //"男" undefined
```
*静态方法无法调用类里的属性*

## 类的多态
*多态属于继承*
*父类的方法不实现，让子类实现*
```ts
class Animal {
    name:string;

    constructor(name:string){
        this.name = name
    }

    eat(){

    }
}
class Dog extends Animal{
    constructor(name:string){
        super(name)
    }
    eat(){
        console.log("Dog is eating");
    }
}
class Cat extends Animal{
    constructor(name:string){
        super(name)
    }
    eat(){
        console.log("Cat is eating");
    }
}
```

## 类的抽象(类的标准模板)
*提供其他类继承的基类 不能被实例化*
*抽象方法只能放在抽象类*
*抽象方法不能在抽象类中具体实现，必须在派生类中实现*
```ts
abstract class Animal {
    name:string;

    constructor(name:string){
        this.name = name
    }

    abstract eat():any                  //子类必须实现
    run(){}                             //子类可以不实现
}
class Dog extends Animal{
    constructor(name:string){
        super(name)
    }
    eat(){
        console.log("Dog is eating");
    }
}
class Cat extends Animal{               //error 未实现抽象方法
    constructor(name:string){
        super(name)
    }
    run(){
        console.log("Cat is running");
    }
}
let ani = new Animal();         //error
```

## 接口
***
***对属性，方法的约束***
```ts
interface SquareConfig {
  color?: string;                               [^_^]: ?代表可选
  readonly width?: number;                      [^_^]: readonly代表只可读
}
//config: SquareConfig表示传入参数接口，若没有？那么参数必须包含接口中参数
function createSquare(config: SquareConfig): { color: string; area: number } {
  let newSquare = {color: "white", area: 100};
  if (config.color) {
    // Error: Property 'clor' does not exist on type 'SquareConfig'
    newSquare.color = config.clor;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({color: "black"});
let mySquare = createSquare({width:"100",color: "white"})   //参数顺序可改变
```
* 可选属性的好处
  * *之一是可以对可能存在的属性进行预定义*
  * *好处之二是可以捕获引用了不存在的属性时的错误。*

## 函数类型(接口)
*接口也可以描述函数类型*
```ts
interface SearchFunc {
  (source: string, subString: string): boolean;
}
```
*对于函数类型的类型检查来说，函数的参数名不需要与接口里定义的名字相匹配。*
```ts
let mySearch: SearchFunc;                           [^_^]: :SearchFunc代表函数类型
mySearch = function(src: string, sub: string): boolean {
  let result = src.search(sub);
  return result > -1;
}
```
*如果你不想指定类型，TypeScript的类型系统会推断出参数类型，因为函数直接赋值给了SearchFunc类型变量。*
```ts
mySearch = function(src, sub) {
    let result = src.search(sub);
    return result > -1;
}
```

## 可索引的类型(数组，对象)

*可索引类型具有一个索引签名，它描述了对象索引的类型，还有相应的索引返回值类型。*
```ts
interface StringArray {
  [index: number]: string;
}
let myArray: StringArray;
myArray = ["Bob", "Fred"];
let myStr: string = myArray[0];
```
*这个索引签名表示了当用number去索引StringArray时会得到string类型的返回值。*
*支持两种索引签名：字符串和数字。*

```ts
class Animal {
    name: string;
}
class Dog extends Animal {
    breed: string;
}

// 错误：使用'string'索引，有时会得到Animal!
interface NotOkay {
    [x: number]: Animal;        //error Animal是Dog的父类
    [x: string]: Dog;
}
```
*同时使用两种类型的索引，但是数字索引的返回值必须是字符串索引返回值类型的子类型。*
*这是因为当使用number来索引时，JavaScript会将它转换成string然后再去索引对象。*
*也就是说用100（一个number）去索引等同于使用"100"（一个string）去索引，因此两者需要保持一致。*

***可设置只读***
```ts
interface ReadonlyStringArray {
    readonly [index: number]: string;
}
let myArray: ReadonlyStringArray = ["Alice", "Bob"];
myArray[2] = "Mallory"; // error!
```
## 类类型接口
*对类的约束，和抽象类相似*
```ts
interface Animal{
    name:string;
    eat(str:string):void;
}
class Dog implements Animal{
    name:string
    constructor(name:string){
        this.name = name;
    }
    eat(str:string){
        console.log(this.name+"eating)
    }
}
```
***接口可继承接口***
```ts
interface Animal{
    name:string;
    run(str:string):void;
}
interface Dog implements Animal{
    name:string
    eat(str:string):void
}
class Cat implements Dog{
    name:string
    constructor(name:string){
        this.name = name;
    }
    eat(str:string){
        console.log(this.name+"eating")
    }
    work(str:string){
        console.log(this.name+"working")
    }
}
```
*必须继承所有接口的方法和属性*


***接口扩展***
*若extends父类又implement接口 那么必须实现接口的所有方法，且可以使用父类的方法和属性*

## 泛型
>泛型的定义
>解决类 接口 方法的复用性，以及对不特定数据类型的支持

### 泛型函数
```ts
function getUser<T>(value:T):T{
    return value;
}
getUser<number>(123);
getUser<string>("mch")
```

### 泛型类
```ts
class getMin<T>{
    public list:T[]=[]
    add(value:T){
        this.list.push(value);
    }
    min():T{
        return list[0]
    }
}
let m = new getMin<number>();       //实例化类 并指定类的T代表的数据类型是number
m.add(2);                           //ok
m.add("3")                          //error
```


### 泛型接口
```ts
interface Animal{
    <T>(value:T):T
}
function getData<T>(value:T):T{
    return value;
}
let demo:Animal<string> = getData
demo("mch")             //ok
demo(123)               //error
```

## 泛型类作参数

```ts
class User{
    name:string|undefined;
    age:number|undefined;
    constructor(params:{
        name:string|undefined;
        age:number|undefined;
    }){
        this.name = params.name;
        this.age = params.age;
    }
}
class Mysql<T>{
    add(user:T){
        console.log(user);
        return true
    }
}
let u = new User({
    name:"mch",
    age:123
});

let m = new Mysql<User>()
m.add(u)            //打印出u
```

### 封装操作数据库
```ts
interface MDB<T>{                   //数据库类接口
    add(obj:T):void;
    get(obj:T):void;
    delete(obj:T):void;
    change(obj:T):void;
}

class Mysql<T> implements MDB<T>{               //Mysql数据库类
    add(obj: T): void {
        console.log("Mysql add"+JSON.stringify(obj))
    }
    delete(obj: T): void {
        console.log("Mysql delete"+obj)
    }
    change(obj: T): void {
        console.log("Mysql change"+obj)
    }
    get(obj:T){
        console.log("Mysql get"+obj)
    };
}

class Mongo<T> implements MDB<T>{                  //Mongo数据库类
    add(obj: T): void {
        console.log("Mongo add"+ JSON.stringify(obj))
    }
    delete(obj: T): void {
        console.log("Mongo delete"+obj)
    }
    change(obj: T): void {
        console.log("Mongo change"+obj)
    }
    get(obj:T){
        console.log("Mongo get"+obj)
    };
}

interface User1{                                    //用户类接口
    id:number,
    name:string,
    sex:string,
    password:string
}

class User implements User1{                        //用户类
    id: number
    name: string
    sex: string
    password: string
    //若使用params则直接传入一个对象(一个参数)
    //若直接写参数 则传入时需要四个参数
    constructor(params:{id: number, name: string, sex: string, password:string}) {
        this.id=params.id;
        this.name=params.name;
        this.sex=params.sex;
        this.password=params.password;
    }
}


let user1:User1 = new User({                        //实例化用户
    id:1,
    name: "mch",
    sex:"man",
    password: "222"
})

let mdb:MDB<User1> = new Mysql<User1>();            //实例化数据库
mdb.add(user1);
mdb.delete(user1);
```
### 命名空间(namespace)
*内部模块，主要用于组织代码，避免命名冲突*
```ts
namespace A {
    class User{
        //*
    }
    class Animal{
        //*
    }
    //...
}
namespace B{
    class User{
        //*
    }
    //....
}
let u1 = new A.User();
let u2 = new B.User();              //不同命名空间内的类不冲突
```


### 模块
*ts中外部模块的简称，侧重代码的复用，一个模块可能会有多个命名空间。*

***导出***
>第一种方式
```ts
export namespace A {
    export class User{
        //*
    }
    class Animal{
        //*
    }
    //...
}
export namespace B{
    export class User{
        //*
    }
    //....
}
```
>第二种方式：
```ts
exports {A as a,B as b}
exports.A = A;
exports.B = B;
module.exports={A as a,B as b}        //as代表更换的名字
```
>第三种方式：
```ts
default export namespace A{}        //只能有一个默认导出
```
*export default 只能存在一个 导出不需要加{ }*
*export可以存在多个 导出一定要加{ }*

***导入***
```ts
import {A ,B} from "../"                //从..导入A，B
require '../../../../../'               //相当于import * as from ‘ ’
```

# 类装饰器
*类装饰器表达式会在运行时当做函数被调用，类的构造函数作为其唯一的参数*

*如果类装饰器返回一个值，它会使用提供的构造函数来替换类的声明*
```ts
function logClass(target:any){
    console.log(target)
    return class extends target{
        apiUrl:any="我是修改后的apiUrl";
        getData(){
            this.apiUrl=this.apiUrl+'-----';
            console.log(this.apiUrl)
        }
    }
}

@logClass
class HttpClient{
    public apiUrl:string;
    constructor(){
        this.apiUrl='我是构造函数里的apiUrl'
    }
    getData(){
        console.log(this.apiUrl)
    }
}
let tp1 = new HttpClient();
tp1.getData()
```

### 属性装饰器
*属性装饰器表达式会在运行时当做函数被调用*

+ 传入两个参数：
    + 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
    + 成员名字

```ts
function logClass(target:any){
    console.log(target)
    return class extends target{
        apiUrl:any="我是修改后的apiUrl";
        getData(){
            this.apiUrl=this.apiUrl+'-----';
            console.log(this.apiUrl)
        }
    }
}
function logProperty(params:any){
    return function(target:any,attr:any){
        console.log(target,attr);           //构造函数和成员名字
        target[attr]=params;
    }
}
@logClass
class HttpClient{
    @logProperty('www.baidu.com')
    public apiUrl:string;
    constructor(){
        this.apiUrl='我是构造函数里的apiUrl'
    }
    getData(){
        console.log(this.apiUrl)
    }
}
let tp1 = new HttpClient();
tp1.getData()
```

### 方法装饰器
*方法装饰器表达式会在运行时当作函数被调用，传入下列3个参数：*

+ 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
+ 成员的名字。
+ 成员的属性描述符。

```ts
function logMethod(params:any){
    //第一种使用
    return function(target:any,methodName,desc:any){
        //修改属性
        target.apiUrl = 'xxx'
        //修改方法
        target.run= function() {
            console.log("run")
        }
    }
    ---------------------------
    //第二种使用

    //保存原来的方法
    let oMethod=desc.value
    //替换方法(替换原来的方法)
    desc.value=function(...args:any[]) {
        args=args.map(value=>{
            return string(value)
        })
        //若想保留原来的方法
        oMethod.apply(this, args)
    }
}
class HttpClient{
    public apiUrl:string;
    constructor(){
        this.apiUrl='我是构造函数里的apiUrl'
    }
    @logMethod('')
    getData(){
        console.log(this.apiUrl)
    }
}
let tp1 = new HttpClient();
tp1.getData()

***装饰器注意点***
+ 执行顺序： 属性 > 方法 > 方法属性 > 类
+ 如果有多个相同的装饰器，则可叠加，顺序从下到上(逆序)