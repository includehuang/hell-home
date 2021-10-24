// noinspection JSUnusedGlobalSymbols
const Dom = {
    /**
     * 根据元素实际宽度，设置对应的高度
     * @param element dom节点
     * @param scale 比例尺：height/width
     */
    elementAutoHeight(element, scale) {
        element.setAttribute('height', `${element.clientWidth * scale}px`)
    },
    /**
     * 获取可视区域宽高
     * @returns {{w: number, h: number}}
     */
    getViewPortOffset() {
        if (window.innerWidth) {
            return {
                w: window.innerWidth,
                h: window.innerHeight,
            }
        } else if (document.compatMode === "BackCompat") {
            return {
                w: document.body.clientWidth,
                h: document.body.clientHeight,
            }
        } else {
            return {
                w: document.documentElement.clientWidth,
                h: document.documentElement.clientHeight,
            }
        }
    },
    /**
     * 使元素可拖动的方法
     * @mousedown="drag"
     * @param e
     */
    drag(e) {
        let oEle = e.target // 获取目标元素
        let pEle = e.target.parentNode // 获取容器
        let oldTop = document.documentElement.scrollTop // 滚动之前的位置
        let change = 0 // 滚动总变化量
        // 算出鼠标相对元素的位置
        const disX = e.clientX - oEle.offsetLeft - pEle.offsetLeft
        const disY = e.clientY - oEle.offsetTop - pEle.offsetTop

        // 定义拖动事件
        let dragHandler = ev => {

            // 获取容器元素宽高
            let conX = pEle.offsetWidth
            let conY = pEle.offsetHeight

            // 获取鼠标相对于父元素的位置
            let parX = ev.clientX - pEle.offsetLeft
            let parY = ev.clientY - pEle.offsetTop

            // 获取元素实际宽高
            let relX = oEle.offsetWidth
            let relY = oEle.offsetHeight

            // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
            let left = parX - disX
            let top = parY - disY + change

            // 防止元素溢出
            if (left < 0) {
                left = 0
            }else if (left + relX > conX) {
                left = conX - relX
            }
            if (top < 0) {
                top = 0
            }else if (top + relY > conY) {
                top = conY - relY
            }

            // 移动当前元素
            oEle.style.left = left + 'px'
            oEle.style.top = top + 'px'
        }

        // 拖到底部发生滚动时解决方案
        let scrollHandler = ev => {
            setTimeout(() => {

                let newTop = document.documentElement.scrollTop
                let evChange = newTop - oldTop
                oldTop = newTop
                // 累计
                change += evChange

                // 根据滚动距离修改top
                oEle.style.top = parseInt(oEle.style.top) + evChange + 'px'
            }, 0)
        }

        // 移除监听
        let stopHandler = ev => {
            document.removeEventListener('mousemove', dragHandler)
            document.removeEventListener('mouseup', stopHandler)
            document.removeEventListener('scroll', scrollHandler)
        }

        // 添加监听
        document.addEventListener('mousemove', dragHandler)
        document.addEventListener('mouseup', stopHandler)
        document.addEventListener('scroll', scrollHandler)
    },
    /**
     * 清除选区方法
     */
    clearSelection() {
        const fun = "getSelection" in window ? function(){
            window.getSelection().removeAllRanges()
        } : function(){
            document.selection.empty()
        }
        fun()
    }
}
export default Dom
