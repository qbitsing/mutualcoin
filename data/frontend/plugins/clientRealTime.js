import socket from '~/plugins/socket'
import BigNumber from 'bignumber.js'
export default async function (self) {
  const client = await socket().catch((err) => {
    console.error(`Error en la conexion con el servidor en tiempo real: ${err.message}`)
  })
  if (client.connected) {
    if (Object.keys(self.blocks).length) {
      client.emit('suscribe', 'block/change/state')
      client.on('block/change/state', res => {
        if (self.userInversions) {
          for (const iterator of self.userInversions) {
            if (iterator.block === res.uuid) {
              iterator._block.state = res.state
            }
          }
        }
        if (res.state === 'waiting') {
          self.blocks.active = self.blocks.active.filter(e => e.uuid !== res.uuid)
        } else if (res.state === 'active') {

        }
      })
    }
    if (self.userInversions || Object.keys(self.blocks).length) {
      client.emit('suscribe', 'block/user/add')
      client.on('block/user/add', res => {
        if (self.userInversions) {
          if (res.user === self.$store.state.authUser.uuid) {
            self.userInversions.push(res)
          }
        }
        if (Object.keys(self.blocks).length) {
          self.blocks.active = self.blocks.active.map(e => {
            console.log(e)
            if (e.uuid === res.block) {
              let amount = new BigNumber(e.amountLeft.toString())
              e.amountLeft = amount.minus(res.amount.toString()).toString()
            }
            return e
          })
        }
      })
    }
  }
}
