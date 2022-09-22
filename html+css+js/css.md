css
_外边距合并：当两个垂直外边距相遇时，它们将形成一个外边距。合并后的外边距的高度等于两个发生合并的外边距的高度中的较大者。_

## 文本

- 文本从右往左写：direction: rtl;unicode-bidi: bidi-override;
- 文本每一行的宽度相等 text-align:justify
- text-decoration
  - overline 上划线
  - line-through 删除线
  - underline 下划线
- text-indent: 50px; //第一行的缩进长度
- letter-spacing //字符间的宽度
- line-height //行高
- word-spacing //单词间距
- white-space: nowrap;//设置是否换行
- text-shadow: 2px 2px 5px red, 0 0 25px blue, 0 0 5px darkblue; //方向 x 方向 y 模糊效果 颜色 可叠加
  - h-shadow 必需。水平阴影的位置。允许负值。
  - v-shadow 必需。垂直阴影的位置。允许负值。
  - blur 可选。模糊距离。
  - spread 可选。阴影的尺寸。
  - color 可选。阴影的颜色。请参阅 CSS 颜色值。
- text-overflow:ellipsis(省略号)/clip(裁剪)一般和 white-space:nowrap; overflow:hidden;搭配
- word-break 换行规则
  - keep-all 单词太长会整个单词直接换行，只在分隔符-换行
  - break-all 单词太长会在任意字符分割换行
  - break-word; 允许长单词被切断
- writing-mode
  - horizontal-tb 水平书写单词
  - vertical-rl 垂直书写单词

## 字体

- 百分比与 em 结合使用

```ts
    body{
        font-size:100%;
    }
    h1{
        font-size:1em;//默认等于16px
    }
```

- 响应式大小 与 vw 结合使用
- 使用谷歌字体<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Sofia">
- 属性
  - font-style:italic|normal

## background

- background-color
  - 若使用 opacity 会影响子文本的透明度
  - 可使用 rabg()设置透明度
- background-image
  - 渐变
    - linear-gradient 线性渐变
      - background-image: (repeating-)linear-gradient(to right,red, yellow 10%, green 20%); //方向 颜色 百分比位置
    - (repeating-)设置重复
    - radial-gradient 径向渐变
      - background-image: radial-gradient(circle, red, yellow, green); //circle 圆 默认为 ellipse 椭圆
  - 可设置多重背景

```ts
//放在前面的图片优先级更高
#example1 {
  background-image: url(flower.gif), url(paper.gif);
  background-position: right bottom, left top;
  background-repeat: no-repeat, repeat;
  background-size: 50px, 130px, auto;
}
```

- background-repeat
  - 设置重复方向和次数
  - no-repeat，repeat-x/y
- background-attachment(设置背景图像是否随网页滚动或固定)
  - fixed
  - scroll
- background-position(设置背景图像位置)
  - left:
  - top
- background-origin(相对于内容框来定位背景图像)
  - border-box
  - padding-box
  - content-box （若设置 margin 和 padding，则背景不包括两者）
  - 注意：background-origin 属性规定 background-position 属性相对于什么位置来定位。
- background-clip(背景裁剪)
  - border-box
  - padding-box
  - content-box （若设置 margin 和 padding，则背景不包括两者）
- background-size
  - width，height(宽高)
  - cover 把背景图像扩展至足够大，以使背景图像完全覆盖背景区域。（追求完全覆盖背景）
  - percentage 以父元素的百分比来设置背景图像的宽度和高度。
  - contain 把图像图像扩展至最大尺寸，以使其宽度和高度完全适应内容区域。（追求图片完全放入）

## border

- type
  - dotted - 定义点线边框
  - dashed - 定义虚线边框
  - solid - 定义实线边框
  - double - 定义双边框
  - groove - 定义 3D 坡口边框。效果取决于 border-color 值
  - ridge - 定义 3D 脊线边框。效果取决于 border-color 值
  - inset - 定义 3D inset 边框。效果取决于 border-color 值
  - outset - 定义 3D outset 边框。效果取决于 border-color 值
  - none - 定义无边框
  - hidden - 定义隐藏边框
