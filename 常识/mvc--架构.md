<!--
 * @Descripttion:
 * @version:
 * @Author: congsir
 * @Date: 2022-07-22 23:10:33
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-07-22 23:47:25
-->
##  MVC,MVP,mvvm

https://juejin.cn/post/6844903480126078989#heading-7 介绍mvc，mvp，mvvm

https://juejin.cn/post/6869943681957232654  介绍之间的关系

> mvc缺点：

对于繁杂的前端业务来说，每一个微小的事件都需要经过完整的这样一个流程(view和control是一对一)，对于开发来说非常不便捷，不但没有提升开发效率，反而降低了开发效率。

并且由于 View 也可以操作数据，导致许多的开发者直接在 View 中编写大量的业务逻辑代码，导致 Controller 变得越来越淡薄，失去意义。

> mvp缺点

与 MVC 相比，MVP 唯一的区别就在于这个 P（Presenter），这个 Presenter，可以理解为一个中间人，它完全负责 View 和 Model 之间的数据流动(view和presenter是多对一)，防止 View 和 Model 之间的直接交流：

事实上，从这个图就能看出，当应用逐渐增大的时候，Presenter 一定会逐渐变得臃肿，难以维护。
有缺陷，就有变革，MVVM 就很好的继承了 MVP 分离 View 和 Model 的优点，又解决了中间层过与庞大臃肿的问题。

