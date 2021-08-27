<template>
    <div id="app">
        <div class="bg-mask"></div>
        <BilibiliPlayer/>
        <BilibiliPlayer type="bilibili"/>
        <BilibiliPlayer type="small"/>
        <BilibiliPlayer type="large"/>
        <a-button>测试按钮</a-button>
        <a-button :style="{fontSize: '16px'}">测试按钮</a-button>
        <img src="./assets/logo.png">
        <router-view/>
        <waifu/>
    </div>
</template>

<script>
import APPEARANCE from "@/common/util/appearance"
import BilibiliPlayer from "@/components/player/BilibiliPlayer"
export default {
    name: 'App',
    components: {BilibiliPlayer},
    data() {
        return {
            APPEARANCE,
        }
    },
    mounted() {
    },
}
</script>

<style lang="less">

html {
    margin: 0;
    padding: 0;
    height: 100%;
    //background-image: url("/static/img/ayaka.png");
    background-attachment: fixed;
}

body {
    margin: 0;
    padding: 0;
    height: 100%;
    background-color: rgba(255, 255, 255, 0) !important;
}

.bg-mask {
    //position: relative;
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
    //background-color: rgba(255, 255, 255, 0.75) !important;
    min-height: 100%;
}
</style>
