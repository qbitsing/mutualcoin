'use strict'

module.exports = {
  Coin: `
    type Coin {
      name: String!
      acronym: String!
      uuid: String!
    }

  `,
  QueryCoins: (db) => ({
    coins: (rootValue, args, context) => db.coin.get()
  })
}
