<template>
    <a-layout id="basic-layout" class="layout">
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
@import "./BasicLayout.less";
</style>
