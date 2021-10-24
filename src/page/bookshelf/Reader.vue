<template>
    <a-layout id="book-reader">
        <!-- 使用style而不是size是为了更快的响应速度 -->
        <a-layout-sider :theme="theme" v-model="collapsed" :trigger="null" collapsible class="book-side" :style="sideStyle">
            <div class="move-right" @mousedown="drag">
                <div class="list-logo" />
                <a-menu
                    :default-selected-keys="['1']"
                    :default-open-keys="['sub1']"
                    mode="inline"
                    :theme="theme"
                    :inline-collapsed="collapsed"
                    class="over-height"
                >
                    <a-menu-item key="1">
                        <a-icon type="pie-chart"/>
                        <span>Option 1</span>
                    </a-menu-item>
                    <a-menu-item key="2">
                        <a-icon type="desktop"/>
                        <span>Option 2</span>
                    </a-menu-item>
                    <a-menu-item key="3">
                        <a-icon type="inbox"/>
                        <span>Option 3</span>
                    </a-menu-item>
                    <a-sub-menu key="sub1">
                        <span slot="title"><a-icon type="mail"/><span>Navigation One</span></span>
                        <a-menu-item key="5">
                            Option 5
                        </a-menu-item>
                        <a-menu-item key="6">
                            Option 6
                        </a-menu-item>
                        <a-menu-item key="7">
                            Option 7
                        </a-menu-item>
                        <a-menu-item key="8">
                            Option 8
                        </a-menu-item>
                    </a-sub-menu>
                    <a-sub-menu key="sub2">
                        <span slot="title"><a-icon type="appstore"/><span>Navigation Two</span></span>
                        <a-menu-item key="9">
                            Option 9
                        </a-menu-item>
                        <a-menu-item key="10">
                            Option 10
                        </a-menu-item>
                        <a-sub-menu key="sub3" title="Submenu">
                            <a-menu-item key="11">
                                Option 11
                            </a-menu-item>
                            <a-menu-item key="12">
                                Option 12
                            </a-menu-item>
                            <a-sub-menu title="Submenu">
                                <a-menu-item>
                                    Option 11
                                </a-menu-item>
                                <a-menu-item>
                                    Option 12
                                </a-menu-item>
                                <a-sub-menu title="Submenu">
                                    <a-menu-item>
                                        Option 11
                                    </a-menu-item>
                                    <a-menu-item>
                                        Option 12
                                    </a-menu-item>
                                    <a-sub-menu title="Submenu">
                                        <a-menu-item>
                                            Option 11
                                        </a-menu-item>
                                        <a-menu-item>
                                            Option 12
                                        </a-menu-item>
                                        <a-sub-menu title="Submenu">
                                            <a-menu-item>
                                                Option 11
                                            </a-menu-item>
                                            <a-menu-item>
                                                Option 12
                                            </a-menu-item>
                                        </a-sub-menu>
                                    </a-sub-menu>
                                </a-sub-menu>
                            </a-sub-menu>
                        </a-sub-menu>
                    </a-sub-menu>
                </a-menu>
            </div>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0">
                <a-icon
                    class="trigger"
                    :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                    @click="() => (collapsed = !collapsed)"
                />
            </a-layout-header>
            <a-layout-content
                :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
            >
                Content
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script>
export default {
    name: "Reader",
    props: {},
    data() {
        return {
            collapsed: false,
            theme: 'light', // light | dark
            sideWidth: 200,
        }
    },
    computed: {
        sideStyle() {
            return {
                'flex': `0 0 ${this.sideWidth}px`,
                'max-width': `${this.sideWidth}px`,
                'min-width': `${this.sideWidth}px`,
                'width': `${this.sideWidth}px`,
            }
        }
    },
    mounted() {
    },
    methods: {
        drag(e) {
            e.stopPropagation()
            // 清除选区
            const clearSelection = "getSelection" in window ? function(){
                window.getSelection().removeAllRanges()
            } : function(){
                document.selection.empty()
            }
            if (e.target.className !== 'move-right') {
                return false
            }
            // 获取鼠标初始位置
            const defaultX = e.clientX
            // 获取边框初始位置
            const width = this.sideWidth
            let _width = 0
            let that = this
            // 防抖节流用定时器
            // let timer = null
            // 定义拖动事件
            let dragHandler = ev => {
                clearSelection()
                // 获取鼠标位置
                const posX = ev.clientX
                // 移动边框
                _width = width + (posX - defaultX)
                if (_width <= 200) {
                    _width = 200
                }else if (_width >= 500) {
                    _width = 500
                }
                that.sideWidth = _width
                // 防抖，备用
                // if (timer) {
                //     clearTimeout(timer)
                // }
                //
                // timer = setTimeout(function() {
                //     that.sideWidth = _width
                // }, 100)
                // 节流，备用
                // if (!timer) {
                //     timer = setTimeout(function() {
                //         that.sideWidth = _width
                //         timer = null
                //     }, 100)
                // }
            }
            // 移除监听
            let stopHandler = ev => {
                document.removeEventListener('mousemove', dragHandler)
                document.removeEventListener('mouseup', stopHandler)
                // clearTimeout(timer)
            }
            // 添加监听
            document.addEventListener('mousemove', dragHandler)
            document.addEventListener('mouseup', stopHandler)

        }
    }
}
</script>

<style lang="less">

#book-reader {
    position: relative;
    margin-top: 12px;
    margin-bottom: 12px;
    height: calc(~"100vh - 64px - 48px - 24px");
    min-height: 800px;

    .book-side {
        height: 100%;
        padding: 0;
        width: 400px;

        .move-right {
            position: absolute;
            //width: 100%;
            width: calc(~"100% + 16px");
            padding-right: 16px;
            height: 100%;
            margin: 0;
            cursor: e-resize;
            //border-right: 4px solid #e8e8e8;

            .list-logo {
                height: 64px;
                background: rgba(255, 255, 255, 0.2);
                padding: 16px;
            }

            .over-height {
                height: calc(~"100% - 64px");
                overflow: scroll;
            }

            * {
                cursor: default !important;
                //width: calc(~"100% - 16px");
            }

            ::-moz-scrolled-canvas {
                display: none;
            }

            ::-webkit-scrollbar {
                display: none;
            }
        }

    }

    .trigger {
        font-size: 18px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
            color: #1890ff;
        }
    }

}

</style>
