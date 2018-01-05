'use strict'

module.exports = {
  BlockUser:`
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
  `,
  QueryBlockUser: (db) => ({
    blocksUsers: (rootValue, args, context) => db.blockUser.get(),
    blocksUsersBy: (rootValue, { propertie, value }, context) => db.blockUser.getBy(propertie)(value),
    _block: ({ block }) => db.block.getUuid(block),
    _user: ({ user }) => db.user.getUuid(user)
  })
}
