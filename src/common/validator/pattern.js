import Vue from "vue"
import regex from "./regex"

const thisVue = new Vue()
const vueObj = thisVue.$vueObj

// noinspection JSUnusedGlobalSymbols
export default {
    userName: message => {
        return [
            {required: true, message: message && message.required || vueObj.$t('pattern.userName.empty')},
            {pattern: regex.userName, message: message && message.pattern || vueObj.$t('pattern.userName')},
            {
                validator: (rule, value, callback) => {
                    const max = message && message.maxLength || 64
                    if (value.length > max) {
                        callback(vueObj.$t('pattern.length', [1, max]))
                    }else {
                        callback()
                    }
                }
            }
        ]
    },
    userNameRule: message => {
        return {pattern: regex.userName, message: message || vueObj.$t('pattern.userName')}
    },
    userPassword: message => {
        return [{ required: true, message: message || vueObj.$t('pattern.password.empty') }]
    },
    userPasswordRule: message => {
        return {pattern: regex.userPassword, message: message || vueObj.$t('pattern.password')}
    },
    phoneNumber: message => {
        return [
            {required: true, message: message && message.required || vueObj.$t('pattern.phoneNumber.empty')},
            {pattern: regex.phoneNumber, message: message && message.pattern || vueObj.$t('pattern.phoneNumber')}
        ]
    },
    setUserPassword: message => {
        return [
            {required: true, message: message && message.required || vueObj.$t('pattern.password.empty')},
            {pattern: regex.userPassword, message: message && message.pattern || vueObj.$t('pattern.password')},
            {
                validator: (rule, value, callback) => {
                    const max = message && message.maxLength || 64
                    if (value.length > max) {
                        callback(vueObj.$t('pattern.length', [1, max]))
                    }else {
                        callback()
                    }
                }
            }
        ]
    },
}
