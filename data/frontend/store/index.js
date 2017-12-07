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
  async login (data) {
    try {
      const res = await api('user/login', { data })
      console.log(res)
    } catch (e) {
      console.log(e.message)
    }
  }
}
