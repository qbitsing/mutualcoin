'use strict'
const { makeExecutableSchema } = require('graphql-tools')
const User = require('./user')
const Block = require('./blocks')
const Coin = require('./coin')
const BlockUser = require('./block-user')

function setConds (query) {
  const conds = []

  if (query.indexOf('paused')!== -1) {
    conds.push({ state: 'paused' })
  }

  if (query.indexOf('active')!== -1) {
    conds.push({ state: 'active' })
  }

  if (query.indexOf('finished')!== -1) {
    conds.push({ state: 'finished' })
  }

  if (query.indexOf('cancel')!== -1) {
    conds.push({ state: 'cancel' })
  }

  if (query.indexOf('inactive')!== -1) {
    conds.push({ state: 'inactive' })
  }

  if (query.indexOf('running')!== -1) {
    conds.push({ state: 'running' })
  }

  if (query.indexOf('waiting')!== -1) {
    conds.push({ state: 'waiting' })
  }

  return conds
}

const rootQuery = `
  type Query {
    users: [User]
    user(uuid: String): User
    usersBy(value: String, propertie: String): [User]
    blocks: [Block]
    blocksState(states: [String]): [Block]
    coins: [Coin]
    blocksUsers: [BlockUser]
  }
`

// module.exports = makeExecutableSchema({typeDefs})
module.exports = function (db) {
  const resolvers = {
    Query: {
      users: (rootValue, args, context) => db.user.get(),
      usersBy: (rootValue, { propertie, value }, context) => db.user.getBy(propertie)(value),
      user: (rootValue, { uuid }, context) => db.user.getUuid(uuid),
      blocks: (rootValue, args, context) => db.block.get(),
      blocks: (rootValue, { states }, context) => { 
        const conds = setConds(states)
        return db.block.getState(conds)
      },
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
