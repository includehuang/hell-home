<!--suppress ALL -->
<template>
    <div id="home">
        <div class="header">
            <div class="avatar">
                <a-avatar size="large" :src="avatar"/>
            </div>
            <div class="header-content">
                <div class="header-title">
                    <span class="welcome-text">{{ $t('home.welcome', [$t('HellVision')]) }}</span>
                </div>
                <div>{{ $t('home.characteristic') }}</div>
            </div>
            <div class="header-extra">
                <div class="header-title">
                    <span class="welcome-text">{{ nowTime }}</span>
                </div>
                <div>{{ $t(`message.${openTime}`) }}</div>
            </div>
        </div>

        <div class="content">
            <a-row :gutter="24">
                <a-button @click="test">输出</a-button>
                <h-editor ref="editor" id="testEditor" :config="{height: 1400}" button='<div class="w-e-menu" data-title="额外"><i class="w-e-icon-indent-decrease"></i></div>'>
                    <pre><code class="Java"><span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-type">void</span> <span class="hljs-title">main</span><span class="hljs-params">(<span class="hljs-type">String</span>[] args)</span></span>{
    <span class="hljs-type">int</span> a=<span class="hljs-number">0</span>;
    <span class="hljs-keyword">return</span> a;
}</code></pre><pre><code class="JavaScript"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"h-editor"</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">"Object.assign(style, defaultStyle)"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">:id</span>=<span class="hljs-string">"id"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">slot</span>/&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre><p data-we-empty-p=""><br></p>
                </h-editor>

            </a-row>
            <a-row :gutter="24" :style="{background: '#ffffff'}">
                <pre><code class="JavaScript">
<span class="hljs-comment">// util.js</span>
<span class="hljs-comment">/**
 * 使元素可拖动的方法
 * @mousedown="drag"
 * @param e
 */</span>
<span class="hljs-function"><span class="hljs-title">drag</span><span class="hljs-params">(e)</span></span> {
    let oEle = e<span class="hljs-selector-class">.target</span> <span class="hljs-comment">// 获取目标元素</span>
    let pEle = e<span class="hljs-selector-class">.target</span><span class="hljs-selector-class">.parentNode</span> <span class="hljs-comment">// 获取容器</span>
    let oldTop = document<span class="hljs-selector-class">.documentElement</span><span class="hljs-selector-class">.scrollTop</span> <span class="hljs-comment">// 滚动之前的位置</span>
    let change = <span class="hljs-number">0</span> <span class="hljs-comment">// 滚动总变化量</span>
    <span class="hljs-comment">// 算出鼠标相对元素的位置</span>
    const disX = e<span class="hljs-selector-class">.clientX</span> - oEle<span class="hljs-selector-class">.offsetLeft</span> - pEle<span class="hljs-selector-class">.offsetLeft</span>
    const disY = e<span class="hljs-selector-class">.clientY</span> - oEle<span class="hljs-selector-class">.offsetTop</span> - pEle<span class="hljs-selector-class">.offsetTop</span>

    <span class="hljs-comment">// 定义拖动事件</span>
    let dragHandler = ev =&gt; {

        <span class="hljs-comment">// 获取容器元素宽高</span>
        let conX = pEle<span class="hljs-selector-class">.offsetWidth</span>
        let conY = pEle<span class="hljs-selector-class">.offsetHeight</span>

        <span class="hljs-comment">// 获取鼠标相对于父元素的位置</span>
        let parX = ev<span class="hljs-selector-class">.clientX</span> - pEle<span class="hljs-selector-class">.offsetLeft</span>
        let parY = ev<span class="hljs-selector-class">.clientY</span> - pEle<span class="hljs-selector-class">.offsetTop</span>

        <span class="hljs-comment">// 获取元素实际宽高</span>
        let relX = oEle<span class="hljs-selector-class">.offsetWidth</span>
        let relY = oEle<span class="hljs-selector-class">.offsetHeight</span>

        <span class="hljs-comment">// 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置</span>
        let <span class="hljs-attribute">left</span> = parX - disX
        let <span class="hljs-attribute">top</span> = parY - disY + change

        <span class="hljs-comment">// 防止元素溢出</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-attribute">left</span> &lt; <span class="hljs-number">0</span>) {
            <span class="hljs-attribute">left</span> = <span class="hljs-number">0</span>
        }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-attribute">left</span> + relX &gt; conX) {
            <span class="hljs-attribute">left</span> = conX - relX
        }
        <span class="hljs-keyword">if</span> (<span class="hljs-attribute">top</span> &lt; <span class="hljs-number">0</span>) {
            <span class="hljs-attribute">top</span> = <span class="hljs-number">0</span>
        }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-attribute">top</span> + relY &gt; conY) {
            <span class="hljs-attribute">top</span> = conY - relY
        }

        <span class="hljs-comment">// 移动当前元素</span>
        oEle<span class="hljs-selector-class">.style</span><span class="hljs-selector-class">.left</span> = <span class="hljs-attribute">left</span> + <span class="hljs-string">'px'</span>
        oEle<span class="hljs-selector-class">.style</span><span class="hljs-selector-class">.top</span> = <span class="hljs-attribute">top</span> + <span class="hljs-string">'px'</span>
    }

    <span class="hljs-comment">// 拖到底部发生滚动时解决方案</span>
    let scrollHandler = ev =&gt; {
        setTimeout(() =&gt; {

            let newTop = document<span class="hljs-selector-class">.documentElement</span><span class="hljs-selector-class">.scrollTop</span>
            let evChange = newTop - oldTop
            oldTop = newTop
            <span class="hljs-comment">// 累计</span>
            change += evChange

            <span class="hljs-comment">// 根据滚动距离修改top</span>
            oEle<span class="hljs-selector-class">.style</span><span class="hljs-selector-class">.top</span> = parseInt(oEle<span class="hljs-selector-class">.style</span>.<span class="hljs-attribute">top</span>) + evChange + <span class="hljs-string">'px'</span>
        }, <span class="hljs-number">0</span>)
    }

    <span class="hljs-comment">// 移除监听</span>
    let stopHandler = ev =&gt; {
        document<span class="hljs-selector-class">.removeEventListener</span>(<span class="hljs-string">'mousemove'</span>, dragHandler)
        document<span class="hljs-selector-class">.removeEventListener</span>(<span class="hljs-string">'mouseup'</span>, stopHandler)
        document<span class="hljs-selector-class">.removeEventListener</span>(<span class="hljs-string">'scroll'</span>, scrollHandler)
    }

    <span class="hljs-comment">// 添加监听</span>
    document<span class="hljs-selector-class">.addEventListener</span>(<span class="hljs-string">'mousemove'</span>, dragHandler)
    document<span class="hljs-selector-class">.addEventListener</span>(<span class="hljs-string">'mouseup'</span>, stopHandler)
    document<span class="hljs-selector-class">.addEventListener</span>(<span class="hljs-string">'scroll'</span>, scrollHandler)
}

