import {get, post} from "@/common/request"

// noinspection JSUnusedGlobalSymbols
export function getStatic({url, params}) {
    return new Promise((resolve, reject) => {
        get({
            url: url
        }).then(res => {
            if (params) {
                resolve(res.data[params])
            }else {
                resolve(res.data)
            }
        }).catch(res => {
            reject(res)
        })
    })
}

// noinspection JSUnusedGlobalSymbols
export function postStatic({url, params}) {
    return new Promise((resolve, reject) => {
        post({
            url: url,
        }).then(res => {
            if (params) {
                resolve(res.data[params])
            }else {
                resolve(res.data)
            }
        }).catch(res => {
            reject(res)
        })
    })
}
