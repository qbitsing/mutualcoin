'use strict'

module.exports = `
  type Block {
    amount: Int!
    amountLeft: Int!
    coin: String!
    _coin: Coin
    uuid: String!
    endingDate: String
    startDate: String
    weeks: Int!
    days: Int!
    user: User
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
`