<span class="hljs-comment">// App.vue</span>
&lt;<span class="hljs-selector-tag">div</span> @mousedown=<span class="hljs-string">"util.drag"</span> /div&gt;
<span class="hljs-comment">// directive.js</span>
const directive = {
    install: function(Vue, option) {
        Vue<span class="hljs-selector-class">.directive</span>(<span class="hljs-string">'drag'</span>, {
            inserted(el) {
                let drag = e =&gt; {
                    let oEle = e<span class="hljs-selector-class">.target</span> <span class="hljs-comment">// 获取目标元素</span>
                    let pEle = e<span class="hljs-selector-class">.target</span><span class="hljs-selector-class">.parentNode</span> <span class="hljs-comment">// 获取容器</span>
                    let oldTop = document<span class="hljs-selector-class">.documentElement</span><span class="hljs-selector-class">.scrollTop</span> <span class="hljs-comment">// 滚动之前的位置</span>
                    let change = <span class="hljs-number">0</span> <span class="hljs-comment">// 滚动总变化量</span>
                    <span class="hljs-comment">// 算出鼠标相对元素的位置</span>
                    const disX = e<span class="hljs-selector-class">.clientX</span> - oEle<span class="hljs-selector-class">.offsetLeft</span> - pEle<span class="hljs-selector-class">.offsetLeft</span>
                    const disY = e<span class="hljs-selector-class">.clientY</span> - oEle<span class="hljs-selector-class">.offsetTop</span> - pEle<span class="hljs-selector-class">.offsetTop</span>

                    <span class="hljs-comment">// 定义拖动事件</span>
                    let dragHandler = ev =&gt; {

                        <span class="hljs-comment">// 获取可视区域宽高</span>
                        <span class="hljs-comment">// const winX = this.getViewPortOffset().w</span>

                        <span class="hljs-comment">// 获取容器元素宽高</span>
                        let conX = pEle<span class="hljs-selector-class">.offsetWidth</span>
                        let conY = pEle<span class="hljs-selector-class">.offsetHeight</span>

                        <span class="hljs-comment">// 获取鼠标相对于父元素的位置</span>
                        let parX = ev<span class="hljs-selector-class">.clientX</span> - pEle<span class="hljs-selector-class">.offsetLeft</span>
                        let parY = ev<span class="hljs-selector-class">.clientY</span> - pEle<span class="hljs-selector-class">.offsetTop</span>

                        <span class="hljs-comment">// 获取元素实际宽高</span>
                        let relX = oEle<span class="hljs-selector-class">.offsetWidth</span>
                        let relY = oEle<span class="hljs-selector-class">.offsetHeight</span>

                        <span class="hljs-comment">// 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置</span>
                        let <span class="hljs-attribute">left</span> = parX - disX
                        let <span class="hljs-attribute">top</span> = parY - disY + change

                        <span class="hljs-comment">// 防止元素溢出</span>
                        <span class="hljs-keyword">if</span> (<span class="hljs-attribute">left</span> &lt; <span class="hljs-number">0</span>) {
                            <span class="hljs-attribute">left</span> = <span class="hljs-number">0</span>
                        }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-attribute">left</span> + relX &gt; conX) {
                            <span class="hljs-attribute">left</span> = conX - relX
                        }
                        <span class="hljs-keyword">if</span> (<span class="hljs-attribute">top</span> &lt; <span class="hljs-number">0</span>) {
                            <span class="hljs-attribute">top</span> = <span class="hljs-number">0</span>
                        }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-attribute">top</span> + relY &gt; conY) {
                            <span class="hljs-attribute">top</span> = conY - relY
                        }

                        <span class="hljs-comment">// 移动当前元素</span>
                        oEle<span class="hljs-selector-class">.style</span><span class="hljs-selector-class">.left</span> = <span class="hljs-attribute">left</span> + <span class="hljs-string">'px'</span>
                        oEle<span class="hljs-selector-class">.style</span><span class="hljs-selector-class">.top</span> = <span class="hljs-attribute">top</span> + <span class="hljs-string">'px'</span>
                    }

                    <span class="hljs-comment">// 拖到底部发生滚动时解决方案</span>
                    let scrollHandler = ev =&gt; {
                        setTimeout(() =&gt; {

                            let newTop = document<span class="hljs-selector-class">.documentElement</span><span class="hljs-selector-class">.scrollTop</span>
                            let evChange = newTop - oldTop
                            oldTop = newTop
                            change += evChange

                            <span class="hljs-comment">// oEle.style.left = parseInt(oEle.style.left) + change + 'px'</span>
                            oEle<span class="hljs-selector-class">.style</span><span class="hljs-selector-class">.top</span> = parseInt(oEle<span class="hljs-selector-class">.style</span>.<span class="hljs-attribute">top</span>) + evChange + <span class="hljs-string">'px'</span>
                        }, <span class="hljs-number">0</span>)
                    }

                    <span class="hljs-comment">// 移除监听</span>
                    let stopHandler = ev =&gt; {
                        document<span class="hljs-selector-class">.removeEventListener</span>(<span class="hljs-string">'mousemove'</span>, dragHandler)
                        document<span class="hljs-selector-class">.removeEventListener</span>(<span class="hljs-string">'mouseup'</span>, stopHandler)
                        document<span class="hljs-selector-class">.removeEventListener</span>(<span class="hljs-string">'scroll'</span>, scrollHandler)
                    }

                    <span class="hljs-comment">// 添加监听</span>
                    document<span class="hljs-selector-class">.addEventListener</span>(<span class="hljs-string">'mousemove'</span>, dragHandler)
                    document<span class="hljs-selector-class">.addEventListener</span>(<span class="hljs-string">'mouseup'</span>, stopHandler)
                    document<span class="hljs-selector-class">.addEventListener</span>(<span class="hljs-string">'scroll'</span>, scrollHandler)
                }
                el<span class="hljs-selector-class">.addEventListener</span>(<span class="hljs-string">'mousedown'</span>, drag)
            }
        })
    }
}
export default directive

