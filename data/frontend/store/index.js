import api from '~/plugins/axios'
import Vue from 'vue'
import Vuex from 'vuex'

export const mutations = {
  SET_USER: function (state, user) {
    state.authUser = user.token
    window.localStorage.token = user.token
    window.localStorage.user = window.atob(user.token.split('.')[1])
  }
}

  mutations: {
    SET_USER: function (state, user) {
      state.authUser = user
      window.localStorage.token = user.token
    }
  },

  actions: {
    nuxtServerInit ({ commit }, { req }) {
      if (req.session && req.session.authUser) {
        commit('SET_USER', req.session.authUser)
      } else {
        console.log('Session no existe')
      }
    },
    async login ({ commit }, { datas }) {
      try {
        console.log(datas)
        const { data } = await api('user/login', { datas }, 'post')
        commit('SET_USER', data)
      } catch (e) {
        if (e.response && e.response.status === 401) {
          throw new Error('Error de credenciales')
        }
        throw e
      }
    }
  }
})

export default store

export const state = () => ({
  sidebar: false
  // token: null,
  // userInfo: null,
  // authUser: null
})

// export const mutations = {
//   SET_USER: function (state, user) {
//     state.authUser = user
//     window.localStorage.token = user.token
//     window.localStorage.user = window.atob(user.token.split('.')[1])
//   }
// }
//
// export const actions = {
//   async login ({ commit }, { datas }) {
//     try {
//       console.log(datas)
//       const { data } = await api('user/login', { datas }, 'post')
//       commit('SET_USER', data)
//     } catch (e) {
//       if (e.response && e.response.status === 401) {
//         throw new Error('Error de credenciales')
//       }
//       throw e
//     }
//   }
// }
