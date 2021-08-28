// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue"
import App from "./App"
import router from "./router"
import waifu from "waifus"
import antd from "ant-design-vue"
import "ant-design-vue/dist/antd.min.css"
import Vuex from "vuex"
import store from "@/store/store"
import VueI18n from "vue-i18n"
import i18n from "@/lang/i18n"

Vue.use(waifu)
Vue.use(antd)
Vue.use(Vuex)
Vue.use(VueI18n)

Vue.config.productionTip = false

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