- border-image 可设置图片作为边框
- box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);//叠加可增加黑的浓度

## display

- block:总是从新行开始，并占据整行（不允许在行中包含其他块元素）
- inline：不从新行开始，仅占用所需的宽度
- inline-block:结合 block 和 inline，能够改变自身大小和设置 margin，且行内可添加其他行内元素
- none:隐藏元素（元素不占位）
  - visibility：hidden（元素占位）

## position

- static:默认情况下元素都是 static，元素不会以任何特殊方式定位；它始终根据页面的正常流进行定位，静态定位的元素不受 top、bottom、left 和 right 属性的影响。
- relation：元素相对于其正常位置进行定位。设置相对定位的元素的 top、right、bottom 和 left 属性将导致其偏离其正常位置进行调整。
- fixed：元素是相对于视口定位的，这意味着即使滚动页面，它也始终位于同一位置。
  - 如果祖先元素设置了transform不为none，则定义视口修改为该祖先(即fixed失效情况)
  - 因此fixed元素应该尽可能放在外层
- absolute：元素相对于最近的定位祖先元素（非 static 一般是 relation）进行定位，如果绝对定位的元素没有祖先，它将使用文档主体（body），并随页面滚动一起移动。
- sticky：元素根据用户的滚动位置进行定位。（一般用于导航，一开始在某个位置，向下移动页面后固定在页面上方）可设置 top 等（必须指定一个）
- 所有定位属性：bottom，top，left，right，clip（裁剪），top，position，z-index

## overflow

- visible 默认，溢出的元素可见
- hidden 溢出的元素被裁剪不可见
- scroll 增加滚动条查看内容
- auto 仅在必要时增加滚动条

## float

- 属性：left，right，none，inherit
- float 的元素本身不在原来的位置占位，而是在浮动后的位置占位

## clear

- none - 允许两侧都有浮动元素。默认值
- left - 左侧不允许浮动元素
- right- 右侧不允许浮动元素
- both - 左侧或右侧均不允许浮动元素
- inherit - 元素继承其父级的 clear 值
- 一般与 float 配合使用

- div p 匹配 div 所有后代
- div >p 匹配 div 的子元素 p
- div+p 匹配与所有与 div 同级的随后一个 p 元素
- div~ p 匹配与 div 同级的所有 p 元素

## 对齐

- 水平居中
  - 使用水平居中 margin：auto 时，必须设置 width
  - text-align：center 元素内居中文本使用。
  - 在 display：block 基础上使用 margin-left 和 right：auto
- 左右对齐
  - position：absolute + left：0；
  - float：left；
- 垂直居中
  - padding
  - line-height=height
  - position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);
- display: flex;justify-content: center;align-items: center;
- 垂直对齐
  - vertical-align:top 对齐线在上方
  - vertical-align:middle 对齐线在最低的元素中央
  - vertical-align:bottom 对齐线在下方
- 使用 text-align: justify;可使得每一行宽度相等

## 伪类

- 作用
  - 设置鼠标悬停在元素上时的样式
  - 为已访问和未访问链接设置不同的样式
  - 设置元素获得焦点时的样式
- 属性
  - link 未访问的链接
  - visited 已访问的链接
  - hover 鼠标悬停
  - active 已选择(点击)

```ts
div:hover p {
  display: block;
}
```

