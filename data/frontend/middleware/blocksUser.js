import api from '~/plugins/axios'
import blocksUsers from '~/plugins/queries/blockUser'
export default async function ({store, route, redirect}) {
  if (route.params.block) {
    const token = store.state.authToken
    const query = { params: { query: blocksUsers(route.params.block) } }
    const res = await api({}, 'get', token, query)
    store.commit('SET_BLOCKSUSER', res.data.data.blocksUsers)
  } else {
    return redirect('/panel/admin/home')
  }
}
