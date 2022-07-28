class Observer{
    constructor(data){
        this.observe(data);
    }
    observe(data){
        if(data && typeof data === 'object'){
            Object.keys(data).forEach(key=>{
                this.defineReactive(data,key,data[key]);
            })
        }
    }
    defineReactive(obj,key,value){
        this.observe(value);
        const dep = new Dep();
        Object.defineProperty(obj,key,{
            get(){
                Dep.target&&dep.addSub(Dep.target)
                return value;
            },
            set(newVal){
                if(newVal === value)return;
                value=newVal;
                dep.notify();
            }
        });
    }
}