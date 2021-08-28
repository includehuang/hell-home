<template>
    <div id="app">
        <markdown :content="'# Hello World\n\n> Hell Vision'"></markdown>
        <div class="bg-mask"></div>
        <BilibiliPlayer type="bilibili"/>
        <BilibiliPlayer type="small"/>
        <BilibiliPlayer type="default"/>
        <BilibiliPlayer type="large"/>
        <img src="./assets/logo.png">
        <router-view/>
        <waifu/>
    </div>
</template>

<script>
import Vue from "vue"
import BilibiliPlayer from "@/components/player/BilibiliPlayer"
export default {
    name: 'App',
    components: {BilibiliPlayer},
    data() {
        return {
        }
    },
    mounted() {
        Vue.prototype.$vueObj = this
    },
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
