'use strict'

const debug = require('debug')('mutualcoin:api:routes')
const express = require('express')
const asyncify = require('express-asyncify')
const mutualcoinDB = require('mutualcoin-db')
const config = require('../config')
const { sing } = require('../auth')
const api = asyncify(express.Router())

let userModel

api.use('*', async (req, res, next) => {
  if (!userModel) {
    debug('Conecting and getting the user model in mutualcoin-db module')
    try {
      userModel = await mutualcoinDB(config.db)
    } catch (error) {
      return next(error)
    }
  }

  next()
})

api.post('/login', async (req, res, next) => {
  debug('A requets has come to /api/user/login')
  const { email, password } = req.body
  const credentials = {
    email,
    password
  }
  let result

  try {
    result = await userModel.user.singin(credentials)
  } catch (error) {
    return next(error)
  }

  if (result.login) {
    sing({
      admin: result.user.admin,
      nickname: result.user.nickname,
      uuid: result.user.uuid,
      bch: result.user.bch,
      bchType: result.user.bchType,
      firstName: result.user.firstName,
      lastName: result.user.lastName,
      age: result.user.age,
      birthdate: result.user.birthdate,
      gender: result.user.gender,
      address: result.user.address,
      phone: result.user.phone,
      hobbies: result.user.hobbies,
      codeReferred: result.user.codeReferred
    }, config.secret , (error, token) => {
      if (error) {
        return next(error)
      }

      res.status(200).send({
        message: result.message,
        token
      })
    })
  } else {
    res.status(400).send({
      message: result.message
    })
  }
})

module.exports = api
