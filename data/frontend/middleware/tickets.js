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
    let tickets = res.data.data.tickets
    tickets.forEach(el => {
      el.createDate = el.answers[0].date
      const lastItem = el.answers.length - 1
      el.lastMessage = el.answers[lastItem].date
    })
    store.commit('SET_TICKETS', tickets)
  }
}
