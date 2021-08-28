/**
 * 通过json配置创建i18n的翻译文件
 */
const fs = require('fs');
const jsonPath = 'static/lang/'
const jsPath = 'src/lang/common/'

const create = function(lang) {
    const text = fs.readFileSync(lang, 'utf-8')
    return `export default ${text}`
}

const getFileList = function () {
    let list = []
    fs.readdirSync(jsonPath).forEach(file => {
        list.push(file.split('.')[0])
    })
    return list
}

const writeFiles = function (list = []) {
    list.forEach(file => {
        fs.writeFile(jsPath + file +'.js', create(jsonPath + file + '.json'), err => {
            if(err) {
                return console.log(err);
            }
            console.log(`语言文件${file}.js创建成功`);
        })
    })
}

writeFiles(getFileList())