- 其他
  - p:first-child:选择父元素内第一个且类型为 p 子元素
    - p i:first-child 匹配所有 p 元素里的第一个 i
  - input:check 选择每个被选中的 input 元素
  - input:disabled 选择每个被禁用的 input 元素
  - p:empty 选择没有子元素的每个 p 元素
  - p:first-of-type 选择同级 p 元素中的第一个 p 元素
  - first-child 和 first-of-type 区别:
    - 前者选择父类第一个子元素(若第一个子元素是 p，而设置了 h2 则选择不到）
    - 后者选择同级的第一个元素
  - input:focus 选择获得焦点的 input
  - :not(p)选择每个非 p 的元素
  - :last-chlid 与 last-of-type 见上 first
  - p:nth-child(2)选择同级第二个且类型为 p 的元素
  - p:nth-of-type(2) 选择同级第二个 p 元素
  - p:nth-last-child(2)选择同级倒数第二个且类型为 p 的元素
  - p:nth-last-of-type(2) 选择同级倒数第二个 p 元素
  - p:root 选择 p 元素的根元素
  - input:valid 选择拥有有效值的输入框

### 伪元素

_CSS 伪元素用于设置元素指定部分的样式。_

- 用处
  - 设置元素的首字母、首行的样式
  - 在元素的内容之前或之后插入内容
- 属性
  - p::after 在 p 元素前加入伪元素
  - p::before 在 p 元素后加入伪元素
    - 伪元素必带属性 content，可带属性如 color，font-size 等
    - content 可以是符号，文本，图片，图标
  - ::first-line 伪元素用于向文本的首行添加特殊样式。（应用于块级元素）
  - ::first-letter 伪元素用于向文本的首字母添加特殊样式.
  - ::selection 伪元素匹配用户选择的元素部分。
    - 可用属性 color，background，cursor，outline

### outline

- 作用：轮廓是在元素周围绘制的一条线，在边框之外，以凸显元素。
- 属性
  - outline-style
    - dotted - 定义点状的轮廓。
    - dashed - 定义虚线的轮廓。
    - solid - 定义实线的轮廓。
    - double - 定义双线的轮廓。
    - groove - 定义 3D 凹槽轮廓。（3D 效果取决于 color）
    - ridge - 定义 3D 凸槽轮廓。
    - inset - 定义 3D 凹边轮廓。
    - outset - 定义 3D 凸边轮廓。
    - none - 定义无轮廓。
    - hidden - 定义隐藏的轮廓。
  - outline-color
  - outline-width
  - outline-offset 向外偏移类似 margin
  - outline

```css
p.ex3 {
  outline: 5px solid yellow;
}
p.ex4 {
  outline: thick ridge pink;
}
```

- opacity 透明度（0-1）
  _注意：若设置 opacity 的盒子里有文本，文本也会随 opacity 变化_
  _解决该问题的办法是使用 background: rgba(76, 175, 80, 0.1)第四个参数来设置透明度_

### ul

- 带有默认的符号和 margin，padding
- li 是块级元素
- li 的样式

```ts
//样式
list-style-type: circle|square|upper-roman|lower-alpha      //空心圆，实心方块，罗马数字，小写字母
//可设置为图片
ul {
  list-style-image: url('sqpurple.gif');
}
//初始化，改变默认参数
ul{
  list-style-type: none;
  margin: 0;
  padding: 0;
}
//li水平布置
li {
  display: inline;
}
```

### 表格

- 合并边框 border-collapse: collapse;

```ts
<table>
  <tr>
    <th>Firstname</th>
    <th>Lastname</th>
  </tr>
  <tr>
    <td>Bill</td>
    <td>Gates</td>
  </tr>
  <tr>
    <td>Steve</td>
    <td>Jobs</td>
  </tr>
</table>
```

### 图像精灵

- 作用
  - 图像精灵是单个图像中包含的图像集合。
  - 包含许多图像的网页可能需要很长时间才能加载，同时会生成多个服务器请求。
  - 使用图像精灵将减少服务器请求的数量并节约带宽。
  - 即将多个图片拼接成一个，导入时只导入一张图片，加载也是一张，通过增加参数从大图片中拿出小图片

```css
设 home ，prev ，next是大图片从左到右三张小图片 #home {
  left: 0px; //放置的位置
  width: 46px; //截取小图片的宽度
  background: url("img_navsprites.gif") 0 0; //0 0即最左
}
#prev {
  left: 63px;
  width: 43px;
  background: url("img_navsprites.gif") -47px 0; //-47 0即中间
}
#next {
  left: 129px;
  width: 43px;
  background: url("img_navsprites.gif") -91px 0; //-91 0即最右
}
```

# 表单

- input
  - type
    - text
    - password
    - number
  - 在输入时改变样式使用：focus
  - 想在输入框中使用图标可以使用 background-image 属性，并将其与 background-position 属性一起设置
- select
  - 与 option 结合使用

```css
<form>
  <select id="country" name="country">
  <option value="au">Australia</option>
  <option value="ca">Canada</option>
  <option value="usa">USA</option>
  </select>
</form>
```

- button
  - type
    - button //按钮
    - submit //提交表单
    - reset //清空输入框

## 属性选择器

- a[t]{} 选择带有 t 属性的 a 标签
- a[t=“t1”]{} 选择带有 t 属性且值=“t1”的 a 标签
- a[href*="w3school"]选择其 href 属性值包含子串 "w3school" 的每个 `<a>` 元素。
- a[t^=“t1”]{} 选择带有 t 属性且值以“t1”开头的 a 标签(值是“t1???”)。
- a[href$=".pdf"]选择其 href 属性值以 ".pdf" 结尾的每个` <a>` 元素。

## 相对长度

- em 相对于元素的字体大小（font-size）（2em 表示当前字体大小的 2 倍） 试一试
- ex 相对于当前字体的 x-height(极少使用) 试一试
- ch 相对于 "0"（零）的宽度 试一试
- rem 相对于根元素的字体大小（font-size） 试一试
- vw 相对于视口\*宽度的 1% 试一试
- vh 相对于视口\*高度的 1% 试一试
- vmin 相对于视口\*较小尺寸的 1％ 试一试
- vmax 相对于视口\*较大尺寸的 1％ 试一试
- % 相对于父元素 试一试

### transform

- 2D
  - translate() //平移
  - rotate() //转角度单位 deg
  - scaleX() //水平放大
  - scaleY() //垂直放大
  - scale() //整体放大 两个参数即 x，y
  - skewX() //水平倾斜
  - skewY() //垂直倾斜
  - skew() //整体倾斜 两个参数即 x，y
  - matrix() //简写
- 3D
  - translate3d(x,y,z) 定义 3D 转化。
  - translateX(x) 定义 3D 转化，仅使用用于 X 轴的值。
  - translateY(y) 定义 3D 转化，仅使用用于 Y 轴的值。
  - translateZ(z) 定义 3D 转化，仅使用用于 Z 轴的值。
  - scale3d(x,y,z) 定义 3D 缩放转换。
  - scaleX(x) 定义 3D 缩放转换，通过给定一个 X 轴的值。
  - scaleY(y) 定义 3D 缩放转换，通过给定一个 Y 轴的值。
  - scaleZ(z) 定义 3D 缩放转换，通过给定一个 Z 轴的值。
  - rotate3d(x,y,z,angle) 定义 3D 旋转。
  - rotateX(angle) 定义沿 X 轴的 3D 旋转。
  - rotateY(angle) 定义沿 Y 轴的 3D 旋转。
  - rotateZ(angle) 定义沿 Z 轴的 3D 旋转。
  - perspective(n) 定义 3D 转换元素的透视视图。//元素距离视图的距离

### transition 过渡

- transition 简写属性，用于将四个过渡属性设置为单一属性。
- transition-delay 规定过渡效果的延迟（以秒计）。
- transition-duration 规定过渡效果要持续多少秒或毫秒。
- transition-property 规定过渡效果所针对的 CSS 属性的名称。
- transition-timing-function 规定过渡效果的速度曲线。
  ```ts
  transition: width 2s linear 1s;
  ```

## animation 动画

- animation-iteration-count 次数 n||infinite 无限次
- animation-direction 属性可接受以下值：
  - normal - 动画正常播放（向前）。默认值
  - reverse - 动画以反方向播放（向后）
  - alternate - 动画先向前播放，然后向后
  - alternate-reverse - 动画先向后播放，然后向前
- animation-timing-function 属性可接受以下值：
  - ease - 指定从慢速开始，然后加快，然后缓慢结束的动画（默认）
  - linear - 规定从开始到结束的速度相同的动画
  - ease-in - 规定慢速开始的动画
  - ease-out - 规定慢速结束的动画
  - ease-in-out - 指定开始和结束较慢的动画
  - cubic-bezier(n,n,n,n) - 运行您在三次贝塞尔函数中定义自己的值

```css
/* 动画代码 */
@keyframes example {
  0% {
    background-color: red;
    left: 0px;
    top: 0px;
  }
  25% {
    background-color: yellow;
    left: 200px;
    top: 0px;
  }
  50% {
    background-color: blue;
    left: 200px;
    top: 200px;
  }
  75% {
    background-color: green;
    left: 0px;
    top: 200px;
  }
  100% {
    background-color: red;
    left: 0px;
    top: 0px;
  }
}
/* 应用动画的元素 */
div {
  width: 100px;
  height: 100px;
  position: relative;
  background-color: red;
  animation-name: example;
  animation-duration: 4s;
}
```

## image

- object-fit: cover； //常用，保留长宽比”或者“展开并占用尽可能多的空间（非常好用！）
  - fill - 默认值。调整替换后的内容大小，以填充元素的内容框。如有必要，将拉伸或挤压物体以适应该对象。
  - contain - 缩放替换后的内容以保持其纵横比，同时将其放入元素的内容框。 //常用，比例缩小至原始
  - cover - 调整替换内容的大小，以在填充元素的整个内容框时保持其长宽比。该对象将被裁剪以适应。
  - none - 不对替换的内容调整大小。
  - scale-down - 调整内容大小就像没有指定内容或包含内容一样（将导致较小的具体对象尺寸）
- filter 滤镜
  - blur(px)对图像应用模糊效果。较大的值将产生更多的模糊。
  - brightness(%) 调整图像的亮度。0％ 将使图像完全变黑。
  - contrast(%) 对比度
  - grayscale(%) 黑白

### 多列

- column-count: 3; 可将内部内容分成 3 列
- column-gap: 40px; 指定列宽
- column-rule-style: solid; 指定列之间样式
- column-rule-width 指定列之间样式宽度
- column-rule-color: lightblue; 指定列之间样式颜色
- column-width: 100px; 指定列宽
- column-span 规定一个元素应该跨越多少列。

- CSS sprites(精灵图)
- 允许你将一个页面涉及到的所有零星图片都包含到一张大图中去
- 利用 CSS 的 “background-image”，“background-repeat”，“background-position” 的组合进行背景定位
- CSS Sprites 虽然增加了总的图片的字节，但是很好地减少网页的 http 请求，从而大大的提高页面的性能(错误，减少了字节)
- CSS Sprites 整理起来更为方便，同一个按钮不同状态的图片也不需要一个个切割出来并个别命名
- 难维护，灵活性低

- flex:1 代表 flex-grow flex-shrink flex-basis 的缩写 值为(1 1 0%)
- 若 flex-basis 为 auto 那么元素大小比例与内容相关
- flex-basis 和 width 属性同时存在时，width 属性不生效，flex item 的宽度为 flex-basis 设置的宽度

### html

- !DOCTYPE 标签:
  - 指示浏览器使用哪个 html 版本进行编写的指令
- head:
  - 是头部元素的容器，绝大多数头部标签不会显示给读者
- body:
  - 用于定义文档的主体，包含了文档的所有内容
  - 该标签支持 html 的全局属性和事件属性

#### audio

- 属性
  - preload 预加载
  - duration 媒体文件时间
  - currentTime 获取当前时间
- 方法
  - load() 加载音频、视频软件
  - play() 加载并播放音频、视频文件或重新播放暂停的的音频、视频
  - pause() 暂停音频
- 事件
- loadstart 客户端开始请求数据
- progress 客户端正在请求数据（或者说正在缓冲）
- play play()和 autoplay 播放时
- pause pause()方法促发时
- ended 当前播放结束
- timeupdate 当前播放时间发生改变的时候。播放中常用的时间处理哦
- canplaythrough 歌曲已经载入完全完成
- canplay 缓冲至目前可播放状态。

### 使用自定义字体

> /_ 定义字体 _/
> @font-face{
> font-family: myFont;
> src: url('Sansation_Light.ttf'),

       url('Sansation_Light.eot');     /* IE9+ */

}

#### outline-offset

> outline-offset 属性对轮廓进行偏移，并在超出边框边缘的位置绘制轮廓。
> 轮廓与边框有两点不同：
> 轮廓不占用空间；
> 轮廓可能是非矩形；
> /_ 规定边框边缘之外 15 像素处的轮廓 _/
> div{
> border:2px solid black;
> outline:2px solid red;
> outline-offset:15px;
> }

### 重绘和重排(回流)

> 重排(Reflow)：当渲染树的一部分必须更新并且节点的尺寸发生了变化，浏览器会使渲染树中受到影响的部分失效，并重新构造渲染树。

> 重绘(Repaint)：是在一个元素的外观被改变所触发的浏览器行为，浏览器会根据元素的新属性重新绘制，使元素呈现新的外观。比如改变某个元素的背景色、文字颜色、边框颜色等等

> 区别：重绘不一定需要重排（比如颜色的改变），重排必然导致重绘（比如改变网页位置)

