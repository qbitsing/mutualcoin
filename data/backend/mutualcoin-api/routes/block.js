'use strict'

const debug = require('debug')('mutualcoin:api:routes')
const express = require('express')
const asyncify = require('express-asyncify')
const config = require('../config')
const api = asyncify(express.Router())
const ensure = require('express-jwt')

let blockModel

api.use('*', (req, res, next) => {
  if (!blockModel) {
    blockModel = req.db.block
  }

  next()
})

api.get('/all',
  ensure({ secret: config.secret }),
    async (req, res, next) => {
      debug('a request has come to api/block/all')
      let blocks = []
      try {
        blocks = await blockModel.get()
      } catch (error) {
        return next(error)
      }

      res.send({ blocks })
    }
)

api.get('/active',
ensure({ secret: config.secret }),
  async (req, res, next) => {
    debug('a request has come to api/block/active')
    let blocks = []
    try {
      blocks = await blockModel.getActive()
    } catch (error) {
      return next(error)
    }

    res.send({ blocks })
  }
)

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

module.exports = api
