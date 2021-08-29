<template>
    <a-layout id="basic-layout" class="layout">
        <a-layout-header :class="'header-render'" theme="#2F54EB">
            <div class="logo"/>
            <a-menu
                theme="#2F54EB"
                mode="horizontal"
                :default-selected-keys="['1']"
                :inline-collapsed="collapsed"
                :class="'menu-render'"
            >
                <a-menu-item key="1">
                    <a-icon type="pie-chart" />
                    <span>Option 1</span>
                </a-menu-item>
                <a-menu-item key="2">
                    <a-icon type="desktop" />
                    <span>Option 2</span>
                </a-menu-item>
                <a-menu-item key="3">
                    <a-icon type="inbox" />
                    <span>Option 3</span>
                </a-menu-item>
                <a-sub-menu key="sub1">
                    <span slot="title">
                        <a-icon type="mail" />
                        <span>Navigation One</span>
                    </span>
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
                    <span slot="title">
                        <a-icon type="appstore" />
                        <span>Navigation Two</span>
                    </span>
                    <a-menu-item key="9">
                        Option 9
                    </a-menu-item>
                    <a-menu-item key="10">
                        Option 10
                    </a-menu-item>
                    <a-sub-menu key="sub3" title="Submenu">
                        <a-menu-item key="11">
                            <a-icon type="inbox" />
                            <span>Option 11</span>
                        </a-menu-item>
                        <a-menu-item key="12">
                            <a-icon type="appstore" />
                            <span>Option 12</span>
                        </a-menu-item>
                    </a-sub-menu>
                </a-sub-menu>
            </a-menu>
            <div class="header-extra"></div>
        </a-layout-header>
        <a-layout-content :class="'content-render'">
            <router-view/>
        </a-layout-content>
        <a-layout-footer :class="'footer-render'">
        </a-layout-footer>
    </a-layout>
</template>

<script>
import LogoSvg from '../assets/logo.png'

// noinspection SpellCheckingInspection
export default {
    name: 'BasicLayout',
    components: {
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
@import "./BasicLayout.less";
</style>
