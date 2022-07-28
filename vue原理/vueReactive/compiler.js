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
            const {name,value} = attr; //v-text;
            if(this.isDirective(name)){
                const [,directive] = name.spilt("-");
                const [dirName,eventName] = directive.split(":");
                compileUtil[dirName]&&compileUtil[dirName](node,value,this.vm,eventName)
                node.removeAttribute("v-"+directive)
            }else if(this.isEventName(name)){
                let [,eventName] = name.split("@");
                compileUtil['on'](node, value, this.vm, eventName)
            }
        })
    }
    compileText(node){
        let reg = /\{\{(.*?)\}\}/;
        const content = node.textContent;
        if(reg.test(content)){
            compileUtil['text'](node,content,this.vm)
        }
    }
    
}
const compileUtil={
    getVal(expr,vm){
        return expr.split(".").reduce((data,cur)=>{
            return data[cur]
        },vm.$data)
    },
    getAttr(){},
    text(node,expr,vm){
        let val;
        if(expr.indexOf("{{")!==-1){
            val=expr.replace(/\{\{(.+)?\}\}/,(...args)=>{
                new Watcher(vm,args[1],()=>{
                    this.updater.textUpdater(node,this.getContentVal(expr, vm));
                })
                return this.getVal(args[1],vm)
            })
        }else{
            val = this.getVal(expr,vm);
        }
        this.updater.textUpdater(node,val)
    },
    html(node,expr,vm){
        let val = this.getVal(expr,vm);
        new Watcher(vm,expr,(newVal)=>{
            this.updater.htmlUpdater(node, newVal);
        })
        this.updater.htmlUpdater(node,val)
    },
    model(node,expr,vm){
        let val = this.getVal(expr,vm);
        new Watcher(vm, expr, (newVal) => {
            this.updater.modelUpdater(node, newVal);
        })
        // 视图==>数据
        node.addEventListener('input',(e)=>{
            // 设置值
            this.setVal(vm,expr,e.target.value);

        },false);
        this.updater.modelUpdater(node,val)
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