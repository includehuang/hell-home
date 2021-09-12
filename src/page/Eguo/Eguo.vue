<template>
    <div id="eguo">
        <div class="header">
            <div class="avatar">
                <a-avatar size="large" :src="$store.state.common.avatar"/>
            </div>
            <div class="header-content">
                <div class="header-title">
                    <span class="welcome-text">{{ $t('HellVision') }}</span>
                </div>
                <div>{{ saying }}</div>
            </div>
            <div class="header-extra">
                <div class="header-title">
                    <span class="welcome-text">{{ $t('project.Eguo') }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import factory from "@/page/Eguo/factory"

export default {
    name: "Eguo",
    data() {
        return {
            sayingList: [],
            saying: '',
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
                font-size: 20px;
                line-height: 28px;
                min-height: 28px;
            }
        }
    }
}
</style>
