'use strict'

module.exports = {
  BlockUser: `
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

    input newBlockUser {
      amount: Float
      block: String
      user: String
      high: Float
      medium: Float
      low: Float
    }
  `,
  QueryBlockUser: (db) => ({
    blocksUsers: (rootValue, args, context) => db.blockUser.get(),
    blocksUsersBy: (rootValue, { propertie, value }, context) => db.blockUser.getBy(propertie)(value),
    _block: ({ block }) => db.block.getUuid(block),
    _user: ({ user }) => db.user.getUuid(user),
    blockUserAdd: (_, { blockUser }) => {
      let obj = {
        amount: blockUser.amount,
        user: blockUser.user,
        block: blockUser.block,
        low: blockUser.low,
        high: blockUser.high,
        medium: blockUser.medium
      }

      console.log(obj, obj.hasOwnProperty)
      return db.blockUser.create(obj)
    }
  })
}
