/*
 * @Descripttion:
 * @version:
 * @Author: congsir
 * @Date: 2022-07-09 23:01:46
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-07-09 23:14:09
 */
import { obj, name } from './demo'

console.log(0, obj, name)

setTimeout(() => {
    obj.name = 'cy'
    name = 'cy'
    console.log(1, obj, name)
}, 1000)