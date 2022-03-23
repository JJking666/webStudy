const path = require('path')
module.exports ={
    mode:'development',
    entry:{
        'index':'./src/index.js'
    },
    output:{
        path:path.join(__dirname,'dist'),
        filename:'bundle.js'
    }
}