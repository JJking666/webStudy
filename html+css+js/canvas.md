<!--
 * @Descripttion:
 * @version:
 * @Author: congsir
 * @Date: 2022-07-19 15:53:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-07-19 16:52:15
-->
## canvas

实例；(https://www.runoob.com/w3cnote/html5-canvas-intro.html)
API：(https://juejin.cn/post/6988046310146310180)

​支持 <canvas> 的浏览器会只渲染 <canvas> 标签，而忽略其中的替代内容。不支持 <canvas> 的浏览器则 会直接渲染替代内容。

用文本替换：

<canvas>
    你的浏览器不支持 canvas，请升级你的浏览器。
</canvas>
用 <img> 替换：

<canvas>
    <img src="./美女.jpg" alt=""> 
</canvas>
结束标签 </canvas> 不可省略。

与 <img> 元素不同，<canvas> 元素需要结束标签(</canvas>)。如果结束标签不存在，则文档的其余部分会被认为是替代内容，将不会显示出来。

> 获得 2d 上下文对象


```js
var canvas = document.getElementById('tutorial');

var ctx = canvas.getContext('2d');
```

> 检测支持性


```ts
var canvas = document.getElementById('tutorial');

if (canvas.getContext){
  var ctx = canvas.getContext('2d');
  // drawing code here
} else {
  // canvas-unsupported code here
}
```

> 创建Canvas

```ts
<canvas id="tutorial" width="300" height="300"></canvas>
<script type="text/javascript">
function draw(){
    var canvas = document.getElementById('tutorial');
    if(!canvas.getContext) return;
      var ctx = canvas.getContext("2d");
      //开始代码
    
}
draw();
</script>
```

> 创建长方体

以下实例绘制两个长方形：

实例
```ts
<canvas id="tutorial" width="300" height="300"></canvas>
<script type="text/javascript">
function draw(){
    var canvas = document.getElementById('tutorial');
    if(!canvas.getContext) return;
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgb(200,0,0)";
      //绘制矩形
    ctx.fillRect (10, 10, 55, 50);

    ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
    ctx.fillRect (30, 30, 55, 50);
}
draw();
</script>
```

+ fillRect(x, y, width, height)：绘制一个填充的矩形。
+ strokeRect(x, y, width, height)：绘制一个矩形的边框。
+ clearRect(x, y, widh, height)：清除指定的矩形区域，然后这块区域会变的完全透明。
+ beginPath() 新建一条路径，路径一旦创建成功，图形绘制命令被指向到路径上生成路径
+ moveTo(x, y) 把画笔移动到指定的坐标(x, y)。相当于设置路径的起始点坐标。
+ closePath() 闭合路径之后，图形绘制命令又重新指向到上下文中
+ stroke() 通过线条来绘制图形轮廓
+ fill() 通过填充路径的内容区域生成实心的图形

> 绘制线段
```ts
function draw(){
    var canvas = document.getElementById('tutorial');
    if (!canvas.getContext) return;
    var ctx = canvas.getContext("2d");
    ctx.beginPath(); //新建一条path
    ctx.moveTo(50, 50); //把画笔移动到指定的坐标
    ctx.lineTo(200, 50);  //绘制一条从当前位置到指定坐标(200, 50)的直线.
    //闭合路径。会拉一条从当前点到path起始点的直线。如果当前点与起始点重合，则什么都不做
    ctx.closePath();
    ctx.stroke(); //绘制路径。
}
draw();
```