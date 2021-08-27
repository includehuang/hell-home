<template>
    <div :style="Object.assign({overflow: 'hidden', margin: '10px auto 10px'}, playerStyle[type], wrapperStyle)">
        <iframe :src="src" scrolling="no" frameborder="no" allow="fullscreen"
                width="100%" :height="frameHeight[type]" :style="frameStyle"></iframe>
    </div>
</template>

<script>
export default {
    name: "BilibiliPlayer",
    props: {
        type: {
            type: String,
            default: 'default'
        },
        src: {
            type: String,
            default: '//player.bilibili.com/player.html?aid=376632446&bvid=BV1io4y1X7HU&cid=369556142&page=1'
        },
        wrapperStyle: {
            type: Object,
            default() {
                return {}
            }
        },
        frameStyle: {
            type: Object,
            default() {
                return {}
            }
        },
    },
    data() {
        return {
            playerStyle: {
                'default': {
                    width: '750px',
                    height: '422px'
                },
                'bilibili': {
                    width: '300px',
                    height: '150px'
                },
                'small': {
                    width: '451px',
                    height: '285px'
                },
                'large': {
                    width: '960px',
                    height: '602px'
                },
            },
            frameHeight: {
                'default': '460px',
                'bilibili': '150px',
                'small': '285px',
                'large': '640px',
            }
        }
    }
}
</script>

<style scoped lang="less">
</style>
