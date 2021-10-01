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
                <a-button @click="login">测试token</a-button><a-input v-model="token"></a-input>
            </a-row>
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
            <a-row :gutter="24" :style="{background: '#ffffff'}" v-html="testTxt">

            </a-row>
        </div>

<!--        <div style="position: absolute; width: 400px; height: 400px; background: #1890ff; left: 0; top: 0" @mousedown="drag">-->
<!--        </div>-->
<!--        <div :style="{position: 'absolute', width: '400px', height: '400px', background: '#1890ff', left: 0, top: 0}" v-drag>-->
<!--        </div>-->
    </div>
</template>

<script>

import HEditor from "@/components/HEditor"
import factory from "@/test/factory"
import utils from "@/common/util/utils"

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
            testTxt: '',
            token: '',
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

        console.log('token==========', this.$store.state.token)

        factory.getTest().then(res => {
            console.log('测试接口返回>>>', res)
        })

        factory.getTestTxt().then(res => {
            this.testTxt = res
        })

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
        },
        login() {
            factory.getPublicKey().then(res => {
                console.log(res)
                let key = res.data.public_key
                console.log('pubKey=========       ', key)
                let kkk = res.data.private_key
                console.log('pubKey=========       ', kkk)
                const password = utils.encrypted(key, 'test@2')
                const pppppppp = utils.decrypted(kkk, password)
                console.log(password)
                console.log(pppppppp)
                // setTimeout(() => {
                factory.getToken(password).then(res => {
                    console.log(res)
                })
                // }, 3000)
            })
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
