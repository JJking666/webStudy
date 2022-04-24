### 无法使用scrollto函数解决方案;
```ts
html{
    width:100%;
    height:auto;
    overflow-y: scroll;
}
body{
    overflow-y: scroll;
}
```

### 字体变色
```css
background-image: -webkit-linear-gradient(45deg,#f35626,#feab3a);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-animation: hue 6s infinite linear;
}
@-webkit-keyframes hue {
    from {
        -webkit-filter: hue-rotate(0deg);
    }
    to {
        -webkit-filter: hue-rotate(-360deg);
    }
}
```

### 页面随鼠标滚动
```ts
window.onload = function() {
    window.addEventListener('mousewheel',scrollFunc);
}
var scrollFunc = function (e) {
    var a=document.querySelector(".big");
    var a_height=a.offsetHeight;
    e = e || window.event;

    if (e.wheelDelta) {  //判断浏览器IE,谷歌滑轮事件
        if (e.wheelDelta > 0) { //当滑轮向上滚动时
            handle(e.wheelDelta)
        }
        if (e.wheelDelta < 0) { //当滑轮向下滚动时
            handle(e.wheelDelta)
        }
    } else if (e.detail) {  //Firefox滑轮事件
        if (e.detail > 0) { //当滑轮向下滚动时
            handle(e.wheelDelta)
        }
        if (e.detail < 0) { //当滑轮向上滚动时
            handle(e.wheelDelta)
        }
    }
}
//上下滚动时的具体处理函数
function handle(delta) {
    var a=document.querySelector(".big");
    var a_height=a.offsetHeight;
    if (delta < 0) {//向下滚动
        if(window.pageYOffset<5*a_height)
            window.scrollBy(0,0.83*a_height);
    }
    else {//向上滚动
        window.scrollBy(0,-0.83*a_height);
    }
}
```

#### 导入Vue
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

#### 导入axjx：
<script src="https://unpkg.com/axios/dist/axios.min.js"> </script>

#### 解决a标签点击事件失败:
<a href="javascript:"  @click="ck1('北京')">北京</a>

### Vue阻止冒泡和阻止默认事件
```ts
@click.prevent
@click.stop
@click.prevent.stop
```

#### 创建节点插入节点
```ts
var p = document.createElement("input"); //创建需要添加的类型的节点
p.placeholder = "段落三(添加的内容)";
ocument.body.appendChild(p);
```

+ V-html和v-text 前者可以解析标签后者不行
+ v-on添加属性
+ v-cloak 网络慢时让标签延后显示
```css
[v-cloak]{
            display: none;
        }
```

+ V-for 将vue实例中列表导入li中
+ v-bind 动态属性绑定
+ v-model 数据双向绑定
+ v-once 数据只能初始化一次 之后不改变
+
+ 没有插值等标签加入v-pre 加快编译
+
+ 给对象添加属性this.$set(xxx,’isEdit’,false)

+ 判断组件有无该属性：hasOwnproperty(‘ xxx’ ) 注意判断原型链上的属性为false


+ $nextTick(function(){})dom 结点更新后回调执行（下一轮更新）


### Vue 动态绑定class
```ts
<el-submenu :index="item.id" v-for="item in indexList" :key="item.id">
    <template slot="title">
      <i :class=item.icon></i>
      <span>{{item.name}}</span>
    </template>
```

### Vue 本地存储对象时（无法正常存储对象）
```ts
if (!window.sessionStorage.getItem("tableData")){
      const Data=JSON.stringify(this.tableData);
      window.sessionStorage.setItem("tableData",Data);
      }
    else {
      const Data1=JSON.parse(window.sessionStorage.getItem("tableData"));
      this.tableData =Data1;
      this.handleCurrentChange(1);
    }
```

+ for in遍历包含对象的数组 const index in this.tableData
  + Index代表索引 注意会遍历原型链上的属性
+ for of遍历对象的数组 const data of this.tableData
  + data代表每一项对象数据
+ Js 数组删除元素使用splice（index,num）;
  + 若使用delete（index）只会使其变为undefined

+ Vue2的v-for无法检测到数组和对象的变化,如以下删除数组中元素不会刷新视图,可以使父组件重新渲染的方法让他重新渲染DOM。



+ 组件css修改,由于style加上scoped无法是页面修改,可以使用父元素类名+/deep/+子元素类名或者使用::v-deep


### Vue表单数据及规则属性名应相同,否则会匹配规则一直报错未输入。
```ts
shopData:{
          name:'1',
          price: '2',
          weight: '3',
          num: '4',
          form:''
        },
        rules: {
          name: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
            { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
          ],
          price: [
            { type: 'date',required: true, message: '请输入商品价格', trigger: 'blur' }
          ],
          weight: [
            { type: 'date', required: true, message: '请输入商品数量', trigger: 'blur' }
          ],
          num: [
            { type: 'date', required: true, message: '请输入商品分类', trigger: 'blur' }
          ]}
      };

```

+ Nodejs 在app.js使用其他模块方法时,路径以app为主。
+
+ 组件若子元素被父元素遮挡,找到对应块的class修改overflow:visiable;
+
+ 背景图片平铺background：url(),完全平铺background-size：100%;
+
+ Li::before 伪元素是文本,修改颜色用color

### 竖型图片轮播图
*Animation：（思路：轮播第二张和第三张图片,第一章设置为第三张图片,第一张从原始地方开始向上不循环,而第二第三张图片从底下轮播到最上,并且不断循环,形成轮播）*
```css
@keyframes moveImg1{
  0%{
    z-index:1;
    transform:translateY(0px);
  }
  99%{
    transform:translateY(-450px);
  }
  100%{
    transform:translateY(-470px);
    z-index: 99;
  }
}
@keyframes moveImg2{
  0%{
    z-index: 99;
    transform:translateY(400px);
  }
  100%{
    z-index: 999;
    transform:translateY(-450px);
  }
}
@keyframes moveImg3{
  0%{
    z-index: 99;
    transform:translateY(400px);
  }
  100%{
    z-index: 999;
    transform:translateY(-450px);
  }
}
```
//js思路不断向上移,到最顶之后隐藏自身回到下方,注意使用transition变滑动
```ts
let img1= document.querySelector('#movei1');
    //let img2=document.querySelector("#movei2");
    let imgTop;
    img1.style.marginTop=400+'px';
    setInterval(() => {
      img1.style.display="inline-block";
      imgTop =img1.style.marginTop.slice(0,-2);
      imgTop = parseInt(imgTop)-20;
      img1.style.marginTop=imgTop+'px';
      //console.log(img1.style.marginTop);
      if(parseInt(imgTop)<=-520){
        img1.style.marginTop=400+'px';
        img1.style.display="none";
      }
}, 100);
//css
transition: all 0.1s linear;
```

### 可输入下拉框（自动搜索关键词）
```ts

<input list="browsers" name="">
<datalist id="browsers">
  <option value="Internet Explorer">
  <option value="Firefox">
  <option value="Chrome">
  <option value="Opera">
  <option value="Safari">
</datalist>
<input type="submit">
```

### 改变图片背景
```ts
///将背景为黑色图片变成#333颜色
background-image: url($img), linear-gradient(#333, #333);
background-blend-mode: lighten;	//黑色背景用lighten白色用darken
```
- vertical-align: middle;     //水平对齐

## token
+ Token是服务端生成的一串字符串,以作客户端进行请求的一个令牌,
+ 当第一次登录后,服务器生成一个Token便将此Token返回给客户端,以后客户端只需带上这个Token前来请求数据即可,无需再次带上用户名和密码
+ 减少服务器查询数据库,减轻压力
+ refreshtoken可理解为token备胎,使用期更长,在token过期是替代token进行访问
+ token一般保存在vuex中,且保存于localStorage,同时refreshtoken保存于vuex
+ 当token在服务器过期,那么会使用refreshToken代替token进行访问接口,之后获取新的token

## 权限管理
+ 判断是否有 AccessToken 如果没有则跳转到登录页面
+ 向后端发送请求,获取用户信息和权限
+ 获取成功后根据用户信息构建出过滤好权限的路由(src/store/modules/permission.js)
+ 将构建的路由利用 Vue-Router 提供的动态增加路由方法 router.addRoutes 加入到路由表中
+ 加入路由表后将页面跳转到用户原始要访问的页面,如果没有 redirect 则进入默认页面 (/dashboard/workplace)

## {$t} 项目vue文件中将会把中文字符的数量拉至最低,且防止修改时需要全局找文字
+ 将内容放在一个local目录下文件中
+ 在src/main.js中导入import i18n from './lang'
+ <span>{{ $t('header.HeadMenu.logout') }}</span>
```ts
export default {
  'form.basic-form.basic.title': '基础表单',
  'form.basic-form.basic.description':
    '表单页用于向用户收集或验证信息,基础表单常见于数据项较少的表单场景。',
  'form.basic-form.title.label': '标题',
}
```
+ 调用时{{ $t('dashboard.analysis.channel.stores') }}


## 权限路由
+ 前端登录后获取用户的权限表
+ 以权限表获取对应的路由

+ 在网页关闭之前弹窗
window.onbeforeunload

+ 父传子props可以是数据也可以是方法
+ this.$emit和this.$on只能子传父
+ 使用ref简单实现父拿到子的数据或者调用子方法（推荐）
```ts
 <child ref='child'></child>
console.log(this.$refs.child.msg)
this.$refs.child.do()
```
+ 用$parent和$children 可以调用组件数据或方法//vue3弃用
```ts
this.$children[0].childMethod()
console.log(this.$children[0].msg)
```
+ provide和inject 可跨组件 父与子之间通信

## 表单同步计算百分比
+ 注意点
 + mounted初始化的值computed取不到，因为mounted在computed后初始化
 + 且computed无法setTimeout异步返回值
 + 执行生命周期顺序 created beforemounted computed mouted
+ 使用方法
 + 初始化时可在mouted里面setTimeout（可取到表单值）
 + 之后输入值更新 调用更新函数获取新值（注意异步执行否则输入框change时取到的表单未更新）
```ts
mounted() {
    setTimeout(() => {
      this.updateWeight()//初始化和更新百分比
    }, 500)
},

```

##  组件在步骤条中被预加载,无法实时使用mounted更新数据
+ 可以设置步骤条上一页点击后调用这一页的mount函数

+ 在行内调用方法或数据不需要this.

## 表单
+ 获取数据和设置数据都是使用api
+ 添加删除表单,则创建表单对象并加入数组中

## 表格
+ 使用内置分页器
```ts
//a-table里
:pagination="pagination"
@change="pageChange()"//换页触发
//data里
pagination: {
current:1,//v-model
				pageSize: 5, // 默认每页显示数量
				showTotal: total => `Total ${total} items`, // 显示总数
				onChange: (current, pageSize) => {this.pageSize = pageSize;this.page=current}, // 改变每页数量时更新显示注意on！！
			},
//若要手动修改current,则在onChange中this.pagination.current=current
```

+ 当使用一个变量的方法时,若变量可能不存在,那么可以使用item&&item.toString()
+ 当变量赋值时,但赋值的变量不一定存在,最好使用res = item || ‘’
+ 使用数组排序时,需要加入排序函数function (a, b) { return a-b} （从小到大）,否则失效会按字典顺序如111在12前面
+ 想给组件库方法或默认方法添加新参数,直接加在后面会导致参数被覆盖,加在前面原来的参数会被覆盖,此时应该将原来的参数设置为$event,在添加新参数

+ 导入子组件时(如data-picker中分类的range-picker,week-picker)
	+ 直接导入data-picker,因为data-picker的index中导入包含了range-picker
	+ 且不需要再全局注册,因为index下已经全局注册过了
	+ 导入即可
```ts
import dataPicker from 'ant-design-vue/es/date-picker'
```
+ 按需导入组件时,现在依赖中找到ant-design-vue下的组件,然后引入该组件之后全局注册,最后导入其css样式
```ts
Vue.component( 'a-cascader',Acascader)
import Acascader from 'ant-design-vue/lib/cascader'
import 'ant-design-vue/lib/cascader/style'
```
+ 路由菜单点击一个其他也出现点击效果,则检查路径名是否相同,修改即可

+ 请求中body则是data,query则是params（对象）,{id}则是在路径中末尾加上id

