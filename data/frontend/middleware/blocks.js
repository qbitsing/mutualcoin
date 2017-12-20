import api from '~/plugins/axios'
export default async function ({store}) {
  if (!store.state.blocks) {
    const token = store.state.authToken
    const res = await api('block/all', {}, 'get', token)
    store.commit('SET_BLOCKS', res.data.blocks)
  }
}
