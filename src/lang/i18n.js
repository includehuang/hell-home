import Vue from "vue"
import VueI18n from "vue-i18n"
import en_US from "@/lang/lang/en_US"
import en_US_message from "@/lang/lang/en_US_message"
import zh_CN from "@/lang/lang/zh_CN"
import zh_CN_message from "@/lang/lang/zh_CN_message"
import zh_CN_pattern_validator from "@/lang/lang/zh_CN_pattern_validator"

const _zh_CN = {...zh_CN, ...zh_CN_message, ...zh_CN_pattern_validator, }
const _en_US = {...en_US, ...en_US_message, }

Vue.use(VueI18n)
const messages = {
    'zh_CN': _zh_CN,
    'en_US': _en_US,
}

const getLocale = function() { // 默认使用中文
    if (messages[navigator.language]) {
        return navigator.language
    }else {
        switch (navigator.language) {
            case 'zh' : return 'zh_CN'
            case 'en' : return 'en_US'
            default   : return 'zh_CN'
        }
    }
}

const i18n = new VueI18n({
    locale: getLocale(),
    messages
})

export default i18n
