/**
 * 通过json配置创建i18n的翻译文件
 * 注意，json文件不能重名，重名会被覆盖
 * 不在同一个目录下面会进行有限重命名：
 *     src/common/validator/lang/zh_CN.json => zh_CN_validator.js
 */
const fs = require('fs');
// 多语言json文件目录
const jsonPathList = ['static/lang/', 'src/common/validator/lang/']
// 生成的多语言js文件目录，这里最后一级必须命名为lang，否则需要修改162行内容
const jsPath = 'src/lang/lang/'
// 多语言种类
const langTypeList = ['zh_CN', 'en_US']
// 生成的多语言入口文件全路径
const langEnter = 'src/lang/i18n.js'

/**
 * 删除指定文件夹
 * @param fileUrl
 */
const emptyDir = function(fileUrl){
    const files = fs.readdirSync(fileUrl);//读取该文件夹
    files.forEach(function(file){
        const stats = fs.statSync(fileUrl+'/'+file);
        if(stats.isDirectory()){
            emptyDir(fileUrl+'/'+file);
        }else{
            fs.unlinkSync(fileUrl+'/'+file);
        }
    });
    console.log("删除文件夹 "+fileUrl+" 成功");
}

/**
 * 目录不存在则创建，存在则删除旧文件
 */
const makeDir = function (fileUrl) {
    if (!fs.existsSync(fileUrl)) {
        fs.mkdirSync(fileUrl)
    }else {
        emptyDir(fileUrl)
    }
}

/**
 * 创建多语言翻译文件
 * @param jsonPath
 * @param jsPath
 */
const buildLang = function (jsonPath, jsPath) {

    const jsonDirList = jsonPath.split('/')
    let after = ''

    // 为不同目录下的文件添加后缀避免同名覆盖
    if (jsonDirList.length > 3) {
        after = '_' + jsonDirList[jsonDirList.length - 3]
    }

    // 根据json文件生成js文件
    const create = function (lang) {
        const text = fs.readFileSync(lang, 'utf-8')
        return `export default ${text}`
    }

    // 获取多语言文件列表
    const getFileList = function () {
        let list = []
        fs.readdirSync(jsonPath).forEach(file => {
            list.push(file.split('.')[0])
        })
        return list
    }

    // 创建多语言翻译文件
    const writeFiles = function (list = []) {
        list.forEach(file => {
            fs.writeFile(jsPath + file + after + '.js', create(jsonPath + file + '.json'), 'utf8', err => {
                if (err) {
                    return console.log(err);
                }
                console.log(`语言文件${file}.js创建成功`);
            })
        })
    }

    writeFiles(getFileList())

}

/**
 * 创建多语言入口文件
 * @param jsPath
 * @param langTypes
 */
const buildEnter = function (jsPath, langTypes = ['zh_CN', 'en_US']) {
    let langList = {}

    langTypes.forEach(lang => {
        langList[lang] = []
    })

    // 获取多语言文件名列表
    const getLangList = function () {
        let list = []
        fs.readdirSync(jsPath).forEach(file => {
            list.push(file.split('.')[0])
        })
        return list
    }
    const langNameList = getLangList()

    // 每种语言的多语言对象
    const buildValue = function () {
        let str = ''
        const objList = langNameList.forEach(item => {
            langList[item.substring(0, 5)].push(item)
        })
        langTypes.forEach(lang => {
            str += `const _${lang} = {`
            langList[lang].forEach(name => {
                str += `...${name}, `
            })
            str += `}\n`
        })
        return str + `\n`
    }

    // 入口文件中的js内容
    const buildVue = function () {
        let str = `Vue.use(VueI18n)\n`
        str += `const messages = {\n`
        for (const lang in langList) {
            str += `    '${lang}': _${lang},\n`
        }
        str += `}\n\n`
        str += `const getLocale = function() { // 默认使用中文\n`
        str += `    if (messages[navigator.language]) {\n`
        str += `        return navigator.language\n`
        str += `    }else {\n`
        str += `        switch (navigator.language) {\n`
        for (const lang in langList) {
            str += `            case '${lang.substring(0, 2)}' : return '${lang}'\n`
        }
        str += `            default   : return 'zh_CN'\n`
        str += `        }\n`
        str += `    }\n`
        str += `}\n\n`
        str += `const i18n = new VueI18n({\n`
        str += `    locale: getLocale(),\n`
        str += `    messages\n`
        str += `})\n\n`
        str += `export default i18n\n`

        return str

    }

    // 创建文件内容
    const createFile = function () {
        const importVue = 'import Vue from "vue"\n' +
            'import VueI18n from "vue-i18n"\n'
        const importLang = langNameList.reduce((str, item) => {
            str += `import ${item} from "@/lang/lang/${item}"\n`
            return str
        }, '') + `\n`
        const langValue = buildValue()
        const vueValue = buildVue()
        return importVue + importLang + langValue + vueValue
    }

    // 输出文件
    const writeFile = function (filePath) {
        fs.writeFile(filePath, createFile(), 'utf8', err => {
            if (err) {
                return console.log(err);
            }
            console.log(`多语言入口文件${filePath}创建成功`);
        })
    }

    writeFile(langEnter)
}

makeDir(jsPath)
jsonPathList.forEach(item => buildLang(item, jsPath))
buildEnter(jsPath, langTypeList)
