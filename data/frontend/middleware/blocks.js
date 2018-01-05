import api from '~/plugins/axios'
import query from '~/plugins/queries/allBlocks'
export default async function ({store}) {
  if (!store.state.blocks) {
    await doRequest(store)
    console.log('primera')
  } else if (!store.state.blocks.finished) {
    await doRequest(store)
    console.log('primera')
  }
}
async function doRequest (store) {
  const token = store.state.authToken
  const res = await api('/', {}, 'get', token, { params: query })
  const blocks = res.data.data
  store.commit('SET_BLOCKS', blocks)
}