> 简单理解即元素的大小位置布局改变则是重排,否则是重绘

> 引发重排
> 4.1 添加、删除可见的 dom
> 4.2 元素的位置改变
> 4.3 元素的尺寸改变(外边距、内边距、边框厚度、宽高、等几何属性)
> 4.4 页面渲染初始化
> 4.5 浏览器窗口尺寸改变
> 4.6 获取某些属性。当获取一些属性时，浏览器为取得正确的值也会触发重排,它会导致队列刷新

> 减少 reflow/repaint：
> （1）不要一条一条地修改 DOM 的样式。可以先定义好 css 的 class，然后修改 DOM 的 className。
> （2）不要把 DOM 结点的属性值放在一个循环里当成循环里的变量。
> （3）为动画的 HTML 元件使用 fixed 或 absoult 的 position，那么修改他们的 CSS 是不会 reflow 的。
> （4）千万不要使用 table 布局。因为可能很小的一个小改动会造成整个 table 的重新布局。

> background-attachment

控制背景是否随内容滚动而滚动

- fixed 背景固定，不随内容滚动而滚动
- scorll 默认 随内容滚动而滚动
- local 随元素滚动而滚动

> background-position

控制背景图片在整体背景的 xx 部分出现(top right 右上)

> 百分比

height、width属性的百分比依托于父标签的宽高，但是其他盒子属性则不完全依赖父元素
+ 子元素的top/left和bottom/right如果设置百分比，则相对于直接非static定位(默认定位)的父元素的高度/宽度

