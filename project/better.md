<!--
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-04-25 22:25:01
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2023-01-06 23:17:20
 * @FilePath: \webStudy\project\better.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

1. 通用插件
   1. eslint 保存时自动校验 eslint, 并格式化代码 (必须)
   2. Better Comments, 优化注释的显示颜色 (推荐)
   3. npm, package.json 相关
   4. npm-scripts, 管理 package.json scripts (推荐)
   5. GitLens, 显示当前行的最新提交描述
   6. Git History, 支持右键查看文件的提交历史
2. 微信小程序插件
   1. minapp 小程序语法高亮 (推荐)
   2. wechat-snippet 小程序常用代码片段 (推荐)

> 填写表单注意点：

- 给表单所有的字段设置一个常量文件，给所有需要的地方都设置为常量，避免全局修改
- 对表单可以设置 id，类型等熟悉，方便根据属性进行操作
- 对于有很多不同组件的长表单
  - 可以通过设置每一项的属性(type 对应属性，require 对应是否必需)之后 v-for 来渲染
  - 或者组件化传入配置，但是需要根据每一项进行设置较多数据

## 下拉刷新更新更多历史

- 一个内容框有多个日期，每个日期有多个记录，故使用二维数组
- 第一次因为没有当前日期，故第一次直接加入到一个数组项且初始化当前日期
- 设置一个当前日期
  - 如果当前记录的日期等于当前日期则加入一个数组项
  - 若不等于，那么将数组项加到总数组中，然后将当前记录加入到一个新的数组项，设置新的当前日期
- 因为初始化时最后一个记录肯定没机会(走了第一个选项)加入到总数组，因此需要设置初始化时最后额外将数组项加入到总数组
- 之后刷新获取更多记录
- 对第一个记录进行判断(因为时间最邻近可能是同日期)
  - 若该记录的日期与总数组第一项中的日期相同，那么设置当前日期，并将总数组第一项复制给数组项，再将记录加入到数组项
    - 因为当前这次刷新获取的记录是直接加入到之前总数组里的，故不能重复加入
    - 进行判断如果总数组的第一项的第一个记录 id 等于当前数组项的第一个记录 id，说明两个数组是一样的，则不再加入
  - 若不同，那么没有当前日期，第一次直接加入到一个数组项且初始化当前日期

> 优化下拉刷新获取更多历史

- 使用 map 代替二维数组，这样更加准确地对应日期(键)与记录(数组)的关系(键值对)
- 这样直接通过 map 来增加日期对应的记录，而不需要经过多次判断
- 渲染日期时直接用一个数组代表 map 的键(原生小程序 wxml 不支持 map.keys())，之后直接 wx:for 渲染 map 对应日期的记录数组

> 好用插件：

unplugin-vue-components 可以在 Vue 文件中自动引入组件（包括项目自身的组件和各种组件库中的组件）
