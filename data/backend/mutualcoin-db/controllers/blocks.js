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

function get() {
    return BlockModel.find({})
}

function getState(state) { 
    return BlockModel.find({ state })
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

async function activate(uuid) { 
    const block = await validateBlock(uuid)    

    if (block.state !== 'inactive') { 
        throw new Error(`bad request: the block cannot be activated because the state is: ${block.state}`)
    }

    await BlockModel.findByIdAndUpdate(block._id, { state: 'active' })
    
    return { result: true }
}

async function waiting(uuid) { 
    const block = await validateBlock(uuid)
    let update = {
        state: 'waiting'
    }
    
    if (block.state !== 'waiting') { 
        throw new Error(`bad request: the block cannot be waiting because the state is: ${block.state}`)        
    }

    if (block.amountLeft > 0) { 
        update.amount = block.amount - amountLeft
        update.amountLeft = 0
    }

    await BlockModel.findByIdAndUpdate(block._id, update)
    
    return { result: true }    
}

async function run(uuid) { 
    const block = await validateBlock(uuid)

    if (block.state !== 'waiting' && block.state !== 'paused') { 
        throw new Error(`bad request: the block cannot be runnig because the state is: ${block.state}`)                
    }

    await BlockModel.findByIdAndUpdate(block._id, { state: 'runnig' })
    
    return { result: true }
}

async function pause(uuid) { 
    const block = await validateBlock(uuid)

    if (block.state !== 'runnig') { 
        throw new Error(`bad request: the block cannot be paused because the state is: ${block.state}`)        
    }

    await BlockModel.findByIdAndUpdate(block._id, { state: 'paused' })

    return { result: true }
}

async function cancel(uuid) { 
    const block = await validateBlock(uuid)

    if (block.state === 'finished') { 
        throw new Error(`bad request: the block cannot be cancel because the state is: ${block.state}`)        
    }

    await BlockModel.findByIdAndUpdate(block._id, { state: 'cancel' })

    return { result: true }
}

async function finish(uuid) { 
    const block = await validateBlock(uuid)

    if (block.state !== 'runnig') { 
        throw new Error(`bad request: the block cannot be finished because the state is: ${block.state}`)        
    }

    await BlockModel.findByIdAndUpdate(block._id, { state: 'finished' })

    return { result: true }
}

module.exports = function(db) {
    BlockModel = db.model('block', blockSchema)
    CoinModel = db.model('coin', coinSchema)
    UserModel = db.model('user', userSchema)
    const blockMethods = {}
    blockMethods.get = get
    blockMethods.getState = getState
    blockMethods.create = create
    blockMethods.activate = activate
    blockMethods.waiting = waiting
    blockMethods.run = run
    blockMethods.pause = pause
    blockMethods.cancel = cancel
    blockMethods.finish = finish

    return blockMethods
}
