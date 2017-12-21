'use strict'

const coinsSchema = require('../models/coins')
const v4 = require('uuid').v4
let CoinsModel

async function create(coin) {
  let invalidCoin = null
  let uuid = v4()
  invalidCoin = await CoinsModel.findOne({ uuid })

  while (invalidCoin) {
    invalidCoin = null
    uuid = v4()
    invalidCoin = await CoinsModel.findOne({ uuid })
  }

  coin.uuid = uuid

  const coinToCreate = new CoinsModel()

  coinToCreate.name = coin.name
  coinToCreate.acronym = coin.acronym
  coinToCreate.uuid = coin.uuid

  const coinCreated = await coinToCreate.save()
  return coinCreated
}

async function get() {
  return await CoinsModel.find({})
}

async function update(uuid, coin) {
  const coinToUpdate = await CoinsModel.findOne({ uuid })

  if (!coinToUpdate) {
    throw new Error('coin not found')
  }

  if (coin.name) {
    coinToUpdate.name = coin.name
  }

  if (coin.acronym) {
    coinToUpdate.acronym = coin.acronym
  }

  await CoinsModel.findByIdAndUpdate(coinToUpdate._id, coinToUpdate)

  return coinToUpdate
}

module.exports = function (db) {
  CoinsModel = db.model('coin', coinsSchema)

  const coinMethods = {}

  coinMethods.create = create
  coinMethods.update = update
  coinMethods.get = get

  return coinMethods
}