+ 若select选择器中不显示placeholder,则将初始值设置为空数组
css中可以使用attr返回该元素的属性值,如
```ts
<a href="//www.runoob.com" title="123">菜鸟教程</a>
content：“attr(title)”	则content会变成:123
```
+ 设置对象和值时,若对象名和值名相同可省略:值名,另外对象名为对象的属性也可,例obj.xx:obj.xx->obj.xx

+ 使用for in 可遍历对象属性
## 数组的深拷贝：
+ for循环
+ slice 截取并返回一个新数组
+ concat 连接并返回一个新数组
+ let [...arr2] = arr//arr2= [...arr]

## 模糊查询
```ts
//mongoose中
let a=new RegExp(data.data);
		let d={
			Account:a
		}
	return userModel.find(d)
```

## qs
```
//js
let r = {
	data: that.inputValue
}
let d = this.$qs.p(r)
uni.request({
		url: 'http://120.1:3000/uqueryUser1',
		data: d
	})
//route
app.get('/user/queryUser1',(req,res)=>{
		let data = req.query;
		console.log("b",data)
		userAction.queryUser1(req,res,data)
	})
//db
```

## 浅拷贝
+ 展开语法和 Object.assign() 行为一致, 执行的都是浅拷贝(深拷贝只有第一层)
即第一层基本类型是没有引用关系(重新给对象赋值也是深拷贝）,但第一层的对象里的内容有引用关系
+ object.create 原型链继承,也可以达到内容浅层拷贝。且可拷贝get和set
+ array.filter和array.map和array.from都是第一层深拷贝,对象里层是浅拷贝
```ts
let a = { foo: 'bar',aaa:[1,2,3]}   //第一层foo和aaa是深拷贝
let b = {}                          //第二层'bar'是基本数据类型，[1,2,3]是数组保持引用则是浅拷贝
Object.assign(b,a)
b.foo = 'bar1'
b.aaa[0]=4
console.log(a,b)
//{ foo: 'bar', aaa: [ 4, 2, 3 ] }
//{ foo: 'bar1', aaa: [ 4, 2, 3 ] }
```

## 深拷贝
that.recordData=JSON.parse(JSON.stringify(that.firstRecord))
//注意主份深拷贝给备份,备份赋值会给主份时也要深拷贝,否则重新指向同一个指针
//注意对象中的Function和undefined 无法拷贝
//深拷贝
```ts
var json1={"name":"鹏哥","age":18,"arr1":[1,2,3,4,5],"string":'afasfsafa',"arr2":[1,2,3,4,5],"arr3":[{"name1":"李鹏"},{"job":"前端开发"}]};
var json2={};
function copy(obj1,obj2){
  var obj2=obj2||{}; //最初的时候给它一个初始值=它自己或者是一个json
  for(var name in obj1){
    if(typeof obj1[name] === "object"){ //先判断一下obj[name]是不是一个对象
      obj2[name]= (obj1[name].constructor===Array)?[]:{}; //我们让要复制的对象的name项=数组或者是json
      copy(obj1[name],obj2[name]); //然后来无限调用函数自己 递归思想
    }else{
      obj2[name]=obj1[name];  //如果不是对象,直接等于即可,不会发生引用。
    }
  }
  return obj2; //然后在把复制好的对象给return出去
}
json2=copy(json1,json2)
```


## 最简单前后端接口
```ts
//js
let data = {
	UserID:this.id,
	_id:this.planData[index]._id,
	finish:this.planData[index]['finish']
}
//注意data必须是对象
uni.request({
	url:'http://127.0.0.1:3000/plan/changeFinish',
	data:data
})
//在postman中
//假设
let data= {
	UserID:this.id,
	_id:this.planData[index]._id,
	finish:this.planData[index]['finish']
}
则在参数中要
UserID       this.id
_id 	 this.planData[index]._id
finish	 this.planData[index]['finish']
```
```ts
//route
app.get('/plan/changeFinish',(req,res)=>{
		let data = req.query;
		console.log('f',data)
		planAction.changeFinish(req,res,data)
	})

//imp
changeFinish: (data) => {
		let ID1={
			UserID:data.UserID,
			_id:data._id
		}
		let F={
			finish:JSON.parse(data.finish)
		}
		console.log(3,ID1,F)
		return planModel.updateOne(ID1,F)
		.then(data => data)
		.catch(err => console.log(err))
	},

```
```ts
// 根据元素长度设置父元素长度（如swiper中swiper父元素需要设置固定长度）
let element = "#content-wrap" + this.currentIndex;
      let query = uni.createSelectorQuery().in(this);
      query.select(element).boundingClientRect();
      query.exec((res) => {
        if (res && res[0]) {
          this.swiperHeight = res[0].height;
        }
      });
//注意该操作是异步,若要对计算后的长度进行判断要加入settimeout
```
+ swiper动态使用固定长度,不需要修改swiper-item长度,负责白屏

+ 在数据库修改删除后,想要页面获取新数据,可以在数据库执行更新数据后再获取数据返回
```ts
return workModel.deleteOne(data)
			.then(data => {
				return workModel.find()
			})
			.catch(err => console.log(1,err))
```

## 遇到事件(如果移动事件)默认带参数如event,若想加上参数则用@change="change($event,index)"

## 给多个editor组件设置初始值
```ts
uni.createSelectorQuery().select('#editor'+index).context((res) => {
//获取实例
					this.editorCtx = res.context
//设置内容
					this.editorCtx.setContents({
						html:that.handAccountData[index].Text
					})
				}).exec()
```
+ 将数据库中_id的数据类型变更
```ts
db.User.find({_id:{$type:2}}).forEach(function(doc){
  var oldid = doc._id;
  doc._id = new ObjectId(doc._id);
  db.User.insert(doc);
  db.User.remove({_id: oldid});
});
```
## new Function(a,b,c)
+ 参数中除了最后一个c,其他都是参数,c是函数体
+ 如new Function('a','b','return a+b')
+ new Function()可以防止闭包获取数据,因为其**词法环境与一般函数不同,不是引用当前词法环境,而是全局环境**
+ 实践中使用有奇效
```ts
let value ='go'
function getFunc() {
  let value = "test";
  let func = new Function('alert(value)');
  return func;
}
getFunc()(); // go
```
```ts
function getFunc() {
  let value = "test";
  let func = function() { alert(value); };
  return func;
}
getFunc()(); // "test", 来自getFunc的词法环境
```

## uniapp接口
+ 第一种需要注意数据是否符合json格式
```ts
uni.request({
   url:'***?data='+id
})
```
后端获取数据data就是传入的
+ 第一种需要注意数据是否符合json格式,有时候要用到格式转换
+ let objData =(new Function("","return "+data))();
```ts
uni.request({
	url: 'http://120.76.138.164:3000/relationship/queryRelationship?data=' +
	'{"UserID":"' + option.ID + '","status":[1,2]}'
})
data= JSON.parse(data)
		let data1= {
			UserID:data.UserID,
			status:{$in:data["status"]}
		}
		return relationshipModel.find(data1)
			.then(data => data)
			.catch(err => console.log(err)
```
+ 第二种比较简单易懂
```ts
let data1 ={
	id:'',
	num:''
}
uni.request({
	url: 'http://120.76.138.164:3000/relationship/queryRelationship' ,
	data:data1
})
		let data1= {
			UserID:data.id,
			num:data.num
		}
		return relationshipModel.find(data1)
			.then(data => data)
			.catch(err => console.log(err)
```
+ 更好的封装
//如更新数据需要两个{},搜索条件和修改内容
```ts
let data0 ={
	data1:{
		id:'',
		name:''
	},
	data2:{
		status:''
	}
}
uni.request({
	url: 'http://120.76.138.164:3000/relationship/queryRelationship' ,
	data:data0
})
		return relationshipModel.find(data0.data1,data0,data2)
			.then(data => data)
			.catch(err => console.log(err)
```
+ 使用解构赋值效果更佳

+ swiper和scroll-view同时使用导致滑动冲突使用@touchstart.stop=""

+ splice追加数组元素
	++ 前插入 splice(index,0,1)
	++ 后插入 splice(index+1,0,1)

+ 可用于对data的值进行替换或赋值
```ts
Object.assign(this, {
        tags,
        inputVisible: false,
        inputValue: '',
      })
```

+ module exports和exports是CommonJs规范引入,export和default export是es6规范导入,前两者用require引入
```ts
//引入
let a = require('xxx')
//使用a里引入的变量
console.log(a.haha)
//导入
import {a} from 'xxx'	//使用default则不需要花括号否则需要加上
```

+ <a href="/XXXX"  target="_blank" >打开新的网页</a>
+ _blank	在新窗口中打开被链接文档。
+ _self	默认。在相同的框架中打开被链接文档。
+ _parent	在父框架集中打开被链接文档。
+ _top	在整个窗口中打开被链接文档。
+ framename	在指定的框架中打开被链接文档。

+ 域名、端口相同,协议不同,属于相同的域(错)
+ js可以使用jsonp进行跨域（对）
+ 通过修改document.domain来跨子域（对）
+ 使用window.name来进行跨域（对）

```ts
function Foo() {
    var i = 0;
    return function() {
        console.log(i++);
    }
}
var f1 = Foo(),
var f2 = Foo();
f1();
f1();
f2();
// 返回0 1 0
```
+ 火狐浏览器没有webkit内核

+ document.getElementById(”ID”).innerText //动态输出文本
+ document.getElementById(”ID”).innerHTML //动态输出HTML
+ document.getElementById(”ID”).outerText //同innerText
+ document.getElementById(”ID”).outerHTML //同innerHTML
```html
<p>hello world!<span>你好</span></p>
<script>
    var p = document.getElementsByTagName('p');//集合
    alert(p[0].innerHTML);//hello world!<span>你好</span>
    alert(p[0].outerHTML);//<p>hello world!<span>你好</span></p>
    alert(p[0].textContent);//hello world!你好
</script>
```

#### call 和bind 和apply对比
+ 若第一个参数为null,表示不改变this对象的绑定
+ call和bind的参数一致 第一个参数是绑定this的对象,第二个及之后的是调用方法的参数
+ apply的参数第一个是绑定this的对象,第二个是包含调用方法所有参数的数组
+ bind的返回值是一个新函数,其他无返回值

## document对象
+ document对象是文档的根节点,window.document属性就指向这个对象。也就是说,只要浏览器开始载入HTML文档,这个对象就开始存在了,可以直接调用。
+ document对象一般有两个子节点,第一个子节点是document.doctype,表示文档类型节点,代表<!DOCTYPE html>
+ 第二个子节点是document.documentElement,表示元素节点（Element）,代表：<html lang="en">。
+ document.title设置文档标题等价于HTML的\<title>标签
```ts
document.doctype // <!DOCTYPE html>
document.documentElement //返回文档的根节点 <html>...</html>
document.head // <head>...</head>
document.body // <body>...</body>
document.defaultView // window

document.querySelector('textarea').focus();
document.activeElement // <textarea>
```

+ 指向其他结点或对象的属性
  + document.all ：文档中所有的元素,Firefox不支持该属性。
  + document.forms ：所有的form元素。
  + document.images：所有的img元素。
  + document.links：所有的a元素。
  + document.scripts：所有的script元素。
  + document.styleSheets：所有的link或者style元素。

+ 对象方法
  + document.write()	动态向页面写入内容
  + document.createElement(Tag)	创建一个html标签对象
  + document.getElementById(ID)	获得指定ID值的对象
  + document.getElementsByTagName(tagname)	获得指定标签名的对象
  + document.getElementsByName(Name)	获得指定Name值的对象
  + document.getElementsByClassName(classname)	获得指定类名的对象
  + write()和writeln()方法：区别在于后者在传送到文档中的字符串末时附加一个回车符。
  + 有多个节点满足querySelector方法的条件,则返回第一个匹配的节点。
  + appendChild() 方法在节点的子节点列表末添加新的子节点。
  + insertBefore() 方法在节点的子节点列表任意位置插入新的节点
  + document.createElement()是在对象中创建一个对象,要与appendChild() 或 insertBefore()方法联合使用。

#### body
+ document.body //指定文档主体的开始和结束等价于body>/body>
+ document.body.bgColor //设置或获取对象后面的背景颜色
+ document.body.link //未点击过的链接颜色
+ document.body.alink //激活链接(焦点在此链接上)的颜色
+ document.body.vlink //已点击过的链接颜色
+ document.body.text //文本色
+ document.body.innerText //设置body>…/body>之间的文本
+ document.body.innerHTML //设置body>…/body>之间的HTML代码
+ document.body.background //背景图片
+ document.body.appendChild(oTag) //动态生成一个HTML对象
+
+ document.body.onclick=”func()” //鼠标指针单击对象是触发
+ document.body.onmouseover=”func()” //鼠标指针移到对象时触发
+ document.body.onmouseout=”func()” //鼠标指针移出对象时触发

#### 监听用户是否浏览页面
```ts
window.onblur = function () {
    console.log("失去焦点");
}
document.addEventListener('visibilitychange',function () {
    if (document.visibilityState === 'hidden') {
        console.log("选项卡切换");
    }
});
```

#### Notification 桌面通知
```ts
window.addEventListener('load', function () {
  // 首先,让我们检查我们是否有权限发出通知
  // 如果没有,我们就请求获得权限
  if (window.Notification && Notification.permission !== "granted") {
    Notification.requestPermission(function (status) {
      if (Notification.permission !== status) {
        Notification.permission = status;
      }
    });
  }

  var button = document.getElementsByTagName('button')[0];

  button.addEventListener('click', function () {
    // 如果用户同意就创建一个通知
    if (window.Notification && Notification.permission === "granted") {
      var n = new Notification("Hi!");
    }

    // 如果用户没有选择是否显示通知
    // 注：因为在 Chrome 中我们无法确定 permission 属性是否有值,因此
    // 检查该属性的值是否是 "default" 是不安全的。
    else if (window.Notification && Notification.permission !== "denied") {
      Notification.requestPermission(function (status) {
        if (Notification.permission !== status) {
          Notification.permission = status;
        }

        // 如果用户同意了
        if (status === "granted") {
          var n = new Notification("Hi!");
        }

        // 否则,我们可以让步的使用常规模态的 alert
        else {
          alert("Hi!");
        }
      });
    }
    // 如果用户拒绝接受通知
    else {
      // 我们可以让步的使用常规模态的 alert
      alert("Hi!");
    }
  });
});
```
show (en-US)当通知被显示给用户时触发。
click (en-US)当用户点击通知时触发。
close当通知被关闭时触发。
error (en-US)当通知发生错误的时候触发。这通常是因为通知由于某些原因而无法显示。


#### manifest web应用缓存
+ 应用程序缓存使得应用程序有三个优点：
  + 离线浏览 - 用户可以在离线时使用应用程序
  + 快速 - 缓存的资源可以更快地加载
  + 减少服务器加载 - 浏览器只从服务器上下载已更新/已更改的资源
+ <html manifest="URL">
+ 绝对 URL - 指向另一个网站（比如 href="http://www.example.com/demo.appcache"）
+ 相对 URL - 指向网站内的一个文件（比如 href="demo.appcache"）

#### 获取位置
```ts
var x=document.getElementById("demo");
function getLocation()
  {
  if (navigator.geolocation)
    {
    navigator.geolocation.getCurrentPosition(showPosition);
    }
  else{x.innerHTML="Geolocation is not supported by this browser.";}
  }
function showPosition(position)	//返回经纬度
  {
  x.innerHTML="Latitude: " + position.coords.latitude +
  "<br />Longitude: " + position.coords.longitude;
  }
```

+ web worker 是运行在后台的 JavaScript,不会影响页面的性能

### WebSocket
+ WebSocket是典型的应用层协议
+ WebSocket 是 HTML5 开始提供的一种在单个 TCP 连接上进行全双工通讯的协议。
+ WebSocket 使得客户端和服务器之间的数据交换变得更加简单,允许服务端主动向客户端推送数据。在 WebSocket API 中,浏览器和服务器只需要完成一次握手,两者之间就直接可以创建持久性的连接,并进行双向数据传输。
+ 在 WebSocket API 中,浏览器和服务器只需要做一个握手的动作,然后,浏览器和服务器之间就形成了一条快速通道。两者之间就直接可以数据互相传送。
+ 支持持久连接,http协议不支持持久性连接（长连接,循环连接的不算）。Http1.0和HTTP1.1都不支持持久性的链接,HTTP1.1中的keep-alive,将多个http请求合并为1个,也就是不用再去重复建立TCP连接了。
+ 极大的节省了网络带宽资源的消耗,有明显的性能优势,且客户端发送和接受消息是在同一个持久连接上发起,实时性优势明显。
+ 一般应用于
  + 应用提供多个用户相互交流吗？
  + 应用是展示服务器端经常变动的数据吗？

### hash
+ hash 路由：监听 url 中 hash 的变化，然后渲染不同的内容，这种路由**不向服务器发送请求**，**不需要服务端的支持**；
+ history 路由：监听 url 中的路径变化，需要客户端和服务端共同的支持；
+ 页面中的 hash 发生变化时，会触发hashchange事件
+ 优点:
  + 不需要依赖后端
  + 修改url不需要发送请求
  + 兼容ie
+ 缺点
  + 不美观
  + 不利于seo

### history
+ 浏览历史(history对象)出现变化时，就会触发popstate事件，但pushState()方法和replaceState()方法不会触发该事件
+ history.length是history栈中的数量
+ window.history.back();	//返回上一个页面
+ window.history.go(-1);	//返回上一个页面
+ window.history.forward();	//回到上一个页面
+ history.go(0)		//相当于刷新当前页面
+ 返回上一页时,页面通常是从浏览器缓存之中加载,而不是重新要求服务器发送新的网页。
+ history.pushState方法接受三个参数,依次为：
  + state：一个与指定网址相关的状态对象,popstate事件触发时,该对象会传入回调函数。如果不需要这个对象,此处可以填null。
  + title：新页面的标题,但是所有浏览器目前都忽略这个值,因此这里可以填null。
  + url：新的网址,必须与当前页面处在同一个域。浏览器的地址栏将显示这个网址。
+ 使用pushState方法在浏览记录（history对象）中添加一个新记录。
+ pushState方法不会触发页面刷新,只是导致history对象发生变化,地址栏会有反应
+ history.replaceState方法的参数与pushState方法一模一样,区别是它修改浏览历史中当前纪录

#### 跨域
>有三个标签是允许跨域加载资源：
+ \<img src='xxx'>
+ \<link href='xxx'>
+ \<script src='xxx'>
+ 跨域并不是请求发不出去，请求能发出去，服务端能收到请求并正常返回结果，只是结果被浏览器拦截了。
+ 当两个域具有相同的协议(如http), 相同的端口(如80),相同的host（如www.google.com),那么我们就可以认为它们是相同的域（协议,域 名,端口都必须相同）。
+
+ 跨域就指着协议,域名,端口不一致,出于安全考虑,跨域的资源之间是无法交互的(例如一般情况跨域的JavaScript无法交互,当然有很多解决+ 跨域的方案)
+ Access-Control-Allow-Origin是HTML5中定义的一种解决资源跨域的策略。
+ 通过服务器端返回带有Access-Control-Allow-Origin标识的Response header,用来解决资源的跨域权限问题。
+ 使用方法,在response添加 Access-Control-Allow-Origin,例如
+ Access-Control-Allow-Origin:www.google.com		//或者设置为*,表示谁都可以访问资源
+ 如果资源是html页面,可以设置
+ <meta http-equiv="Access-Control-Allow-Origin" content="*">
+ 方式
  + CORS：服务器设置HTTP响应头中Access-Control-Allow-Origin的值,解除跨域限制
  + jsonp的原理就是利用\<script>标签没有跨域限制
  + window.name + iframe跨域
  + document.domain + iframe跨域
  + WebSocket协议跨域
  + nginx代理跨域
  + express中间件中加入Access-Control-Allow-Origin：*
