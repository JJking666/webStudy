/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-10-19 23:48:54
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-10-22 11:41:40
 * @FilePath: \webStudy\微前端demo\qiankun-micro-app1\config-overrides.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { name } = require('./package');
module.exports = {
    webpack: (config) => {
      config.output.library = `${name}-[name]`;
      config.output.libraryTarget = 'umd';
      config.output.jsonpFunction: `webpackJsonp_${name}`;
      config.output.globalObject = 'window';
  
      return config;
    },
  
    devServer: (_) => {
      const config = _;
  
      config.headers = {
        'Access-Control-Allow-Origin': '*',
      };
      config.historyApiFallback = true;
      config.hot = false;
      config.watchContentBase = false;
      config.liveReload = false;
  
      return config;
    },
  };