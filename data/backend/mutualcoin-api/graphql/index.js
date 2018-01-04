'use strict'
const { makeExecutableSchema } = require('graphql-tools')
const User = require('./user')
const Block = require('./blocks')
const Coin = require('./coin')
const BlockUser = require('./block-user')

const rootQuery = `
  type Query {
    users: [User]
    user(uuid: String): User!
    blocks: [Block]
    coins: [Coin]
    blocksUsers: [BlockUser]
  }
`

// module.exports = makeExecutableSchema({typeDefs})
module.exports = function (db) {
  const resolvers = {
    Query: {
      users: (rootValue, args, context) => db.user.get(),
      user: (rootValue, { uuid }, context) => db.user.getUuid(uuid),
      blocks: (rootValue, args, context) => db.block.get(),
      coins: (rootValue, args, context) => db.coin.get(),
      blocksUsers: (rootValue, args, context) => db.blockUser.get()
    },
    User: {
      referred: ({ codeReferred }) => db.user.getUuid(codeReferred),
      line: ({ uuid }) => db.user.getLineReferred(uuid)
    },
    Block: {
      _coin: ({ coin }) => db.coin.getUuid(coin)
    },
    BlockUser: {
      _block: ({ block }) => db.block.getUuid(block),
      _user: ({ user }) => db.user.getUuid(user)
    }
  }

  return makeExecutableSchema({
    typeDefs: [
      rootQuery,
      User,
      Block,
      Coin,
      BlockUser
    ],
    resolvers
  })
}
