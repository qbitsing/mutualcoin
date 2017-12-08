import api from '~/plugins/axios'
export const state = () => ({
  sidebar: false,
  token: null,
  userInfo: null
})

export const mutations = {
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  }
}

export const actions = {
  async login ({ commit }, { data }) {
    try {
      console.log(data)
      const { res } = await api('user/login', { data }, 'post')
      console.log(res)
    } catch (e) {
      console.log(e.message)
    }
  }
}
