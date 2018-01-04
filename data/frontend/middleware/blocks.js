import api from '~/plugins/axios'
import query from '~/plugins/queries/blocks'
import BigNumber from 'bignumber.js'
export default async function ({store}) {
  if (!store.state.blocks) {
    BigNumber.config({ DECIMAL_PLACES: 20, EXPONENTIAL_AT: [-20, 20] })
    const token = store.state.authToken
    const res = await api('/', {}, 'get', token, {params: query})
    const blocks = res.data.data.blocks.map(el => {
      let amount = new BigNumber(el.amount.toString())
      el.spanihState = spanishText(el.state)
      el.inverted = amount.minus(el.amountLeft).toString()
      return el
    })
    console.log(blocks)
    store.commit('SET_BLOCKS', blocks)
  }
}
function spanishText (text) {
  if (text === 'running') return 'En Marcha'
  if (text === 'inactive') return 'Inactivo'
  else if (text === 'active') return 'Activo'
  else if (text === 'cancel') return 'Cancelado'
  else if (text === 'paused') return 'Pausado'
  else if (text === 'waiting') return 'En espera'
  else if (text === 'finished') return 'Finalizado'
  else return text
}
