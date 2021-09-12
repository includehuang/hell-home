<template>
    <div>
        <a-carousel autoplay arrows id="h-carousel">
            <template v-if="imgList.length" v-for="(item, index) in imgList">
                <img :src="item" :key="index" :style="imgStyle">
            </template>
            <template v-else>
                <slot/>
            </template>
            <slot name="prevArrow">
                <div slot="prevArrow" class="custom-slick-arrow" :style="{...btnStyle, ...leftBtnStyle}">
                    <a-icon type="left-circle" />
                </div>
            </slot>
            <slot name="nextArrow">
                <div slot="nextArrow" class="custom-slick-arrow" :style="{...btnStyle, ...rightBtnStyle}">
                    <a-icon type="right-circle" />
                </div>
            </slot>
        </a-carousel>
    </div>
</template>

<script>
export default {
    name: "HCarousel",
    props: {
        imgList: {
            type: Array,
            default() {
                return []
            }
        },
        imgStyle: {
            type: Object,
            default() {
                return {
                }
            }
        },
        btnStyle: {
            type: Object,
            default() {
                return {
                    'z-index': 1
                }
            }
        },
        leftBtnStyle: {
            type: Object,
            default() {
                return {
                    'left': '10px'
                }
            }
        },
        rightBtnStyle: {
            type: Object,
            default() {
                return {
                    'right': '10px'
                }
            }
        }
    },
    data() {
        return {}
    },
    mounted() {
    },
    methods: {}
}
</script>

<style lang="less">

#h-carousel {
    .custom-slick-arrow {
        width: 25px;
        height: 25px;
        font-size: 25px;
        color: #fff;
        //background-color: rgba(31, 45, 61, 0.11);
    }
    .custom-slick-arrow:before {
        display: none;
    }
    .custom-slick-arrow:hover {
        color: #1890ff;
    }
}

</style>
