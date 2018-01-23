import query from '~/plugins/queries/tickets'
import api from '~/plugins/axios'
export default async function ({store}) {
  if (!store.state.tickets) {
    let params
    const uuid = store.state.authUser.uuid
    if (store.state.authUser.admin) params = query()
    else params = query(uuid)
    const token = store.state.authToken
    const res = await api({}, 'get', token, { params })
    store.commit('SET_TICKETS', res.data.data.tickets)
  }
}
