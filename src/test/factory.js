import {getStatic} from "@/common/requestStatic"
import {get} from "@/common/request"

// noinspection JSUnusedGlobalSymbols
export default {
    getProjects(params) {
        return getStatic({url: '/static/request/home.json', params})
    },
    getTest(params) {
        return new Promise((resolve, reject) => {
            get({
                url: '/test/user',
                params: {title: '测试接口', key: '测试', value: '值'},
                isSuccessTip: true,
                isErrorTip: true,
            }).then(res => {
                resolve(res.data)
            }).catch(err => {
                resolve(err)
            })
        })
    },
    getTestTxt(params) {
        return new Promise((resolve, reject) => {
            get({
                url: '/test/md',
                isSuccessTip: true,
                isErrorTip: true,
            }).then(res => {
                resolve(res.data)
            }).catch(err => {
                resolve(err)
            })
        })
    },
    getPublicKey(params) {
        return new Promise((resolve, reject) => {
            get({
                url: '/public/getPublicKey?name=李四&time_stamp=99999',
                isSuccessTip: true,
                isErrorTip: true,
            }).then(res => {
                resolve(res.data)
            }).catch(err => {
                resolve(err)
            })
        })
    },
    getToken(password) {
        return new Promise((resolve, reject) => {
            get({
                url: `/public/getToken`,
                params: {
                    name: '333',
                    password: password
                },
                isSuccessTip: true,
                isErrorTip: true,
            }).then(res => {
                resolve(res.data)
            }).catch(err => {
                resolve(err)
            })
        })
    }
}
