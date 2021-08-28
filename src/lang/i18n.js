import Vue from "vue"
import VueI18n from "vue-i18n"
import zh_CH from "./common/zh_CN"
import en_US from "./common/en_US"

Vue.use(VueI18n)

const messages = {
    'zh-CN': zh_CH,
    'en-US': en_US,
}

const getLocale = function() { // 默认使用中文
    if (messages[navigator.language]) {
        return navigator.language
    }else {
        switch (navigator.language) {
            case 'en' : return 'en-US'
            case 'zh' : return 'zh-CN'
            default   : return 'zh-CN'
        }
    }
}

const i18n = new VueI18n({
    locale: getLocale(),
    messages
})

export default i18n
