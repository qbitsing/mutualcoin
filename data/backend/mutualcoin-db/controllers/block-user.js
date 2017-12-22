'use strict'

const blockUserSchema = require('../models/block-user')
const blockSchema = require('../models/blocks')
const userSchema = require('../models/users')

let BlockModel, UserModel, BlockUserModel

async function validateBlock(blockUser) {
  let blockValid

  if (!blockUser.block) {
    throw new Error('bad request: block is required')
  }

  blockValid = await BlockModel.findOne({ uuid: blockUser.block })

  if (!blockValid || blockValid.state !== 'active') {
    throw new Error('bad request: block is not valid')
  }

  if (blockUser.amount > blockValid.amountLeft) {
    throw new Error('bad request: amount cannot be higher to the amount left of block')
  }

  return blockValid
}

async function validateUser(blockUser) {
  let userValid

  if (!blockUser.user) {
    throw new Error('bad request: user is required')
  }

  userValid = await UserModel.findOne({ uuid: blockUser.user })

  if (!userValid || !userValid.accountIsActive) {
    throw new Error('bad request: user is not valid')
  }
}

function validateConfig(blockUser) {
  if (!blockUser.high || isNaN(blockUser.high) || blockUser.high < 0) {
    throw new Error('bad request: high is not valid')
  }

  if (!blockUser.medium || isNaN(blockUser.medium) || blockUser.medium < 0) {
    throw new Error('bad request: medium is not valid')
  }

  if (!blockUser.low || isNaN(blockUser.low) || blockUser.low < 0) {
    throw new Error('bad request: low is not valid')
  }

  if (!((parseInt(blockUser.low) + parseInt(blockUser.medium) + parseInt(blockUser.high)) === 100)) {
    throw new Error('bad request: high, medium and low should be add 100%')
  }
}

function validateAmount(blockUser) {
  if (!blockUser.amount) {
    throw new Error('bad request: amount is require')
  }
}

async function get() {
  return await BlockUserModel.find({})
}

function getBy(propertie) {
  let search = {}

  return function (value) {
    search[propertie] = value
    return BlockUserModel.find(search)
  }
}
async function create(blockUser) {
  const block = await validateBlock(blockUser)
  await validateUser(blockUser)
  validateConfig(blockUgser)
  validateAmount(blockUser)
  let amountLeft = parseFloat((block.amountLeft - blockUser.amount).toFixed(8))
  if (amountLeft === 0) {
    await BlockModel.findByIdAndUpdate(block._id, { amountLeft, state: 'waiting' })
  } else {
    await BlockModel.findByIdAndUpdate(block._id, { amountLeft })
  }
  const blockUserToCreate = new BlockUserModel()

  blockUserToCreate.amount = blockUser.amount
  blockUserToCreate.block = blockUser.block
  blockUserToCreate.user = blockUser.user
  blockUserToCreate.high = blockUser.high
  blockUserToCreate.medium = blockUser.medium
  blockUserToCreate.low = blockUser.low

  return await blockUserToCreate.save()
}

module.exports = function (db) {
  BlockModel = db.model('block', blockSchema)
  UserModel = db.model('user', userSchema)
  BlockUserModel = db.model('blocks_user', blockUserSchema)

  const methods = {}
  methods.get = get
  methods.getBy = getBy
  methods.create = create
  return methods
}

