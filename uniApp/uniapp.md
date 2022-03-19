## 插件
+ 图片裁剪
+ uni.createSelectorQuery()获取布局位置来兼容版本
	+ 用在组件实例上，需要id，且需要组件实例(this)，可获取组件的布局位置
	+ top垂直从y1开始，bottom垂直从y2结束，left和right类推
	+ 且可获得组件的长宽
	```ts
	const query = uni.createSelectorQuery().in(this);
	query.select('#top').boundingClientRect(data => {
	  console.log("得到布局位置信息" + JSON.stringify(data));
	  console.log("节点离页面顶部的距离为" + data.top);
	}).exec();
	```
+ 流式布局

## 公共样式
+ 图片大小
+ 颜色
+ 字体sm md lg
+ 两边边距
+
## v-bind使用类和style
+ :class = "t? 't1': '' "  假如t为真则加入t1的类名，否则设置为''即不加
+ :class=" [t?'t1':'',s?'t2':'']" 设置多组动态类名用数组


## 动画
+ 在组件中使用：animation = “animationdata1”
+ 定义方法，创建一个animation1对象，设置其属性。
+ 之后animation.scale(2.0).opacity(0.8).step()放大和透明变化是同时的
+ animation.scale(2.0).step(),animation.opacity(0.8).step不是同时的
+ 之后this.animatiodata1= animation1.export()导出即可

## 多行文字的最后一行居中
+ text-align-last: center;

+ text不能输入，需要用textarea
+ 复选框使用<label><checkbox value="cb" checked="true" />选中</label>
+ input type中没有checkbox等
+ border-radius设置rpx和%效果不同，rpx设置四个角，%设置整体圆或椭圆

+ 可空白留白
  ```ts
  white-space: pre-wrap;
	word-break: break-all;
	```
## textarea
+ @linechange 换行触发
+ line-height 通常是120%
+ 多行文本省略
```ts
display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
```

//换行序号
```ts
lineChange(e){
				if(e.detail["lineCount"]==0){
					this.textData=this.lineCount+'.'+this.textData
				}else{
					this.textData=this.textData+this.lineCount+'.'
				}
				this.lineCount++
			}
```

## uni.$on和uni.$emit
+ this与vc中不同 最好methods中先let that =this
+ 回调函数先写好放在methods中

##生命周期
+ this指向vc

+ 短信息（复制成功）
```ts
uni.showLoading({
				    title: '加载中'
				});
```
//选择框(出现在中间)
```ts
uni.showModal({
    title: '提示',
    content: '这是一个模态弹窗',
    success: function (res) {
        if (res.confirm) {
            console.log('用户点击确定');
        } else if (res.cancel) {
            console.log('用户点击取消');
        }
    }
});
```
//选项框（底部）
```ts
uni.showActionSheet({
				    itemList: ['A', 'B', 'C'],
				    success: function (res) {
				        console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
				    },
				    fail: function (res) {
				        console.log(res.errMsg);
				    }
				});
```

## 便签排版
column-count: 2;column-gap: 1vw;  //多列


## 监听键盘高度
```ts
uni.onKeyboardHeightChange(res => {
			  console.log(res.height)
			})
```
+ tabbar和某些高度会影响获取的键盘高度



+ 在富文本组件中传属性res.height

+ position:abosolate有时会让overflow:scroll失效

## 动画只能触发一次
```ts
this.recordAnimation=this.animation1.export()
				setTimeout(() => {
					this.recordAnimation=null
				}, 100);
```
## animation
+ 有时候如果动画状态初始相同，它会不执行
```ts
如初始scale为0，此时执行下面动画，动画不执行
this.animation1.scale(0).step({ duration: 400 })
					this.bigrecord=this.textList[index].textvalue;
					this.animation1.scale(1.3).step({ duration: 500 })
```

+ 两个组件有一个需要初始化(获得context，但也需要初始化数据)，另一个提供初始化数据，
可以通过异步实现
setTimeout(()=>{uni.$emit('getUser',this.creationData)},500)

## 富文本
```ts
//获得富文本上下文
let that = this;
uni.createSelectorQuery().select('#editor').context((res) => {
					that.editorCtx = res.context
				}).exec()
//修改富文本内容
this.editorCtx.setContents({
					html:this.sb,
				})
```

## json
```ts
let a = '["a","b","c"]';// √
let b = "['a','b','c']";// X

// 对象
let a1 = '{"name":"听风是风","age":"26"}';// √
let b1 = "{'name':'听风是风','age':'26'}";// X

console.log(JSON.parse(a))// Array
console.log(JSON.parse(a1))// Object
console.log(JSON.parse(b))// 报错
console.log(JSON.parse(b1))// 报错
//例子
let data='{"Account":"'+this.Account+'","Password":"'+this.Password+'","Email":"'+this.Account+'"}'

//将不准确安全的json转化为安全的json格式
let objData =(new Function("","return "+data))();
```

## 页面跳转
```ts
//先使用navigateTo页面跳转
uni.navigateTo({
    url:'***?id='+ something,
})
//之后在onload中获取数据
onLoad(option){
	let id = option.id
}
```

## this指向
+ 在uni.xxx中this指向会丢失，可以通过在uni.xxx外使用let that =this 访问闭包解决
+ 在success回调中this指向丢失，success使用箭头函数则this指向vue实例，注意访问data得用this.$data

## uni.request
```ts
//发送请求及参数
uni.request({
	url: 'http://127.0.0.1:3000/classTable/updateClassTable',
	data: {
		"data1": {
			"UserID":that.id
		},
		"data2": {
			"className": that.classTableData.className,
			"classNumber": that.classTableData.classNumber,
			"classPath": that.classTableData.classPath
		}
	},
})
.then(data => {
	let [err, res] = data
	console.log(2, err, res)
	that.update=0
})
//注意在后端接口中使用req.query接收data
app.get('/classTable/updateClassTable',(req,res)=>{
	let data1 = req.query.data1;
	let data2 = req.query.data2;
	console.log(3,data1,data2)
	classTableAction.updateClassTable(req,res,data1,data2)
})
```