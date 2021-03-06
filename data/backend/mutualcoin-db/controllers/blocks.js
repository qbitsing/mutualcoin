'use strict'

const blockSchema = require('../models/blocks')
const coinSchema = require('../models/coins')
const userSchema = require('../models/users')
const blockUserSchema = require('../models/block-user')
const { isAdmin } = require('mutualcoin-utils')
const { v4 } = require('uuid')
const { mate } = require('mutualcoin-utils')
let BlockModel, CoinModel, UserModel, BlockUserModel

async function validateCoin(uuid) {
  if (!uuid) {
    throw new Error('bad request: coin is required')
  }

  let validCoin = await CoinModel.findOne({ uuid })

  if (!validCoin) {
    throw new Error('bad request: the coin is invalid')
  }

  return validCoin._id
}

async function validateBlock(uuid) {
  const block = await BlockModel.findOne({ uuid })

  if (!block) {
    throw new Error('Block not found')
  }

  return block
}

async function validateUser(uuid) {
  if (!uuid) {
    return
  }

  let validUser = await UserModel.findOne({ uuid })

  if (!validUser) {
    throw new Error('bad request: user is not valid')
  }
}

function get(user) {
  isAdmin(user)
  return BlockModel.find({})
}

function getState(state) {
  return BlockModel.find({ $or: state })
}

async function create(block, user) {
  isAdmin(user)
  await validateCoin(block.coin)
  let invalidBlock = null
  let uuid = v4()
  invalidBlock = await BlockModel.findOne({ uuid })
  while (invalidBlock) {
    invalidBlock = null
    uuid = v4()
    invalidBlock = await BlockModel.findOne({ uuid })
  }

  block.uuid = uuid
  const blockToCreate = new BlockModel()

  if (!block.amount) {
    throw new Error('bad request: amount is required')
  }

  if (isNaN(block.amount)) {
    throw new Error('bad request: amount should be a number')
  }

  blockToCreate.amount = block.amount
  blockToCreate.amountLeft = block.amount

  blockToCreate.coin = block.coin

  if (!block.weeks) {
    throw new Error('bad request: weeks is required')
  }

  if (isNaN(block.weeks)) {
    throw new Error('bad request: weeks should be a number')
  }

  blockToCreate.weeks = block.weeks

  blockToCreate.days = mate(`${block.weeks} * 7`)
  blockToCreate.runDays = mate(`${block.weeks} * 7`)

  await validateUser(block.user)
  blockToCreate.user = block.user

  blockToCreate.uuid = block.uuid
  blockToCreate.last_pay = 0

  return blockToCreate.save()
}

async function activate(uuid, user) {
  isAdmin(user)
  const block = await validateBlock(uuid)

  if (block.state !== 'inactive') {
    throw new Error(`bad request: the block cannot be activated because the state is: ${block.state}`)
  }

  await BlockModel.findByIdAndUpdate(block._id, { state: 'active' })

  return 200
}

async function waiting(uuid, user) {
  isAdmin(user)
  const block = await validateBlock(uuid)
  let update = {
    state: 'waiting'
  }

  if (block.state !== 'active') {
    throw new Error(`bad request: the block cannot be waiting because the state is: ${block.state}`)
  }

  if (block.amountLeft > 0) {
    update.amount = mate(`${block.amount} - ${block.amountLeft}`)
    update.amountLeft = 0
  }

  await BlockModel.findByIdAndUpdate(block._id, update)

  return { result: 200, amount: update.amount, amountLeft: update.amountLeft }
}

async function run(uuid, startDate, user) {
  isAdmin(user)
  const block = await validateBlock(uuid)
  const up = {}
  if (block.state !== 'waiting' && block.state !== 'paused') {
    throw new Error(`bad request: the block cannot be runnig because the state is: ${block.state}`)
  }
  if (block.state === 'waiting') {
    up.startDate = startDate
  }
  up.state = 'running'

  await BlockModel.findByIdAndUpdate(block._id, up)

  return 200
}

