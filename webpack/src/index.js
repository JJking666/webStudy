// import './js/util.js'
import './js/util.js'

import './style/cy.less'
import './style/index.css'
//const path = require('path')
import "./mock/mock.js"
import axios from "axios"
axios.get('/data/index').then(res=>{
    console.log(res)
})



let a = '我是index'
console.log(1111111)
var img1 = document.createElement("img");
img1.src = require("../public/aa.jpg");
document.body.appendChild(img1);


//console.log(a,path.resolve(__dirname,'index.js'))
console.log(Promise.resolve(1).then(value =>value))
console.log(2)