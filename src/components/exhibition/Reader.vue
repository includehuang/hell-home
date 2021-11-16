<template>
    <a-layout id="book-reader">
        <!-- 使用style而不是size是为了更快的响应速度 -->
        <a-layout-sider :theme="theme" v-model="collapsed" :trigger="null" collapsible class="book-side" :style="sideStyle">
            <div class="move-right" @mousedown="drag" :style="{cursor}">
                <div class="list-logo" />
                <h-menus
                    :default-selected-keys="['000$001']"
                    :default-open-keys="['000']"
                    :mode="'inline'"
                    :theme="theme"
                    :inline-collapsed="collapsed"
                    class="over-height"
                    :list="list.data"
                    @click="onMenusClick"
                />
            </div>
        </a-layout-sider>
        <a-layout class="book-content">
            <a-layout-header style="background: #fff; padding: 0">
                <!--suppress JSUndeclaredVariable -->
                <a-icon
                    class="trigger"
                    :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                    @click="menuFold"
                />
            </a-layout-header>
            <a-layout-content
                :style="{ margin: '24px 16px 0 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
                class="book-main"
            >
                <div v-html="mainText" v-if="mainText"/>
                <a-empty v-else/>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script>

import HMenus from "@/components/layout/HMenus"
import factory from "@/page/bookshelf/factory"

// eslint-disable-next-line no-unused-vars
// const LIST = {
//     data: [
//         {
//             id: '000',
//             type: 'file',
//             title: '例子',
//             key: '000',
//         },
//         {
//             id: '001',
//             type: 'folder',
//             title: '魔法师生存守则',
//             key: '001',
//             children: [
//                 {
//                     id: '001$001',
//                     type: 'file',
//                     title: '第一章：魔法阵',
//                     key: '001$001',
//                 },
//                 {
//                     id: '001$002',
//                     type: 'file',
//                     title: '第二章：穿越了',
//                     key: '001$002',
//                 },
//                 {
//                     id: '001$003',
//                     type: 'file',
//                     title: '第三章：抱大腿',
//                     key: '001$003',
//                 },
//             ]
//         },
//         {
//             id: '002',
//             type: 'file',
//             title: '首页',
//             key: '002',
//         },
//         {
//             id: '003',
//             type: 'file',
//             title: '前言',
//             key: '003',
//         },
//         {
//             id: '004',
//             type: 'folder',
//             title: '人物介绍',
//             key: '004',
//             children: [
//                 {
//                     id: '004$001',
//                     type: 'folder',
//                     title: '清岛人物介绍',
//                     key: '004$001',
//                     children: [
//                         {
//                             id: '004$001$001',
//                             type: 'folder',
//                             title: '天心学院人物介绍',
//                             key: '004$001$001',
//                             children: [
//                                 {
//                                     id: '004$001$001$001',
//                                     type: 'file',
//                                     title: '祎果',
//                                     key: '004$001$001$001',
//                                 },
//                                 {
//                                     id: '004$001$001$002',
//                                     type: 'file',
//                                     title: '琋玥',
//                                     key: '004$001$001$002',
//                                 },
//                                 {
//                                     id: '004$001$001$003',
//                                     type: 'file',
//                                     title: '卿山',
//                                     key: '004$001$001$003',
//                                 },
//                                 {
//                                     id: '004$001$001$004',
//                                     type: 'file',
//                                     title: '归风',
//                                     key: '004$001$001$004',
//                                 },
//                             ]
//                         },
//                         {
//                             id: '004$001$002',
//                             type: 'folder',
//                             title: '万民堂人物介绍',
//                             key: '004$001$002',
//                             children: []
//                         }
//                     ]
//                 },
//                 {
//                     id: '004$002',
//                     type: 'folder',
//                     title: '水月洞天人物介绍',
//                     key: '004$002',
//                     children: []
//                 }
//             ]
//         },
//     ]
// }

export default {
    name: "Reader",
    components: {
        HMenus
    },
    props: {
        bookUser: {
            type: String,
            default: 'vision'
        },
        bookTitle: {
            type: String,
            default: '魔法师生存守则'
        },
        bookChapter: {
            type: String,
            default: '000$001'
        },
        cursor: {
            type: String,
            default: 'e-resize', // 'default' | 'e-resize'
        },
        theme: {
            type: String,
            default: 'light', // 'light' | 'dark'
        },
    },
    data() {
        return {
            list: {data: null},
            collapsed: false,
            sideWidth: 200,
            mainText: '',
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
        this.getBook()
    },
    methods: {
        /**
         * 可伸缩侧边栏
         * @param e
         * @returns {boolean}
         */
        drag(e) {
            if (this.collapsed) {
                return false
            }
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

        },
        /**
         * 最小化侧边栏
         */
        menuFold() {
            this.collapsed = ! this.collapsed
            this.sideWidth = this.collapsed ? 80 : 200
            this.cursor = this.collapsed ? 'default' : 'e-resize'
        },
        /**
         * 获取书籍内容列表
         * @param params
         */
        getBook(params = {}) {
            factory.getBook({
                user: params.user || this.bookUser,
                name: params.name || this.bookTitle,
            }).then(res => {
                this.list = JSON.parse(res.data)
                this.bookChapter = this.list.default
                this.getChapter()
            })
        },
        /**
         * 获取章节详细内容
         * @param params
         */
        getChapter(params = {}) {
            factory.getChapter({
                user: params.user || this.bookUser,
                name: params.name || this.bookTitle,
                key: params.key || this.bookChapter,
            }).then(temp => {
                this.mainText = temp.success ? temp.data : null
            })
        },
        /**
         * 菜单监听
         * @param option
         */
        onMenusClick(option) {
            this.bookChapter = option.key
            this.getChapter()
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

        .move-right {
            position: absolute;
            //width: 100%;
            width: calc(~"100% + 16px");
            padding-right: 16px;
            height: 100%;
            margin: 0;
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

    .book-content {
        height: 100%;
        padding: 0;

        .book-main {
            width: calc(~"100% - 48px");
            overflow: auto;

            h1 {
                font-size: 2em;
                font-family: 黑体, serif;
                text-align: center;
            }

            p {
                text-indent: 2em;

                img {
                    position: relative;
                    left: -2em;
                }
            }
        }

        /*滚动条整体样式*/
        ::-webkit-scrollbar {
            width : 10px;  /*高宽分别对应横竖滚动条的尺寸*/
            height: 1px;
        }
        /*滚动条里面小方块*/
        ::-webkit-scrollbar-thumb {
            border-radius: 10px;
            box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
            background   : rgba(53, 53, 53, 0.2);
        }
        /*滚动条里面轨道*/
        ::-webkit-scrollbar-track {
            box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
            border-radius: 10px;
            background   : #ededed;
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
