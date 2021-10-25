import {get} from "@/common/request"

// noinspection JSUnusedGlobalSymbols
export default {
    getBook(params) {
        return new Promise((resolve, reject) => {
            get({
                url: '/book/getBook',
                params: params,
                isSuccessTip: false,
                isErrorTip: false,
            }).then(res => {
                resolve(res.data)
            }).catch(err => {
                resolve(err)
            })
        })
    },
    getChapter(params) {
        return new Promise((resolve, reject) => {
            get({
                url: '/book/getChapter',
                params: params,
                isSuccessTip: false,
                isErrorTip: false,
            }).then(res => {
                resolve(res.data)
            }).catch(err => {
                resolve(err)
            })
        })
    }
}
