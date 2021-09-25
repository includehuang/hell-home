<template>
    <a-layout id="basic-layout" class="layout">
        <div class="bg-mask"></div>
        <iframe class="special-effects" frameborder="no" src="/static/html/sakura.html"></iframe>
        <a-layout-header class="header-render" theme="#2F54EB">
            <div class="logo"/>
            <h-menu :menus="menus" :selectedKeys="[$route.path]"/>
            <div class="header-extra">
                <!--suppress SpellCheckingInspection -->
                <iframe frameborder="no" marginwidth="0" marginheight="0" width=298 height=52
                        src="//music.163.com/outchain/player?type=0&id=6852319897&auto=1&height=32"></iframe>
            </div>
        </a-layout-header>
        <a-layout-content ref="content" :class="'content-render ' + codeStyle">
            <span>
                请选择代码高亮样式：
            </span>
            <a-select default-value="idea" :allowClear="true" :showSearch="true" style="width: 200px" @change="changeCodeLight">
                <template v-for="item in codeLight">
                    <a-select-option :value="item.split('.')[0]" :key="item.split('.')[0]">
                        {{item.split('.')[0]}}
                    </a-select-option>
                </template>
            </a-select>
            <router-view/>
        </a-layout-content>
        <a-layout-footer class='footer-render'>
        </a-layout-footer>
        <waifu ref="live2d" :settings="LIVE2D_SETTINGS" :style="{display: live2dDisplay}"/>
    </a-layout>
</template>

<!--suppress SpellCheckingInspection -->
<script>
import LogoSvg from '../assets/logo.png'
import HMenu from "@/components/layout/HMenu"
import {menus} from '@/router'

// noinspection SpellCheckingInspection
export default {
    name: 'BasicLayout',
    components: {
        HMenu,
        LogoSvg,
    },
    data() {
        return {
            menus,
            LIVE2D_SETTINGS: {
                'waifuDraggable': 'axis-x',
                'modelStorage': true,
            },
            live2dDisplay: 'block',
            title: '祎果',
            codeLight: [
                'a11y-dark.css',
                'a11y-light.css',
                'agate.css',
                'an-old-hope.css',
                'androidstudio.css',
                'arduino-light.css',
                'arta.css',
                'ascetic.css',
                'atom-one-dark-reasonable.css',
                'atom-one-dark.css',
                'atom-one-light.css',
                'brown-paper.css',
                'codepen-embed.css',
                'color-brewer.css',
                'dark.css',
                'default.css',
                'devibeans.css',
                'docco.css',
                'far.css',
                'foundation.css',
                'github-dark-dimmed.css',
                'github-dark.css',
                'github.css',
                'gml.css',
                'googlecode.css',
                'gradient-dark.css',
                'gradient-light.css',
                'grayscale.css',
                'hybrid.css',
                'idea.css',
                'ir-black.css',
                'isbl-editor-dark.css',
                'isbl-editor-light.css',
                'kimbie-dark.css',
                'kimbie-light.css',
                'lightfair.css',
                'lioshi.css',
                'magula.css',
                'mono-blue.css',
                'monokai-sublime.css',
                'monokai.css',
                'night-owl.css',
                'nnfx-dark.css',
                'nnfx-light.css',
                'nord.css',
                'obsidian.css',
                'paraiso-dark.css',
                'paraiso-light.css',
                'pojoaque.css',
                'purebasic.css',
                'qtcreator-dark.css',
                'qtcreator-light.css',
                'rainbow.css',
                'routeros.css',
                'school-book.css',
                'shades-of-purple.css',
                'srcery.css',
                'stackoverflow-dark.css',
                'stackoverflow-light.css',
                'sunburst.css',
                'tomorrow-night-blue.css',
                'tomorrow-night-bright.css',
                'vs.css',
                'vs2015.css',
                'xcode.css',
                'xt256.css'
            ],
            codeStyle: 'code-light-idea',
        }
    },
    mounted() {
        const userAgent = navigator.userAgent
        if (userAgent.indexOf('Edge') > -1) {
            this.$nextTick(() => {
                this.collapsed = !this.collapsed
                setTimeout(() => {
                    this.collapsed = !this.collapsed
                }, 16)
            })
        }
    },
    methods: {
        changeCodeLight(style) {
            this.codeStyle = 'code-light-' + style
        }
    }
}
</script>

<style lang="less">
@import "../assets/style/color";
@import "../assets/style/codeLight";

#basic-layout {

    text-align: center;
    min-width: 1600px;

    .bg-mask {
        position: fixed;
        width: 100%;
        height: 100vh;
        z-index: -9999;
        background-color: rgb(255, 255, 255) !important;
    }

    .special-effects {
        position: fixed;
        width: 100%;
        height: 100vh;
        z-index: -8888;
    }

    .header-render {

        text-align: center;
        background: @backGround;
        min-width: 1200px;
        box-shadow: @headerShadow;
        transition: background 0.3s, width 0.2s;
        z-index: 100;

        * {
            vertical-align: top;
        }

        .logo {
            display: inline-block;
            width: 120px;
            height: 32px;
            background: rgba(122, 122, 122, 0.2);
            margin: 16px 24px 16px 0;
        }

        .menu-render {
            display: inline-block;
            width: 900px;
            line-height: 63px;
            text-align: center;

            .anticon {
                vertical-align: 0.5em !important;
            }
        }

        .header-extra {
            display: inline-block;
            width: 120px;
            //height: 32px;
            //background: rgba(122, 122, 122, 0.2);
            margin: 4px 0 4px 24px;
        }
    }

    .content-render {
        margin: 0 auto;
        width: 1272px;
        text-align: left;
    }

    .footer-render {
        text-align: center;
    }

}

.ant-layout {
    background: none !important;

    .ant-layout-footer {
        background: none !important;
    }

    .ant-layout-footer {
        background: none !important;
    }
}

.ant-pro-global-header-index-right {
    margin-right: 8px;

    &.ant-pro-global-header-index-dark {
        .ant-pro-global-header-index-action {
            color: hsla(0, 0%, 100%, .85);

            &:hover {
                background: @theme;
            }
        }
    }

    .ant-pro-account-avatar {
        .antd-pro-global-header-index-avatar {
            margin: 20px 8px 20px 0;
            color: @theme;
            vertical-align: top;
            background: rgba(255, 255, 255, 0.85);
        }
    }

    .menu {
        .anticon {
            margin-right: 8px;
        }

        .ant-dropdown-menu-item {
            min-width: 100px;
        }
    }
}

.ant-empty {
    margin: 8px;
}

</style>
