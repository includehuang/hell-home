<template>
    <a-config-provider>
        <div id="app">
            <div class="bg-mask"></div>
            <iframe class="special-effects" frameborder="no" src="/static/html/sakura.html"></iframe>
            <router-view/>
            <waifu ref="live2d" :settings="LIVE2D_SETTINGS" :style="{display: live2dDisplay}"/>
        </div>
    </a-config-provider>
</template>

<!--suppress JSUnusedGlobalSymbols -->
<script>
import Vue from "vue"
import BilibiliPlayer from "@/components/player/BilibiliPlayer"
export default {
    name: 'App',
    components: {BilibiliPlayer},
    mounted() {
        Vue.prototype.$vueObj = this
        Vue.prototype.$hideLive2d = () => {this.live2dDisplay = 'none'}
        Vue.prototype.$showLive2d = () => {this.live2dDisplay = 'display'}
    },
    data() {
        return {
            LIVE2D_SETTINGS: {
                'waifuDraggable': 'axis-x',
                'modelStorage': true,
            },
            live2dDisplay: 'block',
        }
    }
}
</script>

<style lang="less">

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

}
</style>
