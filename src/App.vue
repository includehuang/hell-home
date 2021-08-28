<template>
    <a-config-provider :locale="locale">
        <div id="app">
            <div class="bg-mask"></div>
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
            locale: 'zh-CN'
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

.bg-mask {
    position: fixed;
    top: -500px;
    width: 100%;
    height: 150vh;
    min-height: 1500px;
    z-index: -9999;
    background-color: rgba(255, 255, 255, 0.75) !important;
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    min-height: 100%;
}
</style>
