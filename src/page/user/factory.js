import {get} from "@/common/request"

export default {
    /**
     * 获取加密公钥
     * @param params
     * @returns {Promise<unknown>}
     */
    getPublicKey(params) {
        // params = {
        //     name,
        //     time_stamp
        // }
        params.time_stamp = params.time_stamp || new Date().getTime
        return new Promise((resolve, reject) => {
            get({
                url: '/public/getPublicKey',
                params: params,
            }).then(res => {
                resolve(res.data)
            }).catch(err => {
                resolve(err)
            })
        })
    },
    /**
     * 获取token登录
     * @param params
     * @returns {Promise<unknown>}
     */
    getToken(params) {
        // params = {
        //     name,
        //     password
        // }
        return new Promise((resolve, reject) => {
            get({
                url: `/public/getToken`,
                params: params,
                isSuccessTip: true,
            }).then(res => {
                resolve(res.data)
            }).catch(err => {
                resolve(err)
            })
        })
    }
}
