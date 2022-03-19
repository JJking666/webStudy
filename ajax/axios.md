# axios
```ts
const xhr = new XMLHttpRequest();
//设置接受数据的格式json
xhr.setResponseType='json'
//设置申请头
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
//设置申请头及自定义数据
//xhr.setRequestHeader("name","mch")
//设置发生方式及地址
xhr.open('GET', 'http://127.0.0.1:3000/serve');
//发送请求
xhr.send();
//准备码为0：初始化| 1：open（）结束 |2：send（）结束|3：接收部分数据|4：接收全部数据
xhr.onreadystatechange = () => {
if(xhr.readyState==4){
            if (xhr.status >= 200 && xhr.status < 300) {
                 texts.innerHTML = xhr.response;
            }
        }
}
```

在vue的main.js中全局声明
```ts
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000/'
Vue.prototype.$http = axios
```

## 方法中异步调用
```ts

methods:{
    async getStuData(){
      const {data:res}= await axios.get('/student')
      this.sData=res.data;
    }
```


+ 解决跨域问题
+ 在app.get(url,cb)回调函数中加入 
+ res.header("Access-Control-Allow-Origin","*"); 		//请求域名无限制



+ 注意点：
+ Form表单提交发出的请求不是axios，res.send()返回的是一个页面
+ 而axios发出请求res.send()返回的是内容


* Nodejs中获取url中query使用url.query *
* 可通过Object.keys和Object.Value获取键值对 *

## 搜索关键词
```ts
const getPhoneModel = (inputData) =>{
    let sel = new RegExp(inputData)
    return phoneModel.find({name:sel})
    .then((res)=>{return res;})
    .catch(err => console.error(err))
}
```