```ts
//1.jsonp
   var script = document.createElement('script');
    script.type = 'text/javascript';

    // 传参一个回调函数名给后端,方便后端返回时执行这个在前端定义的回调函数
    script.src = 'http://www.domain2.com:8080/login?user=admin&callback=handleCallback';
    document.head.appendChild(script);

    // 回调执行函数
    function handleCallback(res) {
        alert(JSON.stringify(res));
    }
//webpack.config.js中
devServer: {
        historyApiFallback: true,
        proxy: [{
            context: '/login',
            target: 'http://www.domain2.com:8080',  // 代理跨域目标接口
            changeOrigin: true,
            secure: false,  // 当代理某些https服务报错时用
            cookieDomainRewrite: 'www.domain1.com'  // 可以为false,表示不修改
        }],
        noInfo: true
    }
//后端路由配置前
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next();
});
```
#### postMessage
postMessage 是 html5 引入的API,postMessage()方法允许来自不同源的脚本采用异步方式进行有效的通信,可以实现跨文本文档、多窗口、跨域消息传递,多用于窗口间数据通信,这也使它成为跨域通信的一种有效的解决方案。

#### formData
+ 注意是二次处理,不能直接响应页面
```ts
<form id="form">
    <input type="text" name="username">
    <input type="password" name="password">
    <input type="button" id="btn" value="提交">
</form>
 var form = document.getElementById('form')
btn.onclick = function() {
	// 将普通的html表单转换为表单对象
	var formData = new FormData(form)
	/*在 formData对象下面有一个方法 get('key'),用来获取表单对象属性的值
	应用： 获取值后对值进行验证*/
	console.log(formData.get('username')); //用来获取表单对象属性的值
	/*set('key','value'),用来设置表单对象中属性的值
	应用：表单数据的二次处理*/
	formData.set('username', '')
	formData.append('username', 'itheima')	//追加数据
	/*delete('key'),用来设置表单对象中属性的值
	应用：注册账号时,需要再次输入密码来确认,但是提交到服务器
	的时候,我们只需要提交一次即可。则可以删除一次密码*/
	formData.delete('password')
}
```
### eventLoop
+ 1. 所有同步任务都在主线程上执行,形成一个执行栈（放入后执行,执行完毕出栈）。
+ 2. 主线程之外,还存在一个"任务队列"（task queue）。只要异步任务有了运行结果,就在"任务队列"之中放置一个事件。
+ 3. 一但"执行栈"中的所有同步任务执行完毕,系统就会读取"任务队列",看看里面有哪些事件。那些对应的异步任务,于是结束等待状态,进入执行栈,开始执行。
+ 4. 主线程不断重复上面的第三步。
+ 宏任务与微任务
  + 在执行宏任务时遇到Promise等,会创建微任务（.then()里面的回调）,并加入到微任务队列队尾
  + 在某一个微任务执行完后,在重新渲染与开始下一个宏任务之前,就会将在它执行期间产生的所有微任务都执行完毕（在渲染前）
  - 1.执行一个宏任务（栈中没有就从事件队列中获取）
  - 2.执行过程中如果遇到微任务,就将它添加到微任务的任务队列中
  - 3.宏任务执行完毕后,立即执行当前微任务队列中的所有微任务（依次执行）
  - 4.当前宏任务执行完毕,开始检查渲染,然后GUI线程接管渲染
  -	5.渲染完毕后,JS引擎线程继续,开始下一个宏任务（从宏任务队列中获取）


只要主线程空了,就会去读取"任务队列",这就是JavaScript的运行机制。这个过程会不断重复,这种机制就被称为事件循环（event loop）机制。
+ 以下事件属于宏任务：
  + setInterval()
  + setTimeout()
+ 以下事件属于微任务
  + new Promise()
  + new MutaionObserver()

+ Array.forEach(a,b,c)  //c代表Array,使用map()也是如此
+ map()会返回修改后的数组,forEach()没有返回值

## v-directive
  + inserted ： 表示元素 插入到DOM中的时候,会执行 inserted 函数,触发一次。(例如：自动获取焦点)。
  + update ： 当VNode 更新的时候,会执行 updated 函数,可能会触发多次。
  + componentUpdate ： 指令所在组件的VNode 及其子 VNode 全部更新后调用。
  + bind： 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
  + unbind：只调用一次，指令与元素解绑时调用。
+ 钩子函数参数
  + el：指令所绑定的元素，可以用来直接操作 DOM。
  + binding：一个对象，包含以下 property：
    + name：指令名，不包括 v- 前缀。
    + **value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定+ 值为 2**。
    + oldValue：指令绑定的前一个值，仅在 update 和 + componentUpdated 钩子中可用。无论值是否改变都可用。
    + expression：字符串形式的指令表达式。例如 v-my-directive="1 + + 1" 中，表达式为 "1 + 1"。
    + **arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数+ 为 "foo"**。
      + **可使用动态属性v-pin:[direction]="200"**  //data中的direction
    + modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.+ bar 中，修饰符对象为 { foo: true, bar: true }。
  + vnode：Vue 编译生成的虚拟节点。移步 VNode API 来了解更多详情。
  + oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。

