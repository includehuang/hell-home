import axios from "axios"
import Vue from "vue"
import store from "@/store/store"
import * as QS from "autoprefixer"

const thisVue = new Vue()
const vueObj = thisVue.$vueObj

// const setBaseUrl = function() {
//     if (process.env.NODE_ENV === 'development') {
//         return  '/'
//     } else if (process.env.NODE_ENV === 'debug') {
//         return  '/'
//     } else if (process.env.NODE_ENV === 'production') {
//         return  'http://47.99.73.44:3000/'
//     }
// }

const request = axios.create({
    // baseURL: setBaseUrl(),
    timeout: 10000
})

request.defaults.timeout = 10000
request.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// 请求拦截加上token
request.interceptors.request.use(config => {
    // 每次发送请求之前判断vuex中是否存在token
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    const token = store.state.token
    token && (config.headers['Access-Token'] = token)
    return config
}, error => {
    return Promise.error(error)
})

// 响应拦截器
request.interceptors.response.use(
    response => {
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
        // 否则的话抛出错误
        // if (response.status === 200) {
        //     return Promise.resolve(response)
        // } else {
        //     return Promise.reject(response)
        // }
        return response
    },
    // 服务器状态码不是2开头的的情况
    // 这里可以跟你们的后台开发人员协商好统一的错误状态码
    // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
    // 下面列举几个常见的操作，其他需求可自行扩展
    error => {
        if (error.response.status) {
            switch (error.response.status) {
                // 401: 未登录
                // 未登录则跳转登录页面，并携带当前页面的路径
                // 在登录成功后返回当前页面，这一步需要在登录页操作。
                case 401:
                    break

                // 403 token过期
                // 登录过期对用户进行提示
                // 清除本地token和清空vuex中token对象
                // 跳转登录页面
                case 403:
                    vueObj.$message.warning(vueObj.$t('request.error.403'))
                    // 清除token
                    localStorage.removeItem('token')
                    // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                    break

                // 404请求不存在
                case 404:
                    vueObj.$message.error(vueObj.$t('request.error.404'))
                    break
                // 其他错误，直接抛出错误提示
                default:
                    vueObj.$message.error(vueObj.$t(`error.code.${error.response.status}`))
                    break
            }
            return Promise.reject(error.response)
        }
    }
)

// 封装get
export function get({
    url = '/',
    params = undefined,
    isSuccessTip = false,
    isErrorTip = true,
    successStr = 'request.success.tip',
    errorStr = 'request.error.tip'
}) {
    return new Promise((resolve, reject) => {
        request.get(url, {
            params: params
        }).then(res => {
            if (isSuccessTip) {
                switch (res.data.code) {
                    case undefined : vueObj.$message.success(vueObj.$t(successStr)); break
                    case 200 :
                    case '200' :
                    default : {
                        if (res.data.data.tipMsg) {
                            vueObj.$message.success(res.data.data.tipMsg); break
                        }else if (res.data.data.errMsg) {
                            vueObj.$message.error(res.data.data.errMsg); break
                        }else {
                            vueObj.$message.success(vueObj.$t(successStr)); break
                        }
                    }
                }
            }
            resolve(res)
        }).catch(err => {
            if (isErrorTip) {
                vueObj.$message.error(vueObj.$t(errorStr))
            }
            reject(err)
        })
    })
}

// 封装post
export function post({
    url = '/',
    params = undefined,
    isSuccessTip = false,
    isErrorTip = false,
    successStr = 'request.success.tip',
    errorStr = 'request.error.tip'
}) {
    return new Promise((resolve, reject) => {
        request.post(url, QS.stringify(params))
            .then(res => {
                if (isSuccessTip) {
                    vueObj.$message.success(vueObj.$t(successStr))
                }
                resolve(res)
            })
            .catch(err => {
                if (isErrorTip) {
                    vueObj.$message.error(vueObj.$t(errorStr))
                }
                reject(err)
            })
    })
}

export default request
