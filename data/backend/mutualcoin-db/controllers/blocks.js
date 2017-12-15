'use strict'

const blockSchema = require('../models/blocks')
const coinSchema = require('../models/coins')
const userSchema = require('../models/users')
const { v4 } = require('uuid')
let BlockModel, CoinModel, UserModel

async function validateCoin(uuid) {
    if (!uuid) {
        throw new Error('bad request: coin is required')
    }

    let validCoin = await CoinModel.findOne({ uuid })

    if (!validCoin) {
        throw new Error('bad request: the coin is invalid')
    }
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

async function get() {
    return await BlockModel.find({})
}

async function create(block) {
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
    await validateCoin(block.coin)

    blockToCreate.coin = block.coin

    if (!block.weeks) {
        throw new Error('bad request: weeks is required')
    }

    if (isNaN(block.weeks)) {
        throw new Error('bad request: weeks should be a number')
    }

    blockToCreate.weeks = block.weeks

    await validateUser(block.user)
    blockToCreate.user = block.user

    return await blockToCreate.save()
}

module.exports = function(db) {
    BlockModel = db.model('block', blockSchema)
    CoinModel = db.model('coin', coinSchema)
    UserModel = db.model('user', userSchema)
    const blockMethods = {}
    blockMethods.get = get
    blockMethods.create = create

    return blockMethods
}
