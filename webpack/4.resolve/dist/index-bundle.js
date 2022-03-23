/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _js_alias__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/js/alias */ \"./src/js/alias.js\");\n/* harmony import */ var _js_alias__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_js_alias__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var cs_test1__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cs/test1 */ \"./src/css/test1.css\");\n/* harmony import */ var cs_test2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cs/test2 */ \"./src/css/test2.less\");\n//import './src/index.js';\n\n\n\n\nlet a = function (n) {\n  return new Promise((resolve, reject) => {\n    setTimeout(() => {\n      resolve(n);\n    }, 0);\n  });\n};\n\nasync function go(n) {\n  let b = await a(n);\n  console.log(1, b);\n  return b;\n}\n\ngo(333); // function takeLongTime(n) {\n//     return new Promise(resolve => {\n//         setTimeout(() => resolve(n + 200), n);\n//     });\n// }\n// function step1(n) {\n//     console.log(`step1 with ${n}`);\n//     return takeLongTime(n);\n// }\n// function step2(n) {\n//     console.log(`step2 with ${n}`);\n//     return takeLongTime(n);\n// }\n// function step3(n) {\n//     console.log(`step3 with ${n}`);\n//     return takeLongTime(n);\n// }\n// // async await方式\n// async function doIt() {\n//     console.time(\"doIt\");\n//     const time1 = 300;\n//     const time2 = await step1(time1);\n//     const time3 = await step2(time2);\n//     const result = await step3(time3);\n//     const test =await takeLongTime(200)\n//     console.log(`result is ${result}`);\n//     console.log(test);\n//     console.timeEnd(\"doIt\");\n// }\n// doIt();\n\n//# sourceURL=webpack://src/./src/index.js?");

/***/ }),

/***/ "./src/js/alias.js":
/*!*************************!*\
  !*** ./src/js/alias.js ***!
  \*************************/
/***/ (() => {

eval("let v = 'xxx';\nconsole.log(v);\n\n//# sourceURL=webpack://src/./src/js/alias.js?");

/***/ }),

/***/ "./src/css/test1.css":
/*!***************************!*\
  !*** ./src/css/test1.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://src/./src/css/test1.css?");

/***/ }),

/***/ "./src/css/test2.less":
/*!****************************!*\
  !*** ./src/css/test2.less ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://src/./src/css/test2.less?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;