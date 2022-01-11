<template>
    <div id="home">
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
                    <span class="welcome-text">{{ nowTime }}</span>
                </div>
                <div>{{ $t(`message.${openTime}`) }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import BasicLayout from "@/layout/BasicLayout"
import HMenu from "@/components/layout/HMenu"
import factory from "@/page/home/factory"

export default {
    name: "SubfieldIndex",
    components: {BasicLayout, HMenu},
    data() {
        return {
            nowTime: this.$moment().format('HH: mm: ss'),
            openTime: this.$moment().format('HH'),
        }
    },
    mounted() {

        factory.getProjects().then(res => {
            this.loading = false
            this.projects = res.projects
            this.activities = res.activities
            this.btnGroup = res.btnGroup
            this.axisData = res.axisData
            this.teams = res.teams
            this.axisOption = res.axisOption
            this.axisDom = this.$refs.axis
            this.$echarts.init(this.axisDom).setOption(this.axisOption)
        }).catch(res => {
            this.loading = false
        })

        setInterval(() => {
            this.nowTime = this.$moment().format('HH: mm: ss')
        }, 1000)

    },
}
</script>

<style lang="less">

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

/**.content {
//
//    width: 1200px;
//    margin: 12px auto;
//
//
//    .project-list {
//        .card-title {
//            font-size: 0;
//
//            a {
//                color: rgba(0, 0, 0, 0.85);
//                margin-left: 12px;
//                line-height: 24px;
//                height: 24px;
//                display: inline-block;
//                vertical-align: top;
//                font-size: 14px;
//
//                &:hover {
//                    color: #1890ff;
//                }
//            }
//        }
//
//        .card-description {
//            color: rgba(0, 0, 0, 0.45);
//            height: 44px;
//            line-height: 22px;
//            overflow: hidden;
//        }
//
//        .project-item {
//            display: flex;
//            margin-top: 8px;
//            overflow: hidden;
//            font-size: 12px;
//            height: 20px;
//            line-height: 20px;
//
//            a {
//                color: rgba(0, 0, 0, 0.45);
//                display: inline-block;
//                flex: 1 1 0;
//
//                &:hover {
//                    color: #1890ff;
//                }
//            }
//
//            .datetime {
//                color: rgba(0, 0, 0, 0.25);
//                flex: 0 0 auto;
//                float: right;
//            }
//        }
//
//        .ant-card-meta-description {
//            color: rgba(0, 0, 0, 0.45);
//            height: 44px;
//            line-height: 22px;
//            overflow: hidden;
//        }
//    }
//
//    .item-group {
//        padding: 20px 0 8px 24px;
//        font-size: 0;
//
//        a {
//            color: rgba(0, 0, 0, 0.65);
//            display: inline-block;
//            font-size: 14px;
//            margin-bottom: 13px;
//            width: 25%;
//        }
//    }
//
//    .members {
//        a {
//            display: block;
//            margin: 12px 0;
//            line-height: 24px;
//            height: 24px;
//
//            .member {
//                font-size: 14px;
//                color: rgba(0, 0, 0, 0.65);
//                line-height: 24px;
//                max-width: 100px;
//                vertical-align: top;
//                margin-left: 12px;
//                transition: all 0.3s;
//                display: inline-block;
//            }
//
//            &:hover {
//                span {
//                    color: #1890ff;
//                }
//            }
//        }
//    }
//
//    .mobile {
//        .project-list {
//            .project-card-grid {
//                width: 100%;
//            }
//        }
//
//        .more-info {
//            border: 0;
//            padding-top: 16px;
//            margin: 16px 0 16px;
//        }
//
//        .headerContent .title .welcome-text {
//            display: none;
//        }
//    }
//}
 */

</style>
