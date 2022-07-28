```ts
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

class compiler{
    constructor(el,vm){
        this.el = this.isElement(el) ? el :document.querySelector(el);
        this.vm = vm;
        // 因为每次匹配到进行替换时,会导致页面的回流和重绘,影响页面的性能
        // 所以需要创建文档碎片来进行缓存,减少页面的回流和重绘
        // 1.获取文档碎片对象
        const fragment = this.node2Fragment(this.el);       //获取文档碎片
        //编译模板
        this.compile(fragment);
        //将子元素内容加入根节点
        this.el.appendChild(fragment)
    }
    compile(fragment){
        const childNodes = fragment.childNodes;         //获取子元素
        [...childNodes].forEach((child)=>{              //遍历子元素
            if(this.isElement(child)){                  //判断是否元素节点
                this.compileElement(child);
            }else{                                      //否则是文本节点
                this.compileText(child);
            } 
            if(child.childNodes&&child.childNodes.length){      //如果有孩子节点则对孩子节点进行编译
                this.compile(child);
            }
        })       
    }
    node2Fragment(el){
        const fragment = document.createDocumentFragment();         //创建文档碎片对象
        let firstChild ;
        while(firstChild = el.firstChild){                          //将挂载节点第一个子元素赋值给firstchild
            fragment.appendChild(firstChild)                        //注意fragment.appendChild()有移动性（将子元素从el移到fragment下）
        }
        return fragment;                                            //返回文档碎片对象
    }
    isElement(node){
        return node.nodeType == 1;
    }
    isEventName(attrName){
        return attrName.startsWith("@");
    }
    isDirective(attrName){
        return attrName.startsWith("v-")
    }
    compileElement(node){                                               //对元素节点进行编译
        const attributes = node.attributes;                             //获取节点属性
        [...attributes].forEach((attr)=>{
            const {name,value} = attr;                                  //v-text:"123";
            if(this.isDirective(name)){                                 //判断是否为指令
                const [,directive] = name.spilt("-");                   //分割指令
                const [dirName,eventName] = directive.split(":");       //获取指令名及事件名
                compileUtil[dirName]&&compileUtil[dirName](node,value,this.vm,eventName) //编译对应指令text html
                node.removeAttribute("v-"+directive)                    //移除指令
            }else if(this.isEventName(name)){                           //非指令 @click等
                let [,eventName] = name.split("@");                     //获取事件名@click
                compileUtil['on'](node, value, this.vm, eventName)      //编译@click
            }
        })
    }
    compileText(node){                                                  //编译文本
        let reg = /\{\{(.*?)\}\}/;                                      //匹配{{person.value}}
        const content = node.textContent;                               //获取节点文本
        if(reg.test(content)){
            compileUtil['text'](node,content,this.vm)                   //匹配成功则对文本进行编译
        }
    }
    
}
//解析指令的方法
const compileUtil={
    getVal(expr,vm){                                                    //获取对应值
        return expr.split(".").reduce((data,cur)=>{
            return data[cur]
        },vm.$data)
    },
    getAttr(){},
    text(node,expr,vm){                                                 //将v-text传来的文本编译成原生文本
        let val;
        if(expr.indexOf("{{")!==-1){                                    //应对{{person.name}}--{{person.age}}
            val=expr.replace(/\{\{(.+)?\}\}/,(...args)=>{
                new Watcher(vm,args[1],()=>{                            //创建一个watcher实例进行监视{{person.name}}
                    this.updater.textUpdater(node,this.getContentVal(expr, vm));
                })
                return this.getVal(args[1],vm)                          //将正则匹配到的第一个字段返回给val
            })
        }else{
            val = this.getVal(expr,vm);                                 //应对person.name
        }
        this.updater.textUpdater(node,val)                              //将val赋值给node进行更新
    },
    html(node,expr,vm){                                                 //将v-html传来的文本编译成原生文本
        let val = this.getVal(expr,vm);                                 //获取对应值
        new Watcher(vm,expr,(newVal)=>{                                 //创建一个watcher实例进行监视
            this.updater.htmlUpdater(node, newVal);                     //v-html="person.name" 修改innerHtml
        })
        this.updater.htmlUpdater(node,val)                              //将val赋值给node进行更新
    },
    model(node,expr,vm){                                                //将v-model传来的文本设置监听事件进行绑定
        let val = this.getVal(expr,vm);
        new Watcher(vm, expr, (newVal) => {                              //创建一个watcher实例进行监视
            this.updater.modelUpdater(node, newVal);                    //更新node.value
        })
        // 视图==>数据
        node.addEventListener('input',(e)=>{                            //设置监听事件
            // 设置值
            this.setVal(vm,expr,e.target.value);
        },false);
        this.updater.modelUpdater(node,val)                             更新node.value
    },
    on(node,expr,vm,eventName){
        let fn =vm.$options.methods && vm.$options.methods[expr];
        node.addEventListener(eventName,fn.bind(vm),false)
    },
    bind(node,expr,vm,attrName){
        let attr = this.getVal(expr,vm)
        this.updater.attrUpdater(node,attrName,attrVal)
    },
    updater:{
        attrUpdater(node,attrName,attrVal){
            node.setAttribute(attrName,attrVal);
        },
        modelUpdater(node,value){node.value = value},
        textUpdater(node,value){node.textContent=value},
        htmlUpdater(node,value){node.innerHTML=value}
    }
}


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


class Dep{
    constructor(){
        this.subs=[]
    }
    addSub(watcher){
        this.subs.push(watcher)
    }
    notify(){
        this.subs.forEach(w=>w.update())
    }
}


class Watcher{
    constructor(vm,expr,cb){
        this.vm=vm;
        this.expr=expr;
        this.cb=cb;
        this.oldValue=this.getOldValue();
    }
    getOldValue(){
        Dep.target=this;
        let oldValue=compileUtil.getval(this.expr,this.vm);     //触发数据的get方法，Dep.target为watcher实例，dep添加watcher
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

vue.js 则是采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。
MVVM作为数据绑定的入口，整合Observer、Compile和Watcher三者，通过Observer来监听自己的model数据变化，通过Compile来解析编译模板指令，最终利用Watcher搭起Observer和Compile之间的通信桥梁，达到数据变化 -> 视图更新；视图交互变化(input) -> 数据model变更的双向绑定效果


注意点：
1.Dep与Watcher：
    Dep在解析模板时，每个结点初始化一个watcher观察者，watcher执行后Dep.target=this,调用compileUtil.getval()触发get，
则执行Dep.target&&dep.addSub(),将watcher观察者放入dep.sub(收集器)中，等到修改数据即调用了set()，则执行dep.notify，那
么触发所有watcher对应的回调函数(更新函数)进行更新数据。
2.Dep作用是在observe与watcher之间搭起桥梁，observe使用get来让dep添加属性的watcher，使用set来让dep触发notify使得所有wathcer对视图更新。
3.watcher是observe和compiler之间的桥梁，observe进行数据劫持，compiler进行模板解析(视图初始化)，操作dom进行数据更新。
watcher的作用是观察数据变化，在数据修改后，observe进行dep.notify触发后所有watcher(所有watcher相对应的结点)调用更新函数(compile)更新模板
```