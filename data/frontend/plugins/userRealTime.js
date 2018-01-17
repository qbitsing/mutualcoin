import socket from '~/plugins/socket'
import BigNumber from 'bignumber.js'
export default async function (self) {
  const client = await socket().catch((err) => {
    console.error(`Error en la conexion con el servidor en tiempo real: ${err.message}`)
  })
  if (client.connected) {
    if (self.userInversions || Object.keys(self.blocks).length) {
      client.emit('suscribe', 'block/user/add')
      client.removeListener('block/user/add')
      client.on('block/user/add', res => {
        if (self.userInversions) {
          if (res.user === self.$store.state.authUser.uuid) {
            self.userInversions.map(e => {
              e._block.amountLeft = calcAmountLeft(e._block.amountLeft, res.amount)
              return e
            })
            res._block._coin = res._coin
            delete res._coin
            self.userInversions.unshift(res)
          }
        }
        if (Object.keys(self.blocks).length) {
          self.blocks.active = self.blocks.active.map(e => {
            if (e.uuid === res.block) {
              e.amountLeft = calcAmountLeft(e.amountLeft, res.amount)
            }
            return e
          })
        }
      })
      // changue/state
      client.removeListener('block/change/state')
      client.emit('suscribe', 'block/change/state')
      client.on('block/change/state', res => {
        if (self.userInversions) {
          self.userInversions.map(e => {
            if (e.block === res.uuid) {
              e._block.state = res.state
              if (res.date) e._block.startDate = res.date
            }
            return e
          })
        }
        if (self.inversion) {
          if (self.inversion._block.uuid === res.uuid) {
            self.inverion._block.state = res.state
          }
        }
        if (Object.keys(self.blocks).length) {
          if (res.state === 'waiting') {
            self.blocks.active = self.blocks.active.filter(e => e.uuid !== res.uuid)
          } else if (res.state === 'active') {

          }
        }
      })
    }
    if (self.userInversions) {
      client.emit('suscribe', 'block/earnings')
      client.removeListener('block/earnings')
      client.on('block/earnings', res => {
        console.log(res)
      })
    }
  }
}
function calcAmountLeft (amountLeft, inversion) {
  let amount = new BigNumber(amountLeft.toString())
  return amount.minus(inversion.toString()).toNumber()
}
