<!--
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-04-25 22:25:01
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2023-01-04 22:53:19
 * @FilePath: \webStudy\project\bug.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

## 小程序

1.float 父元素 子元素文本无法 text-align 居中 2.父元素垂直 flex，使用 align-items:center 后，子元素宽度无法修改 3.父元素垂直 flex,无法对子元素进行高宽度 margin 修改，但可以修改子子元素。

> git clone 报错 permission denied

1.重新配置秘钥 2.文件没有读写权限

- 安装 vant 后，需要安装 npm install semver-regex 才能执行

> 当引入 vant 后找不到文件
> (1)确保已经在 miniproject 文件里初始化 package.json,这样才可以进行后面的操作
> npm init -y
> (2)在 miniproject 文件里下载 npm 资源包
> npm i @vant/weapp -S --production
> (3)然后在 微信开发者工具 里面进行相关配置
> 进入 => 详情 => 本地设置 => 详情 => (勾选)使用 npm 模块
> (4)在开发者工具中构建 npm 包

```ts
"usingComponents": {
    "van-button": "/miniprogram_npm/@vant/weapp/button/index"
}
```

### 分页器 bug

背景：带有搜索条件的表格中，假设目前有 1000 条数据并处于最后一页(page 为 100，pageSize 为 10)，在更换搜索条件后没有重新进行搜索(保持分页器数据不变),再点击上一页(page 修改为 99)，就会出现请求中参数依旧是 page 为 99，pageSize 为 10，即数据为空，但此时分页器恢复正常比如当前条件下条数变为 200，分页器恢复成 page:20,pageSize:10，故分页器数据正常，请求所带参数不正常
解决：
给 page 和 pageSize 设置 watch 属性，被修改后拿着新数据(即正常分页器数据)去发起请求

```ts
watch；{
    page(){
        this.getTableData()
    }，
    pageSize(){
        this.getTableData()
    }
}
```

此时还有一种 bug 情况,即在更换条件后没有搜索(默认再次搜索数据条数变少),直接切换 pageSize 会导致 page 也切换，此时会触发两次`getTableData()`,因此需要加一个防抖效果

```ts
data(){
    return {
        timer:null
    }
}
watch；{
    page(){
        if(this.timer)clearTimeout(this.timer)
        this.timer= setTimeout(()=>{
        this.getTableData()
        },200)
    }，
    pageSize(){
        if(this.timer)clearTimeout(this.timer)
        this.timer= setTimeout(()=>{
        this.getTableData()
        },200)
    }
}
```
