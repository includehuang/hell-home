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

Vue.use(waifu)
Vue.use(antd)
Vue.use(Vuex)

Vue.config.productionTip = false

import style from "./config/style"
style()

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>'
})
