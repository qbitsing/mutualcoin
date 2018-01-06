import api from '~/plugins/axios'
import blocksUsers from '~/plugins/queries/blockUser'
export default async function ({store, route, redirect}) {
  let isBlock = false
  for (const key in store.state.blocks) {
    const index = store.state.blocks[key].filter(block => block.uuid === route.params.block)
    if (index.length === 1) {
      isBlock = true
      break
    }
  }
  if (isBlock) {
    const token = store.state.authToken
    const query = { params: { query: blocksUsers(route.params.block) } }
    const res = await api({}, 'get', token, query)
    store.commit('SET_BLOCKSUSER', res.data.data.blocksUsers)
  } else {
    return redirect('/panel/admin/home')
  }
}
