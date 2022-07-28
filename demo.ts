/*
 * @Descripttion: 
 * @version: 
 * @Author: congsir
 * @Date: 2022-07-26 22:54:22
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-07-26 22:56:02
 */
interface Rules {
  [propName: string]: Array<
     {
        required: boolean;
        message: string;
        trigger: 'blur' | 'change';
      }
    | {
        min: number;
        max: number;
        trigger: 'blur' | 'change'| 'blurr';
        message: string;
      }
  >;
}
const rule: Rules = {
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
  ],
  name2: [
    { required: true, message: '请输入名称', trigger: 'blur' },
    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blurr' }, // 报错，trigger值错误
  ],
};
console.log(rule)