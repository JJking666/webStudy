# 服务器 
```ts
const express=require('express');
//导入student操作模块
const control = require('./control/student');
//body的解析
const bodyParser = require('body-parser')
//实例化express
const app=express();
//将body解析内容格式化
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//设置路由及方法get(地址，回调函数)
app.get('/', (req, res) => {
    console.log(req.body)
//send(返回内容（html||数据）)
    res.send('首页')
})
//跨域
app.all('/test', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

//设置路由及方法post(地址，回调函数)
app.post('/student', control.create)
app.get('/student',control.index)

app.get('/serve',(req, res) => {
    res.send('hello world')
})
//listen后加指定端口及回调函数
app.listen(3000,(err, res) => {
    if(err) {console.log(err)}
    else{console.log('http://localhost:3000/')}
})
```
+ 在postman中post请求body类型选择x-www-form-urlencoded
+ 收到后直接res.body.xxx接收
+ 注意接收到的是一个string类型，注意转换对象类型等