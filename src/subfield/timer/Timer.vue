<template>
    <div id="sub-timer">
        <iframe class="effects" :style="{height: height}" frameborder="no" src="/static/html/sakura.html"></iframe>
        <div class="header">
            <div class="avatar">
                <a-avatar size="large" :src="avatar" />
            </div>
            <div class="content">
                <div class="content-title">
                    <span class="welcome-text">岁岁的实习纪念</span>
                </div>
                <div>中医药大学 | 认真实习 | 努力考研</div>
            </div>
            <div class="content-extra">
                <div class="content-title">
                    <span class="welcome-text">已经实习了 {{ nowTime }}</span>
                </div>
                <div>{{ $t(`message.${openTime}`) }}</div>
            </div>
        </div>
        <div class="wrapper">
            <div ref="DD" class="canvas"></div>
            <div ref="HH" class="canvas"></div>
            <div class="text">天</div>
            <div class="text">小时</div>
            <div ref="mm" class="canvas"></div>
            <div ref="ss" class="canvas"></div>
            <div class="text">分钟</div>
            <div class="text">秒</div>
        </div>
    </div>
</template>

<script>

import moment from "moment"

export default {
    name: "Timer",
    data() {
        return {
            moment,
            deadline: Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30,
            nowTime: moment().format('HH: mm: ss'),
            openTime: moment().format('HH'),
            avatar: require('./suisui.jpg'),
            author: 'Hell Vision',
            startTime: moment('2021-5-24'),
            chartDD: null,
            chartHH: null,
            chartMM: null,
            chartSS: null,
            option: {
                series: [{
                    type: 'gauge',
                    progress: {
                        show: true,
                        width: 18
                    },
                    axisLine: {
                        lineStyle: {
                            width: 18
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        length: 15,
                        lineStyle: {
                            width: 2,
                            color: '#999'
                        }
                    },
                    axisLabel: {
                        distance: 25,
                        color: '#999',
                        fontSize: 20
                    },
                    anchor: {
                        show: true,
                        showAbove: true,
                        size: 25,
                        itemStyle: {
                            borderWidth: 10
                        }
                    },
                    title: {
                        show: false
                    },
                    detail: {
                        valueAnimation: true,
                        fontSize: 60,
                        offsetCenter: [0, '70%']
                    },
                    data: [{
                        value: 70
                    }],
                    max: 360,
                }]
            },
            height: '100vh'
        }
    },
    mounted() {

        document.documentElement.style.background = '#ffffff'
        if (document.documentElement.clientHeight < 1000) {
            this.height = '300vh'
        }

        this.chartDD = this.$refs.DD
        this.chartHH = this.$refs.HH
        this.chartMM = this.$refs.mm
        this.chartSS = this.$refs.ss

        let myChartDD = this.$echarts.init(this.chartDD)
        let myChartHH = this.$echarts.init(this.chartHH)
        let myChartMM = this.$echarts.init(this.chartMM)
        let myChartSS = this.$echarts.init(this.chartSS)

        setInterval(() => {
            const Seconds = parseInt(moment().diff(this.startTime) / 1000)
            const Days = parseInt(Seconds / 86400)
            const Hours = parseInt((Seconds % 86400) / 3600)
            const Minutes = parseInt((Seconds % 3600) / 60)
            this.option.series[0].max = 360
            this.option.series[0].data[0].value = Days
            this.option.series[0].splitNumber = 12
            myChartDD.setOption(this.option)
            this.option.series[0].max = 24
            this.option.series[0].data[0].value = Hours
            this.option.series[0].splitNumber = 6
            myChartHH.setOption(this.option)
            this.option.series[0].max = 60
            this.option.series[0].data[0].value = Minutes
            this.option.series[0].splitNumber = 12
            myChartMM.setOption(this.option)
            this.option.series[0].max = 60
            this.option.series[0].data[0].value = Seconds % 60
            this.option.series[0].splitNumber = 12
            myChartSS.setOption(this.option)
            this.nowTime = `${Days} 天 ${Hours} 时 ${Minutes} 分 ${Seconds % 60} 秒`
        }, 1000)

    },
    methods: {
    }
}
</script>

<style scoped lang="less">

#sub-timer {

    width: 100%;
    height: 100%;
    font-size: 35px;

    .header {

        width: 1080px;
        margin: 0 auto;
        background: @backGround;
        padding: 20px 40px;

        .avatar {
            display: inline-block;

            & > span {
                display: inline-block;
                width: 175px;
                height: 175px;
                border-radius: 175px;
            }
        }

        .content {
            display: inline-block;
            position: relative;
            top: 24px;
            margin-left: 24px;
            line-height: 1.2em;
            color: @fontRemark;

            .content-title {
                margin-bottom: 12px;
                color: @fontMain;
                font-weight: 500;
                font-size: 1.5em;
                line-height: 1.75em;
            }
        }

        .content-extra {
            display: block;
            position: relative;
            top: 24px;
            margin-left: 24px;
            line-height: 1.2em;
            color: @fontRemark;

            .content-title {
                margin-bottom: 12px;
                color: @fontMain;
                font-weight: 500;
                font-size: 1.25em;
                line-height: 1.5em;
                min-height: 1.5em;
            }
        }
    }

    .wrapper {
        width: 1000px;
        margin: 50px auto;
        display: flex;
        flex-wrap: wrap;

        .canvas {
            width: 500px;
            height: 500px;

        }

        .text {
            width: 500px;
            height: 50px;
            text-align: center;
            font-size: 45px;
            z-index: 10;
            transform: translateY(-50px);
        }
    }

    .effects {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        opacity: 0.5;
    }

}
</style>
