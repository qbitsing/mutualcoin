'use strict'

const { pays } = require('mutualcoin-utils')
const socket = require('../../io')
const paysMap = new Map()
function setConds (query) {
  const conds = []

  if (query.indexOf('paused') !== -1) {
    conds.push({ state: 'paused' })
  }

  if (query.indexOf('active') !== -1) {
    conds.push({ state: 'active' })
  }

  if (query.indexOf('finished') !== -1) {
    conds.push({ state: 'finished' })
  }

  if (query.indexOf('cancel') !== -1) {
    conds.push({ state: 'cancel' })
  }

  if (query.indexOf('inactive') !== -1) {
    conds.push({ state: 'inactive' })
  }

  if (query.indexOf('running') !== -1) {
    conds.push({ state: 'running' })
  }

  if (query.indexOf('waiting') !== -1) {
    conds.push({ state: 'waiting' })
  }

  return conds
}

const infoDays = `
  day: Float
  low: Float
  high: Float
  medium: Float
`
module.exports = {
  Block: `
    type Block {
      amount: Float!
      amountLeft: Float!
      coin: String!
      name: String!
      _coin: Coin
      uuid: String!
      endingDate: String
      startDate: String
      weeks: Int!
      days: Int!
      user: String
      _user: User
      state: blockState!
      runDays: Int!
      daysInfo: [infoDay]
      last_pay: Int!
    }

    enum blockState {
      paused
      active
      finished
      cancel
      inactive
      running
      waiting
    }

    input newBlock {
      amount: Float!
      coin: String!
      weeks: Float!
      user: String
    }

    input dayInfo {
      ${infoDays}
    }

    type infoDay {
      ${infoDays}
    }

    type pay {
      user: Float
      app: Float
      red: Float
      trader: Float
      low: Float
      high: Float
      medium: Float
      from: Float
      to: Float
      nickname: String
      amount: Float
    }
  `,
  QueryBlock: (db) => ({
    blocks: (rootValue, args, context) => db.block.get(),
    blocksState: (rootValue, { states }, context) => {
      const conds = setConds(states)
      return db.block.getState(conds)
    },
    _coin: ({ coin }) => db.coin.getUuid(coin),
    blockAdd: (_, { block }) => db.block.create(block),
    blockActivate: async (_, { uuid }) => {
      let result
      let message
      try {
        result = await db.block.activate(uuid)
      } catch (error) {
        return error
      }
      if (result === 200) {
        const client = await socket().catch((err) => {
          console.error(`Error en la conexion con el servidor en tiempo real: ${err.message}`)
        })
        message = {
          topic: 'block/change/state',
          body: {
            uuid,
            state: 'active',
            date: null
          }
        }

        if (client) {
          client.emit('message', message)
        }
      }
      return result
    },
    blockWaiting: async (_, { uuid }) => {
      let result
      let message
      try {
        result = await db.block.waiting(uuid)
      } catch (error) {
        return error
      }
      if (result === 200) {
        const client = await socket().catch((err) => {
          console.error(`Error en la conexion con el servidor en tiempo real: ${err.message}`)
        })
        message = {
          topic: 'block/change/state',
          body: {
            uuid,
            state: 'waiting',
            date: null
          }
        }

        if (client) {
          client.emit('message', message)
        }
      }
      return result
    },
    blockRun: async (_, { uuid, startDate }) => {
      let result
      let message
      try {
        result = await db.block.run(uuid, startDate)
      } catch (error) {
        return error
      }
      if (result === 200) {
        const client = await socket().catch((err) => {
          console.error(`Error en la conexion con el servidor en tiempo real: ${err.message}`)
        })
        message = {
          topic: 'block/change/state',
          body: {
            uuid,
            state: 'running',
            date: startDate
          }
        }
        if (client) {
          client.emit('message', message)
        }
      }
      return result
      
    },
    blockPause: async (_, { uuid }) => {
      let result
      let message
      try {
        result = await db.block.pause(uuid)
      } catch (error) {
        return error
      }
      if (result === 200) {
        const client = await socket().catch((err) => {
          console.error(`Error en la conexion con el servidor en tiempo real: ${err.message}`)
        })
        message = {
          topic: 'block/change/state',
          body: {
            uuid,
            state: 'paused',
            date: null
          }
        }
        if (client) {
          client.emit('message', message)
        }
      }
      return result
    },
    blockCancel: async (_, { uuid }) => {
      let result
      let message
      try {
        result = await db.block.cancel(uuid)
      } catch (error) {
        return error
      }
      if (result === 200) {
        const client = await socket().catch((err) => {
          console.error(`Error en la conexion con el servidor en tiempo real: ${err.message}`)
        })
        message = {
          topic: 'block/change/state',
          body: {
            uuid,
            state: 'cancel',
            date: null
          }
        }
        if (client) {
          client.emit('message', message)
        }
      }
      return result
    },
    blockFinish: async (_, { uuid }) => {
      let result
      let message
      try {
        result = await db.block.finish(uuid)
      } catch (error) {
        return error
      }
      if (result === 200) {
        const client = await socket().catch((err) => {
          console.error(`Error en la conexion con el servidor en tiempo real: ${err.message}`)
        })
        message = {
          topic: 'block/change/state',
          body: {
            uuid,
            state: 'finished',
            date: null
          }
        }
        if (client) {
          client.emit('message', message)
        }
      }
      return result
    },
    blockEarnings: async (_, { uuid, earnings }) => {
      let result
      let message
      try {
        result = await db.block.setInfoDays(uuid, earnings)
      } catch (error) {
        return error
      }
      if (result.length > 0) { 
        const client = await socket().catch((err) => {
          console.error(`Error en la conexion con el servidor en tiempo real: ${err.message}`)
        })
        message = {
          topic: 'block/earnings',
          body: {
            uuid,
            daysInfo: result
          }
        }
        if (client) {
          client.emit('message', message)
        }
      }
      return result
    },
    blockPay: async (_, { uuid, to }) => {
      let result
      try {
        result = await pays(to, uuid)
      } catch (error) {
        throw error
      }
      paysMap.set(uuid, result)

      return result.pays
    },
    blockMakePay: async (_, { uuid }) => {
      let result = paysMap.get(uuid)
      if (!result) {
        throw new Error('bad request: there is no payment generated with the indicated uuid')
      }

      let { investments } = result
      let newInvestments = null
      let promises = investments.map(investment => db.blockUser.updatePays(investment.uuid, investment.pays, investment.last_pay))
      try {
        await Promise.all(promises)
        await db.block.updateLatsPay(uuid, result.to)
        newInvestments = await db.blockUser.getBy('block')(uuid)
      } catch (error) {
        throw error
      }
      
      const client = await socket().catch((err) => { 
        console.error(`Error en la conexion con el servidor en tiempo real: ${err.message}`)          
      })

      if (client) { 
        const message = {
          topic: 'block/make/pay',
          body: {
            uuid,
            last_pay: result.to,
            investments: newInvestments.map(investment => ({
              pays: investment.pays,
              last_pay: investment.last_pay,
              uuid: investment.uuid,
              _user: investment._user
            }))
          }
        }
      }
      

      paysMap.delete(uuid)
      return newInvestments
    },
    blockAmount: async (_, { uuid, amount }) => {
      return db.block.updateAmount(uuid, amount)
    }
  })
}
