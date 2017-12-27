'use strict'

const debug = require('debug')('mutualcoin:api:routes')
const express = require('express')
const asyncify = require('express-asyncify')
const config = require('../config')
const { pays } = require('mutualcoin-utils')
const api = asyncify(express.Router())
const ensure = require('express-jwt')
const secret = { secret: config.secret }
const paysMap = new Map()
let blockModel

function setConds (query) {
  const conds = []

  if (query.paused) {
    conds.push({ state: 'paused' })
  }

  if (query.active) {
    conds.push({ state: 'active' })
  }

  if (query.finished) {
    conds.push({ state: 'finished' })
  }

  if (query.cancel) {
    conds.push({ state: 'cancel' })
  }

  if (query.inactive) {
    conds.push({ state: 'inactive' })
  }

  if (query.running) {
    conds.push({ state: 'running' })
  }

  if (query.waiting) {
    conds.push({ state: 'waiting' })
  }

  return conds
}

api.use('*', (req, res, next) => {
  if (!blockModel) {
    blockModel = req.db.block
  }

  next()
})

api.get('/all', ensure(secret), async (req, res, next) => {
  debug('a request has come to api/block/all')
  let blocks = []
  try {
    blocks = await blockModel.get()
  } catch (error) {
    return next(error)
  }

  res.send({ blocks })
})

api.get('/state', ensure(secret), async (req, res, next) => {
  debug('a request has come to api/block/state')
  const conds = setConds(req.query)
  let blocks = []
  try {
    blocks = await blockModel.getState(conds)
  } catch (error) {
    return next(error)
  }

  res.send({ blocks })
})

api.post('/create',
  ensure({ secret: config.secret }),
  async (req, res, next) => {
    debug('a request has come to api/block/create')
    if (!req.user.admin) {
      return next(new Error('Unauthorized'))
    }
    const { blockToCreate } = req.body
    if (!blockToCreate) {
      return next(new Error('bad request: please specify the block to create'))
    }
    let blockCreated
    try {
      blockCreated = await blockModel.create(blockToCreate)
    } catch (error) {
      return next(error)
    }

    res.send({ blockCreated })
  }
)

api.put('/activate/:uuid',
  ensure({ secret: config.secret }),
  async (req, res, next) => {
    debug('a request has come to api/block/activate')
    if (!req.user.admin) {
      return next(new Error('Unauthorized'))
    }
    const { uuid } = req.params
    let result
    try {
      result = await blockModel.activate(uuid)
    } catch (error) {
      return next(error)
    }
    res.send(result)
  }
)

api.put('/waiting/:uuid',
  ensure({ secret: config.secret }),
  async (req, res, next) => {
    debug('a request has come to api/block/waiting')
    if (!req.user.admin) {
      return next(new Error('Unauthorized'))
    }
    const { uuid } = req.params
    let result
    try {
      result = await blockModel.waiting(uuid)
    } catch (error) {
      return next(error)
    }
    res.send(result)
  }
)

api.put('/run/:uuid',
  ensure({ secret: config.secret }),
  async (req, res, next) => {
    debug('a request has come to api/block/run')
    if (!req.user.admin) {
      return next(new Error('Unauthorized'))
    }
    const { uuid } = req.params
    let result
    try {
      result = await blockModel.run(uuid)
    } catch (error) {
      return next(error)
    }
    res.send(result)
  }
)

api.put('/pause/:uuid',
  ensure({ secret: config.secret }),
  async (req, res, next) => {
    debug('a request has come to api/block/pause')
    if (!req.user.admin) {
      return next(new Error('Unauthorized'))
    }
    const { uuid } = req.params
    let result
    try {
      result = await blockModel.pause(uuid)
    } catch (error) {
      return next(error)
    }
    res.send(result)
  }
)

api.put('/cancel/:uuid',
  ensure({ secret: config.secret }),
  async (req, res, next) => {
    debug('a request has come to api/block/cancel')
    if (!req.user.admin) {
      return next(new Error('Unauthorized'))
    }
    const { uuid } = req.params
    let result
    try {
      result = await blockModel.cancel(uuid)
    } catch (error) {
      return next(error)
    }
    res.send(result)
  }
)

api.put('/finish/:uuid',
  ensure({ secret: config.secret }),
  async (req, res, next) => {
    debug('a request has come to api/block/finish')
    if (!req.user.admin) {
      return next(new Error('Unauthorized'))
    }
    const { uuid } = req.params
    let result
    try {
      result = await blockModel.finish(uuid)
    } catch (error) {
      return next(error)
    }
    res.send(result)
  }
)

api.put('/earnings/:uuid',
  ensure({ secret: config.secret }),
  async (req, res, next) => {
    debug('a request has come to api/block/earnings')
    if (!req.user.admin) {
      return next(new Error('Unauthorized'))
    }
    const { uuid } = req.params
    const { earnings } = req.body
    let result
    try {
      result = await blockModel.setInfoDays(uuid, earnings)
    } catch (error) {
      return next(error)
    }
    res.send(result)
  }
)

api.put('/pay/:uuid/:to',
  ensure({ secret: config.secret }),
  async (req, res, next) => {
    debug('a request has come to api/block/earnings')
    if (!req.user.admin) {
      return next(new Error('Unauthorized'))
    }
    const { uuid, to } = req.params
    let investments
    let result
    try {
      investments = await req.db.blockUser.getBy('block')(uuid, true)
      result = pays(to, investments)
    } catch (error) {
      return next(error)
    }
    paysMap.set(uuid, result)

    res.send(result.pays)
  }
)

api.put('/makePay/:uuid',
  ensure({ secret: config.secret }),
  async (req, res, next) => {
    debug('a request has come to api/block/earnings')
    if (!req.user.admin) {
      return next(new Error('Unauthorized'))
    }
    const { uuid } = req.params
    let result = paysMap.get(uuid)

    if (!result) { 
      return next(new Error('bad request: there is no payment generated with the indicated uuid'))
    }

    let { investments } = result 
    let promises = investments.map(investment => req.db.blockUser.updatePays(investment._id, investment.pays, investment.last_pay))
    try {
      await Promise.all(promises)
    } catch (error) {
      return next(error)
    }
    res.send({ result: true })
  }
)

api.put('/amount/:uuid/:amount',
  ensure({ secret: config.secret }),
  async (req, res, next) => {
    debug('a request has come to api/block/finish')
    if (!req.user.admin) {
      return next(new Error('Unauthorized'))
    }
    const { uuid, amount } = req.params
    let result
    try {
      result = await blockModel.updateAmount(uuid, amount)
    } catch (error) {
      return next(error)
    }
    res.send(result)
  }
)

module.exports = api
