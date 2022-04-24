## ec-echarts

>使用
1.先在git上clone下来项目
2.再将其中的ec-canvas文件夹拉入项目的components中，导入到全局或局部json中
3.注意需要给组件添加width和height，否则空白

+ 主要属性
    + xAxis
        + type 默认category连线 可选 value(适用表格中连续数据) time(时间轴) log(对数数据)
        + data 一个存数据的数组
    + yAxis 
        + type 与上面相似 常用value
        + data 一个存数据的数组
    + grid
        + top:类似padding-top 默认为60
        + width:整体宽度
        + height:整体高度
    + series 对数据体进行配置（数组）
        + data 存放数据数组
        + type 规定显示图类型
        + smooth 平滑曲线 值为true(0.5)或者0-1 1为最平滑
        + areaStyle 对数据体的背景进行设置
            + opacity 透明度
            + 颜色 #fff 或者渐变new echarts.graphic.LinearGradient(0, 0, 0, 1, [color1,color2])  0,0,0,1 代表右下左上 上1则是从上往下渐变