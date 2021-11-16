<template>
    <a-config-provider :locale="zh_CN">
        <div id="app">
            <router-view/>
        </div>
    </a-config-provider>
</template>

<!--suppress JSUnusedGlobalSymbols -->
<script>
import Vue from "vue"
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'
import BilibiliPlayer from "@/components/player/BilibiliPlayer"
import request from "@/common/request"
import 'moment/locale/zh-cn'

export default {
    name: 'App',
    components: {BilibiliPlayer},
    data() {
        return {
            zh_CN,
        }
    },
    mounted() {
        Vue.prototype.$vueObj = this
        Vue.prototype.$request = request
        Vue.prototype.$hideLive2d = () => {this.live2dDisplay = 'none'}
        Vue.prototype.$showLive2d = () => {this.live2dDisplay = 'display'}

        this.$moment.locale('zh-cn')
    },
}
</script>

<style lang="less">

* {
    box-sizing: border-box;
}

html {
    margin: 0;
    padding: 0;
    height: 100%;
    background-attachment: fixed;
}

body {
    margin: 0;
    padding: 0;
    height: 100%;
    background-color: rgba(255, 255, 255, 0) !important;
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    min-height: 100%;
    height: 100%;

}
</style>
