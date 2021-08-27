import STYLE from '../../static/config/style.json'

export default function() {
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
        let index = getImgIndex()
        document.documentElement.style.backgroundImage = `url("${STYLE['background.list'][0]}")`
        setInterval(index, STYLE['background.space'])
    }

    /* ========================================需要页面加载后执行的方法================================================= */
    setTimeout(() => {
        // 设置滚动条是否隐藏
        if (STYLE['window.scroll.hide']) {
            document.styleSheets[0].insertRule('html::-webkit-scrollbar {display: none;}', 0)
        }
        // 是否需要蒙版
        if (STYLE['window.bg.noMask']) {
            document.getElementsByClassName('bg-mask')[0].style.display = 'none'
        }
    }, 0)

}
