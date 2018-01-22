'use strict'
const { makeExecutableSchema } = require('graphql-tools')
const { User, QueryUser } = require('./user')
const { Block, QueryBlock } = require('./blocks')
const { Coin, QueryCoins } = require('./coin')
const { Query, Ticket } = require('./ticket')
const { BlockUser, QueryBlockUser } = require('./block-user')

const rootQuery = `
  type Query {
    users: [User]
    user(uuid: String): User
    usersBy(value: String, propertie: String): [User]
    blocks: [Block]
    block(uuid: String): Block
    blocksState(states: [String]): [Block]
    coins: [Coin]
    blocksUsers: [BlockUser]
    blocksUsersBy(propertie: String, value: String): [BlockUser]
    tickets(user: String): [Ticket]
    ticketsActives(user: String): [Ticket]
  }

  type Mutation {
    userAdd(user: newUser): User
    userEdit(uuid: String, user: userEditable): User
    blockAdd(block: newBlock): Block
    blockActivate(uuid: String): Int
    blockWaiting(uuid: String, amount: Float): Int
    blockRun(uuid: String, startDate: String): Int
    blockPause(uuid: String): Int
    blockCancel(uuid: String): Int
    blockFinish(uuid: String): Int
    blockEarnings(uuid: String, earnings: [dayInfo]): [infoDay]
    blockPay(uuid: String, to: Int): [pay]
    blockMakePay(uuid: String): [BlockUser]
    blockAmount(uuid: String): Block
    blockUserAdd(blockUser: newBlockUser): BlockUser
    ticketAdd(ticket: newTicket): Ticket
    ticketAnswer(uuid: String, response: Response): Ticket
    coinAdd(coin: newCoin): Coin
    coinEdit(uuid: String, newCoin): Coin
  }
`

// module.exports = makeExecutableSchema({typeDefs})
module.exports = function (db) {
  const { users, usersBy, user, referred, line, userAdd, userEdit } = QueryUser(db)
  const { _coin, block, blocks, blocksState, blockAdd, blockActivate, blockWaiting, blockRun, blockPause, blockCancel, blockFinish, blockEarnings, blockAmount, blockMakePay, blockPay } = QueryBlock(db)
  const { coins, coinAdd, coinEdit } = QueryCoins(db)
  const { ticketAdd, ticketAnswer, tickets, ticketsActives } = Query(db)
  const { blocksUsers, blocksUsersBy, _block, _user, blockUserAdd } = QueryBlockUser(db)
  const resolvers = {
    Query: {
      users,
      usersBy,
      user,
      blocks,
      block,
      blocksState,
      coins,
      blocksUsers,
      blocksUsersBy,
      tickets,
      ticketsActives
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
      blockEarnings,
      blockAmount,
      blockMakePay,
      blockPay,
      blockUserAdd,
      ticketAdd,
      ticketAnswer,
      coinAdd,
      coinEdit
    }
  }

  return makeExecutableSchema({
    typeDefs: [
      rootQuery,
      User,
      Block,
      Coin,
      BlockUser,
      Ticket
    ],
    resolvers
  })
}
