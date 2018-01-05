import api from '~/plugins/axios'
import query from '~/plugins/queries/blocks'
export default async function ({route, store}) {
  let need
  const path = route.name.split('-')
  if (path[2] === 'activarbloque') {
    need = ['inactive', 'active', 'waiting', 'running', 'paused', 'cancel', 'finished']
  } else if (path[2] === 'bloqueinversion') {
    need = ['active', 'waiting', 'running', 'paused']
  } else if (path[2] === 'oferta') {
    need = ['active']
  }
  const have = Object.keys(store.state.blocks)

  let missing = faltantes(need, have)
  if (missing.length) {
    console.log(query(missing))
    const token = store.state.authToken
    const res = await api('/', {}, 'get', token, { params: query(missing) })
    let newBlocks = res.data.data
    let oldBlocks = store.state.blocks
    for (const key in newBlocks) {
      oldBlocks[key] = newBlocks[key]
    }
    store.commit('SET_BLOCKS', oldBlocks)
  }
}
function faltantes (need, have) {
  return need.filter(e => {
    for (const x of have) {
      if (x === e) return false
    }
    return true
  })
}
