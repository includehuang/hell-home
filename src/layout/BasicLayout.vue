<template>
    <a-layout id="basic-layout" class="layout">
        <div class="bg-mask"></div>
        <iframe class="special-effects" frameborder="no" src="/static/html/sakura.html"></iframe>
        <a-layout-header class='header-render' theme="#2F54EB">
            <div class="logo"/>
            <h-menu/>
            <div class="header-extra"></div>
        </a-layout-header>
        <a-layout-content class='content-render'>
            <router-view/>
        </a-layout-content>
        <a-layout-footer class='footer-render'>
        </a-layout-footer>
        <waifu ref="live2d" :settings="LIVE2D_SETTINGS" :style="{display: live2dDisplay}"/>
    </a-layout>
</template>

<script>
import LogoSvg from '../assets/logo.png'
import HMenu from "@/components/layout/HMenu"

// noinspection SpellCheckingInspection
export default {
    name: 'BasicLayout',
    components: {
        HMenu,
        LogoSvg,
    },
    data() {
        return {
            LIVE2D_SETTINGS: {
                'waifuDraggable': 'axis-x',
                'modelStorage': true,
            },
            live2dDisplay: 'block',
            title: '祎果',
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
        i18nRender(key) {
            return this.$t(`${key}`)
        },
    }
}
</script>

<style lang="less">
@import "../assets/style/color";

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
        box-shadow: 0 2px 8px rgb(0 0 0 / 15%);
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
            height: 32px;
            background: rgba(122, 122, 122, 0.2);
            margin: 16px 0 16px 24px;
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

</style>
