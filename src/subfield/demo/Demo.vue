<template>
    <div id="Demo">
        <div class="header">
            <div class="avatar">
                <a-avatar size="large" :src="$store.state.common.avatar"/>
            </div>
            <div class="header-content">
                <div class="header-title">
                    <span class="welcome-text">{{ $t('home.welcome', [$t('HellVision')]) }}</span>
                </div>
                <div>{{ $t('home.characteristic') }}</div>
            </div>
            <div class="header-extra">
                <div class="header-title">
                    <span class="welcome-text">{{ 'nowTime' }}</span>
                </div>
                <div>{{ '$t(`message.${openTime}`)' }}</div>
            </div>
        </div>

        <div class="content">
            <router-link :to="{name: 'DirectiveDemo'}">自定义指令</router-link>
            <router-view/>
        </div>
    </div>
</template>

<script>
import Directive from "@/subfield/directive/Directive"
// import build from "@/subfield/demo/build"
export default {
    name: "Demo",
    components: {Directive},
    props: {},
    data() {
        return {}
    },
    beforeCreate() {
        // build()
    },
    mounted() {
    },
    methods: {},
    directive: {

    }
}
</script>

<style lang="less">

#Demo {

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

    .content {

        background: @backGround;
        padding: 12px 24px;
        margin: 12px;

    }

}


</style>
