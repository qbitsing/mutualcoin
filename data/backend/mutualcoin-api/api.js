'use stric'

const express = require('express')
const user = require('./routes/user')
const coin = require('./routes/coin')
const block = require('./routes/block')
const blockUser = require('./routes/blockUser')
const asyncify = require('express-asyncify')
const api = asyncify(express.Router())
const mutualcoinDB = require('mutualcoin-db')
const config = require('./config')
const debug = require('debug')('mutualcoin:api:routes')

let db

api.use('*', async (req, res, next) => {
  if (!db) {
    debug('Conecting and getting the user model in mutualcoin-db module')
    try {
      db = await mutualcoinDB(config.db)
    } catch (error) {
      return next(error)
    }
  }

  req.db = db

  next()
})

api.use('/user', user)
api.use('/coin', coin)
api.use('/block', block)
api.use('/blockUser', blockUser)

module.exports = api
