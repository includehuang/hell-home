import COMMON from '@res/config/common.json'
import Vue from "vue"

export default function() {
    // 获取vue实例
    const thisVue = new Vue()
    const vueObj = thisVue.$vueObj

    if (COMMON["avatarCustom"]) {
        vueObj.$store.commit('avatar', COMMON["avatar"])
    }

}
