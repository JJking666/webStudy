const obj = {
    age:18,
    name:'mch'
};

const handler =  {
    set:(tar,prop,newValue)=>{
        console.log(prop)
        if(prop === 'name') tar[prop] = newValue + '!!!';
        else tar[prop] = newValue
    },
    get:(tar,prop)=>{
        return tar[prop] + '@@'
    }
}

const test = new Proxy(obj,handler)
test.age = 105
test.name = 'ggg'

console.log(test.age,test.name,test,obj)
// age
// name
// 105@@ ggg!!!@@ { age: 105, name: 'ggg!!!' } { age: 105, name: 'ggg!!!' }