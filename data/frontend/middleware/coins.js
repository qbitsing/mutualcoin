import api from '~/plugins/axios'
export default async function ({ store }) {
  if (store.state.authUser.admin) {
    if (!store.state.coins) {
      const token = store.state.authToken
      const query = {
        params: {
          query: `{
            coins{
              name
              acronym
              uuid
            }
          }`
        }
      }
      const res = await api('/', {}, 'get', token, query)
      store.commit('SET_COINS', res.data.data.coins)
    }
  }
}
