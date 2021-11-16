const state = {
    avatar: '/static/img/common/avatar.jpg'
}

const mutations = {
    avatar: (state, value) => {
        state.avatar = value
    }
}

const actions = {
    avatar({commit}, value) {
        commit('avatar', value)
    }
}

export default {
    namespace: true,
    state,
    mutations,
    actions
}
