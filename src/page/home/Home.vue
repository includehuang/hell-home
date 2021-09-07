<!--suppress ALL -->
<template>
    <div id="home">
        <div class="header">
            <div class="avatar">
                <a-avatar size="large" :src="avatar"/>
            </div>
            <div class="header-content">
                <div class="header-title">
                    <span class="welcome-text">{{ $t('home.welcome', [author]) }}</span>
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

        <div class="content">
            <a-row :gutter="24">
                <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
                    <a-card
                        class="project-list"
                        style="margin-bottom: 24px;"
                        :loading="loading"
                        :bordered="false"
                        :title="$t('home.project.run')"
                        :body-style="{ padding: 0 }"
                    >
                        <a slot="extra">{{ $t('home.project.all') }}</a>
                        <div v-if="projects.length">
                            <a-card-grid class="project-card-grid" :key="i" v-for="(item, i) in projects">
                                <a-card :bordered="false" :body-style="{ padding: 0 }">
                                    <a-card-meta>
                                        <div slot="title" class="card-title">
                                            <a-avatar size="small" :src="item.cover"/>
                                            <a>{{ item.title }}</a>
                                        </div>
                                        <div slot="description" class="card-description">
                                            {{ item.description }}
                                        </div>
                                    </a-card-meta>
                                    <div class="project-item">
                                        <a href="/#">{{ item.author }}</a>
                                        <span class="datetime">{{ $moment(item.updatedTime).fromNow() }}</span>
                                    </div>
                                </a-card>
                            </a-card-grid>
                        </div>
                        <a-empty v-else/>
                    </a-card>

                    <a-card :title="$t('home.behaviour')" :bordered="false" :loading="loading">
                        <a-list v-if="activities.length">
                            <a-list-item :key="index" v-for="(item, index) in activities">
                                <a-list-item-meta>
                                    <a-avatar slot="avatar" size="small" :src="item.user.avatar"/>
                                    <div slot="title">
                                        <span>{{ item.user.nickname }}</span>{{ $t('home.behaviour.in') }}
                                        <a href="#">{{ item.project.name }}</a>
                                        <span>{{ item.project.action }}</span>&nbsp;
                                        <a href="#">{{ item.project.event }}</a>
                                    </div>
                                    <div slot="description">{{ item.time }}</div>
                                </a-list-item-meta>
                            </a-list-item>
                        </a-list>
                        <a-empty v-else/>
                    </a-card>
                </a-col>
                <a-col
                    style="padding: 0 12px"
                    :xl="8"
                    :lg="24"
                    :md="24"
                    :sm="24"
                    :xs="24">
                    <a-card
                        :title="$t('home.quick.route')"
                        style="margin-bottom: 24px"
                        :loading="loading"
                        :bordered="false"
                        :body-style="{ padding: 0 }"
                    >
                        <div class="item-group" v-if="btnGroup.length">
                            <a v-for="(item, index) in btnGroup" :key="index" :href="item.href">{{ item.label }}</a>
                            <a-button size="small" type="primary" ghost icon="plus">{{ $t('home.quick.route.add') }}</a-button>
                        </div>
                        <a-empty v-else/>
                    </a-card>
                    <a-card
                        :title="$t('home.axis')"
                        style="margin-bottom: 24px"
                        :bordered="false"
                        :body-style="{ padding: 0 }"
                    >
                        <!-- 这里不使用card的loading是因为使用card时会导致echarts获取不到dom节点，v-show同理 -->
                        <a-spin :spinning="loading" style="min-height: 60px">
                            <div ref="axis" style="width: 360px; height: 400px; margin: 0 auto 24px;" v-show="axisOption"></div>
                            <a-empty v-show="!loading && !axisOption"/>
                        </a-spin>
                    </a-card>
                    <a-card :title="$t('home.team')" :bordered="false" :loading="loading">
                        <div class="members" v-if="teams.length">
                            <a-row>
                                <a-col :span="12" v-for="(item, index) in teams" :key="index">
                                    <a>
                                        <a-avatar size="small" :src="item.avatar"/>
                                        <span class="member">{{ item.name }}</span>
                                    </a>
                                </a-col>
                            </a-row>
                        </div>
                        <a-empty v-else/>
                    </a-card>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>

import factory from "@/page/home/factory"

export default {
    name: "Home",
    data() {
        return {
            nowTime: this.$moment().format('HH: mm: ss'),
            openTime: this.$moment().format('HH'),
            avatar: '/static/img/common/avatar.jpg',
            author: 'Hell Vision',
            loading: true,
            btnGroup: [],
            projects: [],
            activities: [],
            axisData: [],
            teams: [],
            axisOption: null,
            axisDom: null,
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

        width: 1200px;
        margin: 12px auto;


        .project-list {
            .card-title {
                font-size: 0;

                a {
                    color: rgba(0, 0, 0, 0.85);
                    margin-left: 12px;
                    line-height: 24px;
                    height: 24px;
                    display: inline-block;
                    vertical-align: top;
                    font-size: 14px;

                    &:hover {
                        color: #1890ff;
                    }
                }
            }

            .card-description {
                color: rgba(0, 0, 0, 0.45);
                height: 44px;
                line-height: 22px;
                overflow: hidden;
            }

            .project-item {
                display: flex;
                margin-top: 8px;
                overflow: hidden;
                font-size: 12px;
                height: 20px;
                line-height: 20px;

                a {
                    color: rgba(0, 0, 0, 0.45);
                    display: inline-block;
                    flex: 1 1 0;

                    &:hover {
                        color: #1890ff;
                    }
                }

                .datetime {
                    color: rgba(0, 0, 0, 0.25);
                    flex: 0 0 auto;
                    float: right;
                }
            }

            .ant-card-meta-description {
                color: rgba(0, 0, 0, 0.45);
                height: 44px;
                line-height: 22px;
                overflow: hidden;
            }
        }

        .item-group {
            padding: 20px 0 8px 24px;
            font-size: 0;

            a {
                color: rgba(0, 0, 0, 0.65);
                display: inline-block;
                font-size: 14px;
                margin-bottom: 13px;
                width: 25%;
            }
        }

        .members {
            a {
                display: block;
                margin: 12px 0;
                line-height: 24px;
                height: 24px;

                .member {
                    font-size: 14px;
                    color: rgba(0, 0, 0, 0.65);
                    line-height: 24px;
                    max-width: 100px;
                    vertical-align: top;
                    margin-left: 12px;
                    transition: all 0.3s;
                    display: inline-block;
                }

                &:hover {
                    span {
                        color: #1890ff;
                    }
                }
            }
        }

        .mobile {
            .project-list {
                .project-card-grid {
                    width: 100%;
                }
            }

            .more-info {
                border: 0;
                padding-top: 16px;
                margin: 16px 0 16px;
            }

            .headerContent .title .welcome-text {
                display: none;
            }
        }
    }

}

</style>
