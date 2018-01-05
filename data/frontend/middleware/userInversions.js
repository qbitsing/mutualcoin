import api from '~/plugins/axios'
import query from '~/plugins/queries/userInversions'
export default async function ({ store }) {
  if (!store.state.userInversions) {
    const token = store.state.authToken
    const uuid = store.state.authUser.uuid
    const res = await api('/', {}, 'get', token, {params: query(uuid)})
    store.commit('SET_USER_INVERSIONS', res.data.data.blocksUsersBy)
  }
}
