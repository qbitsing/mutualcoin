import socket from '~/plugins/socket'
import swal from 'sweetalert2'
import BigNumber from 'bignumber.js'
import blockByUuid from '~/plugins/queries/blockByUuid'
import api from '~/plugins/axios'
export default async function (self) {
  const client = await socket().catch((err) => {
    console.error(`Error en la conexion con el servidor en tiempo real: ${err.message}`)
  })
  if (client.connected) {
    if (self.userInversions) {
      client.emit('suscribe', 'block/earnings')
      client.removeListener('block/earnings')
      client.on('block/earnings', res => {
        self.userInversions.forEach(el => {
          if (el.block === res.uuid) {
            el._block.daysInfo = res.daysInfo
          }
        })
        if (self.inversion && self.inversion.block === res.uuid) {
          self.inversion.formatedInfo = self.formatearArray(self.dividirArray(res.daysInfo))
          self.inversion.nowWeek = self.inversion.formatedInfo.length
          swal('Se acaban de registrar nuevas ganancias.')
        }
      })

      client.emit('suscribe', 'block/make/pay')
      client.removeListener('block/make/pay')
      client.on('block/make/pay', res => {
        let isBlock = false
        for (const iterable of self.userInversions) {
          if (iterable.block === res.uuid) {
            isBlock = true
            break
          }
        }
        if (isBlock) {
          self.userInversions.forEach(el => {
            for (const iterable of res.investments) {
              if (iterable.uuid === el.uuid) {
                el.pays = iterable.pays
                break
              }
            }
          })
          for (const iterable of res.investments) {
            if (self.inversion && self.inversion.uuid === iterable.uuid) {
              self.inversion.pays = iterable.pays.map(e => {
                e.week = Math.ceil(e.to / 7)
                return e
              })
              break
            }
          }
        }
      })
    }
    if (self.userInversions || Object.keys(self.blocks).length) {
      client.emit('suscribe', 'block/user/add')
      client.removeListener('block/user/add')
      client.on('block/user/add', res => {
        if (self.userInversions) {
          self.userInversions.map(e => {
            if (e.block === res.block) {
              e._block.amountLeft = calcAmountLeft(e._block.amountLeft, res.amount)
            }
            return e
          })
          if (res.user === self.$store.state.authUser.uuid) {
            res._block._coin = res._coin
            delete res._coin
            self.userInversions.unshift(res)
          }
        }
        if (Object.keys(self.blocks).length) {
          self.blocks.active.map(e => {
            if (e.uuid === res.block) {
              e.amountLeft = calcAmountLeft(e.amountLeft, res.amount)
            }
            return e
          })
        }
      })
      // change block amount
      client.emit('suscribe', 'block/amount')
      client.removeListener('block/amount')
      client.on('block/amount', res => {
        if (self.userInversions) {
          self.userInversions = calcNewAmounts(res, self.userInversions)
        }
        if (self.inversion && self.inversion.block === res.uuid) {
          if (validataion(res.amountLeft)) self.inversion._block.amountLeft = res.amountLeft
          self.inversion._block.amount = res.amount
        }
        if (Object.keys(self.blocks).length) {
          self.blocks.active = calcNewAmounts(res, self.blocks.active)
        }
      })
      // changue/state
      client.removeListener('block/change/state')
      client.emit('suscribe', 'block/change/state')
      client.on('block/change/state', async (res) => {
        if (self.userInversions) {
          self.userInversions = self.userInversions.map(e => {
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
            const token = self.$store.state.authToken
            const blockRes = await api({}, 'get', token, { params: blockByUuid(res.uuid) })
            self.blocks.active.unshift(blockRes.data.data.block)
          }
        }
      })
    }
    if (self.tickets) {
      client.emit('suscribe', 'ticket/response')
      client.removeListener('ticket/response')
      client.on('ticket/response', res => {
        self.tickets.forEach(e => {
          if (e.id === res.id) {
            const newAnswer = res.answers.slice(-1)[0]
            e.answers.push(newAnswer)
          }
        })
      })
    }
  }
}

function calcAmountLeft (amountLeft, inversion) {
  let amount = new BigNumber(amountLeft.toString())
  return amount.minus(inversion.toString()).toNumber()
}
function calcNewAmounts (res, el) {
  return el.map(e => {
    if (e.hasOwnProperty('_block')) {
      if (e.block === res.uuid) {
        if (validataion(res.amountLeft)) e._block.amountLeft = res.amountLeft
        e._block.amount = res.amount
      }
    } else {
      if (e.uuid === res.uuid) {
        e.amount = res.amount
      }
    }
  })
}
const validataion = number => !isNaN(number) && number !== null