### let var const
+ let不能重复声明 var可以重复声明
+ var能变量提升,let|const不能变量提升
+ const如果是基本数据类型,则必须要初始化,若是引用类型可以不初始化
+ const中基本数据类型不能改变,引用类型可以改变

### localStorage和sessionStorage,cookie
+ document.cookie = "name=value;expires=evalue; path=pvalue; domain=dvalue; secure="true";”
+ secure=true|false 可选参数，默认是 true,安全设置，指明必须通过 安全的通信通道来传输（https) 才能获得 cookie,true 不安全
+ expires=evalue 对象的有效时间
+ cookie 是存于用户硬盘的一个文件，这个文件通常对应于一个域名，当浏览器再次访问这个域名时，便使这个cookie可用。因此，cookie可以跨越一个域名下的多个网页，但不能跨越多个域名使用
+ localStorage作用域在文档源级别,当域名,主机,端口相同时可共享数据,sessionStorage作用域在文档源级别,但是不能跨标签页访问
+ session存储与服务器端
+ localStorage能持久化存储,sessionStorage是会话级存储
+ sessionStorage存储在浏览器,localStorage存储在电脑本地
+ sessionStorage只能在当前页面使用,localStorage能够跨页面使用
+ window.addEventListener('storage',func)能够监听storage改变

#### 数据类型
+ 基本数据类型：
  + Number,String,Boolean,null,undefined,symbol,bigint（后两个为ES6新增）
+ 引用数据类型：
  + object,function
  + object：普通对象,数组对象,正则对象,日期对象,Math数学函数对象,数字对象,字符串对象,Boolean对象。
+ 注意bug , typeof null 为object(因为JavaScript 数据类型在底层都是以二进制的形式表示的)
+ 基本数据类型存储在栈,引用类型的指针存储在栈中,但指针指向的引用存储在堆内存中
+ typeof会返回number,string,boolean,undefined,object,function
+ bigint 只需要在数字后加上n，或者Bigint(123)
  + 支持加减乘除，但不可在非负数前使用+，即(+123n)

### for...of
+ es6新增的一个遍历方法,但只限于迭代器(iterator), 所以普通的对象用for..of遍历
是会报错
+ 可迭代的对象：包括Array, Map, Set, String, TypedArray, arguments对象等等

### arguments
+ arguments对象是所有(非箭头!!!)函数中都可用的局部变量。你可以使用arguments对象在函数中引用函数的参数
+ Function.length是函数参数的数量,arguments.length是传入的参数的数量
+ console.log(typeof arguments);    // 'object'
+ arguments.callee指向参数所属的当前执行的函数。



#### 静态类型语言 & 动态类型语言
+ js是动态类型语言
+ 静态类型语言：类型检查发生在编译阶段,因此除非修复错误,否则会一直编译失败
+ 动态类型语言：只有在程序运行了一次的时候错误才会被发现,也就是在运行时,因此即使代码中包含了会 在运行时阻止脚本正常运行的错误类型,这段代码也可以通过编译

### iframe有什么优点、缺点
+ 优点
  + 遇到加载缓慢的广告图标,可以用iframe解决
  + 类似组件,提高了代码复用性
  + 能够将嵌入的网页展示出来
+ 缺点
  + 会阻塞window.load
  + 影响页面的并行加载,不易管理
  + 用户体验差,代码复杂不利于seo搜索引擎优化
  + 兼容性差,会增加http请求

####	Map$&Object
+ Map
  + 意外的键	Map默认情况不包含任何键。只包含显式插入的键。
  + 键的类型	一个Map的键可以是任意值,包括函数、对象或任意基本类型。
  + 键的顺序	Map中的 key 是有序的。因此,当迭代的时候,一个Map对象以插入的顺序返回键值。
  + 迭代 Map是 iterable 的,所以可以直接被迭代。
  + Size	Map的键值对个数可以轻易地通过size 属性获取
  + 性能	在频繁增删键值对的场景下表现更好。
+ Object
  + 意外的键	一个Object有一个原型, 原型链上的键名有可能和你自己在对象上的设置的键名产生冲突。注意: 虽然 ES5 开始可以用Object.create(null)来创建一个没有原型的对象,但是这种用法不太常见。
  + 键的类型	一个Object的键必须是一个 String 或是Symbol。
  + 一个Object的键是无序的注意：自ECMAScript 2015规范以来,对象确实保留了字符串和Symbol键的顺序	 键的创建顺序; 因此,在只有字符串键的对象上进行迭代将按插入顺序产生键。
  + Size	Object的键值对个数只能手动计算
  + 迭代	迭代一个Object需要以某种方式获取它的键然后才能迭代。
  + 性能	在频繁添加和删除键值对的场景下未作出优化。

### 类数组转换为数组
+ 转换方法
  + 使用Array.from()
  + 使用Array.prototype.slice.call()
  + 使用Array.prototype.forEach()进行属性遍历并组成新的数组
+ 转换须知
  + 转换后的数组长度由length属性决定。索引不连续时转换结果是连续的,会自动补位。
```ts
//代码示例
let al1 = {
    length: 4,
    0: 0,
    1: 1,
    3: 3,
    4: 4,
    5: 5,
};
console.log(Array.from(al1)) // [0, 1, undefined, 3]
②仅考虑 0或正整数 的索引
// 代码示例
let al2 = {
    length: 4,
    '-1': -1,
    '0': 0,
    a: 'a',
    1: 1
};
console.log(Array.from(al2)); // [0, 1, undefined, undefined]
③使用slice转换产生稀疏数组
// 代码示例
let al2 = {
    length: 4,
    '-1': -1,
    '0': 0,
    a: 'a',
    1: 1
};
console.log(Array.prototype.slice.call(al2)); //[0, 1, empty × 2]
使用数组方法操作类数组注意地方
let arrayLike2 = {
  2: 3,
  3: 4,
  length: 2,
  push: Array.prototype.push
}

// push 操作的是索引值为 length 的位置
arrayLike2.push(1);
console.log(arrayLike2); // {2: 1, 3: 4, length: 3, push: ƒ}
arrayLike2.push(2);
console.log(arrayLike2); // {2: 1, 3: 2, length: 4, push: ƒ}
arrayLike2.push(3);
console.log(arrayLike2); // { '2': 1, '3': 2, '4': 3, length: 5, push: [Function: push] }
arrayLike2.push(4);
console.log(arrayLike2); // { '2': 1, '3': 2, '4': 3, '5': 4, length: 6, push: [Function: push] }
```
### 介绍下 Set、Map、WeakSet 和 WeakMap 的区别？

Set
成员不能重复;
只有键值,没有键名,有点类似数组;
可以遍历,方法有add、delete、has
WeakSet
成员都是**对象**（引用）;
成员都是**弱引用**,随时可以消失（不计入垃圾回收机制）。可以用来**保存 DOM 节点**,不容易造成内存泄露;
**不能遍历**,方法有add、delete、has;
Map
本质上是键值对的集合,类似集合;
可以遍历,方法很多,可以跟各种数据格式转换;
WeakMap
只接收**对象**为键名（null 除外）,不接受其他类型的值作为键名;
键名指向的对象,不计入垃圾回收机制;
**不能遍历**,方法同get、set、has、delete;


### js 中有哪几种内存泄露的情况
+ 意外的全局变量;
+ 闭包;
+ 未被清空的定时器;
+ 未被销毁的事件监听;
+ DOM 引用;

#### 宏任务与微任务题
```ts
async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('async2')
}
console.log('script start')
setTimeout(function () {
  console.log('settimeout')
})
async1()
new Promise(function (resolve) {
  console.log('promise1')
  resolve()
}).then(function () {
  console.log('promise2')
})
console.log('script end')
```
+ script start
+ async1 start
+ async2
+ promise1
+ script end
+ async1 end
+ promise2
+ setTimeout
+ 注意await的地方,看作
```ts
async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}
function async1() {
  console.log('async1 start')
  new Promise((resolve,reject) => {
    async2()
    resolve()
  })
  .then(()=>{
    console.log('async1 end')
  })
}
```

### json和xml数据的区别
+ 数据体积方面：xml是重量级的,json是轻量级的,传递的速度更快些。
+ 数据传输方面：xml在传输过程中比较占带宽,json占带宽少,易于压缩。
+ 数据交互方面：json与javascript的交互更加方便,更容易解析处理,更好的进行数据交互
+ 数据描述方面：json对数据的描述性比xml较差
+ Xml和json都用在项目交互下,xml多用于做配置文件,json用于数据交互。

#### Math.min()和Math.max()
+ Math.min()没有参数时,返回Infinity无穷大
+ Math.max()没有参数时,返回-Infinity 无穷小

### delete
```ts
var company = {
    address: 'beijing'
}
var yideng = Object.create(company);
delete yideng.address
console.log(yideng.address);  //beijing
//这里的 yideng 通过 prototype 继承了 company的 address。yideng自己并没有address属性。所以delete操作符的作用是无效的。
```
+ delete使用原则：delete 操作符用来删除一个对象的属性
+ 属性不能被删除的根本原因在于：这些属性拥有内部属性 DontDelete
  + 通过变量声明而生成,因此拥有 DontDelete
  + 通过属性赋值而生成,因此没有 DontDelete
  + 特殊的 arguments 变量（活化对象的属性）拥有 DontDelete; 任何函数实例的 length (返回形参长度)属性也拥有 DontDelete
  + 通过**未声明**的变量赋值生成全局对象的属性,没有 DontDelete
  + **原型 prototype 中声明的属性和对象自带的属性(其实这些属性也是在原型 prototype 中的)可以认为是带有 DontDelete 特性的,无法被删除**
  + 在 eval 中声明的变量事实上没有 DontDelete 属性
  + 但是在eval代码中的**函数内**定义的变量有DontDelete 属性
```ts
bar = 2;    //隐式声明
delete bar; // true

this.bar = 1;
delete bar; // true;
typeof bar; // "undefined"

/* 'foo'创建的同时生成 DontDelete */
function foo() {}; /* 之后的赋值过程不改变已有属性的内部属性,DontDelete仍然存在 */
foo = 1;
delete foo; // false;
typeof foo; // "number"
```
+ delete能删除隐式声明的全局变量：这个全局变量其实是global对象(window)的属性
+ delete能删除的：
  + 可配置对象的属性
  + 隐式声明的全局变量
  + 用户定义的属性
+ delete不能删除的：
  + 显式声明的全局变量
  + 内置对象的内置属性
  + **一个对象从原型继承而来的属性**
+ delete删除数组元素：
  + **当你删除一个数组元素时,数组的 length 属性并不会变小,数组元素变成undefined**
  + 当用 delete 操作符删除一个数组元素时,被删除的元素已经完全不属于该数组。
  + 如果你想让一个数组元素的值变为 undefined 而不是删除它,可以使用 undefined 给其赋值而不是使用 delete 操作符。此时数组元素是在数组中的
+ delete 操作符与直接释放内存（只能通过解除引用来间接释放）没有关系

+ console 中的所有文本都会被当做 eval 代码来解析和执行,而不是全局或函数

+ <script src="script.js" defer></script> js异步执行,在元素解析后完成,并按书写顺序加载
+ <script async src="script.js"></script> js异步执行,但是不会按书写顺序

## Promise
+ then的参数有两个:成功回调和失败回调,或者失败回调放在catch
+ Promise.prototype.catch方法是.then(null, rejection)的别名,用于指定发生错误时的回调函数,返回一个新的promise对象。
+ 调用resolve函数来将promise状态改成fulfilled(完成),或者将promise的状态改为rejected(失败)
+ 即使没有使用catch方法指定错误处理的回调函数,Promise对象抛出的错误也不会中止外部脚本运行
+ **异步函数**中抛出的错误不会被catch捕获到
+ 在resolve()**后**面抛出的错误会被忽略
+  promise的链式调用
   + 每次调用返回的都是一个新的Promise实例(这就是then可用链式调用的原因)
   + 如果then中返回的是一个结果的话会把这个结果传递下一次then中的成功回调
   + 如果then中出现异常,会走**下一个then**的失败回调
   + **在 then中使用了return,那么 return 的值会被Promise.resolve() 包装**
   + then中可以不传递参数,如果不传递会传undefined到下一个then中
   + catch 会捕获到没有捕获的异常