async function pause(uuid, user) {
  isAdmin(user)
  const block = await validateBlock(uuid)

  if (block.state !== 'running') {
    throw new Error(`bad request: the block cannot be paused because the state is: ${block.state}`)
  }

  await BlockModel.findByIdAndUpdate(block._id, { state: 'paused' })

  return 200
}

async function cancel(uuid, user) {
  isAdmin(user)
  const block = await validateBlock(uuid)

  if (block.state === 'finished') {
    throw new Error(`bad request: the block cannot be cancel because the state is: ${block.state}`)
  }

  await BlockModel.findByIdAndUpdate(block._id, { state: 'cancel' })

  return 200
}

async function finish(uuid, user) {
  isAdmin(user)
  const block = await validateBlock(uuid)

  if (block.state !== 'running') {
    throw new Error(`bad request: the block cannot be finished because the state is: ${block.state}`)
  }

  await BlockModel.findByIdAndUpdate(block._id, { state: 'finished' })

  return 200
}

async function updateAmount(uuid, amount, user) {
  isAdmin(user)
  const block = await validateBlock(uuid)
  const investments = await BlockUserModel.find({ block: uuid })

  let invested = 0

  investments.forEach(investment => {
    invested = mate(`${invested} + ${investment.amount}`)
  })

  if (amount < invested) {
    throw new Error('bad request: the amount cannot be lower to amount invested')
  }

  let amountLeft = mate(`${block.amountLeft} + ${amount} - ${block.amount}`)

  await BlockModel.findByIdAndUpdate(block._id, { amount, amountLeft })

  return { status: 200, amountLeft }
}

async function setInfoDays(uuid, info, user) {
  isAdmin(user)
  let { daysInfo, runDays, _id, state } = await validateBlock(uuid)
  if (state === 'running' || state === 'paused') {
    const length = daysInfo.length
    info = info.filter(i => (length < i.day && i.day <= runDays))
    info = info.sort((a, b) => a.day > b.day)
    validateInfo(info, length)
    daysInfo = daysInfo.concat(info)

    await BlockModel.findByIdAndUpdate(_id, { daysInfo })

    return daysInfo
  } else {
    throw new Error('bad request: the block cannot receive info because the state is: ' + state)
  }
}

function getUuid(uuid) {
  return BlockModel.findOne({ uuid })
}
function getBy(propertie) {
  return function(value) {
    let search = {}
    search[propertie] = value
    return BlockModel.find(search)
  }
}

function validateInfo(info, length) {
  let oldDay = length
  for (let i of info) {
    oldDay++
    if ((i.day === oldDay) && i.high !== null && !isNaN(i.high) && i.medium !== null && !isNaN(i.medium) && i.low !== null && !isNaN(i.low)) {
    } else {
      throw new Error('bad request: the info is not valid')
    }
  }
}

async function updateLatsPay(uuid, to) {
  const block = await validateBlock(uuid)

  return BlockModel.findByIdAndUpdate(block._id, { last_pay: to })
}

module.exports = function(db) {
  BlockModel = db.model('block', blockSchema)
  CoinModel = db.model('coin', coinSchema)
  UserModel = db.model('user', userSchema)
  BlockUserModel = db.model('blocks_user', blockUserSchema)
  const blockMethods = {}
  blockMethods.get = get
  blockMethods.getBy = getBy
  blockMethods.getUuid = getUuid
  blockMethods.getState = getState
  blockMethods.create = create
  blockMethods.activate = activate
  blockMethods.waiting = waiting
  blockMethods.run = run
  blockMethods.pause = pause
  blockMethods.cancel = cancel
  blockMethods.finish = finish
  blockMethods.updateAmount = updateAmount
  blockMethods.setInfoDays = setInfoDays
  blockMethods.updateLatsPay = updateLatsPay

  return blockMethods
}
