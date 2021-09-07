import {getStatic} from "@/common/requestStatic"

export default {
    getProjects(params) {
        return getStatic({url: '/static/request/home.json', params})
    }
}