+ Promise对象的错误具有“冒泡”性质,会一直向后传递,直到被捕获为止。也就是说,错误总是会被下一个catch语句捕获。 即：当前catch方法可以捕获上一个catch方法(包括上一个catch)到当前catch(不包括当前catch)方法之间所有的错误,如果没有错误,则当前catch方法不执行。
```ts
new Promise(() => {
    throw new Error('err1');
})
.then(() => {console.log(1);})
.then(() => {console.log(2);})
.catch((err) => {
    console.log(err); //Err: err1
    throw  new Error('err2');
})
.catch((err) => {console.log(err);})//Err: err2
```
+ Promise.all([a,b,c]) a,b,c都是promise实例,当所有promise都是resolve之后才会执行then
+ Promise.all([a,b,c]) a,b,c都是promise实例,当其中一个promise执行resolve之后才会执行then
+  如果参数带有then方法的对象,则返回的Promise对象的最终状态由then方法的执行决定
+  Promise.reject()方法的参数,会原封不动地作为reject的理由,变成后续方法的参数。
```ts
const thenable = {
    then(resolve, reject) {
        resolve(42);
    }
};
Promise.resolve(thenable)
    .then((value) => {
        console.log(value);  // 42
    });

const thenable = {
    then(resolve) {
        resolve('ok');
    }
};

Promise.resolve(thenable)
    .then(e => {
        console.log(e === 'ok'); //true
});
Promise.reject(thenable)
    .catch(e => {
        console.log(e === thenable); // true
    });
//all
const p1 = 'p1-ok';
const p2 = Promise.resolve('p2-ok');      //相当于new Promise(resolve=>resolve('p2-ok'))
const p3 = new Promise((resolve) => setTimeout(resolve, 3000, 'p3-ok'));
const p4 = Promise.reject('p4-err');
Promise.all([p1, p2, p3])
    .then((resolves) => {
      resolves.forEach(resolve => {
          console.log(resolve); //p1-ok   p2-ok  p3-ok
      });
    })
    .catch(() => {
      console.log('err');
    });

Promise.all([p1, p2, p3, p4])
    .then(() => {
      console.log('ok');
    })
    .catch((err) => {
       console.log(err); //p4-err
    })
//race
var p1 = new Promise(resolve => {setTimeout(resolve, 500, "one");});
var p2 = new Promise(resolve => {setTimeout(resolve, 100, "two");});
Promise.race([p1, p2])
    .then(value => {
        console.log(value); // "two"
    });
```

### setTimeout(a,b,c)  a是回调函数,b是延时,c是回调的参数
```ts
for (var i = 0; i< 10; i++){
   setTimeout((i) => {
      console.log(i)
   }, 1000,i);
}
//最精简解决方案

for (let i = 0; i< 10; i++){
   setTimeout(() => {
      console.log(i)
   }, 1000);
}
//最优解决方案,利用let形成块级作用域

for (var i = 0; i< 10; i++){
  ((i)=>{
    setTimeout(() => {
      console.log(i)
    },1000);
  })(i)
}
for (var i = 0; i< 10; i++){
   setTimeout(console.log(i),1000);
}
直接输出,没有延迟

for (var i = 0; i< 10; i++){
   setTimeout((()=>console.log(i))(),1000); //立即执行
}
```

## this指向
> 普通函数中的this
+ 谁调用了函数或者方法,那么这个函数或者对象中的this就指向谁
+ 若函数或方法前面没有调用的对象,则默认找到window
+ 匿名函数中的this指向window
+ 箭头函数的this**永远指向定义时的执行环境**,使用bind/call/apply也无法修改
```ts
let obj = {
     getThis: function () {
     //提前保存this指向
         let _this=this
         return function () {     //原本this指向window
             console.log(_this);
         }
     }
 }
 obj.getThis()(); //obj
 ```
>箭头函数中的this
+ 箭头函数中的this是在函数定义的时候就确定下来的,而不是在函数调用的时候确定的;
+ 箭头函数中的this指向父级作用域的执行上下文;（**技巧：因为javascript中除了全局作用域,其他作用域都是由函数创建出来的,所以如果想确定this的指向,则找到离箭头函数最近的function,与该function平级的执行上下文中的this即是箭头函数中的this**）
+ 箭头函数**无法**使用apply、call和bind方法改变this指向,因为其this值在函数定义的时候就被确定下来。
```ts
let obj = {
    //此处的this即是箭头函数中的this
    getThis: function () {
        return  ()=> {
            console.log(this);
        }
    }
}
obj.getThis()(); //obj
//代码中有两个箭头函数,由于找不到对应的function,所以this会指向window对象。
let obj = {
     getThis: ()=> {
         return  ()=> {
             console.log(this);
         }
     }
 }
 obj.getThis()(); //window
 ```

 #### super
> this和super的区别：
+ this关键词指向函数所在的当前对象
+ super指向的是当前对象的原型对象
+ Object.getPrototypeOf(this) 获取this的原型对象
+ Object.setPrototypeOf( man, person ) 设置man的原型对象为person
```ts
super.name
//等同于
Object.getPrototypeOf(this).name【属性】
//等同于
Object.getPrototypeOf(this).name.call(this)【方法】

const person = {
    name:'jack'
}
const man = {
    sayName(){
        return super.name;
    }
}
Object.setPrototypeOf( man, person );//设置man的原型对象为person
let n = man.sayName()
console.log( n )    //jack
```

#### 箭头函数能否当构造函数
>箭头函数表达式的语法比函数表达式更简洁,并且没有自己的**this,arguments,super或new.target,原型prototype**。箭头函数表达式更适用于那些本来需要匿名函数的地方,并且它不能用作构造函数

>构造函数的new都做了些什么？简单来说,分为四步： ① JS内部首先会先生成一个对象; ② 再把函数中的this指向该对象; ③ 然后执行构造函数中的语句; ④ 最终返回该对象实例。

## Object.create()和Object.setPrototypeOf()
>Object.setPrototypeOf()
```ts
//Cat.prototype.__proto__ = Animal.prototype
Object.setPrototypeOf(Cat.prototype, Animal.prototype)
const cat = new Cat('mimi', 'miao~miao~')
```
给Cat的原型设置了一个名为Animal的原型,所以Cat的原有的原型的原型就是Animal的原型Cat.prototype.__proto__ === Animal.prototype
所以setPrototypeOf会优先访问Cat原有的原型然后再访问原型的原型

>Object.create()
```ts
Cat.prototype = Object.create(Animal.prototype)
console.log(Cat.prototype)
```

使用Object.create()会将Cat.prototype先将此原型清成空,这个空的原型会指向Animal的原型Cat.prototype(null).__proto__ === Animal.prototype
所以Object.create()会将Cat.prototype清空为干净的原型,然后去继承


## 函数继承
>优点
+ 提高了复用性,维护性,使类之间产生联系
>缺点
+ 使代码耦合性增强了

>继承的方法
>>原型链继承
+ 优点：可继承构造函数的属性,父类构造函数的属性,父类原型的属性
+ 缺点: 无法向父类构造函数传参;且**所有实例共享父类实例的属性**,若父类共有属性为引用类型,一个子类实例更改父类构造函数共有属性时会导致继承的共有属性发生变化
+ 注意:原型链继承后,基本数据类型的赋值都是在this上声明一个属性并赋值,而引用类型若是完全赋值,那么同样是在this上声明一个属性并赋值,但如果是this.array.push(xx)则视为查找原型链上的属性并追加元素,而不是重新在this上声明一个新属性,故多个实例会形成相互引用
```ts
function Parent(){
  this.name = "parent";
  this.list = ['a'];
}
Parent.prototype.sayHi = function(){
  console.log('hi');
}
function Child(){
}
Child.prototype = new Parent();   //父类构造函数参数固定
var child = new Child();
console.log(child.name);
child.sayHi();
```
>>构造函数继承
```ts
//实现方式：在子类构造函数中使用call或者apply劫持父类构造函数方法,并传入参数
function Parent(name, id){
  this.id = id;
  this.name = name;
  this.printName = function(){
    console.log(this.name);
  }
}
Parent.prototype.sayName = function(){
  console.log(this.name);
};
function Child(name, id){
  Parent.call(this, name, id);
  // Parent.apply(this, arguments);
}
var child = new Child("jin", "1");
child.printName(); // jin
child.sayName() // Error
原理：使用call或者apply更改子类函数的作用域,使this执行父类构造函数,子类因此可以继承父类共有属性
优点：可解决原型链继承的缺点
缺点：不可继承父类的原型链方法,构造函数不可复用
```
>>组合继承
```ts
//原理：综合使用构造函数继承和原型链继承
function Parent(name, id){
  this.id = id;
  this.name = name;
  this.list = ['a'];
  this.printName = function(){
    console.log(this.name);
  }
}
Parent.prototype.sayName = function(){
  console.log(this.name);
};
function Child(name, id){
  Parent.call(this, name, id);
  // Parent.apply(this, arguments);
}
Child.prototype = new Parent();
var child = new Child("jin", "1");
child.printName(); // jin
child.sayName() // jin

var a = new Child();
var b = new Child();
a.list.push('b');
console.log(b.list); // ['a']
优点：可继承父类原型上的属性,且可传参;每个新实例引入的构造函数是私有的
缺点：会执行两次父类的构造函数,消耗较大内存,子类的构造函数会代替原型上的那个父类构造函数
```
>>原型式继承
```ts
原理：类似Object.create,用一个函数包装一个对象,然后返回这个函数的调用,这个函数就变成了个可以随意增添属性的实例或对象,结果是将子对象的__proto__指向父对象
var parent = {
  names: ['a']
}
function copy(object) {
  function F() {}
  F.prototype = object;
  return new F();
}
var child = copy(parent);
缺点：共享引用类型
```
>>寄生式继承
```ts
原理：二次封装原型式继承,并拓展
function createObject(obj) {
  var o = copy(obj);
  o.getNames = function() {
    console.log(this.names);
    return this.names;
  }
  return o;
}
优点：可添加新的属性和方法
```
>>寄生组合式继承
```ts
原理：改进组合继承,利用寄生式继承的思想继承原型
function inheritPrototype(subClass, superClass) {
  // 复制一份父类的原型
  var p = copy(superClass.prototype);
  // 修正构造函数
  p.constructor = subClass;
  // 设置子类原型
  subClass.prototype = p;
}

function Parent(name, id){
  this.id = id;
  this.name = name;
  this.list = ['a'];
  this.printName = function(){
    console.log(this.name);
  }
}
Parent.prototype.sayName = function(){
  console.log(this.name);
};
function Child(name, id){
  Parent.call(this, name, id);
  // Parent.apply(this, arguments);
}
inheritPrototype(Child, Parent);
```

## css文件的引入
> link和@import
> ```ts
> //link
> <link href="index.css" rel="stylesheet">
> //@import
> <style type="text/css">
> @import url(index.css);
> </style>


> 两者不同
+ 引入的内容不同
  + link 除了引用样式文件,还可以引用图片等资源文件,而 @import 只引用样式文件
+ 加载顺序不同
  + link 引用 CSS 时,在页面载入时同时加载;@import 需要页面网页完全载入以后加载
+ 在文档中添加link标签,浏览器会识别该文档为css文件,就会并行下载资源并且**不会停止**对当前文档的处理。这也是为什么建议使用link方式来加载css,而不是使用@import方式

### href和src
> src用于替换当前元素,href用于在当前文档和引用资源之间确立联系。
+ src
  + src是source的缩写,指向外部资源的位置,指向的内容将会嵌入到文档中当前标签所在位置;在请求src资源时会将其指向的资源下载并应用到文档内,例如js脚本,img图片和frame等元素
  + 当浏览器解析到该元素时,会**暂停其他资源的下载和处理**,直到将该资源加载、编译、执行**完毕**,图片和框架 等元素也如此,类似于将所指向资源嵌入当前标签内。这也是为什么将js脚本放在底部而不是头部
+ href
  + href是Hypertext Reference的缩写,指向网络资源所在位置,建立和当前元素（锚点）或当前文档（链接）之间的链接


## Proxy和Reflect


### constructor
>constructor方法是类的默认方法,通过new命令生成对象实例时,自动调用该方法。一个类必须有constructor方法,如果没有显式定义,一个空的constructor方法会被默认添加。（默认构造函数）;constructor方法默认返回**实例对象**（即this）,完全可以指定返回另外一个对象。

> 类的构造函数必须使用new调用,否则会报错。这是它跟普通构造函数的一个主要区别,后者不用new也可以执行。

### Object
> Object.create(a,b)对象继承 a:表示新建对象的原型对象(null, 对象,函数的prototype属性),b:添加到新创建对象的可枚举属性
> ```ts
> // new Object() 方式创建
> var a = {  rep : 'apple' }
> var b = new Object(a)
> console.log(b) // {rep: "apple"}
> console.log(b.__proto__) // {}
> console.log(b.rep) // {rep: "apple"}
> // Object.create() 方式创建
> var a = { rep: 'apple' }
> var b = Object.create(a)
> console.log(b)  // {}
> console.log(b.__proto__) // {rep: "apple"}
> console.log(b.rep) // {rep: "apple"}


