import {getStatic} from "@/common/requestStatic"

export default {
    getSaying() {
        return getStatic({url: '/static/request/saying.json'})
    }
}