+ 子元素的padding如果设置百分比，不论是垂直方向或者是水平方向，都相对于直接父亲元素的width，而与父元素的height无关。

+ 子元素的margin如果设置成百分比，不论是垂直方向还是水平方向，都相对于直接父元素的width

+ border-radius不一样，如果设置border-radius为百分比，则是相对于自身的宽度

> 子元素使用margin-top无效，且会导致父元素margin-top为子元素设置的margin-top
+ 给父元素设置border
+ 将父元素设置为bfc

>单行文字省略和多行文字省略

```css
//单行
.demo {
    overflow: hidden;
    white-space: nowrap;
    text-overflow:ellipsis;
}
//多行
.demo {
    position: relative;
    line-height: 20px;
    height: 40px;
    overflow: hidden;
    margin-bottom: 50px;
    word-break: break-all;
}
.demo::after {
    content: "..."; //省略号
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0 2px 0 10px;
}
```

> 伪元素的优缺点

+ 优点
  + 减少dom节点数，
  + 让css解决部分html和js问题
  + 有利于seo
+ 缺点
  + 不是真正的页面元素，不会出现在dom树，无法使用js操作，
  + 无法对它设置属性或事件

> colgroup

+ 只能在table中使用，用来控制列
+ span是横跨列数，align是内容在水平的位置，vertical是水平的位置
+ 可以添加style来对列进行操作