> Object.assign()	方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。注意不能赋值get和set,若需要应使用Object.getOwnPropertyDescriptor()和Object.defineProperty()
> ```ts
> target = { a: 1, b: 2 };
> source = { b: 4, c: 5 };
> obj1 = Object.assign(target, source)
> obj1
> //{a: 1, b: 4, c: 5}
> obj1 = Object.assign({}, source)
> //{b: 4, c: 5}
> ```

> Object.create()	方法创建一个新对象,使用现有的对象来提>供新创建的对象的__proto__。
> ```ts
> Person = {
>   isHuman: false,
>   printIntroduction: function() {
>     console.log(`My name is ${this.name}. Am I > human? ${this.isHuman}`);
>   }
> }
> per = Object.create(Person)
> per
> //{}
> per.isHuman
> //false
> per.printIntroduction
> //ƒ () {}
>```


> Object.defineProperties()	方法直接在一个对象上定义新的属性或修改现有属性,并返回该对象。
> ```ts
> var obj = {};
> Object.defineProperties(obj, {
>   'property1': {
>     value: true,
>     writable: true
>   },
>   'property2': {
>     value: 'Hello',
>     writable: false
>   }
> });
>
> obj.property1 = 21
> obj.property1
> //21
> obj.property2 = '22'
> obj.property2
> //"Hello"
> ```

> Object.defineProperty()	方法会直接在一个对象上定义一个新属性,或者修改一个对象的现有属性,并返回此对象。
> ```ts
> object1 = {};
> Object.defineProperty(object1, 'property1', {
>   value: 42,
>   writable: false
> });
> object1.property1 == 22
> //false
> object1.property1
> //42
> ```

> Object.entries()	方法返回一个给定对象自身可枚举属性的>键值对数组,其排列与使用 for…in 循环遍历该对象时返回的顺>序一致。
> ```ts
> object1 = {
>   a: 'somestring',
>   b: 42
> };
>
> Object.entries(object1)
> // [Array(2), Array(2)]
> //0: (2) ["a", "somestring"]
> //1: (2) ["b", 42]
>
> for (const [key, value] of Object.entries(object1))  {
>   console.log(`${key}: ${value}`);
> }
> a: somestring
> b: 42
> ```

> Object.freeze()	方法可以冻结一个对象。一个被冻结的对象再也不能被修改;冻结了一个对象则不能向这个对象添加新的属性,不能删除已有属性,不能修改该对象已有属性的可枚举性、可配置性、可写性,以及不能修改已有属性的值。此外,冻结一个对象后该对象的原型也不能被修改。freeze() 返回和传入的参数相同的对象
> ```ts
> a = {a: '1', 'b': 2}
> Object.freeze(a)
> {a: "1", b: 2}
> a.a = 2   //不报错,但是不会修改
> a.a
> //"1"
> Object.isFrozen(a)
> //true
> ```

> Object.getOwnPropertyDescriptor()	方法返回指定对象上一个自有属性对应的属性描述符。
> ```ts
> o = { get: function foo() { return 17; }, a: 1 }
> a = Object.getOwnPropertyDescriptor(o, 'get')
> //{writable: true, enumerable: true, configurable: > true, value: ƒ}
> //configurable: true
> //enumerable: true
> //value: ƒ foo()
> //writable: true
> //__proto__: Object
> a = Object.getOwnPropertyDescriptor(o, 'a')
> //{value: 1, writable: true, enumerable: true, > configurable: true}
> //configurable: true 能否使用delete、能否需改属性特性、或能否修改访问器属性
> //enumerable: true
> //value: 1
> //writable: true
> //__proto__: Object
> ```

> Object.getOwnPropertyDescriptors()	方法用来获取一个对象的所有自身属性的描述符。
> Object.getOwnPropertyNames()	方法返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组。
> Object.getPrototypeOf()	方法返回指定对象的原型（内部[[Prototype]]属性的值）,读取对象的prototype/__proto__对象
> Object.is()	方法判断两个值是否为同一个值,Object.is(),其行为与===基本一致,不过有两处不同：**1.+0不等于-0;2.NaN等于自身。**
> Object.isExtensible()	方法判断一个对象是否是可扩展的（是否可以在它上面添加新的属性）。
> Object.isFrozen()	方法判断一个对象是否被冻结。
> Object.preventExtensions()	方法让一个对象变的不可扩展,也就是永远不能再添加新的属性。
> Object.keys()	方法会返回一个由一个给定对象的自身可枚举属性组成的数组,数组中属性名的排列顺序和正常循环遍历该对象时返回的顺序一致 。
> Object.setPrototypeOf()	方法设置一个指定的对象的原型到另一个对象。
> Object.values()	方法返回一个给定对象自身的所有可枚举属性值的数组。

### 扩展运算符
> ```ts
> 扩展运算符后面可以放表达式
> const arr = [...(5 > 0 ? ['a'] : []),'b'];
> console.log(arr);  //['a','b']
> //1234
>  //注意
> const [first, ...rest] = [];
> first  //undefined
> rest  //[]
> ```

### 扩展
> 为什么js是单线程
js是作为浏览器的脚本语言,主要是实现用户与浏览器的交互,以及操作dom;这决定了它只能是单线程,否则会带来很复杂的同步问题

>什么是进程？
进程：是cpu分配资源的最小单位;（是能拥有资源和独立运行的最小单位）

>什么是线程？
线程：是cpu调度的最小单位;（线程是建立在进程的基础上的一次程序运行单位,一个进程中可以有多个线程）

>浏览器是多进程的？
放在浏览器中,每打开一个tab页面,其实就是新开了一个进程,在这个进程中,还有ui渲染线程,js引擎线程,http请求线程等。 所以,浏览器是一个多进程的。

### 面向对象的三个特征
>封装：将对象运行所需的资源封装在程序对象中——基本上,是方法和数据。对象是“公布其接口”。其他附加到这些接口上的对象不需要关心对象实现的方法即可使用这个对象。这个概念就是“不要告诉我你是怎么做的,只要做就可以了。”对象可以看作是一个自我包含的原子。对象接口包括了公共的方法和初始化数据。

>继承： 继承可以解决代码复用,让编程更加靠近人类思维。当多个类存在相同的属性(变量)和方法时,可以从这些类中抽象出父类,在父类中定义这些相同的属性和方法,所有的子类不需要重新定义这些属性和方法,只需要通过继承父类中的属性和方法。

>多态： 多态是指一个引用(类型)在不同情况下的多种状态。也可以理解成：多态是指通过指向父类的引用,来调用在不同子类中实现的方法。

>特点：
+ 封装可以隐藏实现细节,使得代码模块化;
+ 继承可以扩展已存在的代码模块（类）,它们的目的都是为了——代码重用。
+ 多态就是相同的事物,调用其相同的方法,参数也相同时,但表现的行为却不同。多态分为两种,一种是行为多态与对象的多态

### console.log()
+ 支持console.log('在b.js中,a.done = %j', a.done)

## Es6和CommonJS
> 区别
+ 为CommonJS的require语法是同步的,所以就导致了CommonJS模块规范只适合用在服务端,而ES6模块无论是在浏览器端还是服务端都是可以使用的,但是在服务端中,还需要遵循一些特殊的规则才能使用 ;

+ CommonJS 模块输出的是一个值的**拷贝**,而ES6 模块输出的是值的**引用**;

+ CommonJS 模块是**运行时加载**,而ES6 模块是编译时输出接口,使得对JS的模块进行静态分析成为了可能

+ 因为两个模块加载机制的不同,所以在对待循环加载的时候,它们会有不同的表现。CommonJS遇到循环依赖的时候,只会**输出已经执行**的部分,后续的输出或者变化,是不会影响已经输出的变量。而ES6模块相反,使用import加载一个变量,变量不会被缓存,真正取值的时候就能取到最终的值;

+ 关于模块顶层的this指向问题,在CommonJS顶层,this指向当前模块;而在ES6模块中,this指向undefined;

+ 关于两个模块互相引用的问题,在ES6模块当中,是支持加载CommonJS模块的。但是反过来,CommonJS并不能requireES6模块,在NodeJS中,两种模块方案是分开处理的

> CommonJs
>> CommonJS规范加载模块是同步的,只有加载完成,才能执行后面的操作。
+  CommonJS模块的加载原理
   + CommonJS模块就是一个脚本文件,require命令第一次加载该脚本时就会执行整个脚本,然后在**内存中**生成该模块的一个说明对象。
   + 以后用到这个模块时,就会到对象的exports属性中取值。即使再次执行require命令,也不会再次执行该模块,而是到**缓存中取值**。
   + CommonJS模块是加载时执行,即脚本代码在require时就全部执行。一旦出现某个模块被“循环加载”,就只输出**已经执行的部分**,没有执行的部分不会输出。
```ts
//a.js
exports.done = false;
var b = require('./b.js');
console.log('在a.js中,b.done = %j', b.done);
exports.done = true;
console.log('a.js执行完毕！')

//b.js
exports.done = false;
var a = require('./a.js');
console.log('在b.js中,a.done = %j', a.done);
exports.done = true;
console.log('b.js执行完毕！')

//main.js
var a = require('./a.js');
var b = require('./b.js');
console.log('在main.js中,a.done = %j, b.done = %j', a.done, b.done);

//输出
node main.js
在b.js中,a.done = false    //当输出时,只获取到了a.js中exports.done = false;则使用该值
b.js执行完毕！
在a.js中,b.done = true     //输出时,获取到了b.js中exports.done = true;
a.js执行完毕！
在main.js中,a.done = true, b.done = true
```

>ES6模块的循环加载
>>ES6模块与CommonJS有本质区别,ES6模块对导出变量,方法,对象是动态引用,遇到模块加载命令import时不会去执行模块,只是生成一个指向被加载模块的引用,需要开发者保证真正取值时能够取到值,只要引用是存在的,代码就能执行
>>即只要调用循环引用的函数能够获取值,代码就能执行
```ts
//even.js
import {odd} from './odd';

var counter = 0;
export function even(n){
    counter ++;
    console.log(counter);

    return n == 0 || odd(n-1);
}
//odd.js
import {even} from './even.js';

export function odd(n){
    return n != 0 && even(n-1);
}
复制代码
//index.js
import * as m from './even.js';

var x = m.even(5);
console.log(x);

var y = m.even(4);
console.log(y);
//输出
babel-node index.js

1
2
3
false
4
5
6
true
```

## vue diff算法过程
+ 在采取diff算法比较新旧节点的时候,比较只会在同层级进行, 不会跨层级比较。
+ 同层级比较的过程中,都是从两边往中间比较
> 真实Dom和虚拟Dom

> virtual DOM是将真实的DOM的数据抽取出来,以对象的形式模拟树形结构。比如dom是这样的：
> ```
> <div>
>     <p>123</p>
> </div>
> 对应的virtual DOM（伪代码）：
> var Vnode = {
>     tag: 'div',
>     children: [
>         { tag: 'p', text: '123' }
>     ]
> };
> ```

> 过程
+ 被订阅的节点被修改后发布通知
+ 使用patch(oldVnode,nowVnode)进行diff操作
+ 比较两个节点(不管子节点)是否相同
+ 相同
  + 判断oldVnode有子节点,Vnode没有
  + 判断oldVnode没有子节点,Vnode有
  + 判断oldVnode,Vnode都有子节点
  + 判断oldVnode,Vnode都没有子节点,只有文本节点
  + 进行处理
