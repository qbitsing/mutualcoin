'use strict'

const debug = require('debug')('mutualcoin:api:routes')
const express = require('express')
const asyncify = require('express-asyncify')
const config = require('../config')
const api = asyncify(express.Router())
const ensure = require('express-jwt')

let blockUserModel

api.use('*', (req, res, next) => {
  if (!blockUserModel) {
    blockUserModel = req.db.blockUser
  }

  next()
})

api.get('/all',
  ensure({ secret: config.secret }),
    async (req, res, next) => {
      debug('a request has come to api/blockUser/all')
      let blocksUsers = []
      try {
        blocksUsers = await blockUserModel.get()
      } catch (error) {
        return next(error)
      }

      res.send({ blocksUsers })
    }
)
api.post('/create',
    ensure({ secret: config.secret }),
    async (req, res, next) => {
      debug('a request has come to api/blockUser/create')
      const { blockUserToCreate } = req.body
      if (!blockUserToCreate) {
        return next(new Error('bad request: please specify the block to create'))
      }
      let blockUserCreated
      try {
        blockUserCreated = await blockUserModel.create(blockUserToCreate)
      } catch (error) {
        return next(error)
      }

      res.send({ blockUserCreated })
    }
)

module.exports = api
