// //数组
// let arr1:number[] = [1,2,3];             //1
// let arr2:Array<number> = [1,2,3];        //2
// console.log(1122112)

// // 元组
// let x: [string, number] ;
// // Initialize it
// x = ['hello', 10]; // OKts
// // Initialize it incorrectly
// // x = [10, 'hello']; // Error


// //枚举
// enum Color {Red, Green, Blue}
// let c: Color = Color.Green;         //1



// //函数重载
// function fn(param1:String):void
// function fn(param1: number):void
// function fn(param1: any):any {
//     if(typeof param1 !== "number")return "string"
//     else return "number"
// }
// console.log(fn('a'))

// //类的继承
// //使用extends super()
// class Parent1 {
//     public name:string;

//     constructor(name:string){
//         this.name = name
//     }

//     say(){
//         return this.name+" say!"
//     }
//     getName():string {
//         return this.name
//     }
//     setName(name:string){
//         this.name = name
//     }
// }

// class Son1 extends Parent1{
//     constructor(name:string){
//         super(name);
//     }
//     //可添加自己的方法
//     work(){
//         return this.name+" work!"
//     }
//     //重写父类的方法
//     say(){
//         return this.name+" nosay!"
//     }
// }


// //class 修饰符
// //public 类，子类，类外
// class Person1 {
//     public name:string;

//     constructor(name:string){
//         this.name = name
//     }

//     getName():string {
//         return this.name
//     }
//     setName(name:string){
//         this.name = name
//     }
// }
// class Son_1 extends Person1{
//     constructor(name:string){
//         super(name);
//     }
//     //可添加自己的方法
//     work(){
//         return this.name+" work!"
//     }
//     //重写父类的方法
//     say(){
//         return this.name+" nosay!"
//     }
// }
// let p1 = new Person1('mch');
// let s1 = new Son_1('cy')
// console.log("public")
// console.log(p1.name)                        //类外
// console.log(p1.getName())                   //类内
// console.log(s1.getName())                   //子类
// console.log(s1.work())                      //子类添加方法
// console.log(s1.getName())                   //子类重写父类方法

// //protected
// class Person2 {
//     protected name:string;

//     constructor(name:string){
//         this.name = name
//     }

//     getName():string {
//         return this.name
//     }
//     setName(name:string){
//         this.name = name
//     }
// }
// class Son_2 extends Person2{
//     constructor(name:string){
//         super(name);
//     }
//     //可添加自己的方法
//     work(){
//         return this.name+" work!"
//     }
//     //重写父类的方法
//     say(){
//         return this.name+" nosay!"
//     }
// }
// let p2 = new Person2('mch');
// let s2 = new Son_2('cy')
// console.log("public")
// console.log(p2.name)                        //类外报错
// console.log(p2.getName())                   //类内
// console.log(s2.getName())                   //子类

// //private
// class Person3 {
//     private name:string;

//     constructor(name:string){
//         this.name = name
//     }

//     getName():string {
//         return this.name
//     }
//     setName(name:string){
//         this.name = name
//     }
// }
// class Son_3 extends Person3{
//     constructor(name:string){
//         super(name);
//     }
//     //可添加自己的方法
//     work(){
//         return this.name+" work!"           //子类报错
//     }
//     //重写父类的方法
//     say(){
//         return this.name+" nosay!"          //子类报错
//     }
// }
// let p3 = new Person3('mch');
// let s3 = new Son_3('cy')
// console.log("public")
// console.log(p3.name)                        //类外报错
// console.log(p3.getName())                   //类内
// console.log(s3.getName())                   //子类



// interface Animal{
//     name:string;
//     eat(str:string):void;
// }
// class Dog implements Animal{
//     name
//     constructor(name:string){
//         this.name = name;
//     }
//     eat(){
//         console.log(this.name+"eating")
//     }
// }


// interface MDB<T>{
//     add(obj:T):void;
//     get(obj:T):void;
//     delete(obj:T):void;
//     change(obj:T):void;
// }

// class Mysql<T> implements MDB<T>{
//     add(obj: T): void {
//         console.log("Mysql add"+JSON.stringify(obj))
//     }
//     delete(obj: T): void {
//         console.log("Mysql delete"+obj)
//     }
//     change(obj: T): void {
//         console.log("Mysql change"+obj)
//     }
//     get(obj:T){
//         console.log("Mysql get"+obj)
//     };
// }

// class Mongo<T> implements MDB<T>{
//     add(obj: T): void {
//         console.log("Mongo add"+ JSON.stringify(obj))
//     }
//     delete(obj: T): void {
//         console.log("Mongo delete"+obj)
//     }
//     change(obj: T): void {
//         console.log("Mongo change"+obj)
//     }
//     get(obj:T){
//         console.log("Mongo get"+obj)
//     };
// }

// interface User1{
//     id:number,
//     name:string,
//     sex:string,
//     password:string
// }

// class User implements User1{
//     id: number
//     name: string
//     sex: string
//     password: string
//     constructor(params:{id: number, name: string, sex: string, password:string}) {
//         this.id=params.id;
//         this.name=params.name;
//         this.sex=params.sex;
//         this.password=params.password;
//     }
// }

