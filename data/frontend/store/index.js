// import api from '~/plugins/axios'
import axios from 'axios'
export const state = () => ({
  sidebar: false,
  token: null,
  userInfo: null,
  authToken: null,
  authUser: null
})

export const mutations = {
  SET_USER: function (state, user) {
    state.authToken = user.token
    state.authUser = user.sesion
  },
  LOGOUT: function (state) {
    state.authToken = null
    state.authUser = null
  }
}
export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    if (req.session && req.session.authUser) {
      commit('SET_USER', {sesion: req.session.authUser, token: req.session.authToken})
    }
  },
  async login ({ commit }, { datas }) {
    try {
      const { data } = await axios.post('http://localhost:3000/api/login', { datas })
      commit('SET_USER', data)
    } catch (e) {
      if (e.response && e.response.status === 401) {
        throw new Error('Error de credenciales')
      }
      throw e
    }
  },
  async logout ({ commit }) {
    try {
      await axios.post('http://localhost:3000/api/logout')
      commit('LOGOUT')
    } catch (e) {
      if (e.response && e.response.status === 401) {
        throw new Error('Error de credenciales')
      }
      throw e
    }
  }
}
