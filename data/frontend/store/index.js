// import api from '~/plugins/axios'
import axios from 'axios'
export const strict = false
export const state = () => ({
  sidebar: false,
  token: null,
  titleView: null,
  userInfo: null,
  authToken: null,
  authUser: null,
  coins: null
})

export const mutations = {
  SET_USER: (state, user) => {
    state.authToken = user.token
    state.authUser = user.sesion
  },
  LOGOUT: (state) => {
    state.authToken = null
    state.authUser = null
  },
  TITLE_VIEW: (state, title) => {
    state.titleView = title
  },
  SET_COINS: (state, coins) => {
    state.coins = coins
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
  },
  setCoins ({commit}, coins) {
    commit('SET_COINS', coins)
  }
}
