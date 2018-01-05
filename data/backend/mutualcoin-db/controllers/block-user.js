'use strict'

const blockUserSchema = require('../models/block-user')
const blockSchema = require('../models/blocks')
const userSchema = require('../models/users')
const { v4 } = require('uuid')

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

  if (!userValid) {
    throw new Error('bad request: user is not valid')
  }

  return userValid
}

function validateConfig(blockUser) {
  if (!blockUser.hasOwnProperty('high') || isNaN(blockUser.high) || blockUser.high < 0) {
    throw new Error('bad request: high is not valid')
  }

  if (!blockUser.hasOwnProperty('medium') || isNaN(blockUser.medium) || blockUser.medium < 0) {
    throw new Error('bad request: medium is not valid')
  }

  if (!blockUser.hasOwnProperty('low') || isNaN(blockUser.low) || blockUser.low < 0) {
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

function get() {
  return BlockUserModel.find({})
}

function getBy(propertie) {
  let search = {}

  return function(value, block) {
    search[propertie] = value
    return BlockUserModel.find(search)
  }
}

async function generateUuid() {
  let uuid = v4()

  let valid = await BlockUserModel.findOne({ uuid })

  while (valid) {
    uuid = v4()
    valid = await BlockUserModel.findOne({ uuid })
  }

  return uuid
}
async function create(blockUser) {
  const block = await validateBlock(blockUser)
  await validateUser(blockUser)
  const uuid = await generateUuid()
  validateConfig(blockUser)
  validateAmount(blockUser, block)
  let amountLeft = parseFloat((block.amountLeft - blockUser.amount).toFixed(8))
  if (amountLeft === 0) {
    await BlockModel.findByIdAndUpdate(block._id, { amountLeft, state: 'waiting' })
  } else {
    await BlockModel.findByIdAndUpdate(block._id, { amountLeft })
  }
  const blockUserToCreate = new BlockUserModel()

  blockUserToCreate.uuid = uuid
  blockUserToCreate.amount = blockUser.amount
  blockUserToCreate.block = blockUser.block
  blockUserToCreate.user = blockUser.user
  blockUserToCreate.high = blockUser.high
  blockUserToCreate.medium = blockUser.medium
  blockUserToCreate.low = blockUser.low

  return await blockUserToCreate.save()
}

function updatePays(id, pays, lastPay) {
  return BlockUserModel.findByIdAndUpdate(id, { pays, last_pay: lastPay })
}
module.exports = function(db) {
  BlockModel = db.model('block', blockSchema)
  UserModel = db.model('user', userSchema)
  BlockUserModel = db.model('blocks_user', blockUserSchema)

  const methods = {}
  methods.get = get
  methods.getBy = getBy
  methods.create = create
  methods.updatePays = updatePays
  return methods
}

