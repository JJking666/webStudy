// //数组
// let arr1:number[] = [1,2,3];             //1
// let arr2:Array<number> = [1,2,3];        //2
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// // 元组
// let x: [string, number] ;
// // Initialize it
// x = ['hello', 10]; // OK
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
// function logClass(target) {
//     //console.log(target)
//     return /** @class */ (function (_super) {
//         __extends(class_1, _super);
//         function class_1() {
//             var _this = _super !== null && _super.apply(this, arguments) || this;
//             _this.apiUrl = "我是修改后的apiUrl";
//             return _this;
//         }
//         class_1.prototype.getData = function () {
//             this.apiUrl = this.apiUrl + '-----';
//             //console.log(this.apiUrl)
//         };
//         return class_1;
//     }(target));
// }
// function logProperty(params) {
//     return function (target, attr) {
//         //console.log(target,attr,1,params);
//         target[attr] = params;
//         //console.log(target)
//     };
// }
// function logMethod(params) {
//     return function (target, attr, dec) {
//         console.log(target); //构造函数
//         console.log(attr); //成员名字
//         console.log(dec); //成员的属性描述
//         target.apiUrl = '222222'; //扩展属性
//         target.talk = function () {
//             console.log("修改后的getdata");
//         };
//     };
// }
// var HttpClient = /** @class */ (function () {
//     function HttpClient() {
//         this.apiUrl = '我是构造函数里的apiUrl';
//     }
//     HttpClient.prototype.getData = function () {
//         console.log(this.apiUrl);
//     };
//     __decorate([
//         logProperty('www.baidu.com')
//     ], HttpClient.prototype, "apiUrl", void 0);
//     __decorate([
//         logMethod('3')
//     ], HttpClient.prototype, "getData", null);
//     HttpClient = __decorate([
//         logClass
//     ], HttpClient);
//     return HttpClient;
// }());
// var tp1 = new HttpClient();
// console.log(tp1.apiUrl, 1);
// tp1.getData();
const dp = new Array(10).fill(0)
console.log(dp)
dp.forEach((item,index) => {dp[index] = new Array(5).fill(0)})
console.log(dp)