import api from '~/plugins/axios'
export default async function ({ store }) {
  if (!store.state.userInversions) {
    const token = store.state.authToken
    const res = await api(`/blockUser/user/${store.state.authUser.uuid}`, {}, 'get', token)
    const userInversions = res.data.blocksUsers.map(e => {
      e.objBlock = store.state.blocks.filter(el => el.uuid === e.block)[0]
      return e
    })
    store.commit('SET_USER_INVERSIONS', userInversions)
  }
}
