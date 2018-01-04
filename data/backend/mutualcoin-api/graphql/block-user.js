'use strict'

module.exports = `
  type BlockUser {
    block: String!
    _block: Block
    user: String!
    _user: User
    uuid: String!
    amount: Int!
    high: Int!
    medium: Int!
    low: Int!
    pays: [String]
    last_pay: Int
  }
`