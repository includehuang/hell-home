import STYLE from '@res/config/style.json'
// import Vue from "vue"


export default function() {
    // // 获取vue实例
    // const thisVue = new Vue()
    // // eslint-disable-next-line no-unused-vars
    // const vueObj = thisVue.$vueObj

    // 根据屏幕宽度设置背景图尺寸
    document.documentElement.style.backgroundSize = `${window.screen.width}px`
    // 设置基础字体大小
    document.documentElement.style.fontSize = `${STYLE["window.size.font"]}px`
    // 设置背景图片
    if (STYLE['background.type'] === 'image') {
        document.documentElement.style.backgroundImage = `url("${STYLE['background.image']}")`
    }else if (STYLE['background.type'] === 'list') {
        let getImgIndex = function() {
            let index = 0
            return function(){
                index = index >= 1 ? 0 : index + 1
                document.documentElement.style.backgroundImage = `url("${STYLE['background.list'][index]}")`
            }
        }
        document.documentElement.style.backgroundImage = `url("${STYLE['background.list'][0]}")`
        setInterval(getImgIndex(), STYLE['background.space'])
    }

    /* ========================================需要页面加载后执行的方法================================================= */
    setTimeout(() => {
        // 设置滚动条是否隐藏
        if (STYLE['window.scroll.hide']) {
            document.styleSheets[0].insertRule('html::-webkit-scrollbar {display: none;}', 0)
        }
        // 是否需要蒙版
        if (STYLE['window.bg.noMask']) {
            document.styleSheets[0].insertRule('.bg-mask {display: none;}', 0)
        }else {
            // 设置蒙版透明度
            document.styleSheets[0].insertRule(`.bg-mask {opacity: ${STYLE['window.bg.mask.opacity']};}`, 0)
        }
        // 是否需要特效层
        if (STYLE['window.bg.noSpecial']) {
            document.styleSheets[0].insertRule('.special-effects {display: none;}', 0)
        }else {
            // 设置特效层透明度
            document.styleSheets[0].insertRule(`.special-effects {opacity: ${STYLE['window.bg.special.opacity']};}`, 0)
        }
    }, 0)

}