<span class="hljs-comment">// main.js</span>
Vue<span class="hljs-selector-class">.use</span>(directive)</code></pre>

            </a-row>
        </div>

<!--        <div style="position: absolute; width: 400px; height: 400px; background: #1890ff; left: 0; top: 0" @mousedown="drag">-->
<!--        </div>-->
        <div :style="{position: 'absolute', width: '400px', height: '400px', background: '#1890ff', left: 0, top: 0}" v-drag>
        </div>
    </div>
</template>

<script>

import HEditor from "@/components/HEditor"

export default {
    name: "Home",
    components: {HEditor},
    data() {
        return {
            nowTime: this.$moment().format('HH: mm: ss'),
            openTime: this.$moment().format('HH'),
            avatar: '/static/img/common/avatar.jpg',
            loading: true,
            btnGroup: [],
            projects: [],
            activities: [],
            axisData: [],
            teams: [],
            axisOption: null,
            axisDom: null,
            content: '',
            url: 'static/test/personList.md',
            visiable: true,
        }
    },
    computed: {
        editor() {
            return this.HyperMD.fromTextArea(this.myTextarea, {
                // for code fence highlighting
                hmdModeLoader: "https://cdn.jsdelivr.net/npm/codemirror/",
            })
        }
    },
    mounted() {

        setInterval(() => {
            this.nowTime = this.$moment().format('HH: mm: ss')
            // editor.config.height = 108
            // editor.create()
        }, 1000)

        console.log('store==========', this.$store.state.common.avatar)
        this.$store.commit('avatar', 'ssssssssssssssss')
        console.log('store==========', this.$store.state.common.avatar)

    },
    methods: {
        test() {
            console.log(this.$refs.editor.getContent())
        },
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

                // 获取可视区域宽高
                // const winX = this.getViewPortOffset().w
                // let scrY = this.getViewPortOffset().h

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
                    console.log(`change = ${newTop} - ${oldTop}`)
                    console.log('变化的距离==========', change)
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
        // 获取可视区域宽高
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
        }
    }
}
</script>

