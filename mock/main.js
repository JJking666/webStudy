require("./mock/index.js")
import axios from "axios"


axios.post({
    url:'http://localhost:8080/goods/goodAll'
}).then(res=>{
    console.log(res)
})
