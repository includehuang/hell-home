import Vue from "vue"
import Vuex from "vuex"
import getters from "@/store/getters"

const moduleFiles = require.context('./modules', true, /\.js$/)

let modules = {}

modules = moduleFiles.keys().reduce((module, modulePath) => {
    const moduleName = modulePath.replace(/\.\/(.*)\.\w+$/, '$1')
    const value = moduleFiles(modulePath)
    modules[moduleName] = value.default
    return modules
}, {})

Vue.use(Vuex)
let store = new Vuex.Store({
    modules,
    getters,
    state: () => {
        return {token: ''}
    },
    mutations: {
        token(state, value) {
            state.token = value
        }
    }
})
export default store
