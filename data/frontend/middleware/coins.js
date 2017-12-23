import api from '~/plugins/axios'
export default async function ({ store }) {
  if (store.state.authUser.admin) {
    if (!store.state.coins) {
      const token = store.state.authToken
      const res = await api('coin/all', {}, 'get', token)
      store.commit('SET_COINS', res.data.coins)
    }
  }
}
