import api from '~/plugins/axios'
import coins from '~/plugins/queries/coins.js'
export default async function ({ store }) {
  if (store.state.authUser.admin) {
    if (!store.state.coins) {
      const token = store.state.authToken
      const params = { params: {query: coins} }
      const res = await api({}, 'get', token, params)
      store.commit('SET_COINS', res.data.data.coins)
    }
  }
}
