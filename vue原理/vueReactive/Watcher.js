class Watcher{
    constructor(vm,expr,cb){
        this.vm=vm;
        this.expr=expr;
        this.cb=cb;
        this.oldValue=this.getOldValue();
    }
    getOldValue(){
        Dep.target=this;
        let oldValue=compileUtil.getval(this.expr,this.vm);
        Dep.target=null;
        return oldValue;
    }
    update(){
        let newValue=compileUtil.getval(this.expr,this.vm);
        if(newValue!==this.oldValue){
            this.cb(newValue);
        }
    }
}