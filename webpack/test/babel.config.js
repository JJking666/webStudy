module.exports = {
    presets: [
        ['@babel/preset-env',
            {
            //false 不对当前的js处理做polyfill填充(内存小)
            //usage 对当前的j根据需要做polyfill填充(内存中)
            //entry 对当前的js根据筛选的浏览器进行填充(因为兼容的浏览器可能需要填充其他函数，故填充后内存最大)
                useBuiltIns: 'usage',
                corejs:3
            }
        ]
    ]
}