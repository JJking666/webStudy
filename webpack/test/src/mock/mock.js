import Mock from 'mockjs' // 引入mockjs

const Random = Mock.Random // Mock.Random 是一个工具类，用于生成各种随机数据

let data = [] // 用于接受生成数据的数组

let size = [

    '300x250', '250x250', '240x400', '336x280',

    '180x150', '720x300', '468x60', '234x60',

    '88x31', '120x90', '120x60', '120x240',

    '125x125', '728x90', '160x600', '120x600',

    '300x600'

] // 定义随机值

for (let i = 0; i < 10; i++) { // 可自定义生成的个数

    let template = {

        'Float': Random.float(0, 100, 0, 5), // 生成0到100之间的浮点数,小数点后尾数为0到5位

        'Date': Random.date(), // 生成一个随机日期,可加参数定义日期格式

        'Image': Random.image(Random.size, '#02adea', 'Hello'), // Random.size表示将从size数据中任选一个数据

        'Color': Random.color(), // 生成一个颜色随机值

        'Paragraph': Random.paragraph(2, 5), //生成2至5个句子的文本

        'Name': Random.name(), // 生成姓名

        'Url': Random.url(), // 生成web地址

        'Address': Random.province() // 生成地址

    }

}

Mock.mock('/data/index', 'get',()=>size) // 根据数据模板生成模拟数据