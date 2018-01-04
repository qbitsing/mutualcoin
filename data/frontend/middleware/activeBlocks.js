import api from '~/plugins/axios'
import query from '~/plugins/queries/activeBlocks'
export default async function ({ store }) {
  if (!store.state.blocks.active) {
    const token = store.state.authToken
    const res = await api('/', {}, 'get', token, { params: query })
    const blocks = res.data.data
    store.commit('SET_BLOCKS', blocks)
  }
}
