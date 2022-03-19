## 数据库：
```ts
//导入mongoose模块
const mongoose = require('mongoose')
//mongoose连接数据库'mongodb://账号:密码@地址/(数据库名)'
mongoose.connect('mongodb://127.0.0.1:27017/mch', (err, db) => {
  if (err) { console.log(err); return }
  console.log('connect successly!')
})

//建立Schema并取得实例
const Schema = mongoose.Schema;
//对象属性必须和数据库中对象属性名及类型相同
const stuSchema = new Schema({
  //也可增加配置uname:{type:string,require,unique,max,min,maxlength,minlength,index}
  uname: String,
  age: Number,
  sex: String,
});
//获取model ,且model()参数 1:模型名称（首字母大写），参数 2:Schema，参数3:数据库集合名称
//若不带第三参数，则集合默认为第一个参数+s
const stu = mongoose.model('Stu', stuSchema, 'stu');

//暴露model
module.exports = {
  stu
};
```

+ postman使用get传入的对象需要通过JSON.parse转化为JSON对象
+ 查询语句的model的属性必须跟Schema中一致，否则无效(包括默认的_id!)
+ 数据库集合创建时，若没有指定id，则会有默认objectid类型的id（会影响lookup连接）
+ 查询objectid类型的id
```ts
let mongoose = require('mongoose')
let data1 = {
	'_id':mongoose.Types.ObjectId(data)
}
//且传入id不需要双引号如id=416516516516516
```
+ 通过以下修改为string
```ts
db.User.find({
	_id: {
		$type: "objectId"
	}
}).forEach(function(doc) {
	var oldid = doc._id;
	doc._id = doc._id.valueOf();
	db.User.insert(doc);
	db.User.remove({
		_id: oldid
	});
})
```

## 管道查询
```ts
relationshipModel.aggregate([{
	$lookup: {
		from: 'User',
		localField: 'UserID',
		foreignField: '_id',
		as: 'common'
	}
}])
.then(data => data)
.catch(err => console.log(err))
```
## 修改
```ts
// {multi: true}更新多条
blogModel.update({title: "Mongoose"}, {author: "L"}, {multi: true}, function(err, docs){
    if(err) console.log(err);
    console.log('更改成功：' + docs);
})
//主要方式
updateClassTableData: (data1,data2) => {
		let objData1 =(new Function("","return "+data1))();   //指定id
		let objData2 =(new Function("","return "+data2))();   //修改后的数据
		// let objData=JSON.parse(data)
		return classTableModel.updateMany(objData1,objData2)  //第一个参数选择id，第二个参数为修改的数据，与update类似
			.then(data => data)
			.catch(err => console.log(1,err))
	},
```

## 删除
```ts
blogModel.remove({author: "L"}, function(err, docs){
    if(err) console.log(err);
    console.log('删除成功：' + docs);
})
```

## 条件查询
```ts
blogModel.find({meta.votes: {$lt: 100}});
blogModel.find({title: {$in: ['Mongoose', 'Mongodb', 'Nodejs']}});
blogModel.find({ $and: [
    {meta.votes: {$gte: 50}},
    {meta.votes: {$lt: 100}}
]});
blogModel.find({ title: { $regex: "Mongoose.+","$options":"i"}});
blogModel.find({ $where: 'this.comments.length === 10 || this.name.length === 5' });
blogModel.find( tags: 'mongoose').skip(10).limit(5).sort("{ meta.votes: 1}");
```

## 管道操作
+ $group	将collection中的document分组，可用于统计结果
+ $match	过滤数据，只输出符合结果的文档
+ $project	修改输入文档的结构(例如重命名，增加、删除字段，创建结算结果等)
+ $sort	将结果进行排序后输出
+ $limit	限制管道输出的结果个数
+ $skip	跳过制定数量的结果，并且返回剩下的结果
+ $unwind	将数组类型的字段进行拆分

+ $sum	计算总和，{$sum: 1}表示返回总和×1的值(即总和的数量),使用{$sum: '$制定字段'}也能直接获取制定字段的值的总和
+ db.collection.aggregate([{$group : + {_id : "$by_user", content_sum : {$sum : "$likes"}}}])
+ $avg	平均值	db.collection.aggregate([{$group : {_id : "$by_user", content_sum : {$avg : "$likes"}}}])
+ $min	获取集合中所有文档对应值得最小值	db.collection.aggregate([{$group : {_id : "$by_user", content_sum : {$min : "$likes"}}}])
+ $max	获取集合中所有文档对应值得最大值	db.collection.aggregate([{$group : {_id : "$by_user", content_sum : {$max : "$likes"}}}])
+ $push	在结果文档中插入值到一个数组中	db.collection.aggregate([{$group : {_id : "$by_user", url : {$push : "$url"}}}])
+ $addToSet	在结果文档中插入值到一个数组中，但不创建副本	db.collection.aggregate([{$group : {_id : "$by_user", url : {$addToSet : "$url"}}}])
+ $first	根据资源文档的排序获取第一个文档数据	db.collection.aggregate([{$group : {_id : "$by_user", url : {$first : "$url"}}}])
+ $last	根据资源文档的排序获取最后一个文档数据	db.collection.aggregate([{$group : {_id : "$by_user", url : {$last : "$url"}}}])
