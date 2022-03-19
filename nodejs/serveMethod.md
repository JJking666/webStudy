# 对数据库暴露的model进行方法执行并返回：
```ts
//process.cwd()执行命令行的路径
//{createStu,getStu}为导入的model
const {createStu,getStu} =require(process.cwd() + '/model/stu')


//定义执行model操作（增加对象）异步方法
const create=async (req,res)=>{
//req.body为异步返回的内容，拿到申请体的数据(表单)
    let postData=await req.body
console.log(postData)
//执行createStu（model）增加对象
let rs = createStu(postData)
//返回数据
    if(rs){
        res.send({
            meta:{
                status: 200,
                msg:'Success'
            },
            data:null
        })
    }else{
        res.send({
            meta:{
                status:500,
                msg:'error'
            },
            data:null
        })
    }
}

//定义操作model（查询数据）异步方法
const index= async(req,res)=>{
//拿到申请体的数据(url中？后内容)
    let querys = await req.query;
    console.log(parseInt(querys.pageNum),parseInt(querys.pageSize))
    //getStu(model)查询数据并返回数据
    let data = await getStu(parseInt(querys.pageNum),parseInt(querys.pageSize))
    res.send({
        meta:{
            status: 200,
            msg:'Success'
        },
        data:data
    })
}


//暴露方法
module.exports = {
    create,
    index
}
```