<style lang="less">

@import "../assets/style/color";

#home {

    position: relative;

    .header {

        background: @backGround;
        padding: 12px 24px;

        .avatar {
            display: inline-block;

            & > span {
                display: inline-block;
                width: 100px;
                height: 100px;
                border-radius: 100px;
            }
        }

        .header-content {
            display: inline-block;
            position: relative;
            top: 24px;
            margin-left: 24px;
            line-height: 22px;
            color: @fontRemark;

            .header-title {
                margin-bottom: 12px;
                color: @fontMain;
                font-weight: 500;
                font-size: 20px;
                line-height: 28px;
            }
        }

        .header-extra {
            display: inline-block;
            position: relative;
            top: 24px;
            float: right;
            margin-left: 24px;
            line-height: 22px;
            color: @fontRemark;

            .header-title {
                margin-bottom: 12px;
                color: @fontMain;
                font-weight: 500;
                font-size: 20px;
                line-height: 28px;
                min-height: 28px;
            }
        }
    }

    .content {

        width: 1200px;
        height: 2000px;
        margin: 12px auto;

        .markdown-body {
            background: @backGround;
        }

        .project-list {
            .card-title {
                font-size: 0;

                a {
                    color: rgba(0, 0, 0, 0.85);
                    margin-left: 12px;
                    line-height: 24px;
                    height: 24px;
                    display: inline-block;
                    vertical-align: top;
                    font-size: 14px;

                    &:hover {
                        color: #1890ff;
                    }
                }
            }

            .card-description {
                color: rgba(0, 0, 0, 0.45);
                height: 44px;
                line-height: 22px;
                overflow: hidden;
            }

            .project-item {
                display: flex;
                margin-top: 8px;
                overflow: hidden;
                font-size: 12px;
                height: 20px;
                line-height: 20px;

                a {
                    color: rgba(0, 0, 0, 0.45);
                    display: inline-block;
                    flex: 1 1 0;

                    &:hover {
                        color: #1890ff;
                    }
                }

                .datetime {
                    color: rgba(0, 0, 0, 0.25);
                    flex: 0 0 auto;
                    float: right;
                }
            }

            .ant-card-meta-description {
                color: rgba(0, 0, 0, 0.45);
                height: 44px;
                line-height: 22px;
                overflow: hidden;
            }
        }

        .item-group {
            padding: 20px 0 8px 24px;
            font-size: 0;

            a {
                color: rgba(0, 0, 0, 0.65);
                display: inline-block;
                font-size: 14px;
                margin-bottom: 13px;
                width: 25%;
            }
        }

        .members {
            a {
                display: block;
                margin: 12px 0;
                line-height: 24px;
                height: 24px;

                .member {
                    font-size: 14px;
                    color: rgba(0, 0, 0, 0.65);
                    line-height: 24px;
                    max-width: 100px;
                    vertical-align: top;
                    margin-left: 12px;
                    transition: all 0.3s;
                    display: inline-block;
                }

                &:hover {
                    span {
                        color: #1890ff;
                    }
                }
            }
        }

        .mobile {
            .project-list {
                .project-card-grid {
                    width: 100%;
                }
            }

            .more-info {
                border: 0;
                padding-top: 16px;
                margin: 16px 0 16px;
            }

            .headerContent .title .welcome-text {
                display: none;
            }
        }
    }

}

.ant-modal {
    position: absolute;
    width: 520px;
    left: 100px;
    top: 100px
}

</style>
