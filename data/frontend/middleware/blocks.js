import api from '~/plugins/axios'
import query from '~/plugins/queries/blocks'
export default async function ({route, store}) {
  let need
  const path = route.name.split('-')
  if (path[2] === 'activarbloque') {
    need = ['inactive', 'active', 'waiting', 'running', 'paused', 'cancel', 'finished']
  } else if (path[2] === 'bloqueinversion' || route.params.block) {
    need = ['active', 'waiting', 'running', 'paused']
  } else if (path[2] === 'oferta') {
    need = ['active']
  } else {
    need = ['active']
  }
  let have = []
  for (const key in store.state.blocks) {
    if (store.state.blocks[key]) {
      have.push(key)
    }
  }

  let missing = faltantes(need, have)

  if (missing.length) {
    // console.log(query(missing))
    const token = store.state.authToken
    const res = await api({}, 'get', token, { params: query(missing) })
    let newBlocks = res.data.data
    let oldBlocks = store.state.blocks
    for (const key in newBlocks) {
      oldBlocks[key] = newBlocks[key]
    }
    store.commit('SET_BLOCKS', oldBlocks)
  }
}
function faltantes (need, have) {
  if (need) {
    return need.filter(e => {
      for (const x of have) {
        if (x === e) return false
      }
      return true
    })
  } else {
    return []
  }
}
