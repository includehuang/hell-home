// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue"
import App from "./App"
import router from "./router"
import waifu from "waifus"
import antd from "ant-design-vue"
import "ant-design-vue/dist/antd.min.css"
import store from "@/store/store"
import VueI18n from "vue-i18n"
import i18n from "@/lang/i18n"
import markdown from "@/tool/markdown/markdown"
import request from "@/common/request"
import * as echarts from 'echarts'
import moment from "moment"

Vue.use(waifu)
Vue.use(antd)
Vue.use(VueI18n)
Vue.use(markdown)

Vue.config.productionTip = false
// noinspection JSUnusedGlobalSymbols
Vue.prototype.$axios = request
// noinspection JSUnusedGlobalSymbols
Vue.prototype.$request = request
// noinspection JSUnusedGlobalSymbols
Vue.prototype.$echarts = echarts
// noinspection JSUnusedGlobalSymbols
Vue.prototype.$moment = moment

import style from "./config/style"
style()

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    i18n,
    components: {App},
    template: '<App/>'
})
