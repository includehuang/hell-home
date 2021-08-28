const state = {
    noMask: false
}

const mutations = {
    setMask: (state, value) => {
        state.noMask = value
    }
}

const actions = {
    setMask({commit}, value) {
        commit('setMask', value)
    }
}

export default {
    namespace: true,
    state,
    mutations,
    actions
}
