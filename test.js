/*
 * @Descripttion:
 * @version:
 * @Author: congsir
 * @Date: 2022-07-09 23:01:46
 * @LastEditors: JJking666 1337802617@qq.com
 * @LastEditTime: 2023-02-10 14:12:41
 */

// let n = parseInt(readline())
function Foo() {
  console.log(2);
  getName = function () {
    console.log(1);
  };
  return this;
}
Foo.prototype.getName = function () {
  console.log(4);
};
new new Foo().getName(); // 3