```ts
<table width="100%" border="1">
  <colgroup span="2" align="left"></colgroup>
  <colgroup align="right" style="color:#0000FF;"></colgroup>
  <tr>
    <th>ISBN</th>
    <th>Title</th>
    <th>Price</th>
  </tr>
  <tr>
    <td>3476896</td>
    <td>My first HTML</td>
    <td>$53</td>
  </tr>
</table>
```

> 常用布局区别

https://juejin.cn/post/6844904202641080333

> 百分比计算

https://zhuanlan.zhihu.com/p/93084661

> 获取距离


e.pageX、e.clientX、e.screenX、e.offsetX的区别以及元素的一些CSS属性

e.pageX，e.pageY：返回的值是相对于文档的定位，文档的左上角为(0,0)，向右为正，向下为正，IE不支持；

e.clientX，e.clientY：返回的值是相对于屏幕可见区域的坐标，如果页面有滚动条，呗滚动条隐藏的那部分不进行计算，也可以说是相对于屏幕的坐标，但是不计算上方的工具栏；

e.screenX，e.screenY：返回的是相对于屏幕的坐标，浏览器上面的工具栏；

e.offsetX，e.offsetY：返回的是相对于第一个定位父元素的坐标，和e.pageX，e.pageY作用相同，但是只有IE支持。

