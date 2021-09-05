<template>
    <div id="home">
        <div class="header">
            <div class="avatar">
                <a-avatar size="large" :src="avatar" />
            </div>
            <div class="content">
                <div class="content-title">
                    <span class="welcome-text">{{ $t('home.welcome', [author]) }}</span>
                </div>
                <div>{{ $t('home.characteristic') }}</div>
            </div>
            <div class="content-extra">
                <div class="content-title">
                    <span class="welcome-text">{{ nowTime }}</span>
                </div>
                <div>{{ $t(`message.${openTime}`) }}</div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "Home",
    data() {
        return {
            nowTime: this.$moment().format('HH: mm: ss'),
            openTime: this.$moment().format('HH'),
            avatar: '/static/img/common/avatar.jpg',
            author: 'Hell Vision',
        }
    },
    mounted() {
        setInterval(() => {
            this.nowTime = this.$moment().format('HH: mm: ss')
        }, 1000)
    }
}
</script>

<style lang="less">

@import "../../assets/style/color";

#home {

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

        .content {
            display: inline-block;
            position: relative;
            top: 24px;
            margin-left: 24px;
            line-height: 22px;
            color: @fontRemark;

            .content-title {
                margin-bottom: 12px;
                color: @fontMain;
                font-weight: 500;
                font-size: 20px;
                line-height: 28px;
            }
        }

        .content-extra {
            display: inline-block;
            position: relative;
            top: 24px;
            float: right;
            margin-left: 24px;
            line-height: 22px;
            color: @fontRemark;

            .content-title {
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