+ 不相同
  + 更新节点
  + 返回新节点

+ patch函数
  + 判断两节点是否值得比较,值得比较则执行patchVnode
  + 如果两个节点都是一样的,那么就深入检查他们的子节点。如果两个节点不一样那就说明Vnode完全被改变了,就可以直接替换oldVnode。
  + 不值得比较则用Vnode替换oldVnode
+ patchVNode函数
  + 找到对应的真实dom,称为el
  + 判断Vnode和oldVnode是否指向同一个对象,如果是,那么直接return
  + 如果他们都有文本节点并且不相等,那么将el的文本节点设置为Vnode的文本节点。
  + 如果oldVnode有子节点而Vnode没有,则删除el的子节点
  + 如果oldVnode没有子节点而Vnode有,则将Vnode的子节点真实化之后添加到el
  + 如果两者都有子节点,则执行updateChildren函数比较子节点,这一步很重要
```ts
function patch (oldVnode, vnode) {
    // some code
    if (sameVnode(oldVnode, vnode)) {
    	patchVnode(oldVnode, vnode)
    } else {
    	const oEl = oldVnode.el // 当前oldVnode对应的真实元素节点
    	let parentEle = api.parentNode(oEl)  // 父元素
    	createEle(vnode)  // 根据Vnode生成新元素
    	if (parentEle !== null) {
            api.insertBefore(parentEle, vnode.el, api.nextSibling(oEl)) // 将新元素添加进父元素
            api.removeChild(parentEle, oldVnode.el)  // 移除以前的旧元素节点
            oldVnode = null
    	}
    }
    // some code
    return vnode
}

function sameVnode (a, b) {
  return (
    a.key === b.key &&  // key值
    a.tag === b.tag &&  // 标签名
    a.isComment === b.isComment &&  // 是否为注释节点
    // 是否都定义了data,data包含一些具体信息,例如onclick , style
    isDef(a.data) === isDef(b.data) &&
    sameInputType(a, b) // 当标签是<input>的时候,type必须相同
  )
}

patchVnode (oldVnode, vnode) {
    const el = vnode.el = oldVnode.el
    let i, oldCh = oldVnode.children, ch = vnode.children
    if (oldVnode === vnode) return
    if (oldVnode.text !== null && vnode.text !== null && oldVnode.text !== vnode.text) {
        api.setTextContent(el, vnode.text)
    }else {
        updateEle(el, vnode, oldVnode)
    	if (oldCh && ch && oldCh !== ch) {
            updateChildren(el, oldCh, ch)
    	}else if (ch){
            createEle(vnode) //create el's children dom
    	}else if (oldCh){
            api.removeChildren(el)
    	}
    }
}
```

## 移动端适配
+ flex布局，栅栏布局，流式布局(都设置为百分比)，媒体查询
+ 使用rem,em,vw,vh,注意em与rem区别,前者相对于父元素字体大小,后者相对于根元素大小(默认16px)
+ 需要缩放使用rem,em,不需要缩放的元素使用px
>meta
+ 通过js获取meta document.querySelector('meta[name=viewport]')
+ name="viewport"  意味着可移动缩放的窗口
+ content属性
  + width：控制 viewport 的大小,可以指定的一个值,如果 600,或者特殊的值,如 device-width 为设备的宽度（单位为缩放为 100% 时的 CSS 的像素）
  + height：和 width 相对应,指定高度
  + initial-scale：初始缩放比例,也即是当页面第一次 load 的时候缩放比例
  + maximum-scale：允许用户缩放到的最大比例
  + minimum-scale：允许用户缩放到的最小比例
  + user-scalable：用户是否可以手动缩放

> 在原生html中加事件使用onClick="click()",注意括号,否则不执行

## console对象
> assert()assert方法接受两个参数，第一个参数是表达式，第二个参数是字符串。只有当第一个参数为false，才会输出第二个参数，否则不会有任何结果。

>clear()	清除当前控制台的所有输出，将光标回置到第一行。

>count()	用于计数，输出它被调用了多少次。

>error()	输出信息时，在最前面加一个红色的叉，表示出错，同时会显示错误发生的堆栈。

>info()	console.log 别名，输出信息

>warn()	输出警告信息

>dir() 查看对象信息

# 性能优化
>前端性能优化手段从以下几个方面入手：加载优化、执行优化、渲染优化、样式优化、脚本优化

>加载优化:减少HTTP请求、缓存资源、压缩代码、无阻塞、首屏加载、按需加载、预加载、压缩图像、减少Cookie、避免重定向、异步加载第三方资源

>执行优化：CSS写在头部，JS写在尾部并异步、避免img、iframe等的src为空、尽量避免重置图像大小、图像尽量避免使用DataURL

>渲染优化：设置viewport、减少DOM节点、优化动画、优化高频事件、GPU加速

>样式优化：避免在HTML中书写style、避免CSS表达式、移除CSS空规则、正确使用display：display、不滥用float等

>脚本优化：减少重绘和回流、缓存DOM选择与计算、缓存.length的值、尽量使用事件代理、尽量使用id选择器、touch事件优化

>加载优化

+ 减少HTTP请求：尽量减少页面的请求数(首次加载同时请求数不能超过4个)，移动设备浏览器同时响应请求为4个请求(Android支持4个，iOS5+支持6个)
  + 合并CSS和JS
  + 使用CSS精灵图
+ 缓存资源：使用缓存可减少向服务器的请求数，节省加载时间，所有静态资源都要在服务器端设置缓存，并且尽量使用长缓存(使用时间戳更新缓存)
  + 缓存一切可缓存的资源
  + 使用长缓存
  + 使用外联的样式和脚本
  + 压缩代码：减少资源大小可加快网页显示速度，对代码进行压缩，并在服务器端设置GZip

+ 压缩代码(多余的缩进、空格和换行符)
  + 启用Gzip
  + 无阻塞：头部内联的样式和脚本会阻塞页面的渲染，样式放在头部并使用link方式引入，脚本放在尾部并使用异步方式加载

+ 首屏加载：首屏快速显示可大大提升用户对页面速度的感知，应尽量针对首屏的快速显示做优化
  + 将小图片内联为Data URL，也可以额减小HTTP的请求数量，浏览器缓存并不会存储Data URL格式的图片，放在css的background-image属性中即可。**注意Data URL在渲染和CPU消耗上更大**
  + 使用骨架屏,即未显示时的暂用页面
  + 减少HTTP请求数量
  + 减少请求资源的大小
  + 减少不必要的代码
  + 图片懒加载，路由懒加载

+ 按需加载：将不影响首屏的资源和当前屏幕不用的资源放到用户需要时才加载，可大大提升显示速度和降低总体流量(按需加载会导致大量重绘，影响渲染性能)
  + 懒加载
  + 滚屏加载
  + Media Query加载

+ 预加载：大型资源页面可使用Loading，资源加载完成后再显示页面，但加载时间过长，会造成用户流失
  + 可感知Loading：进入页面时Loading
  + 不可感知Loading：提前加载下一页

+ 压缩图像：使用图像时选择最合适的格式和大小，然后使用工具压缩，同时在代码中用srcset来按需显示(过度压缩图像大小影响图像显示效果)
  + 使用TinyJpg和TinyPng压缩图像
  + 使用CSS3、SVG、IconFont代替图像
  + 使用img的srcset按需加载图像
  + 选择合适的图像：webp优于jpg，png8优于gif
  + 选择合适的大小：首次加载不大于1014kb、不宽于640px
  + PS切图时D端图像保存质量为80，M端图像保存质量为60

+ 减少Cookie：Cookie会影响加载速度，静态资源域名不使用Cookie
+ 避免重定向：重定向会影响加载速度，在服务器正确设置避免重定向
+ 异步加载第三方资源：第三方资源不可控会影响页面的加载和显示，要异步加载第三方资源

>执行优化

+ CSS写在头部，JS写在尾部并异步
+ 避免img、iframe等的src为空：空src会重新加载当前页面，影响速度和效率
+ 尽量避免重置图像大小：多次重置图像大小会引发图像的多次重绘，影响性能
+ 图像尽量避免使用DataURL：DataURL图像没有使用图像的压缩算法，文件会变大，并且要解码后再渲染，加载慢耗时长

>渲染优化
+ 设置viewport：HTML的viewport可加速页面的渲染
+ 减少DOM节点：DOM节点太多影响页面的渲染，尽量减少DOM节点
+ 优化动画
  + 尽量使用CSS3动画
  + 合理使用requestAnimationFrame动画代替setTimeout
  + 适当使用Canvas动画：5个元素以内使用CSS动画，5个元素以上使用Canvas动画，iOS8+可使用WebGL动画
  + 优化高频事件：scroll、touchmove等事件可导致多次渲染
+ 函数节流
+ 函数防抖
+ 使用requestAnimationFrame监听帧变化：使得在正确的时间进行渲染
+ 增加响应变化的时间间隔：减少重绘次数
+ GPU加速：使用某些HTML5标签和CSS3属性会触发GPU渲染，请合理使用(过渡使用会引发手机耗电量增加)
  + HTML标签：video、canvas、webgl
  + CSS属性：opacity、transform、transition

## 浏览器渲染
1、输入url发送请求
2、加载html文件
3、加载完后解析html，并在解析的过程中构建DOM树
解析遇到link、script、img标签时，浏览器会向服务器发送请求资源。
script的加载或者执行都会阻塞html解析、其他下载线程以及渲染线程。
link加载完css后会解析为CSSOM(层叠样式表对象模型,一棵仅含有样式信息的树)。css的加载和解析不会阻塞html的解析，但会阻塞渲染树。
img的加载不会阻塞html的解析，但img加载后并不渲染，它需要等待Render Tree生成完后才和Render Tree一起渲染出来。未下载完的图片需等下载完后才渲染。
4、当css解析为CSSOM后，html解析为DOM后，两者一边解析一边生成Render Tree(渲染树)。
5、Layout: 计算出Render Tree每个节点的具体位置。
6、Painting：通过显卡，将Layout后的节点内容(含已下载图片)分别呈现到屏幕上。
+ 注意
  + 图片资源不会阻塞浏览器渲染
  + src是引用外部资源，在请求src资源时会暂停其他资源的下载和处理，直到该资源加载完毕
  + 除了js脚本，其他外部资源不阻塞渲染，js脚本阻塞渲染并不是因为他是src引入的，而是因为他有可能改变DOM树或CSSOM树

### 合成js和css
>当css解析器遇到一个html的注释标记<! - -在一个css文件里面，这个标记会被忽略掉。

>当js的解析器遇到这个标记时，他会将它看成是//,因此后面的所有代码都会被当作注释。
```ts
<! --  /*
function show(){
       alert(‘hello’)
}
<! --      */
<! – body{ background-color:red}
//分别由css解析和js解析之后的结果。
Css:
/*
function show(){alert(‘hello’)}
*/
Body {…}
Js:
// /*
function show(){…}
// */
//body{…}

<link type="text/css" rel="stylesheet" href="test.jscss" />
<script type="text/javascript" language="javascript" src="test.jscss"></script>
```

# 安全.
>前端常见安全问题的7个方面：
+ iframe
+ opener
+ CSRF（跨站请求伪造）
+ XSS（跨站脚本攻击）
+ ClickJacking（点击劫持）
+ HSTS（HTTP严格传输安全）
+ CND劫持

>将引用类型作为形参,可理解为a=obj,之后对象属性的修改可以影响到对象，但如果是赋值，则将a的引用指针指向其他地方，不修改obj
```ts
function pc(a){
    a.red ='grey'
}
function pa(a){
    a = {
        red:'blue'
    }
}
let obj = {
    red:'red'
}
console.log(obj)//{ red: 'red' }
pc(obj)
console.log(obj)//{ red: 'grey' }
pa(obj)
console.log(obj)//{ red: 'grey' }
```

## 状态码
1XX系列：指定客户端应相应的某些动作，代表请求已被接受，需要继续处理。由于 HTTP/1.0 协议中没有定义任何 1xx 状态码，所以除非在某些试验条件下，服务器禁止向此类客户端发送 1xx 响应。

2XX系列：代表请求已成功被服务器接收、理解、并接受。这系列中最常见的有200、201状态码。

