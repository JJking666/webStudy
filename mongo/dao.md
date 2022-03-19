# 操作数据库model
```ts
//引入stumodel
require(stu)
//数据库增加对象方法
const createStu = (stuInfo) => {
//实例化传入对象
  const student = new stu(stuInfo);
  //save()增加对象，then后返回增加的对象
  return student.save()
    .then(res => {
      return res
    })
    .catch(err => { console.log(err);})
}
//数据库分页查询方法
const getStu =(pageNum,pageSize)=>{
  return stu.find().skip((pageNum-1)*pageSize).limit(pageSize)
  .then(res => res)
  .catch(err => { console.log(err);return []})
}
//暴露方法
module.exports = {
  createStu,
  getStu,
};