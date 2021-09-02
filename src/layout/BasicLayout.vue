<template>
    <a-layout id="basic-layout" class="layout">
        <div class="bg-mask"></div>
        <iframe class="special-effects" frameborder="no" src="/static/html/sakura.html"></iframe>
        <a-layout-header :class="'header-render'" theme="#2F54EB">
            <div class="logo"/>
            <h-menu/>
            <div class="header-extra"></div>
        </a-layout-header>
        <a-layout-content :class="'content-render'">
            <router-view/>
        </a-layout-content>
        <a-layout-footer :class="'footer-render'">
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
            // preview.pro.antd.com only use.
            isProPreviewSite: process.env.VUE_APP_PREVIEW === 'true' && process.env.NODE_ENV !== 'development',
            // end
            isDev: process.env.NODE_ENV === 'development' || process.env.VUE_APP_PREVIEW === 'true',

            // base
            menus: [],
            // 侧栏收起状态
            collapsed: false,
            title: '祎果',
            settings: {
                // 布局类型
                layout: 'topmenu', // 'sidemenu', 'topmenu'
                // CONTENT_WIDTH_TYPE
                contentWidth: 'Fixed',
                // 主题 'dark' | 'light'
                theme: 'light',
                // 主色调
                primaryColor: '#2F54EB',
                fixedHeader: true,
                fixSiderbar: false,
                colorWeak: false,

                hideHintAlert: false,
                hideCopyButton: false
            },
            // 媒体查询
            query: {},

            // 是否手机模式
            isMobile: false
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
#basic-layout {

    text-align: center;
    min-width: 1300px;

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
        background: #FFFFFF;
        min-width: 1200px;

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
            line-height: 62px;
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
        width: 1080px;
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
                background: #1890ff;
            }
        }
    }

    .ant-pro-account-avatar {
        .antd-pro-global-header-index-avatar {
            margin: 20px 8px 20px 0;
            color: #1890ff;
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
