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
                        :bordered="false"
                        title="进行中的项目"
                        :body-style="{ padding: 0 }"
                    >
                        <a slot="extra">全部项目</a>
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
                                        <a href="/#">科学搬砖组</a>
                                        <span class="datetime">9小时前</span>
                                    </div>
                                </a-card>
                            </a-card-grid>
                        </div>
                        <a-empty v-else/>
                    </a-card>

                    <a-card title="动态" :bordered="false">
                        <a-list>
                            <a-list-item :key="index" v-for="(item, index) in activities">
                                <a-list-item-meta>
                                    <a-avatar slot="avatar" size="small" :src="item.user.avatar"/>
                                    <div slot="title">
                                        <span>{{ item.user.nickname }}</span>&nbsp;在&nbsp;
                                        <a href="#">{{ item.project.name }}</a>
                                        <span>{{ item.project.action }}</span>&nbsp;
                                        <a href="#">{{ item.project.event }}</a>
                                    </div>
                                    <div slot="description">{{ item.time }}</div>
                                </a-list-item-meta>
                            </a-list-item>
                        </a-list>
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
                        title="快速开始 / 便捷导航"
                        style="margin-bottom: 24px"
                        :bordered="false"
                        :body-style="{ padding: 0 }"
                    >
                        <div class="item-group">
                            <a>操作一</a>
                            <a>操作二</a>
                            <a>操作三</a>
                            <a>操作四</a>
                            <a>操作五</a>
                            <a>操作六</a>
                            <a-button size="small" type="primary" ghost icon="plus">添加</a-button>
                        </div>
                    </a-card>
                    <a-card
                        title="XX 指数"
                        style="margin-bottom: 24px"
                        :bordered="false"
                        :body-style="{ padding: 0 }"
                    >
                        <!-- :scale="scale" :axis1Opts="axis1Opts" :axis2Opts="axis2Opts"  -->
                        <!--                            <radar :data="axisData"/>-->
                        <!--                            <a-empty></a-empty>-->
                        <div ref="axis" style="width: 360px; height: 400px; margin: 0 auto 24px;"></div>
                    </a-card>
                    <a-card title="团队" :bordered="false">
                        <div class="members">
                            <a-row>
                                <a-col :span="12" v-for="(item, index) in teams" :key="index">
                                    <a>
                                        <a-avatar size="small" :src="item.avatar"/>
                                        <span class="member">{{ item.name }}</span>
                                    </a>
                                </a-col>
                            </a-row>
                        </div>
                    </a-card>
                </a-col>
            </a-row>
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
            projects: [
                {
                    id: 1,
                    cover: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
                    title: 'Alipay',
                    description: '那是一种内在的东西， 他们到达不了，也无法触及的',
                    status: 1,
                    updatedAt: '2018-07-26 00:00:00'
                },
                {
                    id: 2,
                    cover: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
                    title: 'Angular',
                    description: '希望是一个好东西，也许是最好的，好东西是不会消亡的',
                    status: 1,
                    updatedAt: '2018-07-26 00:00:00'
                },
                {
                    id: 3,
                    cover: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
                    title: 'Ant Design',
                    description: '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
                    status: 1,
                    updatedAt: '2018-07-26 00:00:00'
                },
                {
                    id: 4,
                    cover: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png',
                    title: 'Ant Design Pro',
                    description: '那时候我只会想自己想要什么，从不想自己拥有什么',
                    status: 1,
                    updatedAt: '2018-07-26 00:00:00'
                },
                {
                    id: 5,
                    cover: 'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png',
                    title: 'Bootstrap',
                    description: '凛冬将至',
                    status: 1,
                    updatedAt: '2018-07-26 00:00:00'
                },
                {
                    id: 6,
                    cover: 'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png',
                    title: 'Vue',
                    description: '生命就像一盒巧克力，结果往往出人意料',
                    status: 1,
                    updatedAt: '2018-07-26 00:00:00'
                }
            ],
            activities: [
                {
                    id: 1,
                    user: {
                        nickname: '@name',
                        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
                    },
                    project: {
                        name: '白鹭酱油开发组',
                        action: '更新',
                        event: '番组计划'
                    },
                    time: '2018-08-23 14:47:00'
                },
                {
                    id: 1,
                    user: {
                        nickname: '蓝莓酱',
                        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png'
                    },
                    project: {
                        name: '白鹭酱油开发组',
                        action: '更新',
                        event: '番组计划'
                    },
                    time: '2018-08-23 09:35:37'
                },
                {
                    id: 1,
                    user: {
                        nickname: '@name',
                        avatar: '@image(64x64)'
                    },
                    project: {
                        name: '白鹭酱油开发组',
                        action: '创建',
                        event: '番组计划'
                    },
                    time: '2017-05-27 00:00:00'
                },
                {
                    id: 1,
                    user: {
                        nickname: '曲丽丽',
                        avatar: '@image(64x64)'
                    },
                    project: {
                        name: '高逼格设计天团',
                        action: '更新',
                        event: '六月迭代'
                    },
                    time: '2018-08-23 14:47:00'
                },
                {
                    id: 1,
                    user: {
                        nickname: '@name',
                        avatar: '@image(64x64)'
                    },
                    project: {
                        name: '高逼格设计天团',
                        action: 'created',
                        event: '六月迭代'
                    },
                    time: '2018-08-23 14:47:00'
                },
                {
                    id: 1,
                    user: {
                        nickname: '曲丽丽',
                        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
                    },
                    project: {
                        name: '高逼格设计天团',
                        action: 'created',
                        event: '六月迭代'
                    },
                    time: '2018-08-23 14:47:00'
                }
            ],
            axisData: [
                {item: '引用', a: 70, b: 30, c: 40},
                {item: '口碑', a: 60, b: 70, c: 40},
                {item: '产量', a: 50, b: 60, c: 40},
                {item: '贡献', a: 40, b: 50, c: 40},
                {item: '热度', a: 60, b: 70, c: 40},
                {item: '引用', a: 70, b: 50, c: 40}
            ],
            teams: [
                {
                    id: 1,
                    name: '科学搬砖组',
                    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
                },
                {
                    id: 2,
                    name: '程序员日常',
                    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png'
                },
                {
                    id: 1,
                    name: '设计天团',
                    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png'
                },
                {
                    id: 1,
                    name: '中二少女团',
                    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png'
                },
                {
                    id: 1,
                    name: '骗你学计算机',
                    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png'
                }
            ],
            axisOption: {
                legend: {
                    data: ['Hell Vision', '祎果', '基础管理员'],
                    bottom: true
                },
                radar: {
                    // shape: 'circle',
                    indicator: [
                        { name: '引用', max: 100},
                        { name: '热度', max: 100},
                        { name: '贡献', max: 100},
                        { name: '产量', max: 100},
                        { name: '口碑', max: 100},
                    ]
                },
                series: [{
                    name: '预算 vs 开销（Budget vs spending）',
                    type: 'radar',
                    data: [
                        {
                            value: [50, 50, 50, 50, 50],
                            name: '基础管理员'
                        },
                        {
                            value: [20, 20, 80, 100, 95],
                            name: 'Hell Vision'
                        },
                        {
                            value: [70, 75, 0, 45, 55],
                            name: '祎果'
                        }
                    ]
                }]
            },
            axisDom: null,
        }
    },
    mounted() {

        this.axisDom = this.$refs.axis
        this.$echarts.init(this.axisDom).setOption(this.axisOption)

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
