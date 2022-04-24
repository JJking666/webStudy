## 小程序

1.float父元素 子元素文本无法text-align居中
2.父元素垂直flex，使用align-items:center后，子元素宽度无法修改
3.父元素垂直flex,无法对子元素进行高宽度margin修改，但可以修改子子元素。

> git clone 报错 permission denied

1.重新配置秘钥
2.文件没有读写权限

+ 安装vant后，需要安装npm install semver-regex才能执行

> 当引入vant后找不到文件
(1)确保已经在miniproject文件里初始化package.json,这样才可以进行后面的操作
npm init -y
(2)在miniproject文件里下载npm资源包
npm i @vant/weapp -S --production
(3)然后在 微信开发者工具 里面进行相关配置
进入 => 详情 => 本地设置 => 详情 => (勾选)使用npm模块
(4)在开发者工具中构建npm包

```ts
"usingComponents": {
    "van-button": "/miniprogram_npm/@vant/weapp/button/index"
}
```