.scrollTop()：如果一个元素有滚动条，则返回的是滚动条滚动的长度；
同理.scrollLeft()

.width()：返回的是元素的宽度，这个宽度不包含padding，border，margin，同理.height()；支持写操作，$n1.height( 20 );


.innerWidth()：返回的是元素的宽度，这个宽度包含padding，但不包含border与margin，同理.innerHeight()；支持写操作，$n1.innerWidth( 20 );

.outerWidth()：返回的是元素的宽度，这个宽度包含padding，border，但不包含margin，同理.outerHeight()；

.outerWidth(true)：此时返回的宽度也包含margin了

https://blog.csdn.net/stanwuc/article/details/101068744

https://www.cnblogs.com/jsydb/p/12344622.html

> margin:auto;

此时垂直方向margin为设置为0，水平为居中

> 硬件加速(Gpu加速)

触发Gpu加速的属性:
+ transform
+ opacity
+ will-change
+ filter

正常情况浏览器会将内容分到不同图层进行渲染，而触发GPU渲染会创建一个新的复合图层进行渲染，然后再合并图层

css 中可以使用 gpu 加速渲染来减轻 cpu 压力，使得页面体验更流畅,但也会消耗内存
注意: 如果有一个元素，它的兄弟元素在复合层中渲染，而这个兄弟元素的z-index比较小，那么这个元素（不管是不是应用了硬件加速样式）也会被放到复合层中

> text-align

适用于inline元素和文字进行水平居中

> margin:0 auto

适用于设置了宽的block元素进行水平居中

> vertical-align

父元素必须是inline或者inline-block元素，适用于inline和inline-block元素垂直居中

> line-height

只适用于inline元素垂直居中，注意line-height可以取代height(若height不存在)