// let user1:User1 = new User({
//     id:1,
//     name: "mch",
//     sex:"man",
//     password: "222"
// })

// let mdb:MDB<User1> = new Mysql<User1>();
// mdb.add(user1);
// mdb.delete(user1);

//
// function logClass(target:any){
//     //console.log(target)
//     return class extends target{
//         apiUrl:any="我是修改后的apiUrl";
//         getData(){
//             this.apiUrl=this.apiUrl+'-----';
//             //console.log(this.apiUrl)
//         }
//     }
// }
// function logProperty(params:any){
//     return function(target:any,attr:any){
//         //console.log(target,attr,1,params);
//         target[attr]=params;
//         //console.log(target)
//     }
// }
// function logMethod(params:any){
//     return function(target:any,attr:any,dec:any){
//         console.log(target)                     //构造函数
//         console.log(attr)                       //成员名字
//         console.log(dec)                        //成员的属性描述
//         target.apiUrl='222222'                  //扩展属性
//         target.talk=function(){                 //扩展方法
//             console.log("修改后的getdata")
//         }
//     }
// }
// @logClass
// class HttpClient{
//     @logProperty('www.baidu.com')
//     public apiUrl:string;
//     constructor(){
//         this.apiUrl='我是构造函数里的apiUrl'
//     }
//     @logMethod('3')
//     getData(){
//         console.log(this.apiUrl)
//     }
// }
// let tp1 = new HttpClient();
// console.log(tp1.apiUrl,1)
// tp1.getData()
// interface SearchFunc {
//     n(source: string, subString: string):boolean ,
//     s: string,
//     a: string
// }
// let p:SearchFunc ={n:()=>{},s:'12',a:'21'}
// p.n = (a:string,b:string):boolean =>{
//     return true
// }
// p.s='1',p.a='2'






// console.log([]==[])         //false

// let a = [1,2,3]
// a[10]=10
// let b = a.filter((item)=>item == null)      //[]
// console.log(null == undefined)              //true

// let c = new Object()
// console.log(typeof c ,typeof typeof c)

// let d = new String('h')         //输出1111
// switch(d){
//     case 'g':
//         console.log('g');
//         break;
//     case 'h':
//         console.log('h');
//         break;
//     default:
//         console.log('1111')
// }

// for(var i = 0; i < 5; i++){
//     setTimeout(function(){
//         console.log(i)
//     },200)
// }
// console.log('end,'+i)
// //end,5
// //5*5

// + 用 typeof obj === 'object' 来判断obj是否为对象，有什么弊端
// typeof null === 'object'         //js的bug

// typeof 能识别number string boolean object symbol undefined function！
// typeof会返回一个变量的基本类型，instanceof返回的是一个布尔值

// instanceof 可以准确地判断复杂引用数据类型，但是不能正确判断基础数据类型

// 而typeof 也存在弊端，它虽然可以判断基础数据类型（null 除外），但是引用数据类型中，除了function 类型以外，其他的也无法判断

// 可以看到，上述两种方法都有弊端，并不能满足所有场景的需求

// 如果需要通用检测数据类型，可以采用Object.prototype.toString.call(obj)，调用该方法，统一返回格式“[object Xxx]”的字符串

// 如果我们想要判断一个变量是否存在，可以使用typeof：(不能使用if(a)， 若a未声明，则报错)
// if(typeof a != 'undefined'){
//     //变量存在
// }

// undefined 是声明后为定义 not defined是未声明未定义

//父子组件生命周期顺序
// 父 beforeCreate
// 父 created
// 父 beforeMount
// 子 beforeCreate
// 子 created
// 子 beforeMount
// 子 mounted
// 父 mounted

// + watch中immediate表示firstName声明后立即调用一次
// + watch中对象只能监听其被重复赋值，如果要监听属性则用obj['xx']
// ```ts
// watch: {
//     firstName: {
//      handler(newName, oldName) {
//       this.fullName = newName + ' ' + this.lastName;
//      },
//      // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
//      immediate: true,
//      deep: true
//     }
//    }
// ```

// watch和computed各自处理的数据关系场景不同
// watch擅长处理的场景：一个数据影响多个数据
// computed擅长处理的场景：一个数据受多个数据影响

// computed()执行在beforeMount和mounted之间，故数据不能在beforeMount前获取

// $nextTick({}) 用在数据发生改变，页面重新渲染，渲染完成后自动调用该回调函数

// 定义全局总线
// //main.js
// Vue.prototype.$bus = new Vue()
// //xxx.vue
// this.$bus.$on('event',func)
// //yyy.vue
// this.$bus.$emit('event',data)

//
// type Point = { x: number; y: number };
// type P = keyof Point; //p的值可以为 'x' | 'y'
// const a:P = 'x';
// const b:P = 1; //Type '1' is not assignable to type 'keyof Point'.ts(2322)

type Point = any&number
type Poin1t = unknown&any