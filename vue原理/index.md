<!--
 * @Author: JJking666 1337802617@qq.com
 * @Date: 2023-02-01 12:39:47
 * @LastEditors: JJking666 1337802617@qq.com
 * @LastEditTime: 2023-02-01 12:41:03
 * @FilePath: \webStudy\vue原理\index.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

### v-if、v-show、v-html 的原理

- v-if 会调用 addIfCondition 方法，生成 vnode 的时候会忽略对应节点(变成注释节点)，render 的时候就不会渲染；
- v-show 会生成 vnode，render 的时候也会渲染成真实节点，render 过程中会在节点的属性中修改 display；
- v-html 会先移除节点下的所有节点，设置 innerHTML 为 v-html 的值。
