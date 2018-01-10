'use strict'

const { pays } = require('mutualcoin-utils')
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
      amount: Int!
      amountLeft: Int!
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
      amount: Int!
      coin: String!
      weeks: Int!
      user: String
    }

    input dayInfo {
      ${infoDays}
    }

    type infoDay {
      ${infoDays}
    }

    type pay {
      user: Int
      app: Int
      red: Int
      trader: Int
      low: Int
      high: Int
      medium: Int
      from: Int
      to: Int
      nickname: String
      amount: Int
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
    blockActivate: (_, { uuid }) => db.block.activate(uuid),
    blockWaiting: (_, { uuid }) => db.block.waiting(uuid),
    blockRun: (_, { uuid, startDate }) => db.block.run(uuid, startDate),
    blockPause: (_, { uuid }) => db.block.pause(uuid),
    blockCancel: (_, { uuid }) => db.block.cancel(uuid),
    blockFinish: (_, { uuid }) => db.block.finish(uuid),
    blockEarnings: (_, { uuid, earnings }) => db.block.setInfoDays(uuid, earnings),
    blockPay: async (_, { uuid, to }) => {
      let investments
      let result
      try {
        investments = await db.blockUser.getBy('block')(uuid, true)
        result = pays(to, investments)
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
      let promises = investments.map(investment => db.blockUser.updatePays(investment._id, investment.pays, investment.last_pay))
      try {
        await Promise.all(promises)
        await db.block.updateLatsPay(uuid, result.to)
        newInvestments = await req.db.blockUser.getBy('block')(uuid)
      } catch (error) {
        throw error
      }

      paysMap.delete(uuid)
      return newInvestments
    },
    blockAmount: (_, { uuid, amount }) => db.block.updateAmount(uuid, amount)
  })
}
