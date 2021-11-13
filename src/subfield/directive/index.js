/* eslint-disable no-console,no-unused-vars */
const focus = {
    inserted: function(el) {
        // 聚焦元素
        el.focus()
    }
}

const focusX = {
    inserted: function(el) {
        // 聚焦元素
        el.focus()
    },
    update: function(el) {
        // 聚焦元素
        el.focus()
    },
}

const draggable = {
    inserted(el) {
        let drag = e => {
            let oEle = e.target // 获取目标元素
            let pEle = e.target.parentNode // 获取容器
            let oldTop = document.documentElement.scrollTop // 滚动之前的位置
            let change = 0 // 滚动总变化量
            // 算出鼠标相对元素的位置
            const disX = e.clientX - oEle.offsetLeft - pEle.offsetLeft
            const disY = e.clientY - oEle.offsetTop - pEle.offsetTop

            // 定义拖动事件
            let dragHandler = ev => {

                // 获取可视区域宽高
                // const winX = this.getViewPortOffset().w

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
                    change += evChange

                    // oEle.style.left = parseInt(oEle.style.left) + change + 'px'
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
        }
        el.addEventListener('mousedown', drag)
    }
}

const hook = {
    bind(el) {
        console.log('元素初始化成功' + el.id)
    },
    inserted(el) {
        console.log('元素插入节点' + el.id)
    },
    update(el) {
        console.log('元素更新' + el.id)
    },
    componentUpdated(el) {
        console.log('全部更新完成' + el.id)
    },
    unbind(el) {
        console.log('解除绑定' + el.id)
    }
}

const args = {
    bind: function(el, binding, vNode) {
        let s = JSON.stringify
        el.innerHTML =
            'name: '       + s(binding.name) + '<br>' +
            'value: '      + s(binding.value) + '<br>' +
            'expression: ' + s(binding.expression) + '<br>' +
            'argument: '   + s(binding.arg) + '<br>' +
            'modifiers: '  + s(binding.modifiers) + '<br>' +
            'vNode keys: ' + Object.keys(vNode).join(', ')
    }
}

const DIRECTIVES = {
    focus,
    focusX,
    draggable,
    hook,
    args,
}

export default DIRECTIVES
