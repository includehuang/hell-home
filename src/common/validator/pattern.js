import Vue from "vue"
import regex from "./regex"

const thisVue = new Vue()
const vueObj = thisVue.$vueObj

export default {
    userName: message => {
        return [
            {required: true, message: message && message.required || vueObj.$t('pattern.userName.empty')},
            {pattern: regex.userName, message: message && message.pattern || vueObj.$t('pattern.userName')}
        ]
    },
    userNameRule: message => {
        return {pattern: regex.userName, message: message || vueObj.$t('pattern.userName')}
    },
    userPassword: message => {
        return [{ required: true, message: message || vueObj.$t('pattern.password.empty') }]
    }
}