3XX系列：代表需要客户端采取进一步的操作才能完成请求，这些状态码用来重定向，后续的请求地址（重定向目标）在本次响应的 Location 域中指明。这系列中最常见的有301、302状态码。

4XX系列：表示请求错误。代表了客户端看起来可能发生了错误，妨碍了服务器的处理。常见有：401、404状态码。

5xx系列：代表了服务器在处理请求的过程中有错误或者异常状态发生，也有可能是服务器意识到以当前的软硬件资源无法完成对请求的处理。常见有500、503状态码。

>2开头 （请求成功）表示成功处理了请求的状态代码。
200 （成功） 服务器已成功处理了请求。 通常，这表示服务器提供了请求的网页。
201 （已创建） 请求成功并且服务器创建了新的资源。
202 （已接受） 服务器已接受请求，但尚未处理。
203 （非授权信息） 服务器已成功处理了请求，但返回的信息可能来自另一来源。
204 （无内容） 服务器成功处理了请求，但没有返回任何内容。
205 （重置内容） 服务器成功处理了请求，但没有返回任何内容。
206 （部分内容） 服务器成功处理了部分 GET 请求。

>3开头 （请求被重定向）表示要完成请求，需要进一步操作。 通常，这些状态代码用来重定向。
300 （多种选择） 针对请求，服务器可执行多种操作。 服务器可根据请求者 (user agent) 选择一项操作，或提供操作列表供请求者选择。
301 （永久移动） 请求的网页已永久移动到新位置。 服务器返回此响应（对 GET 或 HEAD 请求的响应）时，会自动将请求者转到新位置。
302 （临时移动） 服务器目前从不同位置的网页响应请求，但请求者应继续使用原有位置来进行以后的请求。
303 （查看其他位置） 请求者应当对不同的位置使用单独的 GET 请求来检索响应时，服务器返回此代码。
304 （未修改） 自从上次请求后，请求的网页未修改过。 服务器返回此响应时，不会返回网页内容。
305 （使用代理） 请求者只能使用代理访问请求的网页。 如果服务器返回此响应，还表示请求者应使用代理。
307 （临时重定向） 服务器目前从不同位置的网页响应请求，但请求者应继续使用原有位置来进行以后的请求。

>4开头 （请求错误）这些状态代码表示请求可能出错，妨碍了服务器的处理。
400 （错误请求） 服务器不理解请求的语法。
401 （未授权） 请求要求身份验证。 对于需要登录的网页，服务器可能返回此响应。
403 （禁止） 服务器拒绝请求。
404 （未找到） 服务器找不到请求的网页。
405 （方法禁用） 禁用请求中指定的方法。
406 （不接受） 无法使用请求的内容特性响应请求的网页。
407 （需要代理授权） 此状态代码与 401（未授权）类似，但指定请求者应当授权使用代理。
408 （请求超时） 服务器等候请求时发生超时。
409 （冲突） 服务器在完成请求时发生冲突。 服务器必须在响应中包含有关冲突的信息。
410 （已删除） 如果请求的资源已永久删除，服务器就会返回此响应。
411 （需要有效长度） 服务器不接受不含有效内容长度标头字段的请求。
412 （未满足前提条件） 服务器未满足请求者在请求中设置的其中一个前提条件。
413 （请求实体过大） 服务器无法处理请求，因为请求实体过大，超出服务器的处理能力。
414 （请求的 URI 过长） 请求的 URI（通常为网址）过长，服务器无法处理。
415 （不支持的媒体类型） 请求的格式不受请求页面的支持。
416 （请求范围不符合要求） 如果页面无法提供请求的范围，则服务器会返回此状态代码。
417 （未满足期望值） 服务器未满足"期望"请求标头字段的要求。

>5开头（服务器错误）这些状态代码表示服务器在尝试处理请求时发生内部错误。 这些错误可能是服务器本身的错误，而不是请求出错。
500 （服务器内部错误） 服务器遇到错误，无法完成请求。
501 （尚未实施） 服务器不具备完成请求的功能。 例如，服务器无法识别请求方法时可能会返回此代码。
502 （错误网关） 服务器作为网关或代理，从上游服务器收到无效响应。
503 （服务不可用） 服务器目前无法使用（由于超载或停机维护）。 通常，这只是暂时状态。
504 （网关超时） 服务器作为网关或代理，但是没有及时从上游服务器收到请求。
505 （HTTP 版本不受支持） 服务器不支持请求中所用的 HTTP 协议版本。

```ts
async function f(){
    let a = await s()
    let c = await b()
    let d = await Promise.reject(1).catch(err=>err)
    console.log(1 === a,a)
    console.log(1 === c,c)
    console.log(1 === d,d)
}
async function s() {
    return 1
}
function b() {
    return 1
}
f()
```

### EventTarget.addEventListener()
该方法接受三个参数。
+ type：事件名称，大小写敏感。
+ listener：监听函数。事件发生时，会调用该监听函数。也可以是一个具有handleEvent方法的对象
+ useCapture：布尔值，如果设为true，表示监听函数将在捕获阶段（capture）触发。该参数可选，默认值为false（监听函数只在冒泡阶段被触发）。也可以是一个监听器配置对象
  + capture：布尔值，如果设为true，表示监听函数在捕获阶段触发，默认为false，在冒泡阶段触发。
  + once：布尔值，如果设为true，表示监听函数执行一次就会自动移除，后面将不再监听该事件。该属性默认值为false。
  + passive：布尔值，设为true时，表示禁止监听函数调用preventDefault()方法。如果调用了，浏览器将忽略这个要求，并在控制台输出一条警告。该属性默认值为false。
  + signal：该属性的值为一个 AbortSignal 对象，为监听器设置了一个信号通道，用来在需要时发出信号，移除监听函数。

### EventTarget.removeEventListener()
+ 移除添加的事件监听函数，没有返回值
+ 第一个参数是事件类型，大小写敏感
+ 第二个参数必须是addEventListener()方法在同一元素节点上添加的监听函数
+ 第三个参数也要和addEventListener()第三个参数一致

## Window.location对象
>http://127.0.0.1:5501/demo.html
>location.protocal	协议    (http)
>location.hostname	主机名    (127.0.0.1)
>location.host	主机      (127.0.0.1:5501)
>location.port	端口号    (5501)
>location.pathname	访问页面  (/demo.html)
>location.search	搜索内容  ('')
>location.hash	哈希值  ('')

## 同源页面间的跨页面通信
+ 广播模式
+ LocalStorage(当storage修改会触发storage事件)
+ cookie(同源可以跨页面)
+ Websocket
+ iframe(用iframe当做桥梁， iframe 与父页面间可以通过指定origin来忽略同源限制)
+ postmessage


## 路由跳转前保存信息
```
beforeRouteLeave(TO, FROM,next) {
      const answer = window.confirm('您的信息还未保存，是否保存呢')
    if (answer) {
        next()
    } else {
        next(false)
    }
  },
```

## 数组的find，findIndex，filter
+ 三者参数列表都是(fn,index,arr)，当fn返回true时获取该值，否则跳过
+ find是获取第一个fn返回true的**元素值(number)**
+ findIndex是获取第一个fn返回true的**元素索引(number)**
+ filter是获取fn返回true的所有元素的**数组(array)**


## Proxy 代理
```js
let star = {
    name: "mch",
    age: 22,
    phone: "123"
}
let handler = {
    get(target, property) {
        if(property === "phone") {
            return 12345;
        }else if(property === "price") {
            return 1600000;
        }else if(property === "age") {
            return 3;
        }
        else {
            return "不可透露";
        }
    },
    set(target, property, value) {
        if(property === "customPrice") {
            if(value < 1600000) {
                throw new Error("the price must be higher")
            }else {
                target[property] = value;
                return true;
            }
        }else {
            return "无法修改";
        }
    }

let agent = new Proxy(star, handler);
console.log(agent.phone);
console.log(agent.price);

console.log(agent.age);
console.log(agent.customPrice)
agent.customPrice = 1600000
```

>在 HTML 页面中，如果在执行脚本，页面的状态是不可相应的，直到脚本执行完成后，页面才变成可相应

## 判断数据类型
+ typeof null - object
+ typeof NaN - number
+ == 操作符的强制类型转换规则？
+ 对于 == 来说，如果对比双方的类型不一样，就会进行类型转换。假如对比 x 和 y 是否相同，就会进行如下判断流程：
+ 首先会判断两者类型是否**相同，**相同的话就比较两者的大小；
+ 类型不相同的话，就会进行类型转换；
+ 会先判断是否在对比 null 和 undefined，是的话就会返回 true
+ 判断两者类型是否为 string 和 number，是的话就会将字符串转换为 number
+ 判断其中一方是否为 boolean，是的话就会把 boolean 转为 number 再进行判断
+ 判断其中一方是否为 object 且另一方为 string、number 或者 symbol，是的话就会把 object 转为原始类型再进行判断

```ts
console.log((2).constructor === Number); // true
console.log((true).constructor === Boolean); // true
console.log(('str').constructor === String); // true
console.log(([]).constructor === Array); // true
console.log((function() {}).constructor === Function); // true
console.log(({}).constructor === Object); // true
```

```ts
console.log(2 instanceof Number);                    // false
console.log(true instanceof Boolean);                // false
console.log('str' instanceof String);                // false

console.log([] instanceof Array);                    // true
console.log(function(){} instanceof Function);       // true
console.log({} instanceof Object);                   // true
```
constructor有两个作用，一是判断数据的类型，二是对象实例通过 constrcutor 对象访问它的构造函数。需要注意，如果创建一个对象来改变它的原型，constructor就不能用来判断数据类型了

>判断数组的方式有哪些

+ 通过Object.prototype.toString.call()做判断
+ Object.prototype.toString.call(obj).slice(8,-1) === 'Array';
+ obj.__proto__ === Array.prototype;
+ Array.isArrray(obj);
+ obj instanceof Array
+ Array.prototype.isPrototypeOf(obj)


+ 0.1+0.2 ! == 0.3，如何让其相等
  + (n1 + n2).toFixed(2)

+ Object.is() 与比较操作符 “===”、“==” 的区别？

+ 使用双等号（==）进行相等判断时，如果两边的类型不一致，则会进行强制类型转化后再进行比较。
+ 使用三等号（===）进行相等判断时，如果两边的类型不一致时，不会做强制类型准换，直接返回 false。
+ 使用 Object.is 来进行相等判断时，一般情况下和三等号的判断相同，它处理了一些特殊的情况，比如 -0 和 +0 不再相等，两个 NaN 是相等的。

>对于<和>比较符
如果两边都是字符串，则比较字母表顺序：
```ts
'ca' < 'bd' // false
'a' < 'b' // true
```

```ts
var a = {}
a > 2 // false
```
>其对比过程如下：
a.valueOf() // {}, 上面提到过，ToPrimitive默认type为number，所以先valueOf，结果还是个对象，下一步
a.toString() // "[object Object]"，现在是一个字符串了
Number(a.toString()) // NaN，根据上面 < 和 > 操作符的规则，要转换成数字
NaN > 2 //false，得出比较结果


```ts
var a = {name:'Jack'}
var b = {age: 18}
a + b // "[object Object][object Object]"
```
>a.valueOf() // {}，上面提到过，ToPrimitive默认type为number，所以先valueOf，结果还是个对象，下一步
>a.toString() // "[object Object]"
>b.valueOf() // 同理
>b.toString() // "[object Object]"
>a + b // "[object Object][object Object]"

```ts
let bar = { a: 1, b: 2 };
let baz = Object.assign({}, bar); // { a: 1, b: 2 }
//等价于
let baz= {...bar}
```

## 类数组转换为数组
1.通过 call 调用数组的 slice 方法来实现转换
Array.prototype.slice.call(arrayLike);

2.通过 call 调用数组的 splice 方法来实现转换
Array.prototype.splice.call(arrayLike, 0);

3.通过 apply 调用数组的 concat 方法来实现转换
Array.prototype.concat.apply([], arrayLike);

4.通过 Array.from 方法来实现转换
Array.from(arrayLike)

```ts
function a(){
   b=1      //左查询在全局生成全局变量
   console.log(b,c,cd)//1 undefined [Function: cd]
   var c=1
   function cd(){}
}
a()
console.log(b,c,cd) //1  c和cd not defined
```
不能访问函数内部的属性，若想要在内部创建全局变量则用隐式声明(左查询)