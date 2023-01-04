<!--
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2023-01-04 22:03:26
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2023-01-04 22:06:16
 * @FilePath: \webStudy\project\hook.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

### 日期

```ts
//得到本月、上月、下月的起始、结束日期
//n 不传或 0 代表本月，-1 代表上月，1 代表下月

function Timetools(num, n) {
var now = new Date()
var year = now.getFullYear()
var month = now.getMonth() + 1 + n
var date = new Date(year, month, num).getDate()
var s = year + '-' + (month < 10 ? '0' + month : month) + '-' + (date < 10 ? '0' + date : date)
return s
}

//计算本上下季度
// type='s'为开始时间，type='e'季度结束时间
// n=0,-1,1(本，上，下季度)

function getQuater(type, n) {
let currentQuarter = moment().quarter() // 当前是第几季度
let currentYear = moment().year() // 当前年
let getQuar = currentQuarter + n
// 本季度开始
if (type == 's') {
let startMoth = moment(moment(currentYear + '-01-01').toDate()).quarter(getQuar)
return moment(startMoth).format('YYYY-MM-DD')
} else if (type == 'e') {
let endMonth = 3 _ parseInt(getQuar) //当季度最后一个月
/_ 对月数进行格式化 \*/
if (endMonth < 10) endMonth = '0' + endMonth
else endMonth += ''
let endMonthDays = moment(currentYear + '-' + endMonth).daysInMonth() // 末尾月天数
let endDays = currentYear + '-' + endMonth + '-' + endMonthDays //完整年月日整合
return moment(endDays).format('YYYY-MM-DD')
}

//获取年
function getYear(type, dates) {
const dd = new Date()
const n = dates || 0
const year = dd.getFullYear() + Number(n)
let day
if (type === 's') {
day = `${year}-01-01`
}
if (type === 'e') {
day = `${year}-12-31`
}
if (!type) {
day = `${year}-01-01/${year}-12-31`
}
return day
}
```
