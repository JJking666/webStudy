+ node与npm环境
// 安装npm和node
  + sudo apt update
  + sudo apt install nodejs npm
// 安装n模块(npm)
  + npm install -g n
// 安装最新稳定版本
  + n stable

# node
  + 打包除node_modules外的文件成zip
  + 在/usr/local/ 创建server目录
  + 在目录中解压zip
  + 开放服务器端口！！！
  + 可直接node运行
  + 安装pm2 //关闭服务器依旧运行
  + pm list //查看
  + pm start serve.js //启动
  + https://blog.csdn.net/qq_36850813/article/details/98967807


# mongodb
  + 安装mongo环境
  + 从本地数据库中获取集合collections
  + 在远程数据库中创建数据库
  + 并添加集合 insertMany
  + 注意mongodb.conf中bind_ip设置=0.0.0.0 //外网可访问自身ip
  + 注意mongodb.conf中fork设置=true   //数据库关闭可用
  + mongodb的bin同级添加db(数据存储位置)并在mongodb.conf中设置
  + mongodb的bin同级添加mongodb.log(日志)并在mongodb.conf中设置
  + https://juejin.cn/post/6844904186983743502


# nginx
  + 安装完
  + 打包前端项目(zip)
  + 在html中unzip前端项目
  + 删除index.html
  + 可在nginx.conf 设置端口

+ https://www.bilibili.com/video/BV15V411U7Vd?p=6
+ https://www.bilibili.com/video/BV1uJ411T7ks?spm_id_from=333.999.0.0
