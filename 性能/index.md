<!--
 * @Descripttion:
 * @version:
 * @Author: congsir
 * @Date: 2022-09-29 23:28:15
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-29 23:36:10
-->
## 性能

> data url

优点
+ data url能够使图片不需要向服务器发http请求，只是要下载 (当图片很小的时候发请求很浪费)
  
缺点
+ Base64编码的图片体积是原来体积4/3
+ 会更加消耗性能
+ 不会被浏览器缓存，每次访问都需要重新下载
  + 解决办法，将图片放到css背景图中浏览器则会对它进行缓存