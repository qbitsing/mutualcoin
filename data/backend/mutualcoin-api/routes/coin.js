'use strict'

const debug = require('debug')('mutualcoin:api:routes')
const express = require('express')
const asyncify = require('express-asyncify')
const config = require('../config')
const api = asyncify(express.Router())
const ensure = require('express-jwt')

let coinModel

api.use('*', (req, res, next) => {
  if (!coinModel) {
    coinModel = req.db.coin
  }

  next()
})

api.get('/all',
    ensure({ secret: config.secret }),
    async (req, res, next) => {
      debug('a request has come to api/coins/all')
      if (!req.user.admin) {
        return next(new Error('Unauthorized'))
      }
      let coins = []
      try {
        coins = await coinModel.get()
      } catch (error) {
        return next(error)
      }

      res.send({ coins })
    }
)
api.post('/create',
    ensure({ secret: config.secret }),
    async (req, res, next) => {
      debug('a request has come to api/coins/create')
      if (!req.user.admin) {
        return next(new Error('Unauthorized'))
      }
      const { coinToCreate } = req.body
      if (!coinToCreate) {
        return next(new Error('bad request: please specify the coin to create'))
      }
      let coinCreated
      try {
        coinCreated = await coinModel.create(coinToCreate)
      } catch (error) {
        return next(error)
      }

      res.send({ coinCreated })
    }
)

api.put('/update/:uuid',
    ensure({ secret: config.secret }),
    async (req, res, next) => {
      const { uuid } = req.params
      debug(`a request has come to api/coins/update/${uuid}`)
      if (!req.user.admin) {
        return next(new Error('Unauthorized'))
      }
      const { coinToUpdate } = req.body
      let coinUpdated
      try {
        coinUpdated = await coinModel.update(uuid, coinToUpdate)
      } catch (error) {
        return next(error)
      }

      res.send({ coinUpdated })
    }
)

module.exports = api
