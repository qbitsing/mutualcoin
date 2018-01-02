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

async function get(_block, _user) {
  let find = BlockUserModel.find({})

  if (true) { 
    find = find.populate('_block')
  }

  if (true) { 
    find = find.populate('_user')
  }
  return await find.exec()
}

function getBy(propertie) {
  let search = {}

  return function (value, block) {
    search[propertie] = value
    if (propertie === 'user') { 
      return BlockUserModel.find(search).populate('_block').exec()
    }
    if (block) { 
      return BlockUserModel.find(search).populate('_block').populate('_user').exec()
    }
    return BlockUserModel.find(search).populate('_user').exec()
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
  const user = await validateUser(blockUser)
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
  blockUserToCreate._block = block._id
  blockUserToCreate.user = blockUser.user
  blockUserToCreate._user = user._id
  blockUserToCreate.high = blockUser.high
  blockUserToCreate.medium = blockUser.medium
  blockUserToCreate.low = blockUser.low

  return await blockUserToCreate.save()
}

function updatePays(id, pays, last_pay) { 
  return BlockUserModel.findByIdAndUpdate(id, { pays, last_pay })
}
module.exports = function (db) {
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

