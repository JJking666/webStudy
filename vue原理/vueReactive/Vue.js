class Vue{
    constructor(options){
        this.$options = options;
        this.$el = options.el;
        this.$data = options.data;
        if(this.$el){
            new Observer(this.$data);       //观察者
            this.proxyData(this.$data)      //数据代理
            new Compiler(this.$el,this)     //解析模板指令
        }
    }
    proxyData(data){
        for(var key in data){
            Object.defineProperty(this.key,{
                get(){
                    return data[key];
                },
                set(newValue){
                    data[key] = newValue;
                }
            })
        }
    }
}