'use strict'

const coinsSchema = require('../models/coins')
const v4 = require('uuid').v4
const { isAdmin } = require('mutualcoin-utils')
let CoinsModel

async function create(coin, user) {
  isAdmin(user)
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

async function update(uuid, coin, user) {
  isAdmin(user)
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

function getUuid(uuid) {
  return CoinsModel.findOne({ uuid })
}

module.exports = function(db) {
  CoinsModel = db.model('coin', coinsSchema)

  const coinMethods = {}

  coinMethods.create = create
  coinMethods.update = update
  coinMethods.get = get
  coinMethods.getUuid = getUuid

  return coinMethods
}
