/**
 * 生成代码高亮样式less表
 */
const fs = require('fs');
const stylePath = '../node_modules/highlight.js/styles/'
const lessPath = '../src/assets/style/codeLight.less'

const create = function(lang) {
    const text = fs.readFileSync(lang, 'utf-8')
    return `${text}`
}

const getFileList = function () {
    let list = []
    fs.readdirSync('../node_modules/highlight.js/styles/').forEach(file => {
        if (file.split('.').length === 2 && file.split('.')[1] === 'css') {
            list.push(file)
        }
    })
    console.log(list)
    return list
}

const writeFiles = function (list = []) {
    let less = ''
    list.forEach(file => {
        less += `.code-light-${file.split('.')[0]} {`
        less += create('../node_modules/highlight.js/styles/' + file)
        less += `}\n`
    })

    fs.writeFile('codeLight.less', less, err => {
        if(err) {
            return console.log(err);
        }
        console.log(`语言文件codeLight.less.js创建成功`);
    })
}

writeFiles(getFileList())
