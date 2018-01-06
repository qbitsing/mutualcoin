'use strict'

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
  day: Int
  low: Int
  high: Int
  medium: Int
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
      daysInfo: [String]
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
    blockRun: (_, { uuid }) => db.block.run(uuid),
    blockPause: (_, { uuid }) => db.block.pause(uuid),
    blockCancel: (_, { uuid }) => db.block.cancel(uuid),
    blockFinish: (_, { uuid }) => db.block.finish(uuid),
    blockEarnings: (_, { uuid, earnings }) => db.block.setInfoDays(uuid, earnings)
  })
}
