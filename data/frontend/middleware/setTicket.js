export default function ({store, route, redirect}) {
  const ticketId = parseInt(route.params.ticket)
  const ticket = store.state.tickets.filter(e => e.id === ticketId)
  if (ticket.length) {
    store.commit('SET_TICKET', ticket[0])
  } else {
    let path
    if (store.state.authUser.admin) path = '/panel/admin/tickets'
    else path = '/panel/user/tickets'
    return redirect(path)
  }
}
