import api from '~/plugins/axios'
export const state = () => ({
  sidebar: false,
  token: null,
  userInfo: null,
  authUser: null
})

export const mutations = {
  SET_USER: function (state, user) {
    state.authUser = user
  }
}

export const actions = {
  async login ({ commit }, { datas }) {
    try {
      const { data } = await api('user/login', { datas }, 'post')
      commit('SET_USER', data)
      this.$router.push('home')
    } catch (e) {
      if (e.response && e.response.status === 401) {
        throw new Error('Error de credenciales')
      }
      throw e
    }
  }
}
