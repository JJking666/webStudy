<!--
 * @Descripttion:
 * @version:
 * @Author: congsir
 * @Date: 2022-07-23 22:54:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-07-23 23:00:05
-->
> vuex和localstorage区别

+ 保存位置不同，vuex保存在浏览器内存，localstorage在本地文件
+ `vuex的数据可以进行响应式，localstorage不能`
+ vuex的全局状态管理可追踪，方便管理一目了然，而localstorage容易使数据混乱，难以管理
+ 安全性vuex更强，localstorage容易被用户直接查看
+ localstorage只能保存字符串(对象需要先json.stringify)
+ vuex一般是用作组件的状态管理，localstorage用作页面间数据保存
+ 生命周期不同
+ 保存内存大小不同