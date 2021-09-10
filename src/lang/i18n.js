import Vue from "vue"
import VueI18n from "vue-i18n"
import zh_CN from "./common/zh_CN"
import en_US from "./common/en_US"
import zh_CN_message from "@/lang/common/zh_CN_message"
import en_US_message from "@/lang/common/en_US_message"

Vue.use(VueI18n)

const ZH_CN = {...zh_CN, ...zh_CN_message}
const EN_US = {...en_US, ...en_US_message}

const messages = {
    'zh-CN': ZH_CN,
    'en-US': EN_US,
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
