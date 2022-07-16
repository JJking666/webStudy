## json-server

+ `json-server --watch db.json --port 3004` 用`3004`端口运行
+ 或者在`package.json`中配置
+ 之后启动服务 `npm run mock`

### 过滤条件

+ 默认使用id过滤
  + `http://localhost:3004/fruits/1`
+ `_page`选择页数 `_limit`选择个数
  + `http://localhost:3004/fruits?_page=2&_limit=5`
+ 可以使用键值对来过滤
  + `http://localhost:3004/users?name.nickname=zhangsan`
+ 使用`query`参数过滤
  + `http://localhost:3004/fruits?name=橘子`
+ 排序采用 `_sort` 来指定要排序的字段， `_order` 来指定排序是正排序还是逆排序`（asc | desc ，默认是asc）`
  + `http://localhost:3004/fruits?_sort=price&_order=desc`
+ slice的方式 和 Array.slice() 方法类似。采用 _start 来指定开始位置，_end 来指定结束位置、或者是用_limit来指定从开始位置起往后取几个数据
  + `http://localhost:3004/fruits?_start=2&_end=4`
  + `http://localhost:3004/fruits?_start=2&_limit=4`
+ 采用 _gte_lte 来设置一个取值范围
  + `http://localhost:3004/fruits?id_gte=4&id_lte=6`
+ 采用_ne来设置不包含某个值
  + `http://localhost:3004/fruits?id_ne=1&id_ne=10`
+ 采用_like来设置匹配某个字符串
  + `http://localhost:3004/fruits?name_like=果`
+ 全文搜索 Full-text search
  + `http://localhost:3004/fruits?q=3`

### 对数据库增删改查

+ get请求 获取数据
+ post请求 创建新数据
+ put请求 更新数据，若数据不存在则创建
+ delete请求 删除数据

```ts
//请求当中
method:'PUT',
data: {
    price: nowPrice // nowPrice会替换price或者新创建price：nowPrice
}
```

### 配置项

json-server允许我们把所有的配置放到一个配置文件中，这个配置文件一般命名为json_sever_config.json

json_sever_config.json
```ts
{
  "port": 3004,
  "watch": true,
  "static": "./public",
  "read-only": false,
  "no-cors": false,
  "no-gzip": false
}
```

package.json
```ts
{
    "scripts": {
        "mock": "json-server --c json_sever_config.json db.json"
    }
}
```