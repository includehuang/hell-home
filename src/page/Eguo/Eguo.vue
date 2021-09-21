<template>
    <div id="eguo">
        <div class="header">
            <div class="avatar">
                <a-avatar size="large" :src="$store.state.common.avatar"/>
            </div>
            <div class="header-content">
                <div class="header-title">
                    <span>{{ $t('HellVision') }}</span>
                </div>
                <div :title="saying">{{ saying }}</div>
            </div>
            <div class="header-extra">
                <div class="header-title">
                    <span>{{ $t('project.Eguo.title') }}</span>
                </div>
            </div>
        </div>
        <div class="content">
            <a-row :gutter="24">
                <h-carousel :images="images" style="width: 1200px; margin: 0 auto"/>
            </a-row>
            <a-row :gutter="24">
                <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
                    <div style="height: 400px"></div>
                </a-col>
                <a-col style="padding: 0 12px" :xl="8" :lg="24" :md="24" :sm="24" :xs="24">
                    <div style="height: 400px"></div>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>

import factory from "@/page/Eguo/factory"
import HCarousel from "@/components/layout/HCarousel"

export default {
    name: "Eguo",
    components: {HCarousel},
    data() {
        return {
            sayingList: [],
            saying: '',
            images: [
                {src: '/static/img/ayaka.png', href: '/static/img/ayaka.png', target: "_blank"},
                {src: '/static/img/ayaka2.png', href: '/static/img/ayaka2.png', target: "_blank"},
                {src: '/static/img/ayaka3.png', href: '/static/img/ayaka3.png', target: "_blank"},
                {src: '/static/img/ayaka4.png', href: '/static/img/ayaka4.png', target: "_blank"},
                {src: '/static/test/test1.png', href: '/static/test/test1.png', target: "_self"},
                {src: '/static/test/test2.png', href: '/static/test/test2.png', target: "_self"},
            ]
        }
    },
    mounted() {
        this.initSaying()
    },
    methods: {
        // 初始化一言
        initSaying() {
            this.sayingList = factory.getSaying().then(res => {
                // 均衡概率
                this.sayingList = [...res.saying, res.saying[0]]
                this.saying = this.sayingList[Math.round(Math.random() * (this.sayingList.length - 1))]
                setInterval(() => {
                    this.saying = this.sayingList[Math.round(Math.random() * (this.sayingList.length - 1))]
                }, res.interval)
            })
        }
    }
}
</script>

<style lang="less">

@import "../../assets/style/color";

#eguo {

    .header {

        background: @backGround;
        padding: 12px 24px;

        .avatar {
            display: inline-block;

            & > span {
                display: inline-block;
                width: 100px;
                height: 100px;
                border-radius: 100px;
            }
        }

        .header-content {
            display: inline-block;
            position: relative;
            top: 24px;
            margin-left: 24px;
            line-height: 22px;
            color: @fontRemark;

            .header-title {
                margin-bottom: 12px;
                color: @fontMain;
                font-weight: 500;
                font-size: 20px;
                line-height: 28px;
            }
        }

        .header-extra {
            display: inline-block;
            position: relative;
            top: 24px;
            float: right;
            margin-left: 24px;
            line-height: 22px;
            color: @fontRemark;

            .header-title {
                margin-bottom: 12px;
                color: @fontMain;
                font-weight: 500;
                font-size: 18px;
                line-height: 28px;
                min-height: 28px;
            }
        }
    }

    .content {

        width: 1200px;
        margin: 12px auto;

        .carousel {
            text-align: center;
            height: 160px;
            line-height: 160px;
            background: #364d79;
            overflow: hidden;
        }
    }

}

</style>
