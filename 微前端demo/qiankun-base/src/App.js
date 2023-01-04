/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-10-19 23:18:44
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-10-20 00:08:56
 * @FilePath: \webStudy\微前端demo\qiankun-base\src\App.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import logo from './logo.svg';
import './App.css';

import { registerMicroApps, start } from 'qiankun';

registerMicroApps([
  {
    name: 'react app', // app name registered
    entry: '//localhost:3011',
    container: '#micro-app1',
    activeRule: '/micro-app1',
  },
  {
    name: 'vue app',
    entry: '//localhost:3012',
    container: '#micro-app2',
    activeRule: '/micro-app2',
  },
]);

start();

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div id="micro-app1"></div>
        <div id="micro-app2"></div>
      </header>
    </div>
  );
}

export default App;
