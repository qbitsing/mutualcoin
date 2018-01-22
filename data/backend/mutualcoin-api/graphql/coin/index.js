'use strict'

module.exports = {
  Coin: `
    type Coin {
      name: String!
      acronym: String!
      uuid: String!
    }

    ipnut newCoin {
      name: String!
      acronym: String!
    }
  `,
  QueryCoins: (db) => ({
    coins: (rootValue, args, context) => db.coin.get(),
    coinAdd: (rootValue, { coin }, { user }) => db.coin.create(coin, user),
    coinEdit: (rootValue, { coin, uuid }, { user }) => db.coin.create(uuid, coin, user),
  })
}
