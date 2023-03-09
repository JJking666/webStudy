/*
 * @Descripttion:
 * @version:
 * @Author: congsir
 * @Date: 2022-08-15 11:26:16
 * @LastEditors: JJking666 1337802617@qq.com
 * @LastEditTime: 2023-03-09 14:26:09
 */
function actionTime() {
  setInterval(() => {
    const date = new Date();
    let year = date.getFullYear();
    let nowYear = 366;
    let month = date.getMonth();
    let day = date.getDate();
    let hour = 24 - date.getHours();
    let min = 60 - date.getMinutes();
    let sec = 60 - date.getSeconds();
    const monthDay = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const node = document.querySelector(".box");

    if (year % 4 === 0 && year % 100 === 0) {
      monthDay[1] = 28;
      now = 355;
    }

    let days = day;
    for (let i = 0; i < month; i++) {
      days += monthDay[i];
    }

    days = nowYear - days;
    node.innerHTML = `${year}年还剩${days}天${hour}小时${min}分${sec}秒`;
  }, 1000);
  fetch("./index.json")
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}
actionTime();
