import axios from 'axios'
export const strict = false
export const state = () => ({
  sidebar: false,
  titleView: null,
  userInfo: null,
  authToken: null,
  authUser: null,
  coins: null,
  blocks: {
    active: null,
    inactive: null,
    waiting: null,
    running: null,
    paused: null,
    cancel: null,
    finished: null
  },
  blocksUser: null,
  inversion: null,
  userInversions: null
})

export const mutations = {
  SET_USER: (state, user) => {
    state.authToken = user.token
    state.authUser = user.sesion
  },
  SET_INVERSION: (state, inversion) => {
    state.inversion = inversion
  },
  LOGOUT: (state) => {
    state.authToken = null
    state.authUser = null
  },
  TITLE_VIEW: (state, title) => {
    state.titleView = title
  },
  SET_USER_INVERSIONS: (state, userInversions) => {
    state.userInversions = userInversions
  },
  SET_COINS: (state, coins) => {
    state.coins = coins
  },
  SET_BLOCKS: (state, blocks) => {
    state.blocks = blocks
  },
  SET_BLOCKSUSER: (state, blocksUser) => {
    state.blocksUser = blocksUser
  },
  SET_DAYSINFO: (state, newBlocks) => {
    state.blocks = newBlocks
  }
}
export const actions = {
  nuxtServerInit ({ commit }, ctx) {
    let { req } = ctx
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
