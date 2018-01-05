import api from '~/plugins/axios'
import blocksUsers from '~/plugins/queries/blockUser'
export default async function ({store, route}) {
  if (!store.state.blocksUsers) {
    const token = store.state.authToken
    const query = {params: blocksUsers(route.params.block)}
    const res = await api('/', {}, 'get', token, query)
    store.commit('SET_BLOCKSUSER', res.data.blocksUsers)
  }
}
