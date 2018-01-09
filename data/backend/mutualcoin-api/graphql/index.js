'use strict'
const { makeExecutableSchema } = require('graphql-tools')
const { User, QueryUser } = require('./user')
const { Block, QueryBlock } = require('./blocks')
const { Coin, QueryCoins } = require('./coin')
const { BlockUser, QueryBlockUser } = require('./block-user')

const rootQuery = `
  type Query {
    users: [User]
    user(uuid: String): User
    usersBy(value: String, propertie: String): [User]
    blocks: [Block]
    blocksState(states: [String]): [Block]
    coins: [Coin]
    blocksUsers: [BlockUser]
    blocksUsersBy(propertie: String, value: String): [BlockUser]
  }

  type Mutation {
    userAdd(user: newUser): User
    userEdit(uuid: String, user: userEditable): User
    blockAdd(block: newBlock): Block
    blockActivate(uuid: String): Int
    blockWaiting(uuid: String): Int
    blockRun(uuid: String, startDate: String): Int
    blockPause(uuid: String): Int
    blockCancel(uuid: String): Int
    blockFinish(uuid: String): Int
    blockEarnings(uuid: String, earnings: [dayInfo]): [infoDay]
    blockPay(uuid: String, to: Int): [pays]
  }
`

// module.exports = makeExecutableSchema({typeDefs})
module.exports = function (db) {
  const { users, usersBy, user, referred, line, userAdd, userEdit } = QueryUser(db)
  const { _coin, blocks, blocksState, blockAdd, blockActivate, blockWaiting, blockRun, blockPause, blockCancel, blockFinish, blockEarnings } = QueryBlock(db)
  const { coins } = QueryCoins(db)
  const { blocksUsers, blocksUsersBy, _block, _user } = QueryBlockUser(db)
  const resolvers = {
    Query: {
      users,
      usersBy,
      user,
      blocks,
      blocksState,
      coins,
      blocksUsers,
      blocksUsersBy
    },
    User: {
      referred,
      line
    },
    Block: {
      _coin
    },
    BlockUser: {
      _block,
      _user
    },
    Mutation: {
      userAdd,
      userEdit,
      blockAdd,
      blockActivate,
      blockWaiting,
      blockRun,
      blockPause,
      blockCancel,
      blockFinish,
      blockEarnings
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
