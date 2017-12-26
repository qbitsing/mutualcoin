import api from '~/plugins/axios'
export default async function ({store, route}) {
  if (!store.state.blocksUsers) {
    const token = store.state.authToken
    const res = await api('blockUser/block/' + route.params.block, {}, 'get', token)
    store.commit('SET_BLOCKSUSER', res.data.blocksUsers)
  